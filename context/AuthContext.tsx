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
import { saveUserToFirestore } from '../services/userService';

const auth = getAuth(app);

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    nome: string;
    ruolo: string;
  }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
