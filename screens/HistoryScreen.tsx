import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getAttendance, AttendanceRecord } from '../storage/attendanceStorage';
import colors from '../assets/colors';

const HistoryScreen = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getAttendance();
      // Ordina dal più recente al più vecchio
      setRecords(data.reverse());
    };
    load();
  }, []);

  const renderItem = ({ item }: { item: AttendanceRecord }) => {
    const date = new Date(item.timestamp);
    const formattedDate = date.toLocaleString('it-IT');

    return (
      <View style={styles.card}>
        <Text style={styles.id}>ID: {item.id}</Text>
        <Text style={styles.type}>
          Tipo: {item.type === 'entrata' ? 'Entrata 🟢' : 'Uscita 🔴'}
        </Text>
        <Text style={styles.time}>{formattedDate}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Storico Timbrature</Text>
      <FlatList
        data={records}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Nessuna timbratura trovata.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.romaRed,
    padding: 20
  },
  title: {
    color: colors.romaGold,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  id: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.romaRed
  },
  type: {
    fontSize: 14,
    marginTop: 4
  },
  time: {
    fontSize: 12,
    color: '#555',
    marginTop: 2
  },
  empty: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 30
  }
});

export default HistoryScreen;
