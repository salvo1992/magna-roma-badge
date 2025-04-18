import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const getTimbratureByPeriodo = async (periodo: 'giorno' | 'settimana' | 'mese') => {
  const now = new Date();
  const snapshot = await getDocs(collection(db, 'timbrature'));
  const dati = snapshot.docs.map(doc => doc.data());

  return dati.filter(record => {
    const ts = new Date(record.timestamp);
    if (periodo === 'giorno') {
      return ts.toDateString() === now.toDateString();
    } else if (periodo === 'settimana') {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return ts >= weekStart && ts <= weekEnd;
    } else if (periodo === 'mese') {
      return ts.getMonth() === now.getMonth() && ts.getFullYear() === now.getFullYear();
    }
    return false;
  });
};
