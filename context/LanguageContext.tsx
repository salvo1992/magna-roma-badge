import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../services/i18n';

const LanguageContext = createContext({
  language: 'it',
  setLanguage: (lang: string) => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLang] = useState('it');

  useEffect(() => {
    const loadLang = async () => {
      const saved = await AsyncStorage.getItem('lang');
      if (saved) {
        setLang(saved);
        (i18n as any).locale = saved;
      }
    };
    loadLang();
  }, []);

  const setLanguage = async (lang: string) => {
    await AsyncStorage.setItem('lang', lang);
    (i18n as any).locale = lang;
    setLang(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
