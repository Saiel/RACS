import './Pagination.scss';
import React from 'react';
import { PaginationHandler, OneOfApiResponses } from 'hooks/usePagination';
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  paginationFn: PaginationHandler; 
  state: OneOfApiResponses;
}

const Pagination: React.FC<Props> = ({ paginationFn, state }) => {
  return (
    <div className="Pagination">
      <button disabled={!state!.previous} className="Btn Pagination-Prev" onClick={paginationFn('previous')} > <FontAwesomeIcon icon={faChevronCircleLeft} /> </button>
      <button disabled={!state!.next} className="Btn Pagination-Next" onClick={paginationFn('next')}> <FontAwesomeIcon icon={faChevronCircleRight} /> </button>
    </div>
  )
}

export default Pagination;
