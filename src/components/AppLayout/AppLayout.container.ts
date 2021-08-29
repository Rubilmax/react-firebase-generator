import React from 'react';
import compose from 'recompose/compose';
import { connect, DefaultRootState } from 'react-redux';

import * as loggedUserSelectors from 'modules/LoggedUser/LoggedUser.selectors';
import { loginUser, logoutUser } from 'modules/LoggedUser/LoggedUser.actions';

import AppLayout, { Props, OwnProps } from './AppLayout.component';

export const mapStateToProps = (state: DefaultRootState) => ({
  loggedUserId: loggedUserSelectors.selectLoggedUserId(state),
});

export const mapDispatchToProps = {
  loginUser,
  logoutUser,
};

export default compose<Props, OwnProps>(
  connect(mapStateToProps, mapDispatchToProps),
  React.memo,
)(AppLayout);
