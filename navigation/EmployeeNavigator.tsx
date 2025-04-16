import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeEmployee from '../screens/HomeEmployee';

const Stack = createNativeStackNavigator();

const EmployeeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeEmployee"
        component={HomeEmployee}
        options={{ title: 'Benvenuto Dipendente', headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default EmployeeNavigator;
