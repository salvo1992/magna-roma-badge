import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'MAGNA_ROMA_ATTENDANCE';

export type AttendanceRecord = {
  id: string;
  type: 'entrata' | 'uscita';
  timestamp: string;
};

export const saveAttendance = async (record: AttendanceRecord) => {
  try {
    const existing = await AsyncStorage.getItem(STORAGE_KEY);
    const data: AttendanceRecord[] = existing ? JSON.parse(existing) : [];

    data.push(record);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Errore nel salvataggio della timbratura:', error);
  }
};

export const getAttendance = async (): Promise<AttendanceRecord[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Errore nel caricamento timbrature:', error);
    return [];
  }
};
