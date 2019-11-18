import React, { useState, useEffect } from 'react';
import { APIResponse } from 'api/apiRequest';
import { apiGet } from 'api';
import LogList from 'components/LogList/LogList';

import './Logs.scss';
import usePagination from 'hooks/usePagination';
import Pagination from 'components/Pagination/Pagination';

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<APIResponse<Log> | null>(null);
  const logsPagination = usePagination(logs, setLogs); 

  useEffect(() => {
    apiGet<Log>('logs')
    .then((json) => { console.log(json); setLogs(json) });
  }, []);

  return (
    <div className="Logs Layout">
      <div className="Page-Title">Журнал доступов</div>
      { logs && 
      <>
        <LogList logs={logs.results}/> 
        <Pagination paginationFn={logsPagination} state={logs} />
      </>
      }
    </div>
  );
};

export default Logs;