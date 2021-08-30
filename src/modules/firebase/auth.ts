import { getAuth } from 'firebase/auth';

import { firebaseApp } from '.';

export const auth = getAuth(firebaseApp);

auth.useDeviceLanguage();
