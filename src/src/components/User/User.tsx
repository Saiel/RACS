import React, { useEffect, useMemo, useState } from 'react';
import UserInfo from 'components/UserInfo/UserInfo';
import { RouteComponentProps } from 'react-router';
import { API_STR } from 'api/apiRequest';

import './User.scss';
import Card from 'components/Card/Card';
import AccessList from 'components/AccessList/AccessList';

interface UserRoute {
  uId: string;
}

const User: React.FC<RouteComponentProps<UserRoute>> = ({ match: { params: { uId } } }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userAccessList, setUserAccessList] = useState<LockAccess[]>([]);

  const userName = useMemo(() => {
    return user ? `#${user.u_id}: ${user.first_name} ${user.last_name}` : '';
  }, [user]);

  useEffect(() => {
    async function getUser() {
      const response = await fetch(`${API_STR}users/${uId}`);
      const json = await response.json();

      setUser(json);
    }

    async function getUserAccessList() {
      const response = await fetch(`${API_STR}accesses/?u_id=${uId}`);
      const json = await response.json();
      console.log(json.results);
      setUserAccessList(json.results);
    }

    getUser();
    getUserAccessList();
  }, [uId]);

  return (
    <div className="User Layout Layout_columns_2">
      <div className="Page-Title">Пользователь {userName}</div>
      <div className="Layout-Column User-UserInfo">
        {user && <Card><UserInfo user={user} /></Card>}
      </div>
      <div className="Layout-Columns User-Tables">
        <div className="Layout-Title">Доступы пользователя</div>
        <AccessList accesses={userAccessList} className="Layout-Table" />
      </div>
    </div>
  );
};

export default User;
