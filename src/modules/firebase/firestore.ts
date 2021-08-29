import {
  getFirestore,
  connectFirestoreEmulator,
  FirestoreDataConverter,
  serverTimestamp,
  Query,
  collection as firestoreCollection,
  collectionGroup as firestoreCollectionGroup,
  doc,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  getDocs,
  WithFieldValue,
  PartialWithFieldValue,
} from 'firebase/firestore';

import { isLocalhost } from 'services/navigation';

import { auth } from './auth';

const firestore = getFirestore();
if (isLocalhost) connectFirestoreEmulator(firestore, 'localhost', 8080);

const converter = <T extends object>(): FirestoreDataConverter<WithHistory<WithId<T>>> => ({
  toFirestore: (withIdData: WithFieldValue<WithHistory<WithId<T>>>) => {
    const { id, ...data } = withIdData;
    const loggedUserId = auth.currentUser?.uid;

    return {
      ...data,
      lastUpdatedAt: serverTimestamp(),
      ...(!!loggedUserId && { lastUpdatedBy: loggedUserId }),
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);

    const dates = Object.keys(data)
      .filter((key) => key.endsWith('At'))
      .reduce(
        (acc, key) => ({
          ...acc,
          ...(!!data[key] &&
            typeof data[key].toDate === 'function' && {
              [key]: data[key].toDate().toISOString(),
            }),
        }),
        {},
      );

    return {
      ...data,
      ...dates,
      id: snapshot.id,
    } as WithHistory<WithId<T>>;
  },
});

export const collection = <T extends object>(refPath: string) =>
  firestoreCollection(firestore, refPath).withConverter(converter<T>());
export const collectionGroup = <T extends object>(refPath: string) =>
  firestoreCollectionGroup(firestore, refPath).withConverter(converter<T>());
export const document = <T extends object>(refPath: string) =>
  doc(firestore, refPath).withConverter(converter<T>());

export const add = <T extends object>(refPath: string, value: WithFieldValue<T>) => async () => {
  const docRef = await addDoc(collection<T>(refPath), value);
  const doc = await getDoc(docRef);

  return { ...doc.data(), id: docRef.id };
};

export const get = <T extends object>(refPath: string) => () =>
  getDoc(document<T>(refPath)).then((snapshot) => snapshot.data());

export const set = <T extends object>(refPath: string, value: WithFieldValue<T>) => () =>
  setDoc(document<T>(refPath), value);

export const fetch = <T extends object>(query: Query<T>) => () =>
  getDocs(query).then((snapshot) => snapshot.docs.map((doc) => doc.data()));

export const update = <T extends object>(refPath: string, value: PartialWithFieldValue<T>) => () =>
  setDoc(
    document<T>(refPath),
    value,
    { merge: true }, // using set + merge to preserve object's structure when calling this function and allow nested delete
  );

export const remove = (refPath: string) => () => deleteDoc(document(refPath));
