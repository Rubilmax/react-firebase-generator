import { createReducer } from '@reduxjs/toolkit';

import * as actions from './LoggedUser.actions';

const initialState: LoggedUserState = {};

export default createReducer<LoggedUserState>(initialState, {
  [actions.loginUser.type]: (
    state: LoggedUserState,
    { payload: { uid, email } }: ReturnType<typeof actions.loginUser>,
  ): LoggedUserState => ({
    ...state,
    id: uid,
    email: email!,
  }),
  [actions.logoutUser.type]: (): LoggedUserState => ({
    id: undefined,
    email: undefined,
  }),
});
