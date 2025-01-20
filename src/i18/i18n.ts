import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: {
          mainPageTitle: 'List of Todos',
        },
      },
      ro: {
        translation: {
          mainPageTitle: 'List of Todos',
        },
      },
      hu: {
        translation: {
          mainPageTitle: 'Tennivalók Listája',
        },
      },
    },
  });

export default i18n;
