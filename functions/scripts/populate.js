const admin = require('firebase-admin');

admin.initializeApp({ projectId: 'projet-r-app' });

const firestore = admin.firestore();

const populate = async () => {
  const batch = firestore.batch();

  const actionsCollection = firestore.collection('actions');
  const cluesCollection = firestore.collection('clues');

  const actionsSnapshot = await actionsCollection.get();
  const cluesSnapshot = await cluesCollection.get();

  actionsSnapshot.docs.forEach((doc) => batch.delete(doc.ref));
  cluesSnapshot.docs.forEach((doc) => batch.delete(doc.ref));

  require('./actions.json').forEach((action) => batch.create(actionsCollection.doc(), action));

  const clues = require('./clues.json');
  Object.keys(clues).forEach((clueId) =>
    batch.set(firestore.doc(`clues/${clueId}`), clues[clueId]),
  );

  await batch.commit();
};

populate();
