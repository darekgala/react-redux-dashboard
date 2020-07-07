import React from 'react';
import { shallow } from 'enzyme';
import CurrencyConversionPickerItem
  from '../../../src/js/components/currencyPreview/CurrencyConversionPickerItem';

describe('<CurrencyConversionPickerItem />', () => {
  const onClick = jest.fn();
  const symbol = 'USD';
  const props = {
    symbol,
    abbr: <span>$</span>,
    selected: false,
    onClick
  };

  it('renders without errors', () => {
    const component = shallow(<CurrencyConversionPickerItem {...props} />);

    expect(component.find('span')).toHaveLength(0);
  });

  it('calls onClick if item is clicked', () => {
    const testProps = {
      ...props,
      value: 12.34,
      selected: true
    };
    const component = shallow(<CurrencyConversionPickerItem {...testProps} />);

    component.find('div').at(0).props().onClick();

    expect(onClick).toHaveBeenCalledWith(symbol);
  });
});
