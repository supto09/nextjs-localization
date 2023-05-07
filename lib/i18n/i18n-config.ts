export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'de', 'bn']
} as const;

export type Locale = (typeof i18n)['locales'][number];
