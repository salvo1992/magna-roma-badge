import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { getAttendance } from '../storage/attendanceStorage';
import colors from '../assets/colors';

export default function ExportPDFScreen() {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    // Carica tutti i dati per ora (poi filtreremo per range)
    const loadData = async () => {
      const data = await getAttendance();
      setFiltered(data.reverse());
    };
    loadData();
  }, []);

  const generatePDF = async () => {
    if (filtered.length === 0) {
      Alert.alert('Nessun dato disponibile per l’esportazione');
      return;
    }

    const rows = filtered.map(record => {
      const date = new Date(record.timestamp).toLocaleString('it-IT');
      return `
        <tr>
          <td>${record.id}</td>
          <td>${record.type}</td>
          <td>${date}</td>
          <td>${record.durataOre || '-'}</td>
        </tr>
      `;
    });

    const html = `
      <html>
        <body>
          <h1>Storico Timbrature - Magna Roma</h1>
          <table border="1" style="width:100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Data e ora</th>
                <th>Ore fatte</th>
              </tr>
            </thead>
            <tbody>
              ${rows.join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      Alert.alert('PDF generato', 'Il file è stato creato: ' + uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Esporta PDF Timbrature</Text>
      <Button title="Genera PDF" onPress={generatePDF} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.romaRed,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    color: colors.romaGold,
    marginBottom: 20
  }
});
