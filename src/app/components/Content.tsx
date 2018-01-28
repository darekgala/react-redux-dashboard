import * as React from 'react';

export const Content = (props: any) => {
  return (
    <div className='container'>
    {props.data && <div className='media'>
        <figure className='media-left'>
          <img className='image' src={`https://www.cryptocompare.com${props.data.ImageUrl}`}/>
        </figure>
        <div className="media-content">
          <div className="content">
            <h5><strong>Symbol</strong>: {props.data.Name}</h5>
            <h5><strong>Full name</strong>: {props.data.CoinName}</h5>
            <h5><strong>Algorithm</strong>: {props.data.Algorithm}</h5>
            <h5><strong>Price</strong>: {props.priceData.value} {props.priceData.currency}</h5>
            <h5><strong><a href={`https://www.cryptocompare.com${props.data.Url}`} target='_blank'>More info</a></strong></h5>
          </div>
        </div>
      </div>}
    </div>
  );
}


