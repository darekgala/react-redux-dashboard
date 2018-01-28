import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './stores/mainStore';
import App from './containers/App';
import { fetchData, fetchCoinData} from './actions/coinActions';

const store = configureStore();
store.dispatch(fetchData(
  {
    url: 'https://min-api.cryptocompare.com/data/all/coinlist',
    dataName: 'data',
    headers: {'Access-Control-Allow-Origin': '*'}
  }
)).then(action => {
  const initialCoinSymbol = Object.keys(action.payload.Data)[0];
  store.dispatch(fetchCoinData(initialCoinSymbol));
}).catch(error => {
  console.log(error);
})


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app') as HTMLElement
);




