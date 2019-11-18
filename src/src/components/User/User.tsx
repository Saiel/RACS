import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import './User.scss';
import Card from 'components/Card/Card';
import AccessList from 'components/AccessList/AccessList';
import UserForm from 'components/Forms/UserForm';
import { updateUser, API, apiGet, apiPost } from 'api';
import LogList from 'components/LogList/LogList';
import Overlay from 'components/Overlay/Overlay';
import UserInfo from 'components/UserInfo/UserInfo';
import LockAccessForm from 'components/Access/AccessForm/AccessForm';
import usePagination from 'hooks/usePagination';
import { APIResponse, apiDeleteRequest } from 'api/apiRequest';
import Pagination from 'components/Pagination/Pagination';

interface UserRoute {
  uId: string;
}

const User: React.FC<RouteComponentProps<UserRoute>> = ({
  match: {
    params: { uId },
  },
  history,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [logs, setLogs] = useState<APIResponse<Log> | null>(null);
  const [locks, setLocks] = useState<APIResponse<Lock> | null>(null);
  const [userAccessList, setUserAccessList] = useState<APIResponse<LockAccess> | null>(null);

  const accessPagination = usePagination(userAccessList, setUserAccessList);
  const logsPagination = usePagination(logs, setLogs);

  const [showUserForm, setShowUserForm] = useState<boolean>(false);
  const [showAccessForm, setShowAccessForm] = useState<boolean>(false);

  const toggleOverlay = useCallback(
    (type: 'open' | 'close') => () => setShowUserForm(type === 'open'),
    [setShowUserForm],
  );

  const toggleAccessOverlay = useCallback(
    (type: 'open' | 'close') => () => setShowAccessForm(type === 'open'),
    [setShowAccessForm],
  );

  const deleteUser = useCallback(async () => {
    if (!confirm('Удалить пользователя?')) return;
    const response = await API.delete(`users/${uId}/`);
    if (response.ok) {
      alert('Пользователь удален');
      history.push('/users');
    } else {
      alert('Ошибка при удалении пользователя');
      console.log(await response.text());
    }
  }, [user]);

  const deleteAccess: deleteFn = async (id) => {
    if (!confirm('Удалить доступ?')) return;
    const response = await API.delete(`accesses/${id}`);
    if (!response.ok) {
      alert('Ошибка при удалении доступа');
    } else {
      alert('Доступ удален');
      getUserAccessList();
    }
  }

  const userName = useMemo(() => {
    return user ? `#${user.u_id}: ${user.first_name} ${user.last_name}` : '';
  }, [user]);

  const saveUser = useCallback(
    async (data: FormData) => {
      const response = await updateUser(uId, data);
      alert('Пользователь обновлен');
      setUser(response);
      setShowUserForm(false);
    },
    [uId],
  );

  async function getUserAccessList() {
    const json = await apiGet<LockAccess>(`accesses/?u_id=${uId}`);
    setUserAccessList(json);
  }

  const saveAccess = async (data: FormData) => {
    try {
      console.log(data.get('access_start'));
      const response = await apiPost<LockAccess>('accesses', data);
      alert('Доступ добавлен');
      getUserAccessList();
      setShowAccessForm(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function getUser() {
      const json = (await API.get(`users/${uId}`)) as User;
      setUser(json);
    }



    async function getLogList() {
      const json = await apiGet<Log>(`logs/?u_id=${uId}`);
      setLogs(json);
    }

    async function getLocks() {
      const json = await apiGet<Lock>('locks');
      setLocks(json);
    }

    getUser();
    getUserAccessList();
    getLogList();
    getLocks();
  }, [uId]);

  return (
    <div className="User Layout Layout_columns_2">
      <div className="Page-Title">Пользователь {userName}</div>
      <div className="Layout-Column User-UserInfo">
        {user && (
          <Card>
            <UserInfo user={user} />
            <div className="Card-Actions">
              <button className="Btn Btn_add" onClick={toggleAccessOverlay('open')}>Добавить доступ</button>
              <button className="Btn" onClick={toggleOverlay('open')}>Изменить</button>
              <button className="Btn Btn_danger" onClick={deleteUser}>Удалить</button>
            </div>
          </Card>
        )}
      </div>
      <div className="Layout-Columns User-Tables">
        <div className="Layout-Title">Доступы пользователя</div>
        {}
        {userAccessList &&
          <>
            <AccessList accesses={userAccessList.results} onDelete={deleteAccess} className="Layout-Table" />
            <Pagination paginationFn={accessPagination} state={userAccessList} />
          </>}
        <div className="Layout-Title">Журнал проходов</div>
        {logs &&
          <>
            <LogList logs={logs.results} className="Layout-Table" />
            <Pagination paginationFn={logsPagination} state={logs} />
          </>}
      </div>
      {showUserForm && user && (
        <Overlay onClose={toggleOverlay('close')}>
          <UserForm user={user} onSubmit={saveUser} />
        </Overlay>
      )}
      {showAccessForm && user && locks &&
        <Overlay onClose={toggleAccessOverlay('close')}>
          <LockAccessForm
            users={[user]}
            locks={locks.results}
            lockAccess={{ access_stop: '', access_start: '', lock: locks.results[0].l_id, user: user.u_id }}
            onSubmit={saveAccess} />
        </Overlay>
      }
    </div>
  );
};

export default User;
