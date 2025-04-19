import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeEmployee from '../screens/HomeEmployee';
import NotificationsScreen from '../screens/NotificationsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import BadgeCard from '../components/BadgeCard';


import CalendarScreen from '../screens/CalendarScreen';
import BadgeScreen from '../screens/BadgeScreen';


const Stack = createNativeStackNavigator();

const EmployeeNavigator = () => {
  return (
    <Stack.Navigator id={undefined}>
      <Stack.Screen
        name="HomeEmployee"
        component={HomeEmployee}
        options={{ title: 'Benvenuto Dipendente', headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: 'Notifiche' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Impostazioni' }}
      />
      <Stack.Screen
        name="badgeScreen"
        component={BadgeScreen}
        options={{ title: 'Badge' }}
      />
     
     
      
       <Stack.Screen 
        name="Calendar" 
        component={CalendarScreen}
        options={{ title: 'Calendario' }}
      />

    </Stack.Navigator>
  );
};

export default EmployeeNavigator;
