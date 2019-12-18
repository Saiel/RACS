import React, { useCallback } from 'react';
import { APIResponses } from 'api/apiRequest';

export type OneOfApiResponses = APIResponses[keyof APIResponses] | null;
export type PaginationHandler = (type: 'previous' | 'next') => () => void;

function usePagination<T extends OneOfApiResponses>(state: T, setState: React.Dispatch<React.SetStateAction<T>>) {
  const cb = useCallback<PaginationHandler>((type) => async () => {
      if (state && state[type]) {
        const response = await fetch(state[type]!, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('ja')}`,
          },
        });
        const json = await response.json() as T;
        setState(json);
      }
  }, [state, setState]);
  
  return cb;
}

export default usePagination;
