import React, { useState, useEffect, ReactElement, Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Status from '../consts/actions';
import { StoreType } from '../features/storeType';
import { getCurrencyStatusById, getCurrencyById } from '../features/currency/currencySelectors';
import {
  fetchCurrencyPrice,
  fetchCurrencyPriceHistory,
  FetchCurrencyPriceType,
  FetchCurrencyPriceHistoryType
} from '../features/currency/currencyActions';
import { CurrencyType } from '../features/currency/currencyTypes';
import CurrencyPreview from '../components/currencyPreview/CurrencyPreview';

interface Push {
  (path: string): void;
}

interface StateType {
  status: Status | null;
  currency: CurrencyType | null;
}

interface OwnPropsType {
  currencyId: string;
  push: Push;
}

interface PropsType extends OwnPropsType, StateType {
  fetchCurrencyPrice: FetchCurrencyPriceType;
  fetchCurrencyPriceHistory: FetchCurrencyPriceHistoryType;
}

const mapState = (state: StoreType, ownProps: OwnPropsType): StateType => {
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
type ReduxPropsType = ConnectedProps<typeof connector>;

export const CurrencyContainer = ({
  fetchCurrencyPrice,
  fetchCurrencyPriceHistory,
  status,
  currency,
  currencyId,
  push
}: ReduxPropsType & PropsType): ReactElement | null => {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    fetchCurrencyPrice(currencyId);
    setRendered(true);
  }, []);

  function handleModalClose() {
    return push('/');
  }

  const previewContent = (chartId: string): ReactElement => (
    <Fragment>
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
    </Fragment>
  );

  if (!rendered) {
    return null;
  }

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default connector(CurrencyContainer);
