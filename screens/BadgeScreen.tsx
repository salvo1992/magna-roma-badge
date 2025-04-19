import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useAuth } from '../context/AuthContext';
import colors from '../assets/colors';

export default function BadgeScreen() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎫 Il Mio Badge</Text>

      <View style={styles.card}>
        <Image source={{ uri: user.foto || 'https://via.placeholder.com/100' }} style={styles.avatar} />
        <Text style={styles.name}>{user.nome}</Text>
        <Text style={styles.role}>{user.ruolo}</Text>

        <QRCode value={user.uid} size={180} backgroundColor="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.romaRed,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    color: colors.romaGold,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    marginBottom: 15,
  },
});
