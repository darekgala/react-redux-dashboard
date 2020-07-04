import * as React from 'react';
import Chart from './Chart';
import { PriceType, HistoryObjectType } from '../features/currency/currencyTypes';

interface OnSelect {
  (key: string): (event: React.MouseEvent) => void
}

interface Currency {
  id: string;
  price: PriceType;
  history: HistoryObjectType;
}

interface Props {
  chartId: string,
  onSelect: OnSelect,
  currency: Currency
}

export const CurrencyPreviewContent = ({ chartId, onSelect, currency }: Props): React.ReactElement => {
  const { id, history, price } = currency;
  const { currency: priceCurrency } = history;

  const PRICES = [
    { key: 'PLN', abbr: (<span>zł</span>) },
    { key: 'EUR', abbr: (<span>&#x20AC;</span>) },
    { key: 'USD', abbr: (<span>&#36;</span>) },
  ];

  return (
    <React.Fragment>
      <div className="columns mb-2">
        {
          PRICES.map((singlePrice) => {
            const { key, abbr } = singlePrice;

            return (
              <div
                className="column is-one-third has-text-centered"
                onClick={onSelect(key)}
              >
                <div
                  className={`
                    py-2
                    currency-selector
                    ${key === priceCurrency ? 'currency-selector--selected' : ''}
                    ${key === priceCurrency ? 'has-background-warning' : ''}
                  `}
                  key={key}
                >
                  {price[key].toFixed(2)} {abbr}
                </div>
              </div>
            );
          })
        }
      </div>

      <Chart
        currencyId={id}
        history={history.data}
        chartId={`${id}-${chartId}`}
        key={priceCurrency}
      />
    </React.Fragment>
  );
};

export default CurrencyPreviewContent;
