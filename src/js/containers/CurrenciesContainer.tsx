import * as React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { fetchCurrencies } from '../features/currencies/currenciesActions';
import Status from '../consts/actions';
import { StoreType } from '../features/storeType';
import { getCurrenciesStatus } from '../features/currencies/currenciesSelectors';
import CurrenciesList from '../components/CurrenciesList';
import { CurrencyType } from '../features/currency/currencyTypes';
import { getCurrencies } from '../features/currency/currencySelectors';

interface History {
  push: void & ((path: string) => void);
}

interface Props {
  fetchCurrencies: void;
  currencies: CurrencyType[] | null;
  status: Status | null;
  currencyId?: string;
  history: History;
}

interface OwnProps {
  history: History;
  match: {params: {currencyId?: string}}
}

interface State {
  currencies: CurrencyType[] | null;
  status: Status | null;
  currencyId?: string;
}

const mapState = (state: StoreType, ownProps: OwnProps): State => ({
  status: getCurrenciesStatus(state),
  currencies: getCurrencies(state),
  currencyId: ownProps.match.params.currencyId
});

const mapDispatch = {
  fetchCurrencies
};
const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export const CurrenciesContainer = ({
  fetchCurrencies,
  status,
  currencies,
  currencyId,
  history
}: ReduxProps & Props): React.ReactElement | null => {
  React.useEffect(() => {
    fetchCurrencies();
  }, []);

  if (!status || status === Status.IN_PROGRESS) {
    return (
      <div className="loading">
        <div className="icon is-large">
          <i className="fa fa-spin fa-spinner fas fa-3x" aria-hidden="true" />
        </div>
      </div>
    );
  }

  if (status === Status.FAILURE) {
    return (
      <div>Nie udało się załadować danych</div>
    );
  }

  if (status === Status.SUCCESS && currencies) {
    return (
      <div className="wrapper">
        <CurrenciesList
          currencies={currencies}
          currencyId={currencyId}
          push={history.push}
        />
      </div>
    );
  }

  return null;
};

export default connector(CurrenciesContainer);
