import { StoreType } from '../storeType';
import Status from '../../consts/actions';
import { CurrencyType, CurrenciesDictionary } from './currencyTypes';
import { getCurrenciesIds } from '../currencies/currenciesSelectors';

export const getCurrencyState = (state: StoreType): CurrenciesDictionary | null => (
  state.currency || null
);

export const getCurrencyStatusById = (state: StoreType, currencyId: string): Status | null => {
  const currenciesState: CurrenciesDictionary | null = getCurrencyState(state);

  if (currenciesState) {
    const currencyState = currenciesState[currencyId];

    if (currencyState) {
      return currencyState.status || null;
    }

    return null;
  }

  return null;
};

export const getCurrencyById = (state: StoreType, currencyId: string): CurrencyType | null => {
  const currenciesState: CurrenciesDictionary | null = getCurrencyState(state);

  if (currenciesState) {
    const currencyState = currenciesState[currencyId];

    if (currencyState) {
      return currencyState.data || null;
    }

    return null;
  }

  return null;
};

export const getCurrenciesByIds = (state: StoreType, currenciesIds: string[]): CurrencyType[] | null => {
  const currenciesState: CurrenciesDictionary | null = getCurrencyState(state);

  function removeEmpty<T>(value: T | null): value is T {
    return value !== null;
  }

  if (currenciesState && currenciesIds) {
    const currencies: CurrencyType[] = currenciesIds
      .map((currencyId) => getCurrencyById(state, currencyId))
      .filter(removeEmpty);

    return currencies;
  }

  return null;
};

export const getCurrencies = (state: StoreType): CurrencyType[] | null => {
  const currenciesState: CurrenciesDictionary | null = getCurrencyState(state);
  const currenciesIds = getCurrenciesIds(state);

  if (currenciesState && currenciesIds) {
    const currencies = getCurrenciesByIds(state, currenciesIds);

    if (currencies) {
      return currencies.sort((firstCurrency, secondCurrency) => firstCurrency.order - secondCurrency.order);
    }

    return null;
  }

  return null;
};
