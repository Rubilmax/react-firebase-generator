import 'firebase/firestore';

import { firebase } from '.';
import { isLocalhost } from 'services/navigation';

const firestore = firebase.firestore();

if (isLocalhost) {
  firestore.useEmulator('localhost', 8080);
}

export const documentId = firebase.firestore.FieldPath.documentId();
export const FieldValue = firebase.firestore.FieldValue;

const converter = <T extends object>(): firebase.firestore.FirestoreDataConverter<WithId<T>> => ({
  toFirestore: (withIdData: WithId<T>) => {
    const { id, ...data } = withIdData;

    return data;
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options) as T;

    return {
      ...data,
      id: snapshot.id,
    };
  },
});

export const collection = <T extends object>(refPath: string) =>
  firestore.collection(refPath).withConverter(converter<T>());
export const document = <T extends object>(refPath: string) =>
  firestore.doc(refPath).withConverter(converter<T>());

type DocumentData<T extends object> = {
  [P in keyof T]: T[P] extends object & Exclude<T[P], any[]>
    ? DocumentData<T[P]>
    : T[P] | firebase.firestore.FieldValue;
};

export const add = <T extends object>(refPath: string, value: DocumentData<WithoutId<T>>) => () =>
  collection<T>(refPath)
    .add(value as any) // the converter will add id and history properties anyway
    .then((docRef) => docRef.id);

export const get = <T extends object>(refPath: string) => () =>
  document<T>(refPath)
    .get()
    .then((snapshot) => snapshot.data());

export const set = <T extends object>(refPath: string, value: DocumentData<WithoutId<T>>) => () =>
  document<T>(refPath).set(value as any); // the converter will add id and history properties anyway

export const fetch = <T extends object>(query: firebase.firestore.Query<T>) => () =>
  query
    .withConverter(converter<T>())
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data()));

export const update = <T extends object>(
  refPath: string,
  value: Partial<DocumentData<WithoutId<T>>>,
) => () =>
  document<T>(refPath).set(
    value as any, // the converter will add id and history properties anyway
    { merge: true }, // using set + merge to preserve object's structure when calling this function and allow nested delete
  );

export const remove = (refPath: string) => () => document(refPath).delete();
