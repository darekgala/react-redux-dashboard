import React, { ReactElement } from 'react';

export interface CurrencyConversionClickHandlerType {
  (symbol: string): void
}

interface PropsType {
  symbol: string;
  abbr: ReactElement;
  selected: boolean;
  value?: number
  onClick: CurrencyConversionClickHandlerType
}

export const CurrencyConversionPickerItem = ({ symbol, abbr, value, selected, onClick }: PropsType): ReactElement => {
  function handleSelect() {
    return onClick(symbol);
  }

  return (
    <div
      className="column is-one-third has-text-centered"
      onClick={handleSelect}
    >
      <div
        className={`
          py-2
          currency-selector
          ${selected ? 'currency-selector--selected' : ''}
          ${selected ? 'has-background-warning' : ''}
        `}
      >
        {
          value ? (
            <span>
              {value.toFixed(2)} <span>{abbr}</span>
            </span>
          ) : '-'
        }
      </div>
    </div>
  );
};

export default CurrencyConversionPickerItem;
