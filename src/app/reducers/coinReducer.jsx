import initialState from './../initialState';
import * as actionTypes from './../actions/actionTypes';

export default function coinsReducer(state = initialState, action) {
  if (action.type === actionTypes.REQUEST_DATA) {
    const stateCopy = state;
    stateCopy[action.dataName] = {
      isLoading: true,
      error: false,
      values: {}
    }

    state = {
      ...stateCopy
    };
  }

  if (action.type === actionTypes.RECIVE_DATA) {
    const stateCopy = state;
    stateCopy[action.dataName] = {
      isLoading: false,
      error: false,
      values: action.payload
    }

    state = {
      ...stateCopy
    };
  }
  
  if (action.type === actionTypes.RECIVE_ERROR) {
    const stateCopy = state;
    stateCopy[action.dataName] = {
      isLoading: false,
      error: true,
      values: action.payload
    }

    state = {
      ...stateCopy
    }
  }
  
  if (action.type === actionTypes.SELECT_COIN) {
    state = {
      ...state,
      selectedCoin: action.payload
    }
  }

  if (action.type === actionTypes.SELECT_CURRENCY) {
    state = {
      ...state,
      selectedCurrency: action.payload
    }
  }

  return state;
}
