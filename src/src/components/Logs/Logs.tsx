import React, { useState, useEffect } from 'react';
import { APIResponse } from 'api/apiRequest';
import { apiGet } from 'api';
import LogList from 'components/LogList/LogList';
import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './Logs.scss';
import usePagination from 'hooks/usePagination';
import Pagination from 'components/Pagination/Pagination';

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<APIResponse<Log> | null>(null);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const logsPagination = usePagination(logs, setLogs); 


  useEffect(() => {
    async function loadLogs() {
      const logs = await apiGet<Log>('logs');
      setLogs(logs);
    }

    try {
      loadLogs();
    } catch (error) {
      setLoadError(error);
    }
  }, []);

  if (loadError) {
    throw loadError;
  }

  return (
    <div className="Layout-Column Home-Tables">
    <div className="Logs Layout">
      <div className="Page-Title"><span><FontAwesomeIcon icon={faList} /> Журнал доступов</span></div>
      { logs && 
      <>
        <LogList logs={logs.results}/> 
        <Pagination paginationFn={logsPagination} state={logs} />
      </>
      }
    </div>
    </div>
  );
};

export default Logs;