import firebase from 'firebase/app';
import { createAction } from '@reduxjs/toolkit';

export const loginUser = createAction<firebase.User>('LOGIN_USER');

export const logoutUser = createAction('LOGOUT_USER');
