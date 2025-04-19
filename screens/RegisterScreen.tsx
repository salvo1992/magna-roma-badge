import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import colors from '../assets/colors';
import AppHeaderLogo from '../components/AppHeaderLogo';

const DIREZIONE_KEY = '1234567890';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [ruolo, setRuolo] = useState('');
  const [chiave, setChiave] = useState('');

  const handleRegister = () => {
    const isDirezione = chiave === DIREZIONE_KEY;

    register({
      email,
      password,
      nome,
      ruolo,
      isDirezione,
    });
  };

  return (
    <View style={styles.container}>
      <AppHeaderLogo />
      <Text style={styles.title}>Benvenuto</Text>
      <Text style={styles.title}>Registrazione</Text>

      <TextInput style={styles.input} placeholder="Nome completo" onChangeText={setNome} value={nome} />
      <TextInput style={styles.input} placeholder="Ruolo / Reparto" onChangeText={setRuolo} value={ruolo} />
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} secureTextEntry value={password} />

      <TextInput
        style={styles.input}
        placeholder="Chiave Direzione (solo se applicabile)"
        onChangeText={setChiave}
        value={chiave}
        keyboardType="numeric"
      />

      <Button title="Registrati" onPress={handleRegister} color={colors.romaGold} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.romaRed, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.romaGold, textAlign: 'center', marginBottom: 30 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});


