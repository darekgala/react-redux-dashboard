import {
  CurrenciesState,
  SET_CURRENCIES_STATUS,
  SET_CURRENCIES_IDS,
  CurrenciesAction
} from './currenciesTypes';

const initialState: CurrenciesState = {
  currenciesIds: null,
  status: null
};

const currenciesReducer = (
  state = initialState,
  action: CurrenciesAction
): CurrenciesState => {
  switch (action.type) {
    case SET_CURRENCIES_STATUS: {
      const { status } = action.payload;

      return {
        ...state,
        status
      };
    }

    case SET_CURRENCIES_IDS: {
      const { currenciesIds } = action.payload;

      return {
        ...state,
        currenciesIds
      };
    }

    default:
      return state;
  }
};

export default currenciesReducer;
