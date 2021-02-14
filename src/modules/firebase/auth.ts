import 'firebase/auth';

import { firebase } from '.';

import routes from 'App.routes';

export const auth = firebase.auth();

auth.useDeviceLanguage();

export const firebaseUIConfig = {
  // Redirect flow instead of popup because popup not working on iOS standalone / Messenger browser
  signInFlow: 'redirect',
  // Redirect to / after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: routes.home(),
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
};
