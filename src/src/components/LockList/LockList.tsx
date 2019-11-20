import React from 'react';
import { Link } from 'react-router-dom';
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
      <div className="Lock-Description">{lock.description.split('\r\n')[0]}</div>
      <div className="Lock-Version">{lock.version}</div>
      <div className="Lock-Approved">{lock.is_approved ? 'Да' : 'Нет'}</div>
    </React.Fragment>
  )
}

const LockList: React.FC<LockListProps> = ({ locks, className = '' }) => {
  return (
    <div className={`LockList ${className}`}>
      <div className="Table">
        <div className="Table-Row Table-Header">
          {Object.values(LockSchema).map((field, idx) =>
            <div className="Table-Item" key={idx}>{field}</div>
          )}
        </div>
        {locks.map((lock) => {
          return (
            <Link className="BlockLink BlockLink_primary" to={`/locks/${lock.l_id}`} key={lock.l_id}>
              <div className="Table-Row">
                <LockInfoRow lock={lock} />
              </div>
            </Link>
          )
        })
        }
      </div>
    </div>
  );
}

export default LockList;