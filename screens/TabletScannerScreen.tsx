// ✅ 1. TabletScannerScreen.tsx
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import QRScanner from '../components/QRScanner';
import colors from '../assets/colors';

export default function TabletScannerScreen() {
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'direzione@magna.it' && password === '1234') {
      setAuthenticated(true);
    } else {
      alert('Credenziali non valide');
    }
  };

  if (!authenticated) {
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Accesso Direzione</Text>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
        <Button title="Accedi" onPress={handleLogin} />
      </View>
    );
  }

  return <QRScanner />;
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: colors.romaRed,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    color: colors.romaGold,
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10
  }
});







