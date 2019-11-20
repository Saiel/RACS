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
  onDelete?: deleteFn;
}

interface AccessInfoRowProps {
  access: LockAccess;
  onDelete?: deleteFn; 
}

const AccessInfoRow: React.FC<AccessInfoRowProps> = ({ access: { a_id, lock_desc, user_fio, access_start, access_stop }, onDelete }) => {
  const lockDesc = useMemo(() => lock_desc.split('\r\n')[0], [lock_desc]);
  const accessStart = useMemo(() => new Date(access_start).toLocaleString(), [access_start]);
  const accessStop = useMemo(() => new Date(access_stop).toLocaleString(), [access_stop]);


  return (
    <React.Fragment>
      <div className="Access-Lock">{lockDesc}</div>
      <div className="Access-User">{user_fio}</div>
      <div className="Access-Start">{accessStart}</div>
      <div className="Access-Stop">{accessStop}</div>
      { onDelete && <button onClick={() => onDelete(a_id)} className="Btn Btn_danger Access-Delete">Удалить</button> }
    </React.Fragment>
  )
}

const AccessList: React.FC<AccessListProps> = ({ accesses, className = '', onDelete }) => {
  const accessRows = accesses.map((access) => 
    <AccessInfoRow key={access.a_id} access={access} onDelete={onDelete} />
  );

  return (
    <div className={`AccessList ${className}`}>
      <Table entries={accessRows} headerFields={accessFields} />
    </div>
  );
}

export default AccessList;