import React from 'react';
import compose from 'recompose/compose';
import { connect, DefaultRootState } from 'react-redux';

import Login, { Props, OwnProps } from './Login.component';

import { selectLoggedUserEmail } from 'modules/LoggedUser/LoggedUser.selectors';

export const mapStateToProps = (state: DefaultRootState) => ({
  loggedUserEmail: selectLoggedUserEmail(state),
});

export const mapDispatchToProps = {};

export default compose<Props, OwnProps>(
  connect(mapStateToProps, mapDispatchToProps),
  React.memo,
)(Login);
