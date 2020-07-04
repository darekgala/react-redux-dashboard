// import {} from 'jest';
// import * as React from 'react';
// import * as Enzyme from 'enzyme';
// import * as Adapter from 'enzyme-adapter-react-16';
// import {MediaContent} from '../../src/js/components/MediaContent';

// Enzyme.configure({ adapter: new Adapter() });

// const setup = () => {
//   const props = {
//     coinData: {
//       Name: 'BTC',
//       CoinName: 'Bitcoin (BTC)',
//       Algorithm: 'SHA256',
//       Url: 'test'
//     },
//     priceData: {
//       value: 1,
//       currency: 'PLN'
//     }
//   }

//   const enzymeWrapper = Enzyme.mount(<MediaContent {...props} />)

//   return {
//     props,
//     enzymeWrapper
//   }
// }

// describe('Given MediaContent component', () => {
//   it('Enzyme should render component with props', () => {
//     const { enzymeWrapper } = setup();

//     expect(enzymeWrapper.find('h5')).toBeDefined();
//     expect(enzymeWrapper.find('a').text()).toBe('More info');
//   });
// })
