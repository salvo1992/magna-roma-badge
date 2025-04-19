// ✅ 3. Presenze Live Divise per Mansione
// screens/PresenzeLiveScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function PresenzeLiveScreen() {
  const [presenze, setPresenze] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('timbrature_live')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => doc.data());
        setPresenze(data);
      });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Presenze Attuali</Text>
      <FlatList
        data={presenze}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <Text style={styles.row}>🟢 {item.nome} - {item.mansione}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, marginBottom: 10 },
  row: { fontSize: 16, marginVertical: 4 }
});
