import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import I18n from '../services/i18n';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'it',
  setLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLang] = useState('it');

  useEffect(() => {
    const loadLang = async () => {
      const saved = await AsyncStorage.getItem('lang');
      if (saved) {
        setLang(saved);
        I18n.locale = saved;
      }
    };
    loadLang();
  }, []);

  const setLanguage = async (lang: string) => {
    await AsyncStorage.setItem('lang', lang);
    I18n.locale = lang;
    setLang(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
