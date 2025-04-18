import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import colors from '../assets/colors';

export default function NotificationsScreen() {
  const [message, setMessage] = useState('');
  const [notifiche, setNotifiche] = useState([]);

  const inviaNotifica = async () => {
    if (message.trim().length > 0) {
      await addDoc(collection(db, 'notifiche'), {
        testo: message,
        createdAt: new Date().toISOString()
      });
      setMessage('');
    }
  };

  useEffect(() => {
    const q = query(collection(db, 'notifiche'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, snapshot => {
      setNotifiche(snapshot.docs.map(doc => doc.data()));
    });
    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifiche</Text>
      <TextInput
        placeholder="Scrivi una notifica"
        value={message}
        onChangeText={setMessage}
        style={styles.input}
      />
      <Button title="Invia notifica" onPress={inviaNotifica} />

      <FlatList
        data={notifiche}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.msg}>🔔 {item.testo}</Text>
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.romaRed, padding: 20 },
  title: { fontSize: 22, color: colors.romaGold, marginBottom: 20 },
  input: { backgroundColor: '#fff', padding: 10, marginBottom: 10 },
  msg: { color: '#fff', marginVertical: 5, fontSize: 16 }
});

