import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { collection, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import colors from '../assets/colors';
import AppHeaderLogo from '../components/AppHeaderLogo';

export default function PresenzeLiveScreen() {
  const [presenze, setPresenze] = useState<DocumentData[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'timbrature_live'),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setPresenze(data);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <AppHeaderLogo />
      <Text style={styles.title}>Benvenuto</Text>
      <Text style={styles.title}>Presenze Attuali</Text>
      <FlatList
        data={presenze}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <Text style={styles.row}>
            📍 {item.nome} – {item.mansione}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.romaRed,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    color: colors.romaGold,
    textAlign: 'center',
  },
  row: {
    fontSize: 16,
    marginVertical: 4,
  },
});
