import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import colors from '../assets/colors';
import AppHeaderLogo from '../components/AppHeaderLogo';
import { collection, addDoc, onSnapshot, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function NotificationsScreen() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = onSnapshot(
      collection(db, 'utenti', user.uid, 'notifiche'),
      (snapshot) => {
        setNotifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    );

    return () => unsubscribe();
  }, [user]);

  const invia = async () => {
    if (user.role !== 'direzione') return;
    if (!message) return Alert.alert('Messaggio vuoto');

    try {
      const utentiSnapshot = await getDocs(query(collection(db, 'utenti'), where('role', '==', 'dipendente')));
      const promises = utentiSnapshot.docs.map(doc =>
        addDoc(collection(db, 'utenti', doc.id, 'notifiche'), {
          message,
          timestamp: new Date(),
        })
      );

      await Promise.all(promises);
      Alert.alert('Inviato!');
      setMessage('');
    } catch (error) {
      Alert.alert('Errore', error.message);
    }
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

