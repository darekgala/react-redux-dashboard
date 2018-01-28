import * as React from 'react';
import {connect, DispatchProp} from 'react-redux';
import {fetchData, fetchCoinData, selectCurrency} from './../actions/coinActions';

import {SelectBar} from './../components/SelectBar';
import {Content} from './../components/Content';

interface ICoinList {
  name: string;
  value: string;
}

interface IProps {
  coins: any;
  fetchCoinData: any;
  selectCurrency: any;
  fetchData: any;
}

class App extends React.Component<IProps & DispatchProp<any>> {
  props: IProps;

  render() {
    const coinsState = this.props.coins;
    const dataState = coinsState.data;

    const selectedCoin = coinsState.selectedCoin;
    const selectedCurrency = coinsState.selectedCurrency;
    
    const isDataLoading = dataState.isLoading;
    const values = dataState.values.Data || {};
    const selectedCoinData = values[selectedCoin];
    const selectedCoinPriceData = coinsState.priceData.values;
    const selectedCoinPriceValue = selectedCoinPriceData[selectedCurrency] || 0;
    const priceData = {value: selectedCoinPriceValue, currency: selectedCurrency};

    const coinsItems: ICoinList[] = Object
        .keys(values)
        .map((item: string) => {
          return {name: values[item].FullName, value:values[item].Symbol}
        });

    const currencyItems: ICoinList[] = Object
        .keys(selectedCoinPriceData)
        .map((item: string) => {
          return {name: item, value: item}
        });

    const appContent = isDataLoading ? 
      <div className='loading'>
        <div className='icon is-large'>
          <i className="fa fa-spin fa-spinner fas fa-3x" aria-hidden="true"></i>
        </div>
      </div> : 
      <div className='container'>
        <Content data={selectedCoinData} priceData={priceData}/>
      </div>

    return (
      <div className='wrapper'>
        <div className='level'>
          <div className='level-left'>
            <h1 className='title'>
              Cryptocurrency Dashboard
            </h1>
          </div>
          <div className='level-right'>
            <SelectBar items={coinsItems} selectHandler={this.props.fetchCoinData} label={'Choose coin:'}/><br />
            <SelectBar items={currencyItems} selectHandler={this.props.selectCurrency} label={'Choose currency:'} selected={selectedCurrency}/>
          </div>
        </div>
        {appContent}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    coins: state.coins
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchData: (config: any) => {
      dispatch(fetchData(config));
    },
    fetchCoinData: (selectedCoin: any) => {
      dispatch(fetchCoinData(selectedCoin));
    },
    selectCurrency: (selectedCurrency: any) => {
      dispatch(selectCurrency(selectedCurrency));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);