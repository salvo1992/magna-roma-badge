// ✅ syncWithFirestore.ts
import NetInfo from '@react-native-community/netinfo';
import firestore from '@react-native-firebase/firestore';
import { getOfflineTimbrature, clearOfflineTimbrature } from './offlineStorage';

export const syncTimbratureToFirestore = async () => {
  const net = await NetInfo.fetch();
  if (!net.isConnected) return;

  const offline = await getOfflineTimbrature();
  if (offline.length === 0) return;

  const batch = firestore().batch();
  offline.forEach((item) => {
    const ref = firestore().collection('timbrature').doc();
    batch.set(ref, item);
  });

  try {
    await batch.commit();
    await clearOfflineTimbrature();
    console.log('Timbrature sincronizzate con Firestore.');
  } catch (err) {
    console.error('Errore durante la sincronizzazione:', err);
  }
};

