import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeManager from '../screens/HomeManager';
import HistoryScreen from '../screens/HistoryScreen';
import ExportPDFScreen from '../screens/ExportPDFScreen';
import DashboardDirezioneScreen from '../screens/DashboardDirezioneScreen';
import TabletScannerScreen from '../screens/TabletScannerScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import PresenzeLiveScreen from '../screens/PresenzeLiveScreen';
import PresenceDashboardScreen from '../screens/PresenceDashboardScreen';
const Stack = createNativeStackNavigator();

export default function ManagerNavigator() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeManager" component={HomeManager} />
      <Stack.Screen name="DashboardDirezione" component={DashboardDirezioneScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="ExportPDF" component={ExportPDFScreen} />
      <Stack.Screen name="ScannerTablet" component={TabletScannerScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="PresenzeLive" component={PresenzeLiveScreen} />
      <Stack.Screen name="PresenceDashboard" component={PresenceDashboardScreen} />
    </Stack.Navigator>
  );
}



