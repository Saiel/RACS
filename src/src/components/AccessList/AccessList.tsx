import React from 'react';
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

const AccessInfoRow: React.FC<{ access: LockAccess }> = ({ access }) => {
  return (
    <React.Fragment>
      <div className="Access-Lock">{access.lock_desc}</div>
      <div className="Access-User">{access.user_fio}</div>
      <div className="Access-Start">{access.access_start}</div>
      <div className="Access-Stop">{access.access_stop}</div>
    </React.Fragment>
  )
}

const AccessList: React.FC<AccessListProps> = ({ accesses, className = '' }) => {
  const accessRows = accesses.map((access) => 
    <AccessInfoRow key={access.a_id} access={access} />
  );

  return (
    <div className={`AccessList ${className}`}>
      <Table entries={accessRows} headerFields={accessFields} />
    </div>
  );
}

export default AccessList;