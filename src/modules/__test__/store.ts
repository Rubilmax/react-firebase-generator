import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import configureMockStore from 'redux-mock-store';

export default configureMockStore([routerMiddleware(createBrowserHistory())]);
