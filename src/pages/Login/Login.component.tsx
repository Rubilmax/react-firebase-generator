import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { firebaseUIConfig, auth } from 'modules/firebase/auth';

export interface OwnProps {}

export interface Props extends OwnProps {}

const Login = (props: Props) => {
  return <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={auth} />;
};

export default Login;
