import { createReducer } from '@reduxjs/toolkit';

import * as actions from './LoggedUser.actions';

const initialState: LoggedUserState = {};

export default createReducer<LoggedUserState>(initialState, {
  [actions.loginUser.type]: (
    state: LoggedUserState,
    { payload: { uid } }: ReturnType<typeof actions.loginUser>,
  ): LoggedUserState => ({
    ...state,
    id: uid,
  }),
  [actions.logoutUser.type]: (state: LoggedUserState): LoggedUserState => initialState,
  [actions.registerLoggedUserMessagingTokenSuccess.type]: (
    state: LoggedUserState,
    action: ReturnType<typeof actions.registerLoggedUserMessagingTokenSuccess>,
  ): LoggedUserState => ({
    ...state,
    messagingToken: action.payload,
  }),
  [actions.unregisterLoggedUserMessagingTokenSuccess.type]: (
    state: LoggedUserState,
    action: ReturnType<typeof actions.unregisterLoggedUserMessagingTokenSuccess>,
  ): LoggedUserState => ({
    ...state,
    messagingToken: undefined,
  }),
  [actions.setLoggedUserClaims.type]: (
    state: LoggedUserState,
    { payload }: ReturnType<typeof actions.setLoggedUserClaims>,
  ): LoggedUserState => ({
    ...state,
    claims: payload,
  }),
});
