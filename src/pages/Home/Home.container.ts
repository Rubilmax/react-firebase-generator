import React from 'react';
import compose from 'recompose/compose';
import { connect, DefaultRootState } from 'react-redux';

import Home, { Props, OwnProps } from './Home.component';

import { selectLoggedUserEmail } from 'modules/LoggedUser/LoggedUser.selectors';
import { logoutUser } from 'modules/LoggedUser/LoggedUser.actions';

export const mapStateToProps = (state: DefaultRootState) => ({
  loggedUserEmail: selectLoggedUserEmail(state),
});

export const mapDispatchToProps = {
  logoutUser,
};

export default compose<Props, OwnProps>(
  connect(mapStateToProps, mapDispatchToProps),
  React.memo,
)(Home);
