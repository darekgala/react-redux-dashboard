import React from 'react';
import { mount } from 'enzyme';
import Highcharts from 'highcharts';
import Chart from '../../src/js/components/Chart';

jest.mock('highcharts', () => ({
  __esModule: true,
  default: { chart: jest.fn() },
}));

describe('<Chart />', () => {
  it('renders without errors', () => {
    const props = {
      currencyId: 'BTC',
      history: [{ time: 123, close: 123 }],
      chartId: 'id'
    };
    const component = mount(<Chart {...props} />);

    expect(component.children).toHaveLength(1);
    expect(Highcharts.chart).toHaveBeenCalled();
  });
});
