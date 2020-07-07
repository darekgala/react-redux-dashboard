import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { CurrenciesState } from './currencies/currenciesTypes';
import { CurrenciesDictionary } from './currency/currencyTypes';

export interface StoreType {
  currencies: CurrenciesState,
  currency: CurrenciesDictionary
}

export type AppThunkType<ReturnType = void> =
  ThunkAction<ReturnType, StoreType, unknown, Action<string>>;

export type AppDispatchType<ReturnType = void> =
  ThunkDispatch<StoreType, unknown, Action<string>>
