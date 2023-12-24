import i18n from 'i18n-js';
import { I18nManager } from 'react-native';

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: require('./english.json'),
  ar: require('./arabic.json'),
};

// Set the locale once at the beginning of your app.
// i18n.locale = i18n.locale;

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

export const setLanguage = (lang, component, isReload = true) => {
  i18n.locale = lang;
  if (lang === 'ar' && !I18nManager.isRTL) {
    I18nManager.forceRTL(true)
  }

  if (lang === 'en' && I18nManager.isRTL) {
    I18nManager.forceRTL(false)
  }

  if (component) component.forceUpdate();
};

export default i18n;