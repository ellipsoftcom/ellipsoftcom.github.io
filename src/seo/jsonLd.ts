/**
 * Structured data (schema.org JSON-LD) builders. Every value comes from
 * `src/config.ts` and `src/data/products.ts` — nothing is duplicated here.
 *
 * Rendered by BaseLayout as `<script type="application/ld+json">`, the
 * ONLY script type allowed on the site (static data, never executed).
 *
 * Positioning rules (AGENTS.md #7): Organization carries no founder,
 * person, address or phone.
 */
import { SITE } from '../config';
import type { Product } from '../data/products';
import type { Locale } from '../i18n/ui';
import { localizedPath } from '../i18n/utils';

/** A JSON-LD node (plain JSON object). */
export type JsonLd = Record<string, unknown>;

/** Stable identifier so pages can reference the same Organization. */
const ORGANIZATION_ID = `${SITE.url}/#organization`;

/** The EllipSoft Organization node. */
export function organizationJsonLd(): JsonLd {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE.name,
    url: `${SITE.url}/`,
    logo: `${SITE.url}${SITE.logo}`,
    email: SITE.email,
    sameAs: [SITE.facebook],
  };
}

/** WebSite node for a locale's home page. */
export function websiteJsonLd(locale: Locale): JsonLd {
  return {
    '@type': 'WebSite',
    name: SITE.name,
    url: `${SITE.url}${localizedPath(locale, '/')}`,
    inLanguage: locale,
    publisher: { '@id': ORGANIZATION_ID },
  };
}

/** MobileApplication node for a product page (no ratings, reviews or
 *  download URL until the app is published). */
export function productJsonLd(product: Product, locale: Locale): JsonLd {
  return {
    '@type': 'MobileApplication',
    name: product.name[locale],
    url: `${SITE.url}${localizedPath(locale, `/products/${product.slug}/`)}`,
    description: product.subtitle[locale],
    operatingSystem: product.platform,
    applicationCategory: product.applicationCategory,
    inLanguage: locale,
    offers: { '@type': 'Offer', ...product.offer },
    publisher: organizationJsonLd(),
  };
}

/**
 * Serialize nodes into one JSON-LD document. `<` is escaped so the
 * payload can never close its <script> element early.
 */
export function serializeJsonLd(nodes: JsonLd[]): string {
  const document =
    nodes.length === 1
      ? { '@context': 'https://schema.org', ...nodes[0] }
      : { '@context': 'https://schema.org', '@graph': nodes };
  return JSON.stringify(document).replace(/</g, '\\u003c');
}
