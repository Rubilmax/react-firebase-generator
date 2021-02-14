import { DefaultRootState } from 'react-redux';

export const selectLoggedUserId = (state: DefaultRootState) => state.loggedUser.id;

export const selectLoggedUserEmail = (state: DefaultRootState) => state.loggedUser.email;

export const selectLoggedUserPhoneNumber = (state: DefaultRootState) =>
  state.loggedUser.phoneNumber;

export const selectLoggedUserDisplayName = (state: DefaultRootState) =>
  state.loggedUser.displayName;
