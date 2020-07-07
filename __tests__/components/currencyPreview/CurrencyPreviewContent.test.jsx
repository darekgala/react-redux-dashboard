import React from 'react';
import { shallow } from 'enzyme';
import CurrencyPreviewContent, { CONVERSIONS }
  from '../../../src/js/components/currencyPreview/CurrencyPreviewContent';
import CurrencyConversionPickerItem
  from '../../../src/js/components/currencyPreview/CurrencyConversionPickerItem';
import Chart from '../../../src/js/components/Chart';

describe('<CurrencyPreviewContent />', () => {
  const props = {
    chartId: 'chartId',
    onConversionSelect: jest.fn(),
    currency: {
      id: 'BTC',
      history: {
        symbol: 'PLN',
        data: [{ time: 123, close: 123 }]
      },
      conversion: { PLN: 123 }
    }
  };

  it('renders without errors', () => {
    const component = shallow(<CurrencyPreviewContent {...props} />);

    expect(component.find(CurrencyConversionPickerItem)).toHaveLength(CONVERSIONS.length);
    expect(component.find(Chart)).toHaveLength(1);
  });
});
