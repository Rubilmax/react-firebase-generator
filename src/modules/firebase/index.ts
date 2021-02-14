import firebase from 'firebase/app';
import 'firebase/analytics';

firebase.initializeApp({
  apiKey: 'AIzaSyD7WYsDFg_6URXpGcCYIhof7GUS8tlPILU',
  authDomain: 'projet-r-app.firebaseapp.com',
  projectId: 'projet-r-app',
  storageBucket: 'projet-r-app.appspot.com',
  messagingSenderId: '665975257015',
  appId: '1:665975257015:web:b5ce4a5e7fdb8ab8e6da32',
  measurementId: 'G-M7HTR90SEN',
});
firebase.analytics();

export { firebase };
