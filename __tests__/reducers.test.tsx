// import {} from 'jest';
// import * as types from '../src/app/actions/actionTypes';
// import initialState from '../src/app/initialState';
// import reducer from '../src/app/reducers/index';

// describe('Given root reducer', () => {
//   describe('When called as undefined passed as action type', () => {
//     it('Should return the initial state', () => {
//       expect(reducer(undefined, {})).toEqual({
//         coins: {
//           ...initialState
//         }
//       })
//     });
//   });

//   describe('When called with action type as SELECT_COIN and "BTC" as payload', () => {
//     it('Should return updated state with selectedCoin field', () => {
//       expect(reducer(undefined, {
//         type: types.SELECT_COIN,
//         payload: 'BTC'
//       })).toEqual({
//         coins: {
//           ...initialState,
//           selectedCoin: 'BTC'
//         }
//       });
//     });
//   });

//   describe('When called with action type as SELECT_CURRENCY and "PLN" as payload', () => {
//     it('Should return updated state with selectedCurrency field', () => {
//       expect(reducer({}, {
//         type: types.SELECT_CURRENCY,
//         payload: 'PLN'
//       })).toEqual({
//         coins: {
//           ...initialState,
//           selectedCurrency: 'PLN'
//         }
//       });
//     });
//   });

//   describe('When called with action type SELECT_COIN and SELECT_CURRENCY', () => {
//     it('Should return updated state with selectedCoin and selectedCurrency fields', () => {
//       expect(
//         reducer({}, {
//           type: types.SELECT_COIN,
//           payload: 'BTN'
//         }
//       )).toEqual({
//         coins: {
//           ...initialState,
//           selectedCoin: 'BTN'
//         }
//       });

//       expect(
//         reducer({
//           coins: {
//             ...initialState,
//             selectedCoin: 'BTN'
//           }
//         }, {
//           type: types.SELECT_CURRENCY,
//           payload: 'PLN'
//         })).toEqual(
//         {
//           coins: {
//             ...initialState,
//             selectedCoin: 'BTN',
//             selectedCurrency: 'PLN'
//           }
//         }
//       );
//     });
//   });
// });
