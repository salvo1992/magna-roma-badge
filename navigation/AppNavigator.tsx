import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import EmployeeNavigator from './EmployeeNavigator';
import ManagerNavigator from './ManagerNavigator';
import { syncTimbratureToFirestore } from '../storage/syncWithFirestore';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    syncTimbratureToFirestore();
  }, []);

  return (
    <NavigationContainer>
      {!user ? (
        <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      ) : user.role === 'dipendente' ? (
        <EmployeeNavigator />
      ) : (
        <ManagerNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;


