// ✅ CalendarScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { getTimbratureByPeriodo } from '../services/attendanceService';
import colors from '../assets/colors';
import { useNavigation } from '@react-navigation/native';
import AppHeaderLogo from '../components/AppHeaderLogo';

export default function CalendarScreen() {
  const [timbrature, setTimbrature] = useState([]);
  const [periodo, setPeriodo] = useState<'giorno' | 'settimana' | 'mese'>('mese');
  const [totaleOre, setTotaleOre] = useState(0);
  const navigation = useNavigation();

  const load = async () => {
    const dati = await getTimbratureByPeriodo(periodo);
    setTimbrature(dati);

    const totale = dati
      .filter(r => r.type === 'uscita' && r.durataOre)
      .reduce((acc, val) => acc + parseFloat(val.durataOre || '0'), 0);
    setTotaleOre(totale);
  };

  useEffect(() => {
    load();
  }, [periodo]);

  return (
    <View style={styles.container}>
      <AppHeaderLogo />
      <Text style={styles.title}>Calendario Presenze</Text>
      <View style={styles.filterRow}>
        <Button title="Giorno" onPress={() => setPeriodo('giorno')} />
        <Button title="Settimana" onPress={() => setPeriodo('settimana')} />
        <Button title="Mese" onPress={() => setPeriodo('mese')} />
      </View>
      <Text style={styles.total}>Totale ore lavorate: {totaleOre.toFixed(2)}</Text>
      <FlatList
        data={timbrature}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>📅 {new Date(item.timestamp).toLocaleDateString()} - {item.type} - {item.id}</Text>
        )}
      />

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backText}>🔙 Torna alla Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.romaRed },
  title: { fontSize: 24, color: colors.romaGold, marginBottom: 20 },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  item: { fontSize: 16, color: '#fff', marginBottom: 10 },
  total: { fontSize: 18, color: '#fff', marginBottom: 10 },
  backBtn: { marginTop: 20, alignItems: 'center' },
  backText: { color: '#fff', fontSize: 16, textDecorationLine: 'underline' }
});

