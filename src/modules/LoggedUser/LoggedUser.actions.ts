import { User, IdTokenResult } from 'firebase/auth';
import { createAction } from '@reduxjs/toolkit';

export const loginUser = createAction<User>('LOGIN_USER');
export const loginOneTap = createAction<string>('LOGIN_ONE_TAP_REQUEST');

export const logoutUser = createAction('LOGOUT_USER');
export const logoutUserSuccess = createAction('LOGOUT_USER_SUCCESS');

export const registerLoggedUserMessagingToken = createAction(
  'REGISTER_LOGGED_USER_MESSAGING_TOKEN_REQUEST',
);
export const registerLoggedUserMessagingTokenSuccess = createAction<string>(
  'REGISTER_LOGGED_USER_MESSAGING_TOKEN_SUCCESS',
);

export const unregisterLoggedUserMessagingToken = createAction(
  'UNREGISTER_LOGGED_USER_MESSAGING_TOKEN_REQUEST',
);
export const unregisterLoggedUserMessagingTokenSuccess = createAction(
  'UNREGISTER_LOGGED_USER_MESSAGING_TOKEN_SUCCESS',
);

export const setLoggedUserClaims = createAction<IdTokenResult['claims']>('SET_LOGGED_USER_CLAIMS');
