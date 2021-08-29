import compose from 'recompose/compose';
import { connect, DefaultRootState } from 'react-redux';

import GoogleOneTap, { Props, OwnProps } from './GoogleOneTap.component';

import { loginOneTap } from 'modules/LoggedUser/LoggedUser.actions';

export const mapStateToProps = (state: DefaultRootState) => ({});

export const mapDispatchToProps = {
  loginOneTap,
};

export default compose<Props, OwnProps>(connect(mapStateToProps, mapDispatchToProps))(GoogleOneTap);
