import * as React from 'react';
import CurrencyContainer from '../containers/CurrencyContainer';
import CurrenciesListItem from './CurrenciesListItem';
import { CurrencyType } from '../features/currency/currencyTypes';

interface Props {
  currencies: CurrencyType[];
  currencyId?: string;
  push: void & ((path: string) => void);
}

export const CurrenciesList = ({ currencies, currencyId, push }: Props): React.ReactElement => {
  const itemsPerPage = 5;
  const selectedCurrencyIndex = currencies.findIndex((currency) => currency.id === currencyId);
  const initialSelectedPage = selectedCurrencyIndex >= 0 ? Math.ceil((selectedCurrencyIndex + 1) / itemsPerPage) : 1;
  const [selectedPage, setSelectedPage] = React.useState(initialSelectedPage);
  const numberOfPages = Math.floor(currencies.length / itemsPerPage);
  const pageNumbers = Array(numberOfPages).fill(1).map((number, index) => index + 1);

  function handlePageChange(number: number) {
    return function onPageChange() {
      return setSelectedPage(number);
    };
  }

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
                <CurrenciesListItem currency={currency} key={currency.id} />
              ))
          }
        </ul>
        <nav className="pagination is-centered" role="navigation" aria-label="pagination">
          <ul className="pagination-list">
            {
              pageNumbers.map((pageNumber) => (
                <li
                  onClick={handlePageChange(pageNumber)}
                  key={pageNumber}
                >
                  <div
                    className={`${pageNumber === selectedPage ? 'is-current' : ''} pagination-link`}
                    aria-label={`Goto page ${pageNumber}`}
                  >
                    {pageNumber}
                  </div>
                </li>
              ))
            }

          </ul>
        </nav>
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
