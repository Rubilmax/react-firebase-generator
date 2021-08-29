import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SnackbarStack from 'components/SnackbarStack';
import AppLayout from 'components/AppLayout';

import { store, persistor, history } from 'modules/store';
import createAppTheme from 'services/theme';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MuiThemeProvider theme={createAppTheme()}>
        <SnackbarStack>
          <ConnectedRouter history={history}>
            <CssBaseline />
            <AppLayout />
          </ConnectedRouter>
        </SnackbarStack>
      </MuiThemeProvider>
    </PersistGate>
  </Provider>
);

export default App;
