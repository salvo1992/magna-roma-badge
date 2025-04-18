import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const saveUserToFirestore = async (uid, userData) => {
  try {
    await setDoc(doc(db, 'utenti', uid), userData);
    console.log('✅ Utente salvato su Firestore');
  } catch (err) {
    console.error('❌ Errore salvataggio utente:', err);
  }
};
