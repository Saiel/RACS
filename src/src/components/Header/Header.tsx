import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

interface HeaderProps {
  username: string;
  userid: number;
}

const Header: React.FC<HeaderProps> = ({ username, userid }) => {
  return (
    <div className="Header">
      <div className="Header-Logo">СКУД</div>
      <div className="Header-User">
        <Link to={`/users/${userid}`}>({username})</Link>
      </div>
      <div className="Header-Nav">
        <div className="Header-Link">
          <Link to="/">Управление</Link>
        </div>
        <div className="Header-Link">
          <Link to="/users">Пользователи</Link>
        </div>
        <div className="Header-Link">
          <Link to="/locks">Замки</Link>
        </div>
        <div className="Header-Link">
          <Link to="/access">Доступы</Link>
        </div>
        <div className="Header-Link">
          <Link to="/logs">Журнал</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
