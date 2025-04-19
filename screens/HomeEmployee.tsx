import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../assets/colors';
import AppHeaderLogo from '../components/AppHeaderLogo';

export default function HomeEmployee() {
  const navigation = useNavigation<any>();


  return (
    <View style={styles.container}>
      <AppHeaderLogo />
      <Text style={styles.title}>Benvenuto Dipendente</Text>
      <Text style={styles.subtitle}>Visualizza i tuoi dati personali e presenze</Text>
      <Button title="🎫 Il mio Badge" onPress={() => navigation.navigate('Badge')} color={colors.romaGold} />
      <Button title="📅 Calendario Presenze" onPress={() => navigation.navigate('Calendar')} color={colors.romaGold} />
      <Button title="🔔 Notifiche" onPress={() => navigation.navigate('Notifications')} color={colors.romaGold} />
      <Button title="📷 Scannerizza il tuo Badge" onPress={() => navigation.navigate('QRScanner')} color={colors.romaGold} />
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
