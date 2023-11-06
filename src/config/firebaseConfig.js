import { initializeApp } from "firebase/app";

const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const firebaseAuthDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const firebaseProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const firebaseStorageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const firebaseMessagingSenderId = import.meta.env
  .VITE_FIREBASE_MESSAGING_SENDER_ID;
const firebaseAppid = import.meta.env.VITE_FIREBASE_APP_ID;
const firebaseMeasurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId: firebaseAppid,
  measurementId: firebaseMeasurementId,
};

const app = initializeApp(firebaseConfig);

export default app;
