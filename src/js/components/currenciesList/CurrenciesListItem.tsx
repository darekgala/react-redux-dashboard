import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { CurrencyType } from '../../features/currency/currencyTypes';

interface PropsType {
  currency: CurrencyType;
}

export const CurrenciesListItem = ({ currency }: PropsType): ReactElement => {
  const { name, id, image, mined, algorithm } = currency;

  return (
    <Link to={`/currencies/${id}`}>
      <li className="mb-5">
        <article className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img src={`https://www.cryptocompare.com${image}`} alt={name} />
            </p>
          </figure>

          <div className="media-content">
            <div className="box">
              <div className="content">
                <div><strong>{name} ({id})</strong></div>
                <div>Algorithm: {algorithm}</div>
                <div>Mined: {mined}</div>
              </div>
            </div>
          </div>
        </article>
      </li>
    </Link>
  );
};

export default CurrenciesListItem;
