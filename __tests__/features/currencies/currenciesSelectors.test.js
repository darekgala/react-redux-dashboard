import {
  getCurrenciesState, getCurrenciesStatus, getCurrenciesIds
} from '../../../src/js/features/currencies/currenciesSelectors';

describe('getCurrenciesState()', () => {
  it('returns null if state is not specified', () => {
    expect(getCurrenciesState({})).toEqual(null);
  });

  it('returns currencies state', () => {
    const currencies = {};
    expect(getCurrenciesState({ currencies })).toEqual(currencies);
  });
});

describe('getCurrenciesStatus()', () => {
  it('returns null if currencies state is not specified', () => {
    expect(getCurrenciesStatus({})).toEqual(null);
  });

  it('returns null if currencies status is not specified', () => {
    expect(getCurrenciesStatus({ currencies: {} })).toEqual(null);
  });

  it('returns status from state', () => {
    const status = 'status';

    expect(getCurrenciesStatus({ currencies: { status } })).toEqual(status);
  });
});

describe('getCurrenciesIds()', () => {
  it('returns null if currencies state is not specified', () => {
    expect(getCurrenciesIds({})).toEqual(null);
  });

  it('returns null if currencies ids are not specified', () => {
    expect(getCurrenciesIds({ currencies: {} })).toEqual(null);
  });

  it('returns status from state', () => {
    const currenciesIds = [1, 2];

    expect(getCurrenciesIds({ currencies: { currenciesIds } })).toEqual(currenciesIds);
  });
});
