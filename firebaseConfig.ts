// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ✅ Se sei su Expo Go, usa solo questi
const firebaseConfig = {
  apiKey: "AIzaSyDDwK4e9sKrfksM2bBFvZ859MMIYTBWKvE",
  authDomain: "magna-roma-badge.firebaseapp.com",
  projectId: "magna-roma-badge",
  storageBucket: "magna-roma-badge.appspot.com",
  messagingSenderId: "485600322094",
  appId: "1:485600322094:web:9a42f0b20bc07b47a735bf",
  measurementId: "G-YWRF2X0QTQ"
};

const app = initializeApp(firebaseConfig);

// ✅ Auth classico (compatibile con Expo Go)
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
