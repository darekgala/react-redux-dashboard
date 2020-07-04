import axios from 'axios';
import { call } from 'redux-call-effect';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import {
  SetCurrenciesStatusAction,
  SetCurrenciesIdsAction,
  SET_CURRENCIES_STATUS,
  SET_CURRENCIES_IDS
} from './currenciesTypes';
import Status from '../../consts/actions';
import { StoreType } from '../storeType';
import { CurrencyType } from '../currency/currencyTypes';
import { setCurrencies } from '../currency/currencyActions';

interface ResponseData {
  IsTrading: boolean,
  Name: string,
  CoinName: string,
  ImageUrl: string,
  SortOrder: string,
  TotalCoinsMined: number,
  Algorithm: string
}

interface DataDictionary {
  [index: string]: ResponseData
}

interface Response {
  data: {
    Data: DataDictionary
  }
}

export const setCurrenciesStatus = (status: Status): SetCurrenciesStatusAction => ({
  type: SET_CURRENCIES_STATUS,
  payload: { status }
});

export const setCurrenciesIds = (currencies: CurrencyType[]): SetCurrenciesIdsAction => {
  const currenciesIds = currencies.map(({ id }) => id);

  return {
    type: SET_CURRENCIES_IDS,
    payload: { currenciesIds }
  };
};

export const extractValidCurrenciesFromResponse = (
  response: Response
): CurrencyType[] | null => {
  if (response && response.data.Data) {
    const data = response.data.Data;
    return Object
      .keys(data)
      .reduce((validCurrencies, currencyCode) => {
        const {
          IsTrading, Name, CoinName,
          ImageUrl, SortOrder, TotalCoinsMined,
          Algorithm
        } = data[currencyCode];
        const validOrder = parseInt(SortOrder, 10);

        if (IsTrading && validOrder <= 50) {
          validCurrencies.push({
            id: Name,
            name: CoinName,
            image: ImageUrl,
            mined: TotalCoinsMined,
            algorithm: Algorithm,
            order: validOrder
          });
        }

        return validCurrencies;
      }, [] as CurrencyType[]);
  }

  return null;
};

export const fetchCurrencies = (): ThunkAction<void, StoreType, unknown, Action<string>> =>
  async (dispatch: ThunkDispatch<StoreType, unknown, Action<string>>) => {
    const url = 'https://min-api.cryptocompare.com/data/all/coinlist';

    dispatch(call(setCurrenciesStatus, Status.IN_PROGRESS));

    try {
      const response = await axios({ url, method: 'get', responseType: 'json' });
      const currencies = extractValidCurrenciesFromResponse(response);

      dispatch(call(setCurrenciesIds, currencies));
      dispatch(call(setCurrencies, currencies));
      dispatch(call(setCurrenciesStatus, Status.SUCCESS));

      return currencies;
    } catch (error) {
      dispatch(call(setCurrenciesStatus, Status.FAILURE));

      return null;
    }
  };
