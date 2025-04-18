import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const getPresenzeAttive = async () => {
  const q = query(collection(db, 'timbrature'), where('type', '==', 'entrata'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};
