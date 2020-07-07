import React, { useEffect, ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { fetchCurrencies, FetchCurrenciesType } from '../features/currencies/currenciesActions';
import Status from '../consts/actions';
import CurrenciesList from '../components/currenciesList/CurrenciesList';
import { StoreType } from '../features/storeType';
import { getCurrenciesStatus } from '../features/currencies/currenciesSelectors';
import { CurrencyType } from '../features/currency/currencyTypes';
import { getCurrencies } from '../features/currency/currencySelectors';

interface HistoryType {
  push: void & ((path: string) => void);
}

interface StateType {
  currencies: CurrencyType[] | null;
  status: Status | null;
  currencyId?: string;
}

interface PropsType extends StateType {
  fetchCurrencies: FetchCurrenciesType;
  history: HistoryType;
}

interface OwnPropsType {
  history: HistoryType;
  match: { params: { currencyId?: string } }
}

const mapStateToProps = (state: StoreType, ownProps: OwnPropsType): StateType => ({
  status: getCurrenciesStatus(state),
  currencies: getCurrencies(state),
  currencyId: ownProps.match.params.currencyId
});
const mapDispatchToProps = {
  fetchCurrencies
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxPropsType = ConnectedProps<typeof connector>;

export const CurrenciesContainer = ({
  fetchCurrencies,
  status,
  currencies,
  currencyId,
  history
}: ReduxPropsType & PropsType): ReactElement | null => {
  useEffect(() => {
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

  if (currencies) {
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
