import React from 'react';
import compose from 'recompose/compose';
import { connect, DefaultRootState } from 'react-redux';

import * as loggedUserSelectors from 'modules/LoggedUser/LoggedUser.selectors';
import { setLoggedUserClaims } from 'modules/LoggedUser/LoggedUser.actions';

import AppRouter, { Props, OwnProps } from './AppRouter.component';

export const mapStateToProps = (state: DefaultRootState) => ({
  loggedUser: loggedUserSelectors.selectLoggedUser(state),
  isLoggedUserAdmin: loggedUserSelectors.selectLoggedUserClaim<boolean>('admin')(state),
});

export const mapDispatchToProps = { setLoggedUserClaims };

export default compose<Props, OwnProps>(
  connect(mapStateToProps, mapDispatchToProps),
  React.memo,
)(AppRouter);
