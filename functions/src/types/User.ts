import { firestore } from '../utils/firebase';

export interface UserInfos {
  displayName: string | null;
  nickname: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
}

export interface User extends UserInfos {}

export const getUserDoc = async (userId: string) => {
  const userDocSnapshot = await firestore.doc(`users/${userId}`).get();

  if (!userDocSnapshot.exists) return;

  return userDocSnapshot as FirebaseFirestore.DocumentSnapshot<User>;
};
