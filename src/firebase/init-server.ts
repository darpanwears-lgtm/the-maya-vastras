
import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// This file is intended for server-side use only.
// It initializes Firebase Admin and returns the SDKs.
// It should not be imported into any client-side code.

let firebaseApp: FirebaseApp;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
} else {
  firebaseApp = getApp();
}

const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export function initializeFirebase() {
  return { firebaseApp, firestore, auth };
}
