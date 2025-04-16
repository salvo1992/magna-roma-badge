import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import colors from '../assets/colors';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const { login } = useAuth();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [role, setRole] = useState<'dipendente' | 'direzione'>('dipendente');

  const handleLogin = () => {
    if (name.trim() !== '') {
      login({ id: Date.now().toString(), name, role });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Magna Roma</Text>

      <TextInput
        placeholder="Nome"
        placeholderTextColor="#ccc"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TouchableOpacity
        style={[styles.button, role === 'dipendente' && styles.selected]}
        onPress={() => setRole('dipendente')}
      >
        <Text style={styles.buttonText}>Dipendente</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, role === 'direzione' && styles.selected]}
        onPress={() => setRole('direzione')}
      >
        <Text style={styles.buttonText}>Direzione</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Accedi</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Non hai un account? Registrati</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.romaRed, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.romaGold, textAlign: 'center', marginBottom: 40 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: colors.romaDark,
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  selected: {
    backgroundColor: colors.romaOrange,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: colors.romaGold,
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  loginText: {
    color: colors.romaRed,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
