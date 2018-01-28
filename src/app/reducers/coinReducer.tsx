import initialState from './../initialState';
import * as actionTypes from './../actions/actionTypes';

export default function coinsReducer(state: any = initialState, action: any) {
  if (action.type === actionTypes.REQUEST_DATA) {
    const stateCopy = Object.assign({}, state);
    stateCopy[action.dataName] = {
      isLoading: true,
      error: true,
      values: {}
    }

    state = stateCopy;
  }

  if (action.type === actionTypes.RECIVE_DATA) {
    const stateCopy = Object.assign({}, state);
    stateCopy[action.dataName] = {
      isLoading: false,
      error: false,
      values: action.payload
    }
    
    state = stateCopy;
  }
  
  if (action.type === actionTypes.RECIVE_ERROR) {
    const stateCopy = Object.assign({}, state);
    stateCopy[action.dataName] = {
      isLoading: false,
      error: true,
      values: action.payload
    }
  }
  
  if (action.type === actionTypes.SELECT_COIN) {
    state = {
      ...state,
      selectedCoin: action.payload
    }
  }

  if (action.type === actionTypes.SELECT_CURRENCY) {
    debugger;
    state = {
      ...state,
      selectedCurrency: action.payload
    }
  }

  return state;
}