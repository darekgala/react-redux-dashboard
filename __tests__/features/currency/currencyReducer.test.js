import currencyReducer from '../../../src/js/features/currency/currencyReducer';
import { setCurrencyStatus, setCurrencies, updateCurrency } from '../../../src/js/features/currency/currencyActions';

describe('currencyReducer()', () => {
  it('returns default state', () => {
    expect(currencyReducer(undefined, {})).toEqual({});
  });

  it('returns proper state after set status action', () => {
    const status = 'status';
    const currencyId = 123;
    const expectedState = { [currencyId]: { status } };

    expect(currencyReducer({}, setCurrencyStatus(currencyId, status))).toEqual(expectedState);
  });

  it('returns proper state after set currencies action', () => {
    const currency = { id: 1, name: 'currency' };
    const currencies = [currency];
    const expectedState = { [currency.id]: { status: null, data: currency } };

    expect(currencyReducer({}, setCurrencies(currencies))).toEqual(expectedState);
  });

  it('returns proper state after update currency action', () => {
    const currencyId = 123;
    const data = { conversion: { USD: 213 } };
    const state = { [currencyId]: { status: null, data: { id: currencyId } } };
    const expectedState = { [currencyId]: { status: null, data: { id: currencyId, ...data } } };

    expect(currencyReducer(state, updateCurrency(currencyId, data))).toEqual(expectedState);
  });

  it('returns proper state after update currency action when data is not specified', () => {
    const currencyId = 123;
    const data = { conversion: { USD: 213 } };
    const state = { [currencyId]: { status: null, data: null } };

    expect(currencyReducer(state, updateCurrency(currencyId, data))).toEqual(state);
  });
});
