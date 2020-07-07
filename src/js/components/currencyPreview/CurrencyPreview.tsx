import React, { ReactElement } from 'react';
import { CurrencyType } from '../../features/currency/currencyTypes';
import CurrencyPreviewContent from './CurrencyPreviewContent';
import { FetchCurrencyPriceHistoryType } from '../../features/currency/currencyActions';
import { AppThunkType } from '../../features/storeType';

interface PropsType {
  currency: CurrencyType;
  chartId: string;
  fetchCurrencyPriceHistory: FetchCurrencyPriceHistoryType;
}

export const CurrencyPreview = ({ currency, chartId, fetchCurrencyPriceHistory }: PropsType): ReactElement => {
  const { name, id, conversion, history } = currency;

  function handleSelectCurrency(symbol: string): AppThunkType {
    return fetchCurrencyPriceHistory(id, symbol);
  }

  return (
    <div>
      <div className="has-text-centered mb-3">
        <strong>{name} ({id})</strong>
      </div>

      {
        conversion && history ? (
          <CurrencyPreviewContent
            chartId={chartId}
            currency={{ id, conversion, history }}
            onConversionSelect={handleSelectCurrency}

          />
        ) : <div>Brak danych</div>
      }
    </div>
  );
};

export default CurrencyPreview;
