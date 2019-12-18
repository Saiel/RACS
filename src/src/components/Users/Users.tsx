import React, { useState, useEffect, useCallback } from 'react';
import { APIResponse } from 'api/apiRequest';
import { getUsers, apiPost, API, apiGet } from 'api';
import UserList from 'components/UserList/UserList';
import usePagination from 'hooks/usePagination';

import './Users.scss';
import UserForm from 'components/Forms/UserForm';
import Overlay from 'components/Overlay/Overlay';
import { RouteComponentProps } from 'react-router';
import Pagination from 'components/Pagination/Pagination';	

const Users: React.FC<RouteComponentProps> = ({ history }) => {
  const [users, setUsers] = useState<APIResponse<User> | null>(null);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const [addUserOverlayActive, setAddUserOverlayActive] = useState<Boolean>(false);
  const userPagination = usePagination(users, setUsers);

  const toggleOverlay = useCallback(
    (type: 'close' | 'open') => () => {
      setAddUserOverlayActive(type === 'open');
    },
    [setAddUserOverlayActive],
  );

  const deleteUser: deleteFn = async (id) => {
    if (!confirm('Удалить пользователя?')) return;
    try {
      const response = await API.delete(`users/${id}`);
      if (!response.ok) {
        alert('Ошибка при удалении пользователя');
      } else {
        alert('Пользователь удален');
        getUsers().then((json) => setUsers(json));
      }
    } catch (error) {
      setLoadError(error);
    }
  }

  const onUserFormSubmit = useCallback(async (state: FormData) => {
    try {
      const json = await apiPost<User>('users', state);
      history.push(`/users/${json.u_id}`);
    } catch (error) {
      setLoadError(error);
    }
  }, []);

  useEffect(() => {
    async function loadUsers() {
      const users = await apiGet<User>('users');
      setUsers(users);
    }

    try {
      loadUsers();
    } catch (error) {
      setLoadError(error);
    }
  }, []);

  if (loadError) {
    throw loadError;
  }

  return (
    <div className="Users Layout">
      <div className="Page-Title">Список пользователей</div>
      <div className="Page-Actions">
        <button className="Btn Btn_add" onClick={toggleOverlay('open')}>
          Добавить пользователя
        </button>
      </div>
      {users &&
        <>
          <UserList onDelete={deleteUser} users={users.results} />
          <Pagination paginationFn={userPagination} state={users} />
        </>
      }

      {addUserOverlayActive && (
        <Overlay onClose={toggleOverlay('close')}>
          <UserForm onSubmit={onUserFormSubmit}></UserForm>
        </Overlay>
      )}
    </div>
  );
};

export default Users;
