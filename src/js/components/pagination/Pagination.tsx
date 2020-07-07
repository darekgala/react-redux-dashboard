import React, { ReactElement } from 'react';
import PaginationItem, { PageChangeHandlerType } from './PaginationItem';

interface PropsType {
  numberOfPages: number;
  onPageChange: PageChangeHandlerType;
  selectedPage?: number;
}

export const Pagination = ({ numberOfPages, selectedPage, onPageChange }: PropsType): ReactElement => (
  <nav className="pagination is-centered" role="navigation" aria-label="pagination">
    <ul className="pagination-list">
      {
        Array(numberOfPages)
          .fill(1)
          .map((number, index) => index + 1)
          .map((pageNumber) => (
            <PaginationItem
              pageNumber={pageNumber}
              onClick={onPageChange}
              selected={pageNumber === selectedPage}
              key={pageNumber}
            />
          ))
      }
    </ul>
  </nav>
);

export default Pagination;
