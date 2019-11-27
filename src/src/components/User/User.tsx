import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import './User.scss';
import Card from 'components/Card/Card';
import AccessList from 'components/AccessList/AccessList';
import UserForm from 'components/Forms/UserForm';
import { updateUser, API, apiGet } from 'api';
import LogList from 'components/LogList/LogList';
import Overlay from 'components/Overlay/Overlay';
import UserInfo from 'components/UserInfo/UserInfo';

interface UserRoute {
  uId: string;
}

const User: React.FC<RouteComponentProps<UserRoute>> = ({
  match: {
    params: { uId },
  },
  history
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [logs, setLogs] = useState<APIResponse<Log> | null>(null);
  const [locks, setLocks] = useState<APIResponse<Lock> | null>(null);
  const [userAccessList, setUserAccessList] = useState<APIResponse<LockAccess> | null>(null);

  const accessPagination = usePagination(userAccessList, setUserAccessList);
  const logsPagination = usePagination(logs, setLogs);

  const [loadError, setLoadError] = useState<Error | null>(null);
  const [showUserForm, setShowUserForm] = useState<boolean>(false);
  const toggleOverlay = useCallback(
    (type: 'open' | 'close') => () => setShowUserForm(type === 'open'),
    [setShowUserForm],
  );
  const deleteUser = useCallback(async () => {
    if (!confirm('Удалить пользователя?')) return;
    try {
      const response = await API.delete(`users/${uId}/`);
      if (response.ok) {
        alert('Пользователь удален');
        history.push('/users');
      } else {
        alert('Ошибка при удалении пользователя');
        console.log(await response.text());
      }
    } catch (error) {
      setLoadError(error);
    }
  }, [user]);

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

  const userName = useMemo(() => {
    return user ? `#${user.u_id}: ${user.first_name} ${user.last_name}` : '';
  }, [user]);

  const saveUser = useCallback(
    async (data: FormData) => {
      try {
        const response = await updateUser(uId, data);
        alert('Пользователь обновлен');
        setUser(response);
        setShowUserForm(false);
      } catch (error) {
        setLoadError(error);
      }
    },
    [uId],
  );

  async function getUserAccessList() {
    try {
      const json = await apiGet<LockAccess>(`accesses/?u_id=${uId}`);
      setUserAccessList(json);
    } catch (error) {
      setLoadError(error);
    }
  }

  const saveAccess = async (data: FormData) => {
    try {
      console.log(data.get('access_start'));
      const response = await apiPost<LockAccess>('accesses', data);
      alert('Доступ добавлен');
      getUserAccessList();
      setShowAccessForm(false);
    } catch (error) {
      console.log(error);
      setLoadError(error);
    }
  }

  useEffect(() => {
    async function getUser() {
      const json = await API.get(`users/${uId}`) as User;
      setUser(json);
    }

    async function getUserAccessList() {
      const json = await apiGet<LockAccess>(`accesses/?u_id=${uId}`);
      setUserAccessList(json.results);
    }

    async function getLogList() {
      const json = await apiGet<Log>(`logs/?u_id=${uId}`);
      setLogs(json.results);
    }

    try {
      getUser();
      getUserAccessList();
      getLogList();
      getLocks();
    } catch (error) {
      setLoadError(error);
    }
  }, [uId]);

  if (loadError) {
    throw loadError;
  }

  return (
    <div className="User Layout Layout_columns_2">
      <div className="Page-Title">Пользователь {userName}</div>
      <div className="Layout-Column User-UserInfo">
        {user && (
          <Card>
            <UserInfo user={user} />
            <button onClick={toggleOverlay('open')}>Изменить</button>
            <button onClick={deleteUser}>Удалить</button>
          </Card>
        )}
      </div>
      <div className="Layout-Columns User-Tables">
        <div className="Layout-Title">Доступы пользователя</div>
        <AccessList accesses={userAccessList} className="Layout-Table" />
        <div className="Layout-Title">Журнал проходов</div>
        <LogList logs={logs} className="Layout-Table" />
      </div>
      {showUserForm && user && (
        <Overlay onClose={toggleOverlay('close')}>
          <UserForm user={user} onSubmit={saveUser} />
        </Overlay>
      )}
    </div>
  );
};

export default User;
