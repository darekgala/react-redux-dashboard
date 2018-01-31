import React from 'react';
import {Image} from './Image';
import {MediaContent} from './MediaContent';
import Chart from './Chart';

export const Content = (props) => {
  
  return (
    <div className='container'>
    {
      <div className='media'>
        <div className='media-left'>
          {props.coinData.ImageUrl && <Image src={`https://www.cryptocompare.com${props.coinData.ImageUrl}`} />}
        </div>
        <div className="media-content">
          <div className="content">
            <MediaContent coinData={props.coinData} priceData={props.priceData}/>
          </div>
        </div>
        <div className='media-right'>
          <div id='container'></div>
          <Chart histoData={props.histoData} selectedCoin={props.selectedCoin}/>
        </div>
        
      </div>
    }
    </div>
  );
}
