import React, { useEffect, useState } from 'react';
import usePagination from 'hooks/usePagination';
import UserInfo from 'components/UserInfo/UserInfo';
import LockList from 'components/LockList/LockList';
import UserList from 'components/UserList/UserList';
import { APIResponse } from 'api/apiRequest';

import './Home.scss';
import { getUsers, getLocks } from 'api';
import Pagination from 'components/Pagination/Pagination';


const Home = () => {
  const [locks, setLocks] = useState<APIResponse<Lock> | null>(null);
  const [users, setUsers] = useState<APIResponse<User> | null>(null);
  const usersPagination = usePagination(users, setUsers);
  const locksPagination = usePagination(locks, setLocks);

  useEffect(() => {
    async function loadData() {
      const [usersData, locksData] = await Promise.all([getUsers(), getLocks()]);
      setUsers(usersData);
      setLocks(locksData);
    }

    loadData();
  }, []);

  return (
    <div className="Home Layout Layout_columns_2">
      <div className="Page-Title">Управление системой</div>
      <div className="Layout-Column Home-User">
        <div className="Layout-Title">
          Текущий пользователь
        </div>
        {/* {users && users.results.length > 0 &&
          <UserInfo user={users.results[0]} />
        } */}
      </div>
      <div className="Layout-Column Home-Tables">
        <div className="Layout-Title">Аудитории</div>
        {locks &&
           <div className="Layout-Table" >
            <LockList locks={locks.results} />
            <Pagination paginationFn={locksPagination} state={locks} />
          </div>
        }
        <div className="Layout-Title">Пользователи</div>
        {users &&
          <div className="Layout-Table" >
            <UserList users={users.results} />
            <Pagination paginationFn={usersPagination} state={users} />
          </div>
        }
      </div>
    </div>
  );
};

export default Home;
