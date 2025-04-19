// ✅ AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { app } from '../firebaseConfig';
import { saveUserToFirestore, getUserRoleFromFirestore } from '../services/userService';
import { saveLoginCredentials } from '../services/biometricAuth';

const auth = getAuth(app);

interface AuthContextType {
  user: User | null;
  userRole: string | null;
  login: (email: string, password: string, key?: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    nome: string;
    ruolo: string;
    isDirezione?: boolean;//nuovo
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usr) => {
      setUser(usr);
      if (usr) {
        const ruolo = await getUserRoleFromFirestore(usr.uid);
        setUserRole(ruolo);
      } else {
        setUserRole(null);
      }
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string, key = '') => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const ruolo = await getUserRoleFromFirestore(result.user.uid);

      if (ruolo === 'direzione' && key !== '1234567890') {
        throw new Error('Chiave direzione non valida');
      }

      await saveLoginCredentials(email, password);
    } catch (err: any) {
      alert('Errore login: ' + err.message);
    }
  };

  const register = async ({ email, password, nome, ruolo }: {
    email: string;
    password: string;
    nome: string;
    ruolo: string;
  }) => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await saveUserToFirestore(userCred.user.uid, {
        nome,
        ruolo,
        email,
        createdAt: new Date().toISOString(),
      });
    } catch (err: any) {
      alert('Errore registrazione: ' + err.message);
    }
  };

  const logout = () => {
    signOut(auth);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, userRole, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
