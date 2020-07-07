import {
  getCurrencyState,
  getCurrencyStatusById,
  getCurrencyById,
  getCurrenciesByIds,
  getCurrencies
} from '../../../src/js/features/currency/currencySelectors';

describe('getCurrencyState()', () => {
  it('returns proper currency state', () => {
    expect(getCurrencyState({})).toEqual(null);
    expect(getCurrencyState({ currency: {} })).toEqual({});
  });
});

describe('getCurrencyStatusById()', () => {
  it('returns proper currency status', () => {
    expect(getCurrencyStatusById({})).toEqual(null);
    expect(getCurrencyStatusById({ currency: {} }, 123)).toEqual(null);

    const currencyId = 123;
    const status = 'status';
    expect(getCurrencyStatusById({ currency: { [currencyId]: {} } }, currencyId))
      .toEqual(null);
    expect(getCurrencyStatusById({ currency: { [currencyId]: { status } } }, currencyId))
      .toEqual(status);
  });
});

describe('getCurrencyById()', () => {
  it('returns proper currency data', () => {
    expect(getCurrencyById({})).toEqual(null);
    expect(getCurrencyById({ currency: {} }, 123)).toEqual(null);

    const currencyId = 123;
    const data = { id: currencyId };
    expect(getCurrencyById({ currency: { [currencyId]: {} } }, currencyId))
      .toEqual(null);
    expect(getCurrencyById({ currency: { [currencyId]: { data } } }, currencyId))
      .toEqual(data);
  });
});

describe('getCurrenciesByIds()', () => {
  it('returns proper currencies', () => {
    expect(getCurrenciesByIds({})).toEqual(null);
    expect(getCurrenciesByIds({ currency: {} })).toEqual(null);

    const currencyId = 123;
    const currency = { id: currencyId };
    const ids = [currencyId, 1];
    const state = { currency: { [currencyId]: { data: currency } } };
    expect(getCurrenciesByIds(state, ids)).toEqual([currency]);
  });
});

describe('getCurrencies()', () => {
  it('returns proper currencies', () => {
    expect(getCurrencies({})).toEqual(null);

    const firstId = 1;
    const secondId = 2;
    const currenciesIds = [firstId, secondId];

    expect(getCurrencies({ currencies: { currenciesIds } })).toEqual(null);

    const firstCurrency = { id: firstId, name: 'BTC', order: 2 };
    const secondCurrency = { id: secondId, name: 'ETH', order: 1 };
    const state = {
      currency: {
        [firstId]: { data: firstCurrency },
        [secondId]: { data: secondCurrency }
      },
      currencies: { currenciesIds }
    };
    expect(getCurrencies(state)).toEqual([secondCurrency, firstCurrency]);
  });
});
