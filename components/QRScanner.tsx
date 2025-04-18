import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, Pressable } from 'react-native';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import colors from '../assets/colors';
import { saveAttendance, getLastAttendanceById } from '../storage/attendanceStorage'; // aggiungeremo questa nuova funzione
import { syncToFirebase } from '../services/syncService';

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <Text>Controllo permessi fotocamera...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Accesso alla fotocamera negato</Text>
        <Pressable onPress={() => requestPermission()}>
          <Text style={styles.link}>Concedi accesso</Text>
        </Pressable>
      </View>
    );
  }

  const handleBarcodeScanned = async (result: BarcodeScanningResult) => {
    if (!scanned && result?.data) { // Assuming 'data' is the correct property
      setScanned(true);
      const id = result.data; // Assuming the QR code contains the ID directly
      const now = new Date().toISOString();
  
      const last = await getLastAttendanceById(id);
  
      if (!last || last.type === 'uscita') {
        // Nuova entrata
        await saveAttendance({ id, type: 'entrata', timestamp: now });
        Alert.alert('Ingresso registrato', `Benvenuto! Orario: ${new Date(now).toLocaleTimeString('it-IT')}`);
      } else {
        // È un’uscita → calcolo ore
        const ingresso = new Date(last.timestamp);
        const uscita = new Date(now);
        const diffMs = uscita.getTime() - ingresso.getTime();
        const diffOre = (diffMs / 3600000).toFixed(2);
  
        await saveAttendance({ id, type: 'uscita', timestamp: now, durataOre: diffOre });
  
        Alert.alert('Uscita registrata', `Hai lavorato ${diffOre} ore. A presto!`);
      }
  
      setTimeout(() => setScanned(false), 2000);
    }
  };
  useEffect(() => {
    syncToFirebase();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scannerizza il badge</Text>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={handleBarcodeScanned}
      />
      <Text style={styles.footer}>Inquadra il QR del dipendente</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.romaRed,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: colors.romaGold,
    fontSize: 22,
    marginBottom: 10
  },
  link: {
    color: colors.romaGold,
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: 'underline'
  },
  camera: {
    width: '100%',
    height: 300,
    borderRadius: 10
  },
  footer: {
    marginTop: 15,
    color: '#fff'
  }
});


