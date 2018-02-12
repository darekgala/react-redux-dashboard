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
    payload: data.Data || data,
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

export const selectCoin = (selectedCoin: string) => {
  return {
    type: actionTypes.SELECT_COIN,
    payload: selectedCoin
  }
}

export const selectCurrency = (selectedCurrency: string) => {
  return {
    type: actionTypes.SELECT_CURRENCY,
    payload: selectedCurrency
  }
}

const fetchData = (config: any) => (dispatch: any) => {
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

export const fetchCoinData = () => (dispatch: any) => {
  return dispatch(
    fetchData({
      url: 'https://min-api.cryptocompare.com/data/all/coinlist',
      dataName: 'coinData',
      headers: {'Access-Control-Allow-Origin': '*'}
    })
  )
}

const fetchPriceData = (selectedCoin: string) => (dispatch: any) => {
  return dispatch(fetchData({
    url: `https://min-api.cryptocompare.com/data/price?fsym=${selectedCoin}&tsyms=USD,EUR,PLN`,
    dataName: 'priceData',
    headers: {'Access-Control-Allow-Origin': '*'}
  }));
}

const fetchHistoData = (selectedCoin: string, selectedCurrency: string) => (dispatch:any) => {
  return dispatch(fetchData({
    url: `https://min-api.cryptocompare.com/data/histoday?fsym=${selectedCoin}&tsym=${selectedCurrency}&limit=60&aggregate=3&e=CCCAGG`,
    dataName: 'histoData',
    headers: {'Access-Control-Allow-Origin': '*'}
  }));
}

export const selectCurrencyAndFetchHistoData = (selectedCoin: string, selectedCurrency: string) => (dispatch:any) => {
  return dispatch(fetchHistoData(selectedCoin, selectedCurrency))
  .then(() => {
    dispatch(selectCurrency(selectedCurrency));
  });
}

export const selectCoinAndFetchPriceData = (selectedCoin: string, selectedCurrency: string) => (dispatch:any) => {
  return dispatch(fetchPriceData(selectedCoin))
  .then(() => {
    return dispatch(fetchHistoData(selectedCoin, selectedCurrency))
  })
  .then(() => {
    dispatch(selectCoin(selectedCoin));
    dispatch(selectCurrency(selectedCurrency));
  });
}

export const initData = () => (dispatch: any) => {
  return dispatch(
    fetchCoinData()
  ).then((response: any) => {
      const initialCoinSymbol = Object.keys(response.payload)[0];
      return dispatch(selectCoinAndFetchPriceData(initialCoinSymbol, 'USD'));
    }
  ).catch((error: any)=> {
    console.log(error);
  });
}
