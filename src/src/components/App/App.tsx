import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'; 

import './root.scss';
import 'components/Typo/Typo.css';
import 'components/Layout/Layout.scss';
import Home from 'components/Home/Home';
import Header from 'components/Header/Header';

const App = () => (
  <HashRouter>
    <Header username="Александр Калентьев" userid={0} />
    <Switch>
      <Route path="/" exact={true}>
        <Home />
      </Route>
    </Switch>
  </HashRouter>
);

export default App;