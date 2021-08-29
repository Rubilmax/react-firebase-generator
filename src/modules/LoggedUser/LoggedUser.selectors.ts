import { DefaultRootState } from 'react-redux';

import { auth } from 'modules/firebase/auth';

import { selectUser } from 'modules/User/User.selectors';
import { createDeepSelector, identity } from 'services/normalization';

export const selectLoggedUserId = createDeepSelector(
  (state: DefaultRootState) => state.loggedUser.id,
  identity,
);

export const selectLoggedUser = createDeepSelector((state: DefaultRootState) => {
  const loggedUserId = auth.currentUser?.uid;

  return !!loggedUserId ? selectUser(loggedUserId)(state) : undefined;
}, identity);

export const selectLoggedUserEmail = createDeepSelector(
  selectLoggedUser,
  (loggedUser) => loggedUser?.email,
);

export const selectLoggedUserPhoneNumber = createDeepSelector(
  selectLoggedUser,
  (loggedUser) => loggedUser?.phoneNumber,
);

export const selectLoggedUserPhotoURL = createDeepSelector(
  selectLoggedUser,
  (loggedUser) => loggedUser?.photoURL,
);

export const selectLoggedUserMessagingToken = (state: DefaultRootState) =>
  state.loggedUser.messagingToken;

export const selectLoggedUserClaim = <T>(claimId: string) => (state: DefaultRootState) =>
  state.loggedUser.claims && (state.loggedUser.claims[claimId] as T | undefined);
