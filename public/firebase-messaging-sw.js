/**
 * This is a fallback service worker for development purposes ONLY.
 */

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

const firebaseApp = initializeApp({});

const messaging = getMessaging(firebaseApp);
