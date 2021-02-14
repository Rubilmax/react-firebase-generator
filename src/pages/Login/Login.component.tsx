import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Typography from '@material-ui/core/Typography';

import { mapStateToProps, mapDispatchToProps } from './Login.container';

import { firebaseUIConfig, auth } from 'modules/firebase/auth';

type StateProps = ReturnType<typeof mapStateToProps>;

type DispatchProps = typeof mapDispatchToProps;

export interface OwnProps {}

export interface Props extends StateProps, DispatchProps, OwnProps {}

const Login = ({ loggedUserEmail }: Props) => {
  return !!loggedUserEmail ? (
    <Typography>Bienvenue {loggedUserEmail} !</Typography>
  ) : (
    <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />
  );
};

export default Login;
