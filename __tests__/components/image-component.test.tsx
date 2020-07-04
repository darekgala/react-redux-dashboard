// import {} from 'jest';
// import * as React from 'react';
// import * as Enzyme from 'enzyme';
// import * as Adapter from 'enzyme-adapter-react-16';
// import {Image} from '../../src/js/components/Image';

// Enzyme.configure({ adapter: new Adapter() });

// const setup = () => {
//   const props = {
//     src: 'test'
//   }

//   const enzymeWrapper = Enzyme.mount(<Image {...props} />)

//   return {
//     props,
//     enzymeWrapper
//   }
// }

// describe('Given Image component', () => {
//   it('Enzyme should render component with props', () => {
//     const { enzymeWrapper } = setup()

//     expect(enzymeWrapper.find('figure')).toBeDefined();
//     expect(enzymeWrapper.find('img').hasClass('image')).toBe(true);
//   });
// })
