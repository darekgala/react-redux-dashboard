import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../../src/js/components/pagination/Pagination';
import PaginationItem from '../../../src/js/components/pagination/PaginationItem';

describe('<Pagination />', () => {
  const numberOfPages = 5;
  const props = {
    numberOfPages,
    onPageChange: jest.fn(),
    selectedPage: 1
  };

  it('renders without errors', () => {
    const component = shallow(<Pagination {...props} />);

    expect(component.find(PaginationItem)).toHaveLength(numberOfPages);
  });
});
