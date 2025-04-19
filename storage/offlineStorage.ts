// ✅ offlineStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const OFFLINE_KEY = 'timbrature_offline';

export const saveTimbraturaOffline = async (record) => {
  try {
    const stored = await AsyncStorage.getItem(OFFLINE_KEY);
    const list = stored ? JSON.parse(stored) : [];
    list.push(record);
    await AsyncStorage.setItem(OFFLINE_KEY, JSON.stringify(list));
  } catch (error) {
    console.error('Errore salvataggio offline:', error);
  }
};

export const getOfflineTimbrature = async () => {
  const stored = await AsyncStorage.getItem(OFFLINE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const clearOfflineTimbrature = async () => {
  await AsyncStorage.removeItem(OFFLINE_KEY);
};