import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers/index';

export default function cofigureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  );
}