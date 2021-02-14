import { combineReducers, Reducer, AnyAction } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history) as Reducer<RouterState<any>, AnyAction>,
  });

export default createRootReducer;
