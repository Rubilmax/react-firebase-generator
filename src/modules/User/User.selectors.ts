import { DefaultRootState } from 'react-redux';

import { denormalize, createDeepSelector, identity } from 'services/normalization';

export const selectUsersByIds = createDeepSelector(
  (state: DefaultRootState) => state.users.byIds,
  identity,
);

export const selectUser = (id: string) => (state: DefaultRootState) => selectUsers([id])(state)[0];

export const selectUsers = (ids: string[]) => (state: DefaultRootState) =>
  denormalize(
    { users: ids },
    {
      users: selectUsersByIds(state),
    },
  ).users!;
