import React from 'react';
import compose from 'recompose/compose';
import { connect, DefaultRootState } from 'react-redux';

import SnackbarStack, { Props, OwnProps } from './SnackbarStack.component';

export const mapStateToProps = (state: DefaultRootState) => ({});

export const mapDispatchToProps = {};

export default compose<Props, OwnProps>(
  connect(mapStateToProps, mapDispatchToProps),
  React.memo,
)(SnackbarStack);
