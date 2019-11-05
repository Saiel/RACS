import React, { PropsWithChildren } from 'react';

import { UserSchema } from 'store/schema';
import ModelField from 'components/ModelField/ModelField';

export interface UserProps {
  user: User
}

const UserInfo: React.FC<PropsWithChildren<UserProps>> = ({ user }) => {
  return (
    <div className="Flex">
      { UserSchema.map((field) => 
          <ModelField key={field[0]} field={field[1]} value={user[field[0]]}/>
      ) }
    </div>
  );
};

export default UserInfo;