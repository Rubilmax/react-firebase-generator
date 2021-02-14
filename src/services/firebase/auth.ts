import React from 'react';
import firebase from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';

import { auth } from 'modules/firebase/auth';
import * as loginActions from 'modules/LoggedUser/LoggedUser.actions';
import { selectLoggedUserId } from 'modules/LoggedUser/LoggedUser.selectors';

export const useAuth = () => {
  const dispatch = useDispatch();
  const loggedUserId = useSelector(selectLoggedUserId);
  const isLogged = !!loggedUserId;

  // handle Firebase Auth state
  React.useEffect(() => {
    auth.onAuthStateChanged((user: firebase.User | null) => {
      if (!!user && !isLogged) dispatch(loginActions.loginUser(user));
      else if (!user && isLogged) dispatch(loginActions.logoutUser());
    });
  }, [dispatch, isLogged]);

  return isLogged;
};
