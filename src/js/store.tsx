import {
  createStore,
  compose,
  applyMiddleware,
  Store,
  combineReducers
} from 'redux';
import { callEffectMiddleware } from 'redux-call-effect';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { StoreType } from './features/storeType';
import currenciesReducer from './features/currencies/currenciesReducer';
import currencyReducer from './features/currency/currencyReducer';

function createClientStore(): Store<StoreType> {
  const composeEnhancer = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

  return createStore(
    combineReducers({
      currencies: currenciesReducer,
      currency: currencyReducer
    }),
    composeEnhancer(applyMiddleware(
      callEffectMiddleware,
      thunk,
      logger
    ))
  );
}

export default createClientStore;
