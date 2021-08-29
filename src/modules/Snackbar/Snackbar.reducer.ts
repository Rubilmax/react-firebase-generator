import { createReducer } from '@reduxjs/toolkit';

import * as actions from './Snackbar.actions';
import { SnackbarState } from './Snackbar.types';

const initialState: SnackbarState = {
  message: '',
  variant: 'default',
  duration: -1,
};

export default createReducer<SnackbarState>(initialState, {
  [actions.openSnackbar.type]: (
    state: SnackbarState,
    {
      payload: { variant = 'default', duration, ...snackbar },
    }: ReturnType<typeof actions.openSnackbar>,
  ): SnackbarState => ({
    ...state,
    ...snackbar,
    variant,
    duration: duration ?? snackbar.message.length * 66,
  }),
  [actions.resetSnackbar.type]: (state: SnackbarState): SnackbarState => ({
    ...state,
    message: '',
    variant: 'default',
    duration: -1,
  }),
});
