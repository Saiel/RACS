import React, { ErrorInfo } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import './root.scss';
import 'components/Typo/Typo.css';
import 'components/Layout/Layout.scss';
import Home from 'components/Home/Home';
import Header from 'components/Header/Header';
import User from 'components/User/User';
import Users from 'components/Users/Users';
import Logs from 'components/Logs/Logs';
import Locks from 'components/Locks/Locks';
import Lock from 'components/Lock/Lock';
import { Auth } from 'components/Auth/Auth';

interface BoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<{}, BoundaryState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error | null, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="Error">
          <h1 className="Heading">Ошибка при получении данных</h1>
        </div>
      )
    }

    return this.props.children;
  }
}

const App = () => (
  <HashRouter>
    <ErrorBoundary>
      <Header />
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact={true} component={Home} />
        <Route path="/users/:uId" component={User} />
        <Route path="/users/" component={Users} />
        <Route path="/logs/" component={Logs} />
        <Route path="/locks/:lockId" component={Lock} />
        <Route path="/locks/" component={Locks} />
      </Switch>
    </ErrorBoundary>
  </HashRouter>
);

export default App;
