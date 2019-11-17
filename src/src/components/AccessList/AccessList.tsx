import React, { useMemo } from 'react';
import Table from 'components/Table/Table';

const accessFields = [
  'Замок',
  'Пользователь',
  'Начало',
  'Окончание',
];

interface AccessListProps {
  accesses: LockAccess[];
  className?: string;
}

const AccessInfoRow: React.FC<LockAccess> = ({ lock_desc, user_fio, access_start, access_stop }) => {
  const lockDesc = useMemo(() => lock_desc.split('\r\n')[0], [lock_desc]);
  const accessStart = useMemo(() => new Date(access_start).toLocaleString(), [access_start]);
  const accessStop = useMemo(() => new Date(access_stop).toLocaleString(), [access_stop]);


  return (
    <React.Fragment>
      <div className="Access-Lock">{lockDesc}</div>
      <div className="Access-User">{user_fio}</div>
      <div className="Access-Start">{accessStart}</div>
      <div className="Access-Stop">{accessStop}</div>
    </React.Fragment>
  )
}

const AccessList: React.FC<AccessListProps> = ({ accesses, className = '' }) => {
  const accessRows = accesses.map((access) => 
    <AccessInfoRow key={access.a_id} {...access} />
  );

  return (
    <div className={`AccessList ${className}`}>
      <Table entries={accessRows} headerFields={accessFields} />
    </div>
  );
}

export default AccessList;