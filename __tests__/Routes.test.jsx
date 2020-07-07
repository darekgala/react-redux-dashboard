import React from 'react';
import { shallow } from 'enzyme';
import { Switch, Route } from 'react-router';
import Routes from '../src/js/Routes';

describe('<Routes />', () => {
  it('renders without errors', () => {
    const component = shallow(<Routes />);

    expect(component.find(Switch)).toHaveLength(1);
    expect(component.find(Route)).toHaveLength(2);
  });
});
