import NetInfo from '@react-native-community/netinfo';
import { db } from '../firebaseConfig'; // Firebase Web SDK
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { getOfflineTimbrature, clearOfflineTimbrature } from './offlineStorage';

export const syncTimbratureToFirestore = async () => {
  const net = await NetInfo.fetch();
  if (!net.isConnected) return;

  const offline = await getOfflineTimbrature();
  if (offline.length === 0) return;

  const batch = writeBatch(db); // db importato da firebaseConfig

  offline.forEach((item) => {
    const ref = doc(collection(db, 'timbrature'));
    batch.set(ref, item);
  });

  try {
    await batch.commit();
    await clearOfflineTimbrature();
    console.log('✅ Timbrature sincronizzate con successo.');
  } catch (err) {
    console.error('❌ Errore durante la sincronizzazione:', err);
  }
};



