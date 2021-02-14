import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

export const auth = admin.auth();
export const bucket = admin.storage().bucket();
export const firestore = admin.firestore();
export const firestoreFunctions = functions.region('europe-west2').firestore;

export const documentId = admin.firestore.FieldPath.documentId();
export const FieldValue = admin.firestore.FieldValue;
