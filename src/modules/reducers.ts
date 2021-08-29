import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import loggedUserReducer from './LoggedUser/LoggedUser.reducer';
import snackbarReducer from './Snackbar/Snackbar.reducer';
import userReducer from './User/User.reducer';

const createRootReducer = (history: History) =>
  combineReducers({
    users: userReducer,
    loggedUser: loggedUserReducer,
    snackbar: snackbarReducer,
    router: connectRouter(history),
  });

export default createRootReducer;
