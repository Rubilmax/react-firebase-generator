import React from 'react';
import { Switch, Route } from 'react-router';

import Home from 'pages/Home';
import Login from 'pages/Login';

import { useAuth } from 'services/firebase/auth';

const AppRouter = () => {
  const isLogged = useAuth();

  return (
    <Switch>
      {!isLogged ? <Route path="/" component={Login} /> : <Route path="/" component={Home} />}
    </Switch>
  );
};

export default AppRouter;
