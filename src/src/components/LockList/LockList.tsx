import React from 'react';
import Table from 'components/Table/Table';
import { LockSchema } from 'store/schema';

interface LockListProps {
  locks: Lock[];
  className?: string;
}

const LockInfoRow: React.FC<{ lock: Lock }> = ({ lock }) => {
  return (
    <React.Fragment>
      <div className="Lock-ID">{lock.l_id}</div>
      <div className="Lock-Description">{lock.description}</div>
      <div className="Lock-Version">{lock.version}</div>
      <div className="Lock-Approved">{lock.is_approved ? 'Да' : 'Нет'}</div>
    </React.Fragment>
  )
}

const LockList: React.FC<LockListProps> = ({ locks, className = '' }) => {
  const lockRows = locks.map((lock) => 
    <LockInfoRow key={lock.l_id} lock={lock} />
  );

  return (
    <div className={`LockList ${className}`}>
      <Table entries={lockRows} headerFields={Object.values(LockSchema)} />
    </div>
  );
}

export default LockList;