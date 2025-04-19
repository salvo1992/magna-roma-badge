// ✅ biometricAuth.ts (in /services)
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

export const isBiometricAvailable = async () => {
  return await LocalAuthentication.hasHardwareAsync() && await LocalAuthentication.isEnrolledAsync();
};

export const authenticateBiometric = async () => {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Autenticazione biometrica',
      fallbackLabel: 'Usa password'
    });
    return result.success;
  } catch (error) {
    console.error('Errore autenticazione biometrica:', error);
    return false;
  }
};

export const saveLoginCredentials = async (email: string, password: string) => {
  await SecureStore.setItemAsync('user_email', email);
  await SecureStore.setItemAsync('user_password', password);
};

export const getSavedCredentials = async () => {
  const email = await SecureStore.getItemAsync('user_email');
  const password = await SecureStore.getItemAsync('user_password');
  return { email, password };
};