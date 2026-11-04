/**
 * Locale constants. Keep `locales` and `defaultLocale` in sync with
 * the `i18n` block in astro.config.mjs.
 */
export const locales = ['ar', 'en'] as const;

export type Locale = (typeof locales)[number];

/** Arabic is the default language (decision #6). */
export const defaultLocale: Locale = 'ar';

/** Reading direction per locale. */
export const directions: Record<Locale, 'rtl' | 'ltr'> = {
  ar: 'rtl',
  en: 'ltr',
};

/** Open Graph locale codes per locale. */
export const ogLocales: Record<Locale, string> = {
  ar: 'ar_SY',
  en: 'en_US',
};

/** Page ids — every id must have a route file in src/pages/{ar,en}/. */
export const pageIds = ['home', 'services', 'products', 'about', 'contact'] as const;

export type PageId = (typeof pageIds)[number];

/** Locale-relative route (with trailing slash) for each page id. */
export const pageRoutes: Record<PageId, string> = {
  home: '/',
  services: '/services/',
  products: '/products/',
  about: '/about/',
  contact: '/contact/',
};
