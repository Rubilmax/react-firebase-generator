import React from 'react';
import { Switch, Route } from 'react-router';

import Login from 'pages/Login';

import { useAuth } from 'services/firebase/auth';

const AppRouter = () => {
  useAuth();

  return (
    <Switch>
      <Route path="/" component={Login} />
    </Switch>
  );
};

export default AppRouter;
