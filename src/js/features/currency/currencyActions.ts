import axios from 'axios';
import { call } from 'redux-call-effect';
import Status from '../../consts/actions';
import {
  CurrencyType,
  SetCurrencyStatusAction,
  SetCurrenciesAction,
  SET_CURRENCY_STATUS,
  SET_CURRENCIES,
  UPDATE_CURRENCY,
  UpdateCurrencyAction,
  CurrencyExtendedType
} from './currencyTypes';
import { AppThunkType, AppDispatchType } from '../storeType';

export const setCurrencyStatus = (currencyId: string, status: Status): SetCurrencyStatusAction => ({
  type: SET_CURRENCY_STATUS,
  payload: { currencyId, status }
});

export const setCurrencies = (currencies: CurrencyType[]): SetCurrenciesAction => ({
  type: SET_CURRENCIES,
  payload: { currencies }
});

export const updateCurrency = (currencyId: string, data: CurrencyExtendedType): UpdateCurrencyAction => ({
  type: UPDATE_CURRENCY,
  payload: { currencyId, data }
});

export interface FetchCurrencyHistoryType {
  (currencyId: string, symbol: string): Promise<any>
}

export const fetchCurrencyHistory = async (currencyId: string, symbol: string): Promise<any> => {
  const url = `https://min-api.cryptocompare.com/data/histoday?fsym=${currencyId}&tsym=${symbol}&limit=60&aggregate=3&e=CCCAGG`;

  const response = await axios({ url, method: 'get', responseType: 'json' });

  if (response.data.Response === 'Error') {
    throw Error('No data');
  }

  return response;
};

export interface FetchCurrencyPriceType {
  (currencyId: string): AppThunkType
}

export const fetchCurrencyPrice = (currencyId: string): AppThunkType =>
  async (dispatch: AppDispatchType) => {
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${currencyId}&tsyms=USD,EUR,PLN`;

    dispatch(call(setCurrencyStatus, currencyId, Status.IN_PROGRESS));

    try {
      const priceResponse = await axios({ url, method: 'get', responseType: 'json' });
      const historyResponse = await fetchCurrencyHistory(currencyId, 'PLN');

      if (priceResponse.data.Response === 'Error' || historyResponse.data.Response === 'Error') {
        dispatch(call(setCurrencyStatus, currencyId, Status.FAILURE));

        return null;
      }

      const currencyExtension = {
        conversion: priceResponse.data,
        history: {
          symbol: 'PLN',
          data: historyResponse.data.Data
        }
      };

      dispatch(call(updateCurrency, currencyId, currencyExtension));
      dispatch(call(setCurrencyStatus, currencyId, Status.SUCCESS));

      return currencyExtension;
    } catch (error) {
      dispatch(call(setCurrencyStatus, currencyId, Status.FAILURE));

      return null;
    }
  };

export interface FetchCurrencyPriceHistoryType {
  (currencyId: string, symbol: string): AppThunkType
}

export const fetchCurrencyPriceHistory = (
  currencyId: string,
  symbol: string
): AppThunkType =>
  async (dispatch: AppDispatchType) => {
    try {
      const historyResponse = await fetchCurrencyHistory(currencyId, symbol);
      const history = historyResponse.data.Data;
      const data = { symbol, data: history };

      dispatch(call(updateCurrency, currencyId, { history: data }));

      return history;
    } catch (error) {
      return null;
    }
  };
