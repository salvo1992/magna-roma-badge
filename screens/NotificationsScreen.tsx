import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { sendNotification, listenToNotifications } from '../services/notificationsService';
import firestore from '@react-native-firebase/firestore';
import colors from '../assets/colors';
import AppHeaderLogo from '../components/AppHeaderLogo';

export default function NotificationsScreen() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = listenToNotifications(user.uid, setNotifications);
    return unsubscribe;
  }, [user]);

  const invia = async () => {
    if (user.role !== 'direzione') return;
    if (!message) return Alert.alert('Messaggio vuoto');

    // Esempio: invio a tutti i dipendenti registrati (semplificato per test)
    const utentiSnapshot = await firestore().collection('utenti').where('role', '==', 'dipendente').get();
    const promises = utentiSnapshot.docs.map(doc => sendNotification(doc.id, message));
    await Promise.all(promises);
    Alert.alert('Inviato!');
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <AppHeaderLogo />
      {user.role === 'direzione' && (
        <View>
          <Text style={styles.title}>Invia Notifica</Text>
          <TextInput
            style={styles.input}
            placeholder="Scrivi un messaggio..."
            value={message}
            onChangeText={setMessage}
          />
          <Button title="Invia" onPress={invia} color={colors.romaGold} />
        </View>
      )}

      <Text style={styles.subtitle}>Notifiche Ricevute</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.message}>📣 {item.message}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.romaRed },
  title: { fontSize: 20, marginBottom: 10, color: colors.romaGold },
  subtitle: { fontSize: 18, marginTop: 30, marginBottom: 10, color: '#fff' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
});


