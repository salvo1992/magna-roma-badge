import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import EmployeeNavigator from './EmployeeNavigator';
import ManagerNavigator from './ManagerNavigator';
import { syncTimbratureToFirestore } from '../storage/syncWithFirestore';
import { getUserDataFromFirestore } from '../services/userService';

const DIREZIONE_KEY = '1234567890'; // Chiave fissa per identificare la direzione

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const AppNavigator: React.FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    syncTimbratureToFirestore();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const data = await getUserDataFromFirestore(user.uid);
        setUserData(data);
      }
    };
    fetchUserData();
  }, [user]);

  const renderNavigator = () => {
    if (!user) return <AuthStack />;

    // Se ha la chiave direzione o ruolo è "direzione"
    if (userData?.isDirezione === true || userData?.ruolo === 'direzione') {
      return <ManagerNavigator />;
    }

    return <EmployeeNavigator />;
  };

  return <NavigationContainer>{renderNavigator()}</NavigationContainer>;
};

export default AppNavigator;



