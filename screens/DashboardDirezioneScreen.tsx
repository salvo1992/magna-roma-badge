import React, { useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Clock from '../components/Clock';
import { useNavigation } from '@react-navigation/native';
import colors from '../assets/colors';
import { getPresenzeAttive } from '../services/presenceService';
import { useFocusEffect } from '@react-navigation/native';

export default function DashboardDirezioneScreen() {
  const navigation = useNavigation();

  const [presenze, setPresenze] = useState([]);

useFocusEffect(
  useCallback(() => {
    getPresenzeAttive().then(setPresenze);
  }, [])
);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🏛 Magna Roma</Text>
      <Clock />
      <Text style={styles.title}>Dashboard Direzione</Text>
      <Text style={styles.subtitle}>Dipendenti presenti ora:</Text>
{presenze.map((p, i) => (
  <Text key={i} style={{ color: 'lightgreen' }}>🟢 {p.id}</Text>
))}
      <View style={styles.buttons}>
        <Button title="Storico ingressi/uscite" onPress={() => navigation.navigate('History')} />
        <View style={styles.spacer} />
        <Button title="Esporta PDF" onPress={() => navigation.navigate('ExportPDF')} />
        <View style={styles.spacer} />
        <Button title="Scanner Ingressi" onPress={() => navigation.navigate('TabletScanner')} />
      </View>

      {/* 🔜 Sezione presenze live, grafici e notifiche */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.romaRed,
    padding: 20,
    justifyContent: 'flex-start'
  },
  logo: {
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    color: colors.romaGold,
    marginBottom: 20,
    textAlign: 'center'
  },
  buttons: {
    marginTop: 10
  },
  spacer: {
    height: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10
  }
});
