import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { auth } from '../firebaseConfig';
import { updateEmail, updatePassword } from 'firebase/auth';

import colors from '../assets/colors';
import AppHeaderLogo from '../components/AppHeaderLogo';
import { useLanguage } from '../context/LanguageContext';

export default function SettingsScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { language, setLanguage } = useLanguage();

  const user = auth.currentUser;

  const handleChangeEmail = async () => {
    try {
      if (email && user) {
        await updateEmail(user, email);
        Alert.alert('✅ Email aggiornata con successo');
        setEmail('');
      }
    } catch (error: any) {
      Alert.alert('Errore', error.message);
    }
  };

  const handleChangePassword = async () => {
    try {
      if (password && user) {
        await updatePassword(user, password);
        Alert.alert('✅ Password aggiornata con successo');
        setPassword('');
      }
    } catch (error: any) {
      Alert.alert('Errore', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeaderLogo />
      <Text style={styles.title}>⚙️ Impostazioni Account</Text>

      <TextInput
        placeholder="Nuova Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Button title="Aggiorna Email" onPress={handleChangeEmail} color={colors.romaGold} />

      <TextInput
        placeholder="Nuova Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Aggiorna Password" onPress={handleChangePassword} color={colors.romaGold} />

      <Text style={styles.language}>🌐 Lingua attiva</Text>
      <Picker
        selectedValue={language}
        style={styles.picker}
        onValueChange={(itemValue) => setLanguage(itemValue)}
      >
        <Picker.Item label="🇮🇹 Italiano" value="it" />
        <Picker.Item label="🇬🇧 English" value="en" />
        <Picker.Item label="🇫🇷 Français" value="fr" />
        <Picker.Item label="🇪🇸 Español" value="es" />
        <Picker.Item label="🇩🇪 Deutsch" value="de" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.romaRed,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: colors.romaGold,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  language: {
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
});

