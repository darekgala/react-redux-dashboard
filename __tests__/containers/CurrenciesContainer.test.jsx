import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import CurrenciesContainerConnected, { CurrenciesContainer } from '../../src/js/containers/CurrenciesContainer';
import Status from '../../src/js/consts/actions';
import CurrenciesList from '../../src/js/components/currenciesList/CurrenciesList';
import { getCurrenciesStatus } from '../../src/js/features/currencies/currenciesSelectors';
import { getCurrencies } from '../../src/js/features/currency/currencySelectors';
import { fetchCurrencies } from '../../src/js/features/currencies/currenciesActions';

jest.mock('../../src/js/features/currencies/currenciesSelectors');
jest.mock('../../src/js/features/currencies/currenciesActions');
jest.mock('../../src/js/features/currency/currencySelectors');

const props = {
  fetchCurrencies: jest.fn(),
  currencies: null,
  history: { push: jest.fn() },
  match: { params: {} }
};

describe('<CurrenciesContainer />', () => {
  it('renders loading if status is not specified', () => {
    const component = shallow(<CurrenciesContainer {...props} />);

    expect(component.find('.loading')).toHaveLength(1);
    expect(component.find(CurrenciesList)).toHaveLength(0);
  });

  it('renders error if status is error', () => {
    const testProps = {
      ...props,
      status: Status.FAILURE

    };
    const component = shallow(<CurrenciesContainer {...testProps} />);

    expect(component.find('div')).toHaveLength(1);
    expect(component.find(CurrenciesList)).toHaveLength(0);
  });

  it('not renders <CurrenciesList /> if status is success and currencies array is not specified ', () => {
    const testProps = {
      ...props,
      status: Status.SUCCESS

    };
    const component = shallow(<CurrenciesContainer {...testProps} />);

    expect(component.find('div')).toHaveLength(0);
    expect(component.find(CurrenciesList)).toHaveLength(0);
  });

  it('renders <CurrenciesList /> if status is success and currencies array is specified ', () => {
    const testProps = {
      ...props,
      currencies: [{ id: 'BTC' }],
      status: Status.SUCCESS
    };
    const component = shallow(<CurrenciesContainer {...testProps} />);

    expect(component.find(CurrenciesList)).toHaveLength(1);
  });
});

describe('<CurrenciesContainerConnected />', () => {
  const state = Symbol('store');
  const store = { getState: () => state, subscribe: () => null, dispatch: () => null };
  const history = createBrowserHistory();
  const status = Status.SUCCESS;
  const currencies = [{ id: 'BTC' }];

  getCurrenciesStatus.mockReturnValueOnce(status);
  getCurrencies.mockReturnValueOnce(currencies);

  it('renders without errors', () => {
    const component = mount(
      <Provider store={store}>
        <Router history={history}>
          <CurrenciesContainerConnected {...props} />
        </Router>
      </Provider>
    );

    const containerProps = component.find(CurrenciesContainer).props();

    expect(containerProps.status).toEqual(status);
    expect(containerProps.currencies).toEqual(currencies);
    expect(component.find(CurrenciesList)).toHaveLength(1);
    expect(fetchCurrencies).toHaveBeenCalled();
    expect(getCurrenciesStatus).toHaveBeenCalledWith(state);
    expect(getCurrencies).toHaveBeenCalledWith(state);
  });
});
