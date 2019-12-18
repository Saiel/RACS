import React, { useState, useEffect } from 'react';
import { APIResponse } from 'api/apiRequest';
import { apiGet } from 'api';

import './Locks.scss';
import LockList from 'components/LockList/LockList';
import usePagination from 'hooks/usePagination';
import Pagination from 'components/Pagination/Pagination';

const Locks: React.FC = () => {
  const [locks, setLocks] = useState<APIResponse<Lock> | null>(null);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const locksPagination = usePagination(locks, setLocks);

  useEffect(() => {
    async function loadLocks() {
      try {
      const locks = await apiGet<Lock>('locks');
      setLocks(locks);
      } catch (error) {
        setLoadError(error);
      }
    }

    loadLocks();
  }, []);

  if (loadError) {
    throw loadError;
  }

  return (
    <div className="Locks Layout">
      <div className="Page-Title">Список замков</div>
        { locks && 
        <>
          <LockList locks={locks.results} /> 
          <Pagination paginationFn={locksPagination} state={locks} />
        </>
        }
    </div>
  );
};

export default Locks;