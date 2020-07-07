import React from 'react';
import { shallow } from 'enzyme';
import PaginationItem from '../../../src/js/components/pagination/PaginationItem';

describe('<PaginationItem />', () => {
  const pageNumber = 5;
  const onClick = jest.fn();
  const props = {
    pageNumber,
    onClick,
    selected: false
  };

  it('renders without errors', () => {
    const component = shallow(<PaginationItem {...props} />);

    expect(component.find('li')).toHaveLength(1);
  });

  it('renders proper components', () => {
    const testProps = {
      ...props,
      selected: true
    };
    const component = shallow(<PaginationItem {...testProps} />);
    const li = component.find('li');

    li.props().onClick();

    expect(li).toHaveLength(1);
    expect(onClick).toHaveBeenCalledWith(pageNumber);
  });
});
