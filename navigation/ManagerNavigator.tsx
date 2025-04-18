import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeManager from '../screens/HomeManager';
import HistoryScreen from '../screens/HistoryScreen';


const Stack = createNativeStackNavigator();

const ManagerNavigator = () => {
  return (
    <Stack.Navigator id={undefined}>
      <Stack.Screen
        name="HomeManager"
        component={HomeManager}
        options={{ title: 'Dashboard Direzione', headerShown: false }}
      />
      <Stack.Screen name="History" component={HistoryScreen} />

    </Stack.Navigator>
  );
};

export default ManagerNavigator;
