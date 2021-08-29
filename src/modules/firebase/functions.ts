import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallable,
  HttpsCallable,
} from 'firebase/functions';

import { store } from 'modules/store';
import { openSnackbar } from 'modules/Snackbar/Snackbar.actions';
import { isLocalhost } from 'services/navigation';

import { firebaseApp } from '.';

const functions = getFunctions(firebaseApp, 'europe-west2');
if (isLocalhost) connectFunctionsEmulator(functions, 'localhost', 5001);

const handleCallable = async <T>(callable: HttpsCallable<T, any>, requestData?: T) => {
  const { data } = await callable(requestData);

  if (data?.message) {
    store.dispatch(openSnackbar(data));
  }

  return data?.variant === 'success' || data;
};

const getCallable = <T>(callableName: string) => {
  const callable = httpsCallable<T, any>(functions, callableName);

  return async (data?: T) => handleCallable(callable, data);
};

const getEmptyCallable = <T>(callableName: string) => {
  const callable = httpsCallable<T, any>(functions, callableName);

  return async () => handleCallable(callable);
};

// export const emptyCallable = getEmptyCallable('emptyCallable');
// export const callable = getCallable<{
//   param: string;
// }>('callable');
