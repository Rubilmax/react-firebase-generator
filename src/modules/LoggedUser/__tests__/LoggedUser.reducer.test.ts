import { cloneDeep } from 'lodash';

import reducer from '../LoggedUser.reducer';
import { loginUserSuccess } from '../LoggedUser.actions';
import { loggedUserState, defaultLoggedUserState } from './LoggedUser.fixtures';
import * as userFixtures from 'modules/User/__tests__/User.fixtures';

describe('[Reducer] LoggedUser', () => {
  it('should handle updateLoggedUser', () => {
    const initialState = { ...cloneDeep(defaultLoggedUserState) };
    const action = loginUserSuccess(userFixtures.user1.id);
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(loggedUserState);
  });
});
