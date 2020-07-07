import currenciesReducer from '../../../src/js/features/currencies/currenciesReducer';
import { setCurrenciesStatus, setCurrenciesIds } from '../../../src/js/features/currencies/currenciesActions';

describe('currenciesReducer()', () => {
  it('returns default state', () => {
    expect(currenciesReducer(undefined, {})).toEqual({ currenciesIds: null, status: null });
  });

  it('returns proper state after set status action', () => {
    const status = 'status';
    const expectedState = { status };

    expect(currenciesReducer({}, setCurrenciesStatus(status))).toEqual(expectedState);
  });

  it('returns proper state after set currenciesIds action', () => {
    const currencies = [{ id: 1 }, { id: 2 }];
    const expectedState = { currenciesIds: [1, 2] };

    expect(currenciesReducer({}, setCurrenciesIds(currencies))).toEqual(expectedState);
  });
});
