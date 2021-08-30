import { getStorage, ref, list, deleteObject, getDownloadURL } from 'firebase/storage';

import { firebaseApp } from '.';

const storage = getStorage(firebaseApp);

export const getAllUrls = (refPath: string) => () =>
  list(ref(storage, refPath)).then((result) =>
    Promise.all(result.items.map((item) => getDownloadURL(item))),
  );

export const getUrl = (refPath: string) => () => getDownloadURL(ref(storage, refPath));

export const remove = (refPath: string) => () => deleteObject(ref(storage, refPath));
