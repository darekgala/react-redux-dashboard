import React, { ReactElement, Fragment } from 'react';
import Chart from '../Chart';
import { HistoryObjectType, PriceType } from '../../features/currency/currencyTypes';
import CurrencyConversionPickerItem, { CurrencyConversionClickHandlerType } from './CurrencyConversionPickerItem';

interface PropsType {
  chartId: string,
  onConversionSelect: CurrencyConversionClickHandlerType,
  currency: {
    id: string,
    history: HistoryObjectType,
    conversion: PriceType
  }
}

export const CONVERSIONS = [
  { symbol: 'PLN', abbr: (<span>zł</span>) },
  { symbol: 'EUR', abbr: (<span>&#x20AC;</span>) },
  { symbol: 'USD', abbr: (<span>&#36;</span>) },
];

export const CurrencyPreviewContent = ({ chartId, onConversionSelect, currency }: PropsType): ReactElement => {
  const { id, history, conversion } = currency;
  const { data } = history;

  return (
    <Fragment>
      <div className="columns mb-2">
        {
          CONVERSIONS.map(({ symbol, abbr }) => (
            <CurrencyConversionPickerItem
              value={conversion[symbol]}
              symbol={symbol}
              abbr={abbr}
              selected={symbol === history.symbol}
              onClick={onConversionSelect}
              key={symbol}
            />
          ))
        }
      </div>

      <Chart
        currencyId={id}
        history={data}
        chartId={`${id}-${chartId}`}
        key={history.symbol}
      />
    </Fragment>
  );
};

export default CurrencyPreviewContent;
