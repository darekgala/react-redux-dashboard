import React, { useState, ReactElement } from 'react';
import CurrencyContainer from '../../containers/CurrencyContainer';
import CurrenciesListItem from './CurrenciesListItem';
import { CurrencyType } from '../../features/currency/currencyTypes';
import Pagination from '../pagination/Pagination';

interface PropsType {
  currencies: CurrencyType[];
  currencyId?: string;
  push: void & ((path: string) => void);
}

export const CurrenciesList = ({ currencies, currencyId, push }: PropsType): ReactElement => {
  const itemsPerPage = 5;
  const selectedCurrencyIndex = currencies.findIndex((currency) => currency.id === currencyId);
  const initialSelectedPage = selectedCurrencyIndex >= 0 ? Math.ceil((selectedCurrencyIndex + 1) / itemsPerPage) : 1;
  const [selectedPage, setSelectedPage] = useState(initialSelectedPage);
  const numberOfPages = Math.floor(currencies.length / itemsPerPage);

  return (
    <div className="columns">
      <div
        className={`column ${
          currencyId ? 'is-half-desktop' : 'is-offset-one-quarter is-half'
        } mb-6`}
      >
        <ul>
          {
            [...currencies]
              .splice((selectedPage - 1) * itemsPerPage, itemsPerPage)
              .map((currency) => (
                <CurrenciesListItem
                  currency={currency}
                  key={currency.id}
                />
              ))
          }
        </ul>

        <Pagination
          numberOfPages={numberOfPages}
          selectedPage={selectedPage}
          onPageChange={setSelectedPage}
        />
      </div>

      {
        currencyId && (
          <CurrencyContainer
            currencyId={currencyId}
            push={push}
            key={currencyId}
          />
        )
      }
    </div>
  );
};

export default CurrenciesList;
