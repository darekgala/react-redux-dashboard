import Status from '../../consts/actions';

export const SET_CURRENCIES_STATUS = 'SET_CURRENCIES_STATUS';
export const SET_CURRENCIES_IDS = 'SET_CURRENCIES_IDS';

export interface CurrenciesState {
  status: Status | null,
  currenciesIds: string[] | null
}

export interface SetCurrenciesStatusAction {
  type: typeof SET_CURRENCIES_STATUS,
  payload: { status: Status }
}

export interface SetCurrenciesIdsAction {
  type: typeof SET_CURRENCIES_IDS,
  payload: { currenciesIds: string[] }
}

export type CurrenciesAction = SetCurrenciesStatusAction | SetCurrenciesIdsAction;
