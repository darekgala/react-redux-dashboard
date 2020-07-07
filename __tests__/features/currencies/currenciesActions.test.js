import axios from 'axios';
import { call } from 'redux-call-effect';
import { SET_CURRENCIES_STATUS, SET_CURRENCIES_IDS } from '../../../src/js/features/currencies/currenciesTypes';
import {
  setCurrenciesStatus,
  setCurrenciesIds,
  extractValidCurrenciesFromResponse,
  fetchCurrencies
} from '../../../src/js/features/currencies/currenciesActions';
import Status from '../../../src/js/consts/actions';
import { setCurrencies } from '../../../src/js/features/currency/currencyActions';

jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('setCurrenciesStatus()', () => {
  it('returns proper action object', () => {
    const status = 'status';

    expect(setCurrenciesStatus(status)).toEqual({
      type: SET_CURRENCIES_STATUS,
      payload: { status }
    });
  });
});

describe('setCurrenciesIds()', () => {
  it('returns proper action object', () => {
    const currencies = [{ id: 1 }, { id: 2 }];
    const currenciesIds = [currencies[0].id, currencies[1].id];

    expect(setCurrenciesIds(currencies)).toEqual({
      type: SET_CURRENCIES_IDS,
      payload: { currenciesIds }
    });
  });
});

const currency = {
  IsTrading: true,
  Name: 'BTC',
  CoinName: 'Bitcoin',
  ImageUrl: 'url',
  SortOrder: 1,
  TotalCoinsMined: 123,
  Algorithm: 'MD5'
};

const response = {
  data: {
    Data: {
      BTC: currency,
      ETH: { IsTrading: false }
    }
  }
};

const currencies = [{
  id: currency.Name,
  name: currency.CoinName,
  image: currency.ImageUrl,
  mined: currency.TotalCoinsMined,
  algorithm: currency.Algorithm,
  order: currency.SortOrder
}];

describe('extractValidCurrenciesFromResponse()', () => {
  it('returns proper action object', () => {
    expect(extractValidCurrenciesFromResponse()).toEqual(null);
  });

  it('returns proper action object', () => {
    expect(extractValidCurrenciesFromResponse(response)).toEqual(currencies);
  });
});

describe('fetchCurrencies()', () => {
  const dispatch = jest.fn();
  const url = 'https://min-api.cryptocompare.com/data/all/coinlist';

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('handles successfull axios request', async () => {
    axios.mockReturnValueOnce(Promise.resolve(response));

    const result = await fetchCurrencies()(dispatch);

    expect(result).toEqual(currencies);
    expect(axios).toHaveBeenCalledWith({ url, method: 'get', responseType: 'json' });
    expect(dispatch).toHaveBeenCalledWith(call(setCurrenciesStatus, Status.IN_PROGRESS));
    expect(dispatch).toHaveBeenCalledWith(call(setCurrenciesIds, currencies));
    expect(dispatch).toHaveBeenCalledWith(call(setCurrencies, currencies));
    expect(dispatch).toHaveBeenCalledWith(call(setCurrenciesStatus, Status.SUCCESS));
    expect(dispatch).toHaveBeenCalledTimes(4);
  });

  it('handles unsuccessfull axios request', async () => {
    axios.mockReturnValueOnce(Promise.reject());

    const result = await fetchCurrencies()(dispatch);

    expect(result).toEqual(null);
    expect(axios).toHaveBeenCalledWith({ url, method: 'get', responseType: 'json' });
    expect(dispatch).toHaveBeenCalledWith(call(setCurrenciesStatus, Status.IN_PROGRESS));
    expect(dispatch).toHaveBeenCalledWith(call(setCurrenciesStatus, Status.FAILURE));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
