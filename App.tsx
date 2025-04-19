import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import AppNavigator from './navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <View style={styles.container}>
          <AppNavigator /> {/* ← NavigationContainer sta già DENTRO QUI */}
          <StatusBar style="light" />
        </View>
      </AuthProvider>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
