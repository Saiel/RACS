import React, { useState, useEffect, useCallback } from 'react';
import { APIResponse } from 'api/apiRequest';
import { getUsers, apiPost } from 'api';
import UserList from 'components/UserList/UserList';
import usePagination from 'hooks/usePagination';

import './Users.scss';
import UserForm from 'components/Forms/UserForm';
import Overlay from 'components/Overlay/Overlay';
import { RouteComponentProps } from 'react-router';

const Users: React.FC<RouteComponentProps> = ({ history }) => {
  const [users, setUsers] = useState<APIResponse<User> | null>(null);
  const [addUserOverlayActive, setAddUserOverlayActive] = useState<Boolean>(false);
  const toggleOverlay = useCallback(
    (type: 'close' | 'open') => () => {
      setAddUserOverlayActive(type === 'open');
    },
    [setAddUserOverlayActive],
  );
  const onUserFormSubmit = useCallback(async (state: FormData) => {
    const json = await apiPost<User>('users', state);
    history.push(`/users/${json.u_id}`);
  }, []);
  const userPagination = usePagination(users, setUsers);

  useEffect(() => {
    getUsers().then((json) => setUsers(json));
  }, []);

  return (
    <div className="Users">
      <div>Список пользователей</div>
      {users && 
      <>
        <UserList users={users.results} />
        <div className="Pageination">
          <button disabled={!users.previous} className="Pagination-Prev" onClick={userPagination('previous')}>
            {' '}
            {'<'}{' '}
          </button>
          <button disabled={!users.next} className="Pagination-Next" onClick={userPagination('next')}>
            {' '}
            >{' '}
          </button>
        </div>
      </>
      }
      <button className="Btn Btn_add" onClick={toggleOverlay('open')}>
        Добавить пользователя
      </button>
      {addUserOverlayActive && (
        <Overlay onClose={toggleOverlay('close')}>
          <UserForm onSubmit={onUserFormSubmit}></UserForm>
        </Overlay>
      )}
    </div>
  );
};

export default Users;
