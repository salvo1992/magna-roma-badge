import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from './context/LanguageContext';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <LanguageProvider>
    <AuthProvider>
    <NavigationContainer>
      <AppNavigator />
      <StatusBar style="light" />
    </NavigationContainer>
    </AuthProvider>
    </LanguageProvider>
  );
}
