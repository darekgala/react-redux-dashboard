import React, { ReactElement } from 'react';

export interface PageChangeHandlerType {
  (page: number): void
}

interface PropsType {
  pageNumber: number;
  onClick: PageChangeHandlerType;
  selected: boolean
}

export const PaginationItem = ({ pageNumber, onClick, selected }: PropsType): ReactElement => {
  function handleClick() {
    return onClick(pageNumber);
  }

  return (
    <li
      onClick={handleClick}
      key={pageNumber}
    >
      <div
        className={`${selected ? 'is-current' : ''} pagination-link`}
        aria-label={`Goto page ${pageNumber}`}
      >
        {pageNumber}
      </div>
    </li>
  );
};

export default PaginationItem;
