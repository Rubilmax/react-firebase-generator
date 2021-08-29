import { select, put, call, takeLeading, delay } from 'redux-saga/effects';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { arrayUnion, arrayRemove } from 'firebase/firestore';

import * as actions from './LoggedUser.actions';
import * as selectors from './LoggedUser.selectors';
import * as snackbarActions from 'modules/Snackbar/Snackbar.actions';

import { auth } from 'modules/firebase/auth';
import * as messaging from 'modules/firebase/messaging';
import * as firestore from 'modules/firebase/firestore';

function* loginOneTap(action: ReturnType<typeof actions.loginOneTap>) {
  yield call(() => signInWithCredential(auth, GoogleAuthProvider.credential(action.payload)));
}

function* logoutUser(action: ReturnType<typeof actions.logoutUser>) {
  yield call(() => auth.signOut());
}

function* updateMessagingToken(loggedUserId: string) {
  const messagingToken: false | string = yield call(messaging.getMessagingToken);
  if (!messagingToken) {
    yield put(
      snackbarActions.openSnackbar({
        message:
          'Tu dois activer les notifications pour ce site dans les paramètres de ton navigateur',
        variant: 'warning',
      }),
    );

    return;
  }

  const currentMessagingToken: string | undefined = yield select(
    selectors.selectLoggedUserMessagingToken,
  );
  if (messagingToken !== currentMessagingToken) {
    yield call(
      firestore.update<MessagingProfile>(`messaging/${loggedUserId}`, {
        tokens: arrayUnion(messagingToken),
      }),
    );

    yield put(actions.registerLoggedUserMessagingTokenSuccess(messagingToken));
  }
}

function* registerLoggedUserMessagingToken(
  action: ReturnType<typeof actions.registerLoggedUserMessagingToken>,
) {
  const loggedUserId = auth.currentUser?.uid;
  if (!loggedUserId) return;

  const oldPermission = window.Notification.permission;
  if (oldPermission === 'default') {
    yield put(
      snackbarActions.openSnackbar({
        message: `Pour être notifié en temps réel, autorise le site à afficher des notifications`,
        variant: 'warning',
      }),
    );

    yield delay(800);
  }

  yield call(updateMessagingToken, loggedUserId);

  const newPermission = window.Notification.permission;
  if (newPermission === 'granted' && newPermission !== oldPermission) {
    const notification = new window.Notification('Nouvelle notification', {
      body: 'Voici comment tu seras notifié des informations importantes',
      icon: `${process.env.REACT_APP_URL}/img/r-192x192-transparent.png`,
    });

    setTimeout(notification.close.bind(notification), 5000);
  }
}

function* unregisterLoggedUserMessagingToken(
  action: ReturnType<typeof actions.unregisterLoggedUserMessagingToken>,
) {
  const loggedUserId = auth.currentUser?.uid;
  if (!loggedUserId) return;

  const messagingToken: string | undefined = yield select(selectors.selectLoggedUserMessagingToken);
  if (!!messagingToken) {
    yield call(
      firestore.update<MessagingProfile>(`messaging/${loggedUserId}`, {
        tokens: arrayRemove(messagingToken),
      }),
    );
  }

  yield put(actions.unregisterLoggedUserMessagingTokenSuccess());
}

export default function* userSaga() {
  yield takeLeading(actions.loginOneTap, loginOneTap);
  yield takeLeading(actions.logoutUser, logoutUser);
  yield takeLeading(actions.registerLoggedUserMessagingToken, registerLoggedUserMessagingToken);
  yield takeLeading(actions.unregisterLoggedUserMessagingToken, unregisterLoggedUserMessagingToken);
}
