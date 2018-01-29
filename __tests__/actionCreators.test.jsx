import {} from 'jest';
import * as types from '../src/app/actions/actionTypes';
import * as actions from '../src/app/actions/actionCreators';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import * as moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Given action creators', () => {
  describe('Given SELECT_COIN action creator', () => {
    describe('When called with argument: "BTC"', () => {
      it('Should create action with type: "SELECT_COIN" and payload: "BTC"', () => {
        const coinSymbol = 'BTC';
        const expectedAction = {
          type: types.SELECT_COIN,
          payload: coinSymbol
        }
    
        expect(actions.selectCoin('BTC')).toEqual(expectedAction);
      })
    });
  });

  describe('Given SELECT_CURRENCY action creator', () => {
    describe('When called with argument: "PLN"', () => {
      it('Should create action with type: "SELECT_CURRENCY" and payload: "PLN" ', () => {
        const currencySymbol = 'PLN';
        const expectedAction = {
          type: types.SELECT_CURRENCY,
          payload: currencySymbol
        }
    
        expect(actions.selectCurrency('PLN')).toEqual(expectedAction);
      })
    });
  });

  describe('Given REQUEST_DATA action creator', () => {
    describe('When called with valid config as an argument', () => {
      beforeEach(function () {
        moxios.install();
      });
    
      afterEach(function () {
        moxios.uninstall();
      });

      const responseCoinsMock = [
        {"BTC": {close: 1}},
        {"ETH": {close: 2}}
      ]
      

      it('Should create RECIVE_DATA action', () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: responseCoinsMock
          });
        });

        const expectedActions = [
          { dataName: 'coinData', type: types.REQUEST_DATA },
          { dataName: 'coinData', type: types.RECIVE_DATA, payload: responseCoinsMock},
        ];

        const store = mockStore({ coinData: {} })
  
        return store.dispatch(actions.fetchCoinData()).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
      })
    });
  });

});
