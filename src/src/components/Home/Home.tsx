import React, { useEffect, useState } from 'react';
import usePagination from 'hooks/usePagination';
import UserInfo from 'components/UserInfo/UserInfo';
import LockList from 'components/LockList/LockList';
import UserList from 'components/UserList/UserList';
import { apiGetRequest, APIResponse } from 'api/apiRequest';

import './Home.scss';


const Home = () => {
  const [locks, setLocks] = useState<APIResponse<Lock> | null>(null);
  const [users, setUsers] = useState<APIResponse<User> | null>(null);
  const usersPagination = usePagination(users, setUsers);
  const locksPagination = usePagination(locks, setLocks); 

  useEffect(() => {
    apiGetRequest('users')
    .then(json => {
      setUsers(json);
    })

    apiGetRequest('locks')
    .then(json => {
      setLocks(json);
    })

  }, []);

  return (
    <div className="Home Layout Layout_columns_2">
      <div className="Page-Title">Управление системой</div>
      <div className="Layout-Column Home-User">
        <div className="Layout-Title">
          Текущий пользователь
        </div>
        { users && users.results.length > 0 && 
          <UserInfo user={users.results[0]}/> 
        }
      </div>
      <div className="Layout-Column Home-Tables">
        <div className="Layout-Title">Аудитории</div>
        {locks && <LockList locks={locks.results} className="Layout-Table" />}
        <button className="Page-Prev" onClick={locksPagination('previous')} > {'<'} </button>
        <button className="Page-Next" onClick={locksPagination('next')}> > </button>        
        <div className="Layout-Title">Пользователи</div>
        {users && <UserList users={users.results} className="Layout-Table" />}
        <button className="Page-Prev" onClick={usersPagination('previous')} > {'<'} </button>
        <button className="Page-Next" onClick={usersPagination('next')}> > </button>
      </div>
    </div>
  );
};

export default Home;
