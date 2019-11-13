import React, { useState, useEffect } from 'react';
import { APIResponse } from 'api/apiRequest';
import { getUsers } from 'api';
import UserList from 'components/UserList/UserList';
import usePagination from 'hooks/usePagination';

const Users: React.FC = () => {
  const [users, setUsers] = useState<APIResponse<User> | null>(null);
  const userPagination = usePagination(users, setUsers);

  useEffect(() => {
    getUsers()
    .then((json) => setUsers(json));
  }, []);

  return (
    <div>
      <div>Список пользователей</div>
      { users && <UserList users={users.results} /> }
      <button className="Pagination-Prev" onClick={userPagination('previous')}> {'<'} </button>
      <button className="Pagination-Next" onClick={userPagination('next')}> > </button>
    </div>
  )
};

export default Users;
