import React from 'react';

import { auth } from 'modules/firebase/auth';

import { mapStateToProps, mapDispatchToProps } from './GoogleOneTap.container';
import { StyledContainer } from './GoogleOneTap.style';

declare var google: any;

type StateProps = ReturnType<typeof mapStateToProps>;

type DispatchProps = typeof mapDispatchToProps;

export interface OwnProps {}

export interface Props extends StateProps, DispatchProps, OwnProps {}

const GoogleOneTap = ({ loginOneTap }: Props) => {
  React.useEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        if (google) {
          if (!user) {
            google.accounts.id.initialize({
              client_id: process.env.REACT_APP_GOOGLE_ONE_TAP_CLIENT_ID,
              callback: ({ credential }: { credential: string }) => loginOneTap(credential),
              prompt_parent_id: 'google_one_tap_container',
              cancel_on_tap_outside: false,
              context: 'signin',
            });

            google.accounts.id.prompt();
          } else google.accounts.id.cancel();
        }
      }),
    [loginOneTap],
  );

  return <StyledContainer id="google_one_tap_container"></StyledContainer>;
};

export default GoogleOneTap;
