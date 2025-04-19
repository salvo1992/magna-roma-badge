// ✅ LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import colors from '../assets/colors';
import { authenticateBiometric, getSavedCredentials } from '../services/biometricAuth';
import AppHeaderLogo from '../components/AppHeaderLogo';

export default function LoginScreen() {
  const { login } = useAuth();
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [key, setKey] = useState('');

  const handleBiometricLogin = async () => {
    const success = await authenticateBiometric();
    if (success) {
      const creds = await getSavedCredentials();
      if (creds.email && creds.password) {
        login(creds.email, creds.password);
      } else {
        Alert.alert('Errore', 'Credenziali non trovate. Accedi manualmente una volta.');
      }
    } else {
      Alert.alert('Errore', 'Autenticazione biometrica fallita.');
    }
  };

  const handleLogin = () => {
    login(email, password, showKeyInput ? key : undefined);
  };

  return (
    <View style={styles.container}>
      <AppHeaderLogo />
      <Text style={styles.title}>Benvenuto</Text>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      {showKeyInput && (
        <TextInput
          style={styles.input}
          placeholder="Chiave Direzione"
          keyboardType="numeric"
          maxLength={10}
          onChangeText={setKey}
          value={key}
        />
      )}

      <Button title="Accedi" onPress={handleLogin} color={colors.romaGold} />

      <View style={{ marginVertical: 10 }}>
        <Button title="Accedi con impronta" onPress={handleBiometricLogin} color="#555" />
      </View>

      <TouchableOpacity onPress={() => setShowKeyInput(!showKeyInput)}>
        <Text style={styles.registerText}>{showKeyInput ? '🔒 Nascondi campo Direzione' : '🔑 Accesso Direzione'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerLink}>
        <Text style={styles.registerText}>Non hai un account? Registrati</Text>
      </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.romaGold,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: '#fff',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 10
  },
});

