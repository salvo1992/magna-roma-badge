// ✅ services/userService.ts
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Salva un nuovo utente
export const saveUserToFirestore = async (
  uid: string,
  data: {
    nome: string;
    ruolo: string;
    email: string;
    createdAt: string;
    isDirezione?: boolean; // Nuovo campo per la direzione
  }
) => {
  const ref = doc(db, 'utenti', uid);
  await setDoc(ref, data);
};

// ✅ Recupera il ruolo utente da Firestore
export const getUserRoleFromFirestore = async (uid: string): Promise<string | null> => {
  const ref = doc(db, 'utenti', uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data()?.ruolo ?? null;
  }
  return null;
};

export const getUserDataFromFirestore = async (uid: string) => {
  const ref = doc(db, 'utenti', uid);
  const snapshot = await getDoc(ref);
  if (snapshot.exists()) {
    return snapshot.data();
  }
  return null;
};

