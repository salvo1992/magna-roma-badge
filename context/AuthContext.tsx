import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

import { saveUserToFirestore } from '../services/userService'; // 👈 qui

const AuthContext = createContext({
  user: null,
  login: async (email: string, password: string) => {},
  register: async ({ email, password, nome, ruolo }: { email: string; password: string; nome: string; ruolo: string }) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert('Errore login: ' + err.message);
    }
  };

  const register = async ({ email, password, nome, ruolo }) => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
  
      // 👇 Salva anche su Firestore nella collezione 'utenti'
      await saveUserToFirestore(userCred.user.uid, {
        nome,
        ruolo,
        email,
        createdAt: new Date().toISOString()
      });
  
    } catch (err) {
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
