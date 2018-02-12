import React from 'react';
import PropTypes from 'prop-types';
import {connect, DispatchProp} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as coinActionCreators from './../actions/actionCreators';

import {SelectBar} from './../components/SelectBar';
import {Content} from './../components/Content';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.initData();
  }

  selectHandler(value, type) {
    if (type === 'currency') {
      this.props.selectCurrencyAndFetchHistoData(this.props.state.coins.selectedCoin, value);
    } else {
      this.props.selectCoinAndFetchPriceData(value, this.props.state.coins.selectedCurrency);
    }
  }

  render() {
    const coinsState = this.props.state.coins;

    const coinDataState = coinsState.coinData;
    const priceDataState = coinsState.priceData;
    const histoDataState = coinsState.histoData;

    const isDataLoading = coinDataState.isLoading;
    
    const coinsData = coinDataState.values;
    const priceData = priceDataState.values;
    const histoData = histoDataState.values;

    const selectedCoin = coinsState.selectedCoin;
    const selectedCurrency = coinsState.selectedCurrency;
   
    const selectedCoinData = coinsData[selectedCoin] || {};
    const selectedCoinPriceValue = priceData[selectedCurrency];
    const selectedCoinPrice = selectedCoinPriceValue ?
                                {value: selectedCoinPriceValue, currency: selectedCurrency} : {};

    const coinsItems = Object
        .keys(coinsData)
        .map((item) => {
          return {name: coinsData[item].FullName, value:coinsData[item].Symbol}
        });

    const currencyItems = Object
        .keys(priceData)
        .map((item) => {
          return {name: item, value: item}
        });

    const appContent = isDataLoading ? 
      <div className='loading'>
        <div className='icon is-large'>
          <i className="fa fa-spin fa-spinner fas fa-3x" aria-hidden="true"></i>
        </div>
      </div> : 
      <div>
       <div className='level'>
        <div className='level-left'>
          <h1 className='title'>
            Cryptocurrency Dashboard
          </h1>
        </div>
        <div className='level-right'>
          <SelectBar items={coinsItems} selectHandler={this.selectHandler.bind(this)} label={'Choose coin:'} type='coin'/>
          <SelectBar items={currencyItems} selectHandler={this.selectHandler.bind(this)} label={'Choose currency:'} selected={selectedCurrency} type='currency'/>
        </div>
        </div>
        <Content coinData={selectedCoinData} priceData={selectedCoinPrice} histoData={histoData} selectedCoin={selectedCoin}/>
      </div>

    return (
      <div className='wrapper'>
        {appContent}
      </div>
    );
  }
}

App.propTypes = {
  state: PropTypes.object.isRequired,
  fetchCoinData: PropTypes.func.isRequired,
  selectCoinAndFetchPriceData: PropTypes.func.isRequired,
  selectCurrencyAndFetchHistoData: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {state}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(coinActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
