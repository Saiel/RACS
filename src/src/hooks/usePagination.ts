import React, { useCallback } from 'react';
import { APIResponses } from 'api/apiRequest';

type OneOfApiResponses = APIResponses[keyof APIResponses] | null;
type PaginationHandler = (type: 'previous' | 'next') => () => void;

function usePagination<T extends OneOfApiResponses>(state: T, setState: React.Dispatch<React.SetStateAction<T>>) {
  const cb = useCallback<PaginationHandler>((type) => async () => {
      if (state && state[type]) {
        const response = await fetch(state[type]!);
        const json = await response.json() as T;
        setState(json);
      }
  }, [state, setState]);
  
  return cb;
}

export default usePagination;
