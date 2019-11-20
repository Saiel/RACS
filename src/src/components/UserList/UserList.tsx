import React from 'react';
import Table from 'components/Table/Table';
import { Link } from 'react-router-dom';

const userFields = [
  'ID', 'Имя', 'Фамилия', 'Email', 'ID карточки', 'Роль',
];

const UserListRow: React.FC<{ user: User; onDelete?: deleteFn }> = ({ user, onDelete }) => {
  return (
    <React.Fragment>
      <div className="User-ID">{user.u_id}</div>
      <div className="User-FirstName">{user.first_name}</div>
      <div className="User-LastName">{user.last_name}</div>
      <div className="User-Email">{user.email}</div>
      <div className="User-CardID">{user.card_id}</div>
      <div className="User-Role">{user.role}</div>
      { onDelete && <button onClick={(e) => { e.preventDefault(); onDelete(user.u_id); }} className="Btn Btn_danger">Удалить</button>}
    </React.Fragment>
  )
};

interface UserListProps {
  users: User[];
  className?: string;
  onDelete?: deleteFn;
}

const UserList: React.FC<UserListProps> = ({ users, className = '', onDelete }) => {
  return (
    <div className={`UserList ${className}`}>
      <div className="Table">
        <div className="Table-Row Table-Header">
          {userFields.map((field, idx) =>
            <div className="Table-Item" key={idx}>{field}</div>
          )}
        </div>
        {users.map((user) => {
          return (
            <Link className="BlockLink BlockLink_primary" to={`/users/${user.u_id}`} key={user.u_id}><div className="Table-Row">
              <UserListRow onDelete={onDelete} user={user} />
            </div></Link>
          )
        })
        }
      </div>
    </div>
  )
};

export default UserList;