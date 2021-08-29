import { createAction } from '@reduxjs/toolkit';

import { SnackbarData } from './Snackbar.types';

export const openSnackbar = createAction<SnackbarData>('SNACKBAR_OPEN');

export const resetSnackbar = createAction('SNACKBAR_RESET');
