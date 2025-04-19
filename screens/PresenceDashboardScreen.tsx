// ✅ PresenceDashboardScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import colors from '../assets/colors';
import AppHeaderLogo from '../components/AppHeaderLogo';

export default function PresenceDashboardScreen() {
  const [utenti, setUtenti] = useState([]);
  const [presenti, setPresenti] = useState([]);

  useEffect(() => {
    const load = async () => {
      const usersSnap = await getDocs(collection(db, 'utenti'));
      const timbSnap = await getDocs(collection(db, 'timbrature'));

      const users = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const timbrature = timbSnap.docs.map(doc => doc.data());

      const attivi = timbrature.filter(t => t.type === 'entrata');
      setUtenti(users);
      setPresenti(attivi);
    };
    load();
  }, []);

  const isPresente = (id) => presenti.some(p => p.id === id);

  return (
    <View style={styles.container}>
      <AppHeaderLogo />
      <Text style={styles.title}>Presenze attuali</Text>
      {utenti.map(user => (
        <View key={user.id} style={styles.row}>
          <Text style={{ fontSize: 16 }}>{isPresente(user.id) ? '🟢' : '⚪️'} {user.nome} ({user.ruolo})</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.romaRed, padding: 20 },
  title: { color: colors.romaGold, fontSize: 22, marginBottom: 20 },
  row: { marginVertical: 6 }
});