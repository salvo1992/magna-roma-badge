import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeManager from '../screens/HomeManager';
import HistoryScreen from '../screens/HistoryScreen';
import ExportPDFScreen from '../screens/ExportPDFScreen';
import DashboardDirezioneScreen from '../screens/DashboardDirezioneScreen';
import TabletScannerScreen from '../screens/TabletScannerScreen'; // Import the missing screen
import NotificationsScreen from '../screens/NotificationsScreen';
import SettingsScreen from '../screens/SettingsScreen';


const Stack = createNativeStackNavigator();

export default function ManagerNavigator() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeManager" component={HomeManager} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
  );
};

// Removed duplicate default export
