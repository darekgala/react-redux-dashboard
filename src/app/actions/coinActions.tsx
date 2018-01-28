import axios from 'axios';
import * as actionTypes from './actionTypes';

const requestData = (dataName: string) => {
  return {
    type: actionTypes.REQUEST_DATA,
    dataName
  }
}

const reciveData = (data: any, dataName: string) => {
  return {
    type: actionTypes.RECIVE_DATA,
    payload: data,
    dataName
  }
}

const reciveError = (error: any, dataName: string) => {
  return {
    type: actionTypes.RECIVE_ERROR,
    payload: error,
    dataName
  }
}

export const fetchData = (config: any) => (dispatch: any) => {
  dispatch(requestData(config.dataName));
  return axios({
    url: config.url,
    method: 'get',
    responseType: 'json'
  }).then(response => {
    return dispatch(reciveData(response.data, config.dataName));
  }).catch(error => {
    return dispatch(reciveError(error, config.dataName))
  });
}

export const selectCoin = (selectedCoin: string) => {
  return {
    type: actionTypes.SELECT_COIN,
    payload: selectedCoin
  }
}

export const fetchCoinData = (selectedCoin: string) => (dispatch:any) => {
  dispatch(fetchData(
    {
      url: `https://min-api.cryptocompare.com/data/price?fsym=${selectedCoin}&tsyms=USD,EUR,PLN`,
      dataName: 'priceData',
      headers: {'Access-Control-Allow-Origin': '*'}
    }
  )).then(() => {
    dispatch(selectCoin(selectedCoin));
  });
}

export const selectCurrency = (selectedCurrency: string) => {
  return {
    type: actionTypes.SELECT_CURRENCY,
    payload: selectedCurrency
  }
}