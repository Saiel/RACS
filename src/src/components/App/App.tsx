import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'; 

import Home from 'components/Home/Home';

const App = () => (
  <HashRouter>
    <Switch>
      <Route path="/" exact={true}>
        <Home />
      </Route>
    </Switch>
  </HashRouter>
);

export default App;