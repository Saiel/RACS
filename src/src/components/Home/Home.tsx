import React, { useEffect, useState } from 'react';

import UserInfo from 'components/UserInfo/UserInfo';
import LockList from 'components/LockList/LockList';
import UserList from 'components/UserList/UserList';
import { apiGetRequest } from 'api/apiRequest';

import './Home.scss';

const Home = () => {
  const [locks, setLocks] = useState<Lock[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    apiGetRequest('users')
    .then(json => {
      setUsers(json.results);
    })

    apiGetRequest('locks')
    .then(json => {
      setLocks(json.results);
    })

  }, []);

  return (
    <div className="Home Layout Layout_columns_2">
      <div className="Layout-Column Home-User">
        { users.length > 0 && <React.Fragment>
          <div className="Typo Typo_h3">Текущий пользователь: {users[0].first_name} {users[0].last_name}</div>
          <UserInfo user={users[0]}/> 
        </React.Fragment> }
      </div>
      <div className="Layout-Column Home-Tables">
        <div className="Layout-Title Typo Typo_h3">Аудитории</div>
        <LockList locks={locks} className="Layout-Table" />
        <div className="Layout-Title Typo Typo_h3">Пользователи</div>
        <UserList users={users} />
      </div>
    </div>
  );
};

export default Home;
