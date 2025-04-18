// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDwK4e9sKrfksM2bBFvZ859MMIYTBWKvE",
  authDomain: "magna-roma-badge.firebaseapp.com",
  projectId: "magna-roma-badge",
  storageBucket: "magna-roma-badge.firebasestorage.app",
  messagingSenderId: "485600322094",
  appId: "1:485600322094:web:9a42f0b20bc07b47a735bf",
  measurementId: "G-YWRF2X0QTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);