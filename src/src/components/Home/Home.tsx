import React, { useEffect, useState } from 'react';
import usePagination from 'hooks/usePagination';
import UserInfo from 'components/UserInfo/UserInfo';
import LockList from 'components/LockList/LockList';
import UserList from 'components/UserList/UserList';
import { APIResponse } from 'api/apiRequest';
import { faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './Home.scss';
import { getUsers, getLocks } from 'api';
import Pagination from 'components/Pagination/Pagination';
import { RouteComponentProps } from 'react-router';


const Home: React.FC<RouteComponentProps<{}>> = ({ history }) => {
  const [locks, setLocks] = useState<APIResponse<Lock> | null>(null);
  const [users, setUsers] = useState<APIResponse<User> | null>(null);
  const [loadError, setLoadError] = useState<Error | null>(null);
  const usersPagination = usePagination(users, setUsers);
  const locksPagination = usePagination(locks, setLocks);

  useEffect(() => {
    void async function loadData() {
      try {
        const [usersData, locksData] = await Promise.all([getUsers(), getLocks()]);
        setUsers(usersData);
        setLocks(locksData);
      } catch (error) {
        setLoadError(error); 
      }
    }();
  }, []);

  if (loadError) {
    throw loadError;
  }

  return (
    <div className="Home Layout Layout_columns_2">
      <div className="Layout-Column Home-User">
        <div className="Layout-Title">
          
        </div>
        {/* {users && users.results.length > 0 &&
          <UserInfo user={users.results[0]} />
        } */}
      </div>
      
      <div className="Layout-Column Home-Tables">
        <div className="Page-Title"><span><FontAwesomeIcon icon={faLockOpen}/> Аудитории</span></div>
        {locks &&
           <div className="Layout-Table" >
            <LockList locks={locks.results} />
            <Pagination paginationFn={locksPagination} state={locks} />
          </div>
        }
        <div className="Page-Title"><span><FontAwesomeIcon icon={faUsers}/> Пользователи</span></div>
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
