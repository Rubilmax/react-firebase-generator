import * as admin from 'firebase-admin';
import * as firebaseFunctions from 'firebase-functions';

import { getMessagingDoc } from '../types/MessagingProfile';
import { appUrl, notificationIconUrl } from './constants';

admin.initializeApp();

export const auth = admin.auth();
export const database = admin.database();
export const firestore = admin.firestore();
export const messaging = admin.messaging();
export const bucket = admin.storage().bucket();
export const functions = firebaseFunctions
  .region('europe-west2')
  .runWith({ memory: '128MB', timeoutSeconds: 10 });

export const documentId = admin.firestore.FieldPath.documentId();
export const FieldValue = admin.firestore.FieldValue;

export interface DocumentData<T> extends FirebaseFirestore.DocumentData {
  data: () => T;
}

export const sendMulticastNotification = async (
  tokens: string[],
  title: string,
  body: string,
  path: string = '/',
) =>
  messaging.sendMulticast({
    tokens,
    webpush: {
      notification: {
        title,
        body,
        icon: notificationIconUrl,
      },
      fcmOptions: {
        link: appUrl + path,
      },
    },
  });

export const sendNotification = async (
  userId: string,
  title: string,
  body: string,
  path: string = '/',
) => {
  const messagingProfile = await getMessagingDoc(userId);
  if (!messagingProfile) return;

  const messagingTokens = messagingProfile.data()!.tokens;

  if (messagingTokens.length > 0) {
    await sendMulticastNotification(messagingTokens, title, body, path);
  }
};
