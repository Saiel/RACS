import React, { useEffect, useMemo, useState } from 'react';
import UserInfo from 'components/UserInfo/UserInfo';
import { RouteComponentProps } from 'react-router';
import { API_STR } from 'api/apiRequest';

import './User.scss';
import Card from 'components/Card/Card';

interface UserRoute {
  uId: string;
}

const User: React.FC<RouteComponentProps<UserRoute>> = ({ match: { params: { uId } } }) => {
  const [user, setUser] = useState<User | null>(null);

  const userName = useMemo(() => {
    return user ? `#${user.u_id}: ${user.first_name} ${user.last_name}` : '';
  }, [user]);

  useEffect(() => {
    async function getUser() {
      const response = await fetch(`${API_STR}users/${uId}`);
      const json = await response.json();

      setUser(json);
    }

    getUser();
  }, [uId]);

  return (
    <div className="User Layout Layout_columns_2">
      <div className="Layout-Column User-UserInfo">
        {user && <div className="Page-Title">Пользователь {userName}</div>}
        {user && <Card><UserInfo user={user} /></Card>}
      </div>
      <div className="Layout-Columns User-Tables">
      </div>
    </div>
  );
};

export default User;
