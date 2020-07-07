import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import CurrenciesListItem from '../../../src/js/components/currenciesList/CurrenciesListItem';

describe('<CurrenciesListItem />', () => {
  const props = {
    currency: {
      name: 'Bitcoin',
      id: 'BTC',
      image: 'image',
      mined: 123,
      algorithm: 'algorithm'
    }
  };

  it('renders without errors', () => {
    const component = shallow(<CurrenciesListItem {...props} />);

    expect(component.find(Link)).toHaveLength(1);
    expect(component.find('li')).toHaveLength(1);
    expect(component.find('img')).toHaveLength(1);
  });
});
