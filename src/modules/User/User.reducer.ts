import { createReducer } from '@reduxjs/toolkit';

import * as actions from './User.actions';

import { normalize } from 'services/normalization';

const initialState: UserState = {
  byIds: {},
};

export default createReducer<UserState>(initialState, {
  [actions.fetchUsersSuccess.type]: (
    state: UserState,
    action: ReturnType<typeof actions.fetchUsersSuccess>,
  ): UserState => {
    const newByIds = normalize({ users: action.payload }).entities.users ?? {};

    return {
      ...state,
      byIds: newByIds,
    };
  },
});
