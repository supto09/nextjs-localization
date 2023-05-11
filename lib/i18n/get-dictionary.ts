import type { Locale } from './i18n-config';

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import('./dictionaries/en').then((module) => module.default),
  de: () => import('./dictionaries/de').then((module) => module.default),
  bn: () => import('./dictionaries/bn').then((module) => module.default)
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
