import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { User } from 'store/types';

import Flex, { FlexItem } from 'components/Flex/Flex';
import UserInfo from 'components/UserInfo/UserInfo';
import { apiGetRequest } from 'api/apiRequest';

const Home = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    apiGetRequest('users')
    .then(json => {
      setUser(json.results[0]);
    })
    .catch((error) => {
      console.log(error);
      setUser(null);
    })
  }, []);

  return (
    <Flex direction={'row'}>
      <FlexItem>
        { user && <UserInfo user={user} /> }
      </FlexItem>
      <FlexItem>
        <Link to="/users">Список пользователей</Link>
        <Link to="/locks">Список замков</Link>
      </FlexItem>
    </Flex>
  );
};

export default Home;
