import React, { useCallback, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import './Lock.scss';
import Card from 'components/Card/Card';
import AccessList from 'components/AccessList/AccessList';
import LogList from 'components/LogList/LogList';
import { API, apiGet, apiUpdate } from 'api';
import Overlay from 'components/Overlay/Overlay';
import LockInfo from './LockInfo/LockInfo';

import './Lock.scss';
import { APIResponse } from 'api/apiRequest';
import Pagination from 'components/Pagination/Pagination';
import usePagination from 'hooks/usePagination';
import LockForm from './LockForm/LockForm';

interface LockRoute {
  lockId: string;
}

const Lock: React.FC<RouteComponentProps<LockRoute>> = ({
  match: {
    params: { lockId },
  },
  history
}) => {
  const [lock, setLock] = useState<Lock | null>(null);
  const [logs, setLogs] = useState<APIResponse<Log> | null>(null);
  const [lockAccessList, setLockAccessList] = useState<APIResponse<LockAccess> | null>(null);
  const [showLockForm, setShowLockForm] = useState<boolean>(false);

  const accessesPagination = usePagination(lockAccessList, setLockAccessList);
  const logsPagination = usePagination(logs, setLogs);


  const toggleOverlay = useCallback(
    (type: 'open' | 'close') => () => setShowLockForm(type === 'open'),
    [setShowLockForm],
  );

  async function getUserAccessList() {
    const json = await apiGet<LockAccess>(`accesses/?lock=${lockId}`);
    setLockAccessList(json);
  }

  const deleteAccess: deleteFn = async (id) => {
    const response = await API.delete(`accesses/${id}`);
    if (!response.ok) {
      alert('Ошибка при удалении доступа');
    } else {
      alert('Доступ удален');
      getUserAccessList();
    }
  }

  const deleteLock = useCallback(async () => {
    const response = await API.delete(`locks/${lockId}/`);
    if (response.ok) {
      alert('Замок удален')
      history.push('/locks');
    } else {
      alert('Ошибка при удалении замка');
      console.log(await response.text());
    }
  }, [lock]);

  const saveLock = useCallback(
    async (data: FormData) => {
      const response = await apiUpdate<Lock>('locks', lockId, data); 
      alert('Замок обновлен');
      console.log(response);
      setLock(response);
      setShowLockForm(false);
    },
    [lockId],
  );

  useEffect(() => {
    async function getLock() {
      const json = await API.get(`locks/${lockId}`) as Lock;
      setLock(json);
    }

    

    async function getLogList() {
      const json = await apiGet<Log>(`logs/?lock=${lockId}`);
      setLogs(json);
    }

    getLock();
    getUserAccessList();
    getLogList();
  }, [lockId]);

  return (
    <div className="Lock Layout Layout_columns_2">
      <div className="Page-Title">Замок {lock ? lock.description : ''}</div>
      <div className="Layout-Column Lock-LockInfo">
        {lock && (
          <Card>
            <LockInfo lock={lock} />
            <div className="Card-Actions">
              <button className="Btn" onClick={toggleOverlay('open')}>Изменить</button>
              <button className="Btn Btn_danger" onClick={deleteLock}>Удалить</button>
            </div>
          </Card>
        )}
      </div>
      <div className="Layout-Columns Lock-Tables">
        <div className="Layout-Title">Доступы к замку</div>
        {lockAccessList &&
          <>
            <AccessList onDelete={deleteAccess} accesses={lockAccessList.results} className="Layout-Table" />
            <Pagination paginationFn={accessesPagination} state={lockAccessList} />
          </>
        }
        <div className="Layout-Title">Журнал проходов</div>
        {logs &&
          <>
            <LogList logs={logs.results} className="Layout-Table" />
            <Pagination paginationFn={logsPagination} state={logs} />
          </>
        }
      </div>
      {showLockForm && lock && (
        <Overlay onClose={toggleOverlay('close')}>
          <LockForm lock={lock} onSubmit={saveLock} />
        </Overlay>
      )}
    </div>
  );
};

export default Lock;
