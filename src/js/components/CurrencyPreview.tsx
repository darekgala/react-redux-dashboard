import * as React from 'react';
import { CurrencyType } from '../features/currency/currencyTypes';
import CurrencyPreviewContent from './CurrencyPreviewContent';

export interface FetchPriceHistory {
  (id: string, priceCurrency: string): void
}

interface Props {
  currency: CurrencyType;
  chartId: string;
  fetchCurrencyPriceHistory: FetchPriceHistory;
}

export const CurrencyPreview = ({ currency, chartId, fetchCurrencyPriceHistory }: Props): React.ReactElement => {
  const { name, id, price, history } = currency;

  function handleSelectCurrency(priceCurrency: string) {
    return function onSelectCurrency() {
      return fetchCurrencyPriceHistory(id, priceCurrency);
    };
  }

  return (
    <div>
      <div className="has-text-centered mb-3">
        <strong>{name} ({id})</strong>
      </div>

      {
        price && history ? (
          <CurrencyPreviewContent
            chartId={chartId}
            currency={{ id, price, history }}
            onSelect={handleSelectCurrency}

          />
        ) : <div>Brak danych o kryptowalucie</div>
      }
    </div>
  );
};

export default CurrencyPreview;
