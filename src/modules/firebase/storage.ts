import 'firebase/storage';

import { firebase } from '.';

const storage = firebase.storage();

export const getAllUrls = (refPath: string) => () =>
  storage
    .ref(refPath)
    .list()
    .then((result) => Promise.all(result.items.map((item) => item.getDownloadURL())));

export const getUrl = (refPath: string) => () => storage.ref(refPath).getDownloadURL();

export const remove = (refPath: string) => () => storage.ref(refPath).delete();
