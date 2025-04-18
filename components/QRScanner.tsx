import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, Pressable } from 'react-native';
import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import colors from '../assets/colors';
import { saveAttendance } from '../storage/attendanceStorage'; // Adjust the import path as needed

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

      const newRecord = {
        id: result.data, // Assuming the QR code contains a unique ID
        type: 'entrata' as 'entrata' | 'uscita', // o 'uscita', puoi cambiarlo dinamicamente più avanti
        timestamp: new Date().toISOString()
      };
  
      await saveAttendance(newRecord);

      Alert.alert('Badge Scansionato', `ID: ${result.data}`, [
        { text: 'OK', onPress: () => setScanned(false) }
      ]);
    }
  };

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


