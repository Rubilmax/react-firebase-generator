import { combineReducers, Reducer, AnyAction } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

import loggedUserReducer from './LoggedUser/LoggedUser.reducer';

const createRootReducer = (history: History) =>
  combineReducers({
    loggedUser: loggedUserReducer,
    router: connectRouter(history) as Reducer<RouterState<any>, AnyAction>,
  });

export default createRootReducer;
