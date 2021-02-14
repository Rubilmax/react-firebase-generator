import { call, takeLeading } from 'redux-saga/effects';

import * as actions from './LoggedUser.actions';

import { firebase } from 'modules/firebase';

function* logoutUser(action: ReturnType<typeof actions.logoutUser>) {
  yield call(() => firebase.auth().signOut());
}

export default function* userSaga() {
  yield takeLeading(actions.logoutUser, logoutUser);
}
