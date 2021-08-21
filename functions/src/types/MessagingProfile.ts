import { firestore } from '../utils/firebase';

export interface MessagingProfile {
  tokens: string[];
}

export const getMessagingDoc = async (userId: string) => {
  const messagingDocSnapshot = await firestore.doc(`messaging/${userId}`).get();
  if (!messagingDocSnapshot.exists) return;

  return messagingDocSnapshot as FirebaseFirestore.DocumentSnapshot<MessagingProfile>;
};
