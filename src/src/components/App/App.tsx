import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'; 

import './root.scss';
import 'components/Typo/Typo.css';
import 'components/Layout/Layout.scss';
import Home from 'components/Home/Home';
import Header from 'components/Header/Header';
import User from 'components/User/User';
import Users from 'components/Users/Users';
import Logs from 'components/Logs/Logs';
import Accesses from 'components/Accesses/Accesses';

const App = () => (
  <HashRouter>
    <Header username="Александр Калентьев" userid={1} />
    <Switch>
      <Route path="/" exact={true}>
        <Home />
      </Route>
      <Route path="/users/:uId" component={User} />
      <Route path="/users/" component={Users} />
      <Route path="/logs/" component={Logs} />
      <Route path="/accesses" component={Accesses} />
    </Switch>
  </HashRouter>
);

export default App;