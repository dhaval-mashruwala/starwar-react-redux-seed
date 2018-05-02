import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Detail from './pages/detail';
/* Configure routes of the application */
const Routes = () => (
  <div className="App">
    <Switch>
    	<Route exact path='/' component={ Dashboard } />
    	<Route exact path='/:movieID' component={ Detail } />
      <Redirect from="/" to="/" />
    </Switch>
  </div>
)

export default Routes;
