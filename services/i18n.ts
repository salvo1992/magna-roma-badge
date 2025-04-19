import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

(i18n as any).translations = {
  it: {
    login: 'Accedi',
    register: 'Registrati',
    email: 'Email',
    password: 'Password',
    welcome: 'Benvenuto',
    settings: 'Impostazioni',
    logout: 'Esci',
    calendar: 'Calendario',
    history: 'Storico',
    notifications: 'Notifiche',
    badge: 'Il mio Badge',
  },
  en: {
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    welcome: 'Welcome',
    settings: 'Settings',
    logout: 'Logout',
    calendar: 'Calendar',
    history: 'History',
    notifications: 'Notifications',
    badge: 'My Badge',
  },
  fr: {
    login: 'Connexion',
    register: 'S’inscrire',
    email: 'E-mail',
    password: 'Mot de passe',
    welcome: 'Bienvenue',
    settings: 'Paramètres',
    logout: 'Déconnexion',
    calendar: 'Calendrier',
    history: 'Historique',
    notifications: 'Notifications',
    badge: 'Mon badge',
  },
  es: {
    login: 'Iniciar sesión',
    register: 'Registrarse',
    email: 'Correo electrónico',
    password: 'Contraseña',
    welcome: 'Bienvenido',
    settings: 'Configuración',
    logout: 'Cerrar sesión',
    calendar: 'Calendario',
    history: 'Historial',
    notifications: 'Notificaciones',
    badge: 'Mi credencial',
  },
  de: {
    login: 'Anmelden',
    register: 'Registrieren',
    email: 'E-Mail',
    password: 'Passwort',
    welcome: 'Willkommen',
    settings: 'Einstellungen',
    logout: 'Abmelden',
    calendar: 'Kalender',
    history: 'Verlauf',
    notifications: 'Benachrichtigungen',
    badge: 'Mein Ausweis',
  },
};

(i18n as any).locale = Localization.locale.split('-')[0]; // es. 'it'
(i18n as any).fallbacks = true;

export default i18n;
