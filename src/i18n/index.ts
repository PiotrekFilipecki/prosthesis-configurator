import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import pl from './locales/pl.json';

const LANGUAGE_STORAGE_KEY = 'prosthesis-configurator-language';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pl: { translation: pl }
  },
  lng: (() => {
    if (typeof window === 'undefined') return 'en';
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === 'en' || stored === 'pl') return stored;
    const browserLang = navigator.language?.slice(0, 2);
    return browserLang === 'pl' ? 'pl' : 'en';
  })(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
    document.documentElement.lang = lng;
  }
});

export default i18n;
