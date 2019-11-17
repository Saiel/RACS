import React, { useMemo } from 'react';
import Table from 'components/Table/Table';
import { LogSchema } from 'store/schema';
import { Link } from 'react-router-dom';

const LogInfoRow: React.FC<Log> = ({ lock, lock_desc, user, try_time, result, user_fio }) => {
  const lockDesc = useMemo(() => {
    if (typeof lock_desc !== 'undefined') return lock_desc.split('\r\n')[0];
    return '-';
  }, [lock_desc]);
  const tryTime = useMemo(() => new Date(try_time).toLocaleString(), [try_time]);

  return (
    <React.Fragment>
      <div className="Log-Lock"><Link to={`/locks/${lock}`}>{lockDesc}</Link></div>
      <div className="Log-User"><Link to={`/users/${user}`}>{user_fio}</Link></div>
      <div className="Log-Time">{tryTime}</div>
      <div className="Log-Result">{result ? 'Разрешено' : 'Запрещено'}</div>
    </React.Fragment>
  )
}

interface Props {
  logs: Log[];
  className?: string;
}

const LogList: React.FC<Props> = ({ logs, className = '' }) => {
  const lockRows = logs.map((log, idx) => 
    <LogInfoRow key={idx} {...log} />
  );

  return (
    <div className={`LogList ${className}`}>
      <Table entries={lockRows} headerFields={Object.values(LogSchema)} />
    </div>
  );
}

export default LogList;