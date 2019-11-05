import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'; 

import './root.css';
import 'components/Typo/Typo.css';
import 'components/Layout/Layout.scss';
import Home from 'components/Home/Home';

const App = () => (
  <div className="Page Typo">
    <HashRouter>
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
      </Switch>
    </HashRouter>
  </div>
);

export default App;