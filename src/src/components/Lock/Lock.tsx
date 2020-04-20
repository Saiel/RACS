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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";


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
  const [loadError, setLoadError] = useState<Error | null>(null);
  const [lockAccessList, setLockAccessList] = useState<APIResponse<LockAccess> | null>(null);
  const [showLockForm, setShowLockForm] = useState<boolean>(false);

  const accessesPagination = usePagination(lockAccessList, setLockAccessList);
  const logsPagination = usePagination(logs, setLogs);


  const toggleOverlay = useCallback(
    (type: 'open' | 'close') => () => setShowLockForm(type === 'open'),
    [setShowLockForm],
  );

  async function getUserAccessList() {
    try {
      const json = await apiGet<LockAccess>(`accesses/?lock=${lockId}`);
      setLockAccessList(json);
    } catch (error) {
      setLoadError(error);
    }
  }

  const deleteAccess: deleteFn = async (id) => {
    if (!confirm('Удалить доступ?')) return;
    try {
      const response = await API.delete(`accesses/${id}`);
      if (!response.ok) {
        alert('Ошибка при удалении доступа');
      } else {
        alert('Доступ удален');
        getUserAccessList();
      }
    } catch (error) {
      setLoadError(error);
    }
  }

  const deleteLock = useCallback(async () => {
    try {
      const response = await API.delete(`locks/${lockId}/`);
      if (response.ok) {
        alert('Замок удален')
        history.push('/locks');
      } else {
        alert('Ошибка при удалении замка');
        console.log(await response.text());
      }
    } catch (error) {
      setLoadError(error);
    }
  }, [lock]);

  const saveLock = useCallback(
    async (data: FormData) => {
      try {
        const response = await apiUpdate<Lock>('locks', lockId, data); 
        alert('Замок обновлен');
        console.log(response);
        setLock(response);
        setShowLockForm(false);
      } catch (error) {
        setLoadError(error);
      }
    },
    [lockId],
  );

  useEffect(() => {
    async function getLock() {
      try {
        const json = await API.get(`locks/${lockId}`) as Lock;
        setLock(json);
      } catch (error) {
        setLoadError(error);
      }
    }

    

    async function getLogList() {
      try {
        const json = await apiGet<Log>(`logs/?lock=${lockId}`);
        setLogs(json);
      } catch (error) {
        setLoadError(error);
      }
    }

    getLock();
    getUserAccessList();
    getLogList();
  }, [lockId]);

  if (loadError) {
    throw loadError;
  }

  return (
    <div className="Lock Layout_columns_2">
      <div  className="TitleCard">
      <div className="Page-Title TitleUser">Замок {lock ? lock.description : ''}</div>
      <div className="Layout-Column Lock-LockInfo">
        {lock && (
          <Card>
            <LockInfo lock={lock} />
            <div className="Card-Actions">
              <button className="Btn Btn_Change" onClick={toggleOverlay('open')}>Изменить</button>
              <button className="Btn Btn_danger" onClick={deleteLock}><span>< FontAwesomeIcon icon={faTrashAlt} /></span></button>
            </div>
          </Card>
        )}
      </div>
      </div>
      <div className="TableUser">
        <div className="Page-Title"><span><FontAwesomeIcon icon={faLockOpen}/> Доступы </span></div>
        {lockAccessList &&
          <>
            <AccessList onDelete={deleteAccess} accesses={lockAccessList.results} className="Layout-Table" />
            <Pagination paginationFn={accessesPagination} state={lockAccessList} />
          </>
        }
        <div className="Page-Title"><span><FontAwesomeIcon icon={faList}/> Журнал проходов </span></div>
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
