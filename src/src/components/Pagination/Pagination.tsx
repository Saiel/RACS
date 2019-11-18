import './Pagination.scss';
import React from 'react';
import { PaginationHandler, OneOfApiResponses } from 'hooks/usePagination';

interface Props {
  paginationFn: PaginationHandler; 
  state: OneOfApiResponses;
}

const Pagination: React.FC<Props> = ({ paginationFn, state }) => {
  return (
    <div className="Pagination">
      <button disabled={!state!.previous} className="Btn Pagination-Prev" onClick={paginationFn('previous')} > &lt; </button>
      <button disabled={!state!.next} className="Btn Pagination-Next" onClick={paginationFn('next')}> &gt; </button>
    </div>
  )
}

export default Pagination;
