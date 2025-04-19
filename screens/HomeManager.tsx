import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../assets/colors';
import AppHeaderLogo from '../components/AppHeaderLogo';

export default function HomeManager() {
  const navigation = useNavigation<any>();


  return (
    <View style={styles.container}>
      <AppHeaderLogo />
      <Text style={styles.title}>Dashboard Direzione</Text>
      <Text style={styles.subtitle}>Benvenuto nella dashboard direzione</Text>

      <Button title="📅 Calendario Presenze" onPress={() => navigation.navigate('Calendar')} color={colors.romaGold} />
      <Button title="📊 Storico & PDF" onPress={() => navigation.navigate('ExportPDF')} color={colors.romaGold} />
      <Button title="🧾 Timbrature Giornata" onPress={() => navigation.navigate('History')} color={colors.romaGold} />
      <Button title="📡 Scanner Tablet" onPress={() => navigation.navigate('ScannerTablet')} color={colors.romaGold} />
      <Button title="👥 Presenze Live" onPress={() => navigation.navigate('PresenzeLive')} color={colors.romaGold} />
      <Button title="🔔 Notifiche" onPress={() => navigation.navigate('Notifications')} color={colors.romaGold} />
      <Button title="⚙️ Impostazioni" onPress={() => navigation.navigate('Settings')} color={colors.romaGold} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.romaRed,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: colors.romaGold,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 30,
  },
});

