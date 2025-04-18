import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeEmployee from '../screens/HomeEmployee';
import NotificationsScreen from '../screens/NotificationsScreen';
import SettingsScreen from '../screens/SettingsScreen';


const Stack = createNativeStackNavigator();

const EmployeeNavigator = () => {
  return (
    <Stack.Navigator id={undefined}>
      <Stack.Screen
        name="HomeEmployee"
        component={HomeEmployee}
        options={{ title: 'Benvenuto Dipendente', headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default EmployeeNavigator;
