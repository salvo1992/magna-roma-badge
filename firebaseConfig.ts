// firebaseConfig.ts
import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDDwK4e9sKrfksM2bBFvZ859MMIYTBWKvE",
  authDomain: "magna-roma-badge.firebaseapp.com",
  projectId: "magna-roma-badge",
  storageBucket: "magna-roma-badge.appspot.com",
  messagingSenderId: "485600322094",
  appId: "1:485600322094:web:9a42f0b20bc07b47a735bf",
  measurementId: "G-YWRF2X0QTQ"
};

export const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
 
export {  db };
