import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter, Link } from 'react-router-dom';
import App from '../src/js/App';
import Routes from '../src/js/Routes';

describe('<App />', () => {
  it('renders without errors', () => {
    const component = shallow(<App />);

    expect(component.find(BrowserRouter)).toHaveLength(1);
    expect(component.find(Link)).toHaveLength(1);
    expect(component.find(Routes)).toHaveLength(1);
  });
});
