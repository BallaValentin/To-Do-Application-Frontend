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
          toDoCardBtn: 'Details',
          detailPageTitle: 'Todo Details',
          todoDetailedCardBy: 'Created by: ',
          todoDetailedCardDesc: 'Description: ',
          todoDetailedCardDueDate: 'Due date: ',
          todoDetailedCardPriority: 'Level of importance:',
          todoDetailModalTitle: 'Add detail',
          todoDetailModalText: 'Enter Text',
          todoDetailModalSubmitBtn: 'Submit detail',
          tooltipThemeLight: 'Toggle dark mode',
          tooltipThemeDark: 'Toggle winter mode',
          tooltipThemeWinter: 'Toggle light mode',
          tooltipHome: 'Go to Main Page',
          userMenuLogout: 'Logout',
          userMenuLogin: 'Login',
          userMenuUsers: 'Users',
          usersTableUsername: 'Username',
          usersTableFullname: 'Fullname',
          usersTableAddress: 'Email Address',
          usersTableRole: 'Role',
          usersTableActions: 'Actions',
        },
      },
      ro: {
        translation: {
          mainPageTitle: 'List of Todos',
          toDoCardBtn: 'Details',
          detailPageTitle: 'Todo Details ',
          todoDetailedCardBy: 'Created by: ',
          todoDetailedCardDesc: 'Description: ',
          todoDetailedCardDueDate: 'Due date: ',
          todoDetailedCardPriority: 'Level of importance:',
          todoDetailModalTitle: 'Add detail',
          todoDetailModalText: 'Enter Text',
          todoDetailModalSubmitBtn: 'Submit detail',
          tooltipThemeLight: 'Toggle dark mode',
          tooltipThemeDark: 'Toggle winter mode',
          tooltipThemeWinter: 'Toggle light mode',
          tooltipHome: 'Go to Main Page',
          userMenuLogout: 'Logout',
          userMenuLogin: 'Login',
          userMenuUsers: 'Users',
          usersTableUsername: 'Username',
          usersTableFullname: 'Fullname',
          usersTableAddress: 'Email Address',
          usersTableRole: 'Role',
          usersTableActions: 'Actions',
        },
      },
      hu: {
        translation: {
          mainPageTitle: 'Tennivalók Listája',
          todoCardBtn: 'Részletek',
          detailPageTitle: 'Tennivaló Részletei',
          todoDetailedCardBy: 'Készitette: ',
          todoDetailedCardDesc: 'Leirás: ',
          todoDetailedCardDueDate: 'Határidő: ',
          todoDetailedCardPriority: 'Fontossági szint: ',
          todoDetailModalTitle: 'Részlet hozzáadása',
          todoDetailModalText: 'Szöveg Megadása',
          todoDetailModalSubmitBtn: 'Részlet mentése',
          tooltipThemeLight: 'Váltás sötét módra',
          tooltipThemeDark: 'Váltás téli módra',
          tooltipThemeWinter: 'Váltás világos módra',
          tooltipHome: 'Ugrás a Főoldalra',
          userMenuLogout: 'Kijelentkezés',
          userMenuLogin: 'Bejelentkezés',
          userMenuUsers: 'Felhasználók',
          usersTableUsername: 'Felhasználónév',
          usersTableFullname: 'Teljes Név',
          usersTableAddress: 'Email Cim',
          usersTableRole: 'Szerep',
          usersTableActions: 'Műveletek',
        },
      },
    },
  });

export default i18n;
