import { StoreType } from '../storeType';
import Status from '../../consts/actions';
import { CurrenciesState } from './currenciesTypes';

export const getCurrenciesState = (state: StoreType): CurrenciesState | null => (
  state.currencies || null
);

export const getCurrenciesStatus = (state: StoreType): Status | null => {
  const currenciesState: CurrenciesState | null = getCurrenciesState(state);

  if (currenciesState) {
    return currenciesState.status || null;
  }

  return null;
};

export const getCurrenciesIds = (state: StoreType): string[] | null => {
  const currenciesState: CurrenciesState | null = getCurrenciesState(state);

  if (currenciesState) {
    return currenciesState.currenciesIds || null;
  }

  return null;
};
