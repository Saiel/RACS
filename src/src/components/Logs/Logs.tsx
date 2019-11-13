import React, { useState, useEffect } from 'react';
import { APIResponse } from 'api/apiRequest';
import { apiGet } from 'api';
import LogList from 'components/LogList/LogList';

const Logs: React.FC = () => {
  const [logs, setLogs] = useState<APIResponse<Log> | null>(null);

  useEffect(() => {
    apiGet<Log>('logs')
    .then((json) => { console.log(json); setLogs(json) });
  }, []);

  return (
    <div>
      <div>Журнал доступов</div>
      { logs && <LogList logs={logs.results}/> }
    </div>
  );
};

export default Logs;