import axios from 'axios';
import { call } from 'redux-call-effect';
import Status from '../../../src/js/consts/actions';
import {
  setCurrencyStatus,
  setCurrencies,
  updateCurrency,
  fetchCurrencyHistory,
  fetchCurrencyPrice,
  fetchCurrencyPriceHistory
} from '../../../src/js/features/currency/currencyActions';
import {
  SET_CURRENCY_STATUS,
  SET_CURRENCIES,
  UPDATE_CURRENCY
} from '../../../src/js/features/currency/currencyTypes';

jest.mock('axios', () => ({
  __esModule: true,
  default: jest.fn()
}));

const currencyId = 'BTC';
const currencies = [{ id: 'BTC' }, { id: 'ETH' }];

describe('setCurrencyStatus()', () => {
  it('returns proper action object', () => {
    const status = 'status';

    expect(setCurrencyStatus(currencyId, status)).toEqual({
      type: SET_CURRENCY_STATUS,
      payload: { currencyId, status }
    });
  });
});

describe('setCurrencies()', () => {
  it('returns proper action object', () => {
    expect(setCurrencies(currencies)).toEqual({
      type: SET_CURRENCIES,
      payload: { currencies }
    });
  });
});

describe('updateCurrency()', () => {
  it('returns proper action object', () => {
    const data = { history: {}, conversion: {} };

    expect(updateCurrency(currencyId, data)).toEqual({
      type: UPDATE_CURRENCY,
      payload: { currencyId, data }
    });
  });
});

const historyResponse = {
  data: {
    Response: { Result: 'success' },
    Data: [{ time: 123 }, [{ time: 1234 }]]
  }
};
const priceResponse = { data: { USD: 123, PLN: 123 } };
const currencyExtension = {
  conversion: priceResponse.data,
  history: {
    symbol: 'PLN',
    data: historyResponse.data.Data
  }
};
const symbol = 'USD';
const url = `https://min-api.cryptocompare.com/data/histoday?fsym=${currencyId}&tsym=${symbol}&limit=60&aggregate=3&e=CCCAGG`;
const historyUrl = `https://min-api.cryptocompare.com/data/histoday?fsym=${currencyId}&tsym=PLN&limit=60&aggregate=3&e=CCCAGG`;
const priceUrl = `https://min-api.cryptocompare.com/data/price?fsym=${currencyId}&tsyms=USD,EUR,PLN`;
const dispatch = jest.fn();

describe('fetchCurrencyHistory()', () => {
  it('handles sucessfull fetch of currency history', async () => {
    axios.mockReturnValueOnce(Promise.resolve(historyResponse));

    const result = await fetchCurrencyHistory(currencyId, symbol);

    expect(result).toEqual(historyResponse);
    expect(axios).toHaveBeenCalledWith({ url, method: 'get', responseType: 'json' });
  });

  it('handles sucessfull fetch but with failed response', async () => {
    axios.mockReturnValueOnce(Promise.resolve({ data: { Response: 'Error' } }));

    try {
      await fetchCurrencyHistory(currencyId, symbol);
    } catch (error) {
      expect(error).toEqual(Error('No data'));
    }
  });
});

describe('fetchCurrencyPrice()', () => {
  beforeEach(() => {
    axios.mockClear();
    dispatch.mockClear();
  });

  it('handles sucessfull fetch of currency price', async () => {
    axios
      .mockReturnValueOnce(Promise.resolve(priceResponse))
      .mockReturnValueOnce(Promise.resolve(historyResponse));

    const result = await fetchCurrencyPrice(currencyId)(dispatch);

    expect(result).toEqual(currencyExtension);
    expect(axios).toHaveBeenCalledTimes(2);
    expect(axios).toHaveBeenCalledWith({ url: priceUrl, method: 'get', responseType: 'json' });
    expect(axios).toHaveBeenCalledWith({ url: historyUrl, method: 'get', responseType: 'json' });
    expect(dispatch).toHaveBeenCalledWith(call(setCurrencyStatus, currencyId, Status.IN_PROGRESS));
    expect(dispatch).toHaveBeenCalledWith(call(updateCurrency, currencyId, currencyExtension));
    expect(dispatch).toHaveBeenCalledWith(call(setCurrencyStatus, currencyId, Status.SUCCESS));
    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('handles sucessfull fetch but with failed response', async () => {
    axios
      .mockReturnValueOnce(Promise.resolve({ data: { Response: 'Error' } }))
      .mockReturnValueOnce(Promise.resolve(historyResponse));

    const result = await fetchCurrencyPrice(currencyId)(dispatch);
    expect(result).toEqual(null);
    expect(axios).toHaveBeenCalledWith({ url: priceUrl, method: 'get', responseType: 'json' });
    expect(axios).toHaveBeenCalledWith({ url: historyUrl, method: 'get', responseType: 'json' });
    expect(axios).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(call(setCurrencyStatus, currencyId, Status.IN_PROGRESS));
    expect(dispatch).toHaveBeenCalledWith(call(setCurrencyStatus, currencyId, Status.FAILURE));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it('handles unsucessfull fetch', async () => {
    axios
      .mockReturnValueOnce(Promise.resolve(priceResponse))
      .mockReturnValueOnce(Promise.reject());

    const result = await fetchCurrencyPrice(currencyId)(dispatch);
    expect(result).toEqual(null);
    expect(axios).toHaveBeenCalledWith({ url: priceUrl, method: 'get', responseType: 'json' });
    expect(axios).toHaveBeenCalledWith({ url: historyUrl, method: 'get', responseType: 'json' });
    expect(axios).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(call(setCurrencyStatus, currencyId, Status.IN_PROGRESS));
    expect(dispatch).toHaveBeenCalledWith(call(setCurrencyStatus, currencyId, Status.FAILURE));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});

describe('fetchCurrencyPriceHistory()', () => {
  beforeEach(() => {
    axios.mockClear();
    dispatch.mockClear();
  });

  it('handles sucessfull fetch of currency price history', async () => {
    axios.mockReturnValueOnce(Promise.resolve(historyResponse));

    const result = await fetchCurrencyPriceHistory(currencyId, symbol)(dispatch);

    expect(result).toEqual(historyResponse.data.Data);
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith({ url, method: 'get', responseType: 'json' });
    expect(dispatch).toHaveBeenCalledWith(call(updateCurrency, currencyId, {
      history: { symbol, data: historyResponse.data.Data }
    }));
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  it('handles sucessfull fetch of currency price history', async () => {
    axios.mockReturnValueOnce(Promise.reject());

    const result = await fetchCurrencyPriceHistory(currencyId, symbol)(dispatch);

    expect(result).toEqual(null);
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith({ url, method: 'get', responseType: 'json' });
    expect(dispatch).not.toHaveBeenCalled();
  });
});
