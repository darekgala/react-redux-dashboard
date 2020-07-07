import React from 'react';
import { shallow } from 'enzyme';
import CurrenciesList from '../../../src/js/components/currenciesList/CurrenciesList';
import CurrenciesListItem from '../../../src/js/components/currenciesList/CurrenciesListItem';
import Pagination from '../../../src/js/components/pagination/Pagination';
import CurrencyContainer from '../../../src/js/containers/CurrencyContainer';

describe('<CurrenciesList />', () => {
  const currencies = [
    { id: 'BTC' }, { id: 'ETH' }
  ];
  const props = {
    currencies,
    push: jest.fn()
  };

  it('renders without errors', () => {
    const component = shallow(<CurrenciesList {...props} />);

    expect(component.find(CurrenciesListItem)).toHaveLength(currencies.length);
    expect(component.find(Pagination)).toHaveLength(1);
    expect(component.find(CurrencyContainer)).toHaveLength(0);
  });

  it('renders <CurrencyContainer /> if currency is selected', () => {
    const testProps = {
      ...props,
      currencyId: 'BTC'
    };
    const component = shallow(<CurrenciesList {...testProps} />);

    expect(component.find(CurrenciesListItem)).toHaveLength(currencies.length);
    expect(component.find(Pagination)).toHaveLength(1);
    expect(component.find(CurrencyContainer)).toHaveLength(1);
  });
});
