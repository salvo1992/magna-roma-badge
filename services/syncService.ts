// ✅ syncService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import NetInfo from '@react-native-community/netinfo';

const STORAGE_KEY = 'MAGNA_ROMA_ATTENDANCE';

export const syncToFirebase = async () => {
  const net = await NetInfo.fetch();
  if (!net.isConnected) return;

  try {
    const localData = await AsyncStorage.getItem(STORAGE_KEY);
    const records = localData ? JSON.parse(localData) : [];

    for (const record of records) {
      if (!record.synced) {
        await addDoc(collection(db, 'timbrature'), record);
        record.synced = true;
      }
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    console.log('✅ Dati sincronizzati su Firestore');
  } catch (err) {
    console.error('❌ Errore sync Firebase:', err);
  }
};

// Esempio di uso nel QRScanner o HomeManager:
// import { useEffect } from 'react';
// useEffect(() => { syncToFirebase(); }, []);
