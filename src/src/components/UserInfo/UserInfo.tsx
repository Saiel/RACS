import React, { PropsWithChildren } from 'react';

import { User } from 'store/types';
import Flex, { FlexItem } from 'components/Flex/Flex';

export interface UserProps {
  user: User
}

const UserInfo: React.FC<PropsWithChildren<UserProps>> = ({ user }) => {
  return (
    <Flex direction='column'>
     <FlexItem>{user.first_name}</FlexItem> 
     <FlexItem>{user.last_name}</FlexItem> 
     <FlexItem>{user.email}</FlexItem> 
     <FlexItem>{user.card_id}</FlexItem> 
     <FlexItem>{user.role}</FlexItem> 
    </Flex>
  );
};


export default UserInfo;