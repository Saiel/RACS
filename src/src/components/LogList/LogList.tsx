import React from 'react';
import Table from 'components/Table/Table';
import { LogSchema } from 'store/schema';
import { Link } from 'react-router-dom';

interface Props {
  logs: Log[];
  className?: string;
}

const LogInfoRow: React.FC<{ log: Log }> = ({ log }) => {
  let lockDesc: string;
  if (typeof log.lock_desc !== 'undefined') {
    lockDesc = log.lock_desc.split('\r\n')[0];
  } else {
    lockDesc = '-';
  }

  return (
    <React.Fragment>
      <div className="Log-Lock"><Link to={`/locks/${log.lock}`}>{lockDesc}</Link></div>
      <div className="Log-User"><Link to={`/users/${log.user}`}>{log.user_fio}</Link></div>
      <div className="Log-Time">{log.try_time}</div>
      <div className="Log-Result">{log.result ? 'Разрешено' : 'Запрещено'}</div>
    </React.Fragment>
  )
}

const LogList: React.FC<Props> = ({ logs, className = '' }) => {
  const lockRows = logs.map((log, idx) => 
    <LogInfoRow key={idx} log={log} />
  );

  return (
    <div className={`LockList ${className}`}>
      <Table entries={lockRows} headerFields={Object.values(LogSchema)} />
    </div>
  );
}

export default LogList;