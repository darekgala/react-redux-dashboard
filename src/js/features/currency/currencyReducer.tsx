import {
  SET_CURRENCY_STATUS,
  SET_CURRENCIES,
  CurrenciesDictionary,
  UPDATE_CURRENCY,
  CurrencyAction,
  CurrencyType
} from './currencyTypes';

const currencyReducer = (
  state: CurrenciesDictionary = {},
  action: CurrencyAction
): CurrenciesDictionary => {
  switch (action.type) {
    case SET_CURRENCY_STATUS: {
      const { currencyId, status } = action.payload;

      return {
        ...state,
        [currencyId]: {
          ...state[currencyId],
          status
        }
      };
    }

    case SET_CURRENCIES: {
      const { currencies } = action.payload;
      return {
        ...state,
        ...currencies.reduce<CurrenciesDictionary>((allCurrencies, currency) => {
          allCurrencies[currency.id] = {
            status: null,
            data: currency
          };

          return allCurrencies;
        }, {})
      };
    }

    case UPDATE_CURRENCY: {
      const { currencyId, data } = action.payload;
      const currencyState = state[currencyId];
      const currencyData: CurrencyType | null = currencyState && currencyState.data;

      if (currencyData) {
        return {
          ...state,
          [currencyId]: {
            ...currencyState,
            data: {
              ...currencyState.data,
              ...data
            }
          }
        };
      }

      return state;
    }

    default:
      return state;
  }
};

export default currencyReducer;
