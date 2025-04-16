import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import colors from '../assets/colors';


export default function QRScanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!scanned) {
      setScanned(true);
      Alert.alert('Badge Scansionato', `ID: ${data}`, [
        { text: 'OK', onPress: () => setScanned(false) },
      ]);
    }
  };

  if (hasPermission === null) return <Text>Richiesta permessi fotocamera…</Text>;
  if (hasPermission === false) return <Text>Accesso negato alla fotocamera</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scannerizza il badge</Text>
      <Camera
        style={styles.camera}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: ['qr'],
        }}
      />
      <Text style={styles.footer}>Inquadra il QR del dipendente</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.romaRed, padding: 20, alignItems: 'center' },
  title: { color: colors.romaGold, fontSize: 22, marginBottom: 10 },
  camera: { width: '100%', height: 300, borderRadius: 10 },
  footer: { marginTop: 15, color: '#fff' },
});
