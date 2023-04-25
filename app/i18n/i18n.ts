import i18n from 'i18n-js';

const en = require('./translations/en');
const es = require('./translations/es');

export const translations = { en, es };

i18n.defaultLocale = 'en';
i18n.locale = 'en';
i18n.translations = {
  en: en,
  es: es,
};
