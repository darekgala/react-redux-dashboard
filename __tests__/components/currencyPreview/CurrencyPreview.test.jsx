import React from 'react';
import { shallow } from 'enzyme';
import CurrencyPreview from '../../../src/js/components/currencyPreview/CurrencyPreview';
import CurrencyPreviewContent from '../../../src/js/components/currencyPreview/CurrencyPreviewContent';

describe('<CurrencyPreview />', () => {
  const fetchCurrencyPriceHistory = jest.fn();
  const id = 'BTC';
  const props = {
    currency: {
      id,
      name: 'Bitcoin',
    },
    chartId: 'chartId',
    fetchCurrencyPriceHistory
  };

  it('renders without errors', () => {
    const component = shallow(<CurrencyPreview {...props} />);

    expect(component.find(CurrencyPreviewContent)).toHaveLength(0);
  });

  it('handles fetch currency and history data if conversion is selected', () => {
    const testProps = {
      ...props,
      currency: {
        ...props.currency,
        history: {},
        conversion: {}
      },
    };
    const component = shallow(<CurrencyPreview {...testProps} />);
    const previewContent = component.find(CurrencyPreviewContent);
    const symbol = 'USD';

    previewContent.props().onConversionSelect(symbol);

    expect(fetchCurrencyPriceHistory).toHaveBeenCalledWith(id, symbol);
  });
});
