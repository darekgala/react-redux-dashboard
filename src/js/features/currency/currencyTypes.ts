import Status from '../../consts/actions';

export const SET_CURRENCY_STATUS = 'SET_CURRENCY_STATUS';
export const SET_CURRENCIES = 'SET_CURRENCIES';
export const UPDATE_CURRENCY = 'UPDATE_CURRENCY';

export interface PriceType {
  PLN?: number;
  USD?: number;
  EUR?: number;
}

export interface HistoryType {
  close: number;
  high: number;
  low: number;
  open: number;
  time: number;
  volumefrom: number;
  volumeto: number;
}

export interface HistoryObjectType {
  symbol: string,
  data: HistoryType[]
}

export interface CurrencyExtendedType {
  conversion?: PriceType;
  history?: HistoryObjectType;
}

export interface CurrencyType extends CurrencyExtendedType {
  id: string;
  name: string;
  image: string;
  mined: number;
  algorithm: string;
  order: number;
}

export interface CurrencyState {
  status: Status | null,
  data: CurrencyType | null
}

export interface CurrenciesDictionary {
  [index: string]: CurrencyState
}

export interface SetCurrencyStatusAction {
  type: typeof SET_CURRENCY_STATUS,
  payload: { currencyId: string, status: Status }
}

export interface SetCurrenciesAction {
  type: typeof SET_CURRENCIES,
  payload: { currencies: CurrencyType[] }
}

export interface UpdateCurrencyAction {
  type: typeof UPDATE_CURRENCY,
  payload: { currencyId: string, data: CurrencyExtendedType }
}

export type CurrencyAction = SetCurrencyStatusAction | SetCurrenciesAction | UpdateCurrencyAction;
