
// ✅ SettingsScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import colors from '../assets/colors';

export default function SettingsScreen() {
  const [email, setEmail] = useState('user@magna.it');
  const [password, setPassword] = useState('123456');
  const [biometric, setBiometric] = useState(false);

  const checkBiometric = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (compatible) {
      setBiometric(true);
      alert('Accesso biometrico attivato');
    } else {
      alert('Biometrico non supportato sul dispositivo');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Impostazioni Account</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Accesso biometrico</Text>
        <Switch value={biometric} onValueChange={checkBiometric} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.romaRed },
  title: { color: colors.romaGold, fontSize: 20, marginBottom: 20 },
  input: { backgroundColor: '#fff', padding: 10, marginBottom: 10 },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  label: { color: '#fff', marginRight: 10 }
});
