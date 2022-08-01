import React, { useState, useEffect } from 'react';
import UserDashboard from './components/UserDashboard';
import { Route, Switch } from 'react-router-dom';
import CovidDashboard from './components/CovidDashboard';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <CovidDashboard />
        </Route>
        <Route path="/user_dashboard">
          <UserDashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
