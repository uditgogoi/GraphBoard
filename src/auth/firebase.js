import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider,onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { useGraphStore } from "../store";
import {useRouter} from 'vue-router';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const googleAuthProvider= new GoogleAuthProvider();
export { firebaseApp,googleAuthProvider,db,auth,onAuthStateChanged };
