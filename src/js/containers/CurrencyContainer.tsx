import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Status from '../consts/actions';
import { StoreType } from '../features/storeType';
import { getCurrencyStatusById, getCurrencyById } from '../features/currency/currencySelectors';
import { fetchCurrencyPrice, fetchCurrencyPriceHistory } from '../features/currency/currencyActions';
import { CurrencyType } from '../features/currency/currencyTypes';
import CurrencyPreview from '../components/CurrencyPreview';

interface Push {
  (path: string): void;
}

interface State {
  status: Status | null;
  currency: CurrencyType | null;
}

interface Props extends State {
  fetchCurrencyPrice: void;
  fetchCurrencyPriceHistory: void;
  currencyId: string;
  push: Push
}

interface OwnProps {
  currencyId: string;
  push: Push;
}

const mapState = (state: StoreType, ownProps: OwnProps): State => {
  const { currencyId } = ownProps;

  return {
    status: getCurrencyStatusById(state, currencyId),
    currency: getCurrencyById(state, currencyId)
  };
};
const mapDispatch = {
  fetchCurrencyPrice,
  fetchCurrencyPriceHistory
};
const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export const CurrenciesContainer = ({
  fetchCurrencyPrice,
  fetchCurrencyPriceHistory,
  status,
  currency,
  currencyId,
  push
}: ReduxProps & Props): React.ReactElement | null => {
  const [rendered, setRendered] = React.useState(false);

  React.useEffect(() => {
    fetchCurrencyPrice(currencyId);
    setRendered(true);
  }, []);

  function handleModalClose(): void {
    return push('/');
  }

  const previewContent = (chartId: string): React.ReactElement => (
    <React.Fragment>
      {
        (!status || status === Status.IN_PROGRESS) && (
          <div className="loading">
            <div className="icon is-large">
              <i className="fa fa-spin fa-spinner fas fa-3x" aria-hidden="true" />
            </div>
          </div>
        )
      }

      {
        (!currency || status === Status.FAILURE) && (
          <div>Nie udało się załadować danych</div>
        )
      }

      {
        (status === Status.SUCCESS && currency) && (
          <CurrencyPreview
            chartId={chartId}
            currency={currency}
            fetchCurrencyPriceHistory={fetchCurrencyPriceHistory}
          />
        )
      }
    </React.Fragment>
  );

  if (!rendered) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="column is-hidden-touch">
        <div className="box">
          {previewContent('desktop')}
        </div>
      </div>

      <div className="modal is-active is-hidden-desktop">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <button className="delete is-pulled-right" aria-label="close" onClick={handleModalClose} />
          </header>
          <section className="modal-card-body">
            {previewContent('mobile')}
          </section>

          <footer className="modal-card-foot">
            <button className="button is-dark is-pulled-right" onClick={handleModalClose}>Zamknij</button>
          </footer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connector(CurrenciesContainer);
