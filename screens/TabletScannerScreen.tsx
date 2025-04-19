// ✅ 2. Fotocamera frontale automatica (per Tablet Scanner)
// screens/TabletScannerScreen.tsx (semplificato)
import React, { useEffect, useState } from 'react';
import { View, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function TabletScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  const handleScanned = ({ data }) => {
    if (!scanned) {
      setScanned(true);
      Alert.alert('Scansione completata', data);
      // gestione timbratura qui
      setTimeout(() => setScanned(false), 2000);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {permission?.granted && (
        <CameraView
          facing="front"
          onBarcodeScanned={handleScanned}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          style={{ flex: 1 }}
        />
      )}
    </View>
  );
}






