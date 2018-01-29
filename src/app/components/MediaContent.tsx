import * as React from 'react';

export const MediaContent = (props: any) => {
  return (
    <div>
      <h5><strong>Symbol</strong>: {props.coinData.Name}</h5>
      <h5><strong>Full name</strong>: {props.coinData.CoinName}</h5>
      <h5><strong>Algorithm</strong>: {props.coinData.Algorithm}</h5>
      <h5><strong>Price</strong>: {props.priceData.value} {props.priceData.currency}</h5>
      <h5><strong><a href={`https://www.cryptocompare.com${props.coinData.Url}`} target='_blank'>More info</a></strong></h5>
    </div>
  )
}

