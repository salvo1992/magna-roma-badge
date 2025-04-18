import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
      <StatusBar style="light" />
    </AuthProvider>
  );
}
