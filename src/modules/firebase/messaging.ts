import { getMessaging, getToken, isSupported } from 'firebase/messaging';

import { serviceWorkerRegistration } from 'serviceWorkerUtils';

import { firebaseApp } from '.';

export const getMessagingToken = async () => {
  const messaging = (await isSupported()) && getMessaging(firebaseApp);
  if (!messaging) return;

  return getToken(messaging, {
    vapidKey:
      'BOQjLpJ0JkxGQCBlDWjBDIQ0A9M4joKJXvmSOyZacGjWa9zhk6GLdClO5lGn1X_Q7SXRDRAmvRbMaEZaNY5KdnU',
    serviceWorkerRegistration,
  }).catch(() => '');
};
