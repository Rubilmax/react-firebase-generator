import firebaseui from 'firebaseui';
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';

export const auth = getAuth();

auth.useDeviceLanguage();

export const firebaseUIConfig: firebaseui.auth.Config = {
  // Redirect flow instead of popup because popup not working on iOS standalone / Messenger browser
  signInFlow: 'redirect',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
    },
  ],
};
