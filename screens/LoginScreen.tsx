import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import colors from '../assets/colors';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  const { login } = useAuth();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Magna Roma</Text>

      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} secureTextEntry />
      <Button title="Accedi" onPress={() => login(email, password)} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerLink}>
        <Text style={styles.registerText}>Non hai un account? Registrati</Text>
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
  registerButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: colors.romaDark,
    borderRadius: 8,
  },
  
  registerText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: 15,
  },
});

export default LoginScreen;
