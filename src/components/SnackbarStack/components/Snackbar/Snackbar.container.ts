import React from 'react';
import compose from 'recompose/compose';
import { connect, DefaultRootState } from 'react-redux';

import * as snackbarSelectors from 'modules/Snackbar/Snackbar.selectors';
import { resetSnackbar } from 'modules/Snackbar/Snackbar.actions';

import Snackbar, { Props, OwnProps } from './Snackbar.component';

export const mapStateToProps = (state: DefaultRootState) => ({
  snackbar: snackbarSelectors.selectSnackbarData(state),
});

export const mapDispatchToProps = { resetSnackbar };

export default compose<Props, OwnProps>(
  connect(mapStateToProps, mapDispatchToProps),
  React.memo,
)(Snackbar);
