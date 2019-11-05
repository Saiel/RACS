import React from 'react';
import Table from 'components/Table/Table';

const userFields = [
  'ID', 'Имя', 'Фамилия', 'Email', 'ID карточки', 'Роль',
];

const UserListRow: React.FC<{ user: User }> = ({ user }) => {
  return (
    <React.Fragment>
      <div className="User-ID">{user.u_id}</div>
      <div className="User-FirstName">{user.first_name}</div>
      <div className="User-LastName">{user.last_name}</div>
      <div className="User-Email">{user.email}</div>
      <div className="User-CardID">{user.card_id}</div>
      <div className="User-Role">{user.role}</div>
    </React.Fragment>
  )
};

interface UserListProps {
  users: User[];
  className?: string;
}

const UserList: React.FC<UserListProps> = ({ users, className = '' }) => {
  const userList = users.map((user) => <UserListRow key={user.u_id} user={user} />);

  return (
    <div className={`UserList ${className}`}>
      <Table entries={userList} headerFields={userFields} />
    </div>
  )
};

export default UserList;