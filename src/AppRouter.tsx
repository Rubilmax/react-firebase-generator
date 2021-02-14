import React from 'react';
import { Switch, Route } from 'react-router';

import Home from 'pages/Home';

const AppRouter = () => (
  <Switch>
    <Route path="/" component={Home} />
  </Switch>
);

export default AppRouter;
