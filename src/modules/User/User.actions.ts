import { createAction } from '@reduxjs/toolkit';

export const fetchUsersSuccess = createAction<WithId<IUser>[]>('FETCH_USERS_SUCCESS');
