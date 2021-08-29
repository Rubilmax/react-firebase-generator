const admin = require('firebase-admin');

admin.initializeApp({ projectId: 'firebase-app' });

const firestore = admin.firestore();

const populate = async () => {
  const batch = firestore.batch();

  await batch.commit();
};

populate();
