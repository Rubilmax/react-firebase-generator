import { firestoreFunctions } from './utils/firebase';

export const createUser = firestoreFunctions;

if (!!process.env.FUNCTIONS_EMULATOR) {
  console.log('Firebase functions listening!');
}
