import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeManager from '../screens/HomeManager';

const Stack = createNativeStackNavigator();

const ManagerNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeManager"
        component={HomeManager}
        options={{ title: 'Dashboard Direzione', headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ManagerNavigator;
