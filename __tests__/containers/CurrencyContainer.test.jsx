import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import CurrencyPreview from '../../src/js/components/currencyPreview/CurrencyPreview';
import CurrencyContainerConnected, { CurrencyContainer } from '../../src/js/containers/CurrencyContainer';
import { fetchCurrencyPrice } from '../../src/js/features/currency/currencyActions';
import { getCurrencyById, getCurrencyStatusById } from '../../src/js/features/currency/currencySelectors';
import Status from '../../src/js/consts/actions';

jest.mock('../../src/js/features/currency/currencySelectors');
jest.mock('../../src/js/features/currency/currencyActions');

const push = jest.fn();
const currencyId = 'BTC';
const props = {
  fetchCurrencyPrice: jest.fn(),
  fetchCurrencyPriceHistory: jest.fn(),
  currency: null,
  currencyId,
  push
};

describe('<CurrencyContainer />', () => {
  it('renders loading if status is not specified', () => {
    const component = shallow(<CurrencyContainer {...props} />);

    expect(component.find(CurrencyPreview)).toHaveLength(0);
  });
});

describe('<CurrencyContainerConnected />', () => {
  const history = createBrowserHistory();
  const state = Symbol('store');
  const store = { getState: () => state, subscribe: () => null, dispatch: () => null };

  beforeEach(() => {
    getCurrencyStatusById.mockClear();
    getCurrencyById.mockClear();
  });

  it('renders if status is in progress', () => {
    getCurrencyStatusById.mockReturnValueOnce(Status.IN_PROGRESS);
    getCurrencyById.mockReturnValueOnce(null);

    const component = mount(
      <Provider store={store}>
        <Router history={history}>
          <CurrencyContainerConnected {...props} />)
        </Router>
      </Provider>
    );

    component.update();

    expect(component.find('.loading')).toHaveLength(2);
    expect(component.find(CurrencyPreview)).toHaveLength(0);
    expect(getCurrencyStatusById).toHaveBeenCalledWith(state, currencyId);
    expect(getCurrencyById).toHaveBeenCalledWith(state, currencyId);
    expect(fetchCurrencyPrice).toHaveBeenCalledWith(currencyId);
  });

  it('renders if status is failure', () => {
    getCurrencyStatusById.mockReturnValueOnce(Status.FAILURE);
    getCurrencyById.mockReturnValueOnce(null);

    const component = mount(
      <Provider store={store}>
        <Router history={history}>
          <CurrencyContainerConnected {...props} />)
        </Router>
      </Provider>
    );

    component.update();

    expect(component.find('.loading')).toHaveLength(0);
    expect(component.find(CurrencyPreview)).toHaveLength(0);
    expect(getCurrencyStatusById).toHaveBeenCalledWith(state, currencyId);
    expect(getCurrencyById).toHaveBeenCalledWith(state, currencyId);
    expect(fetchCurrencyPrice).toHaveBeenCalledWith(currencyId);
  });

  it('renders <CurrencyPreview /> if status is success', () => {
    getCurrencyStatusById.mockReturnValueOnce(Status.SUCCESS);
    getCurrencyById.mockReturnValueOnce({ id: 'BTC' });

    const component = mount(
      <Provider store={store}>
        <Router history={history}>
          <CurrencyContainerConnected {...props} />)
        </Router>
      </Provider>
    );

    component.update();
    component.find('button').at(0).props().onClick();

    expect(component.find('.loading')).toHaveLength(0);
    expect(component.find(CurrencyPreview)).toHaveLength(2);
    expect(getCurrencyStatusById).toHaveBeenCalledWith(state, currencyId);
    expect(getCurrencyById).toHaveBeenCalledWith(state, currencyId);
    expect(fetchCurrencyPrice).toHaveBeenCalledWith(currencyId);
    expect(push).toHaveBeenCalledWith('/');
  });
});
