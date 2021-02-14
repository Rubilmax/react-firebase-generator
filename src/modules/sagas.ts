import { all } from 'redux-saga/effects';

import loggedUserSaga from './LoggedUser/LoggedUser.saga';

export default function* rootSaga() {
  yield all([loggedUserSaga()]);
}
