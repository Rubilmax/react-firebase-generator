import React from 'react';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { store, persistor, history } from 'modules/store';
import createTheme from 'services/theme';

import AppRouter from './AppRouter';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MuiThemeProvider theme={createTheme()}>
        <ConnectedRouter history={history}>
          <Helmet titleTemplate="React App - %s" defaultTitle="React App" />
          <CssBaseline />
          <AppRouter />
        </ConnectedRouter>
      </MuiThemeProvider>
    </PersistGate>
  </Provider>
);

export default App;
