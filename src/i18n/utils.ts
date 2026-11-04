import { ar } from './ar';
import { en } from './en';
import { defaultLocale, locales } from './ui';
import type { Dictionary } from './types';
import type { Locale } from './ui';

const dictionaries: Record<Locale, Dictionary> = { ar, en };

/**
 * Levantine (Syria/Lebanon) Arabic month names. Used with **Western
 * digits** to match the Waraq app — e.g. "1 تشرين الثاني 2026".
 * (Plain `Intl` with `ar`/`ar-SY` renders Arabic-Indic digits, which we
 * do not want, so the month list is explicit.)
 */
const LEVANTINE_MONTHS = [
  'كانون الثاني',
  'شباط',
  'آذار',
  'نيسان',
  'أيار',
  'حزيران',
  'تموز',
  'آب',
  'أيلول',
  'تشرين الأول',
  'تشرين الثاني',
  'كانون الأول',
] as const;

/**
 * Format an ISO date (yyyy-mm-dd) for display, site-wide.
 * Arabic: Levantine month name + Western digits — "1 تشرين الثاني 2026".
 * English: "November 1, 2026".
 */
export function formatDate(iso: string, locale: Locale): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (locale === 'ar') {
    return `${date.getUTCDate()} ${LEVANTINE_MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
  }
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(date);
}

/** Typed dictionary for a locale. */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Locale validity check (useful when parsing params or paths). */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Prefix a locale-relative path with the locale, always with a trailing
 * slash (matches `trailingSlash: 'always'`).
 *
 *   localizedPath('ar', '/')      → '/ar/'
 *   localizedPath('en', '/about') → '/en/about/'
 */
export function localizedPath(locale: Locale, path = '/'): string {
  if (path === '/') return `/${locale}/`;
  const trimmed = path.replace(/^\/+|\/+$/g, '');
  return `/${locale}/${trimmed}/`;
}

/** The other locale for a given locale. */
export function otherLocale(locale: Locale): Locale {
  return locale === defaultLocale ? locales.find((l) => l !== defaultLocale)! : defaultLocale;
}

/**
 * Counterpart URL of the current page in the other language, so the
 * language switcher maps each page 1:1 (e.g. /ar/about/ ↔ /en/about/).
 *
 *   switchLocalePath('ar', '/ar/about/') → '/en/about/'
 *   switchLocalePath('en', '/en/')       → '/ar/'
 *   switchLocalePath('ar', '/404/')      → '/en/' (no localized twin)
 */
export function switchLocalePath(locale: Locale, pathname: string): string {
  const other = otherLocale(locale);
  if (!/^\/(ar|en)(\/|$)/.test(pathname)) return localizedPath(other, '/');
  const suffix = pathname.replace(/^\/(ar|en)(?=\/|$)/, '');
  return localizedPath(other, suffix === '' ? '/' : suffix);
}
