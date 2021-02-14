import * as userFixtures from 'modules/User/__tests__/User.fixtures';

export const loggedUserState: LoggedUserState = {
  id: userFixtures.user1.id,
  isOnline: true,
  isLogged: true,
  balances: [],
};

export const defaultLoggedUserState: LoggedUserState = {
  isOnline: true,
  isLogged: false,
  balances: [],
};
