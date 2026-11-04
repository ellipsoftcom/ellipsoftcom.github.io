// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://ellipsoft.com';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'always',
  },
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
    routing: {
      prefixDefaultLocale: true,
      // The root "/" stub page (src/pages/index.astro) performs the redirect
      // to /ar/ itself so it can also emit noindex + canonical tags.
      redirectToDefaultLocale: false,
    },
  },
  /**
   * Redirects (static hosting ⇒ Astro generates meta-refresh pages for
   * these routes; they are excluded from the sitemap below). Must keep
   * working so indexed URLs never 404:
   *   - legacy URLs from the previous site (consulting / store paths)
   *   - the former /{ar,en}/work/ routes (Work became Products)
   *   all landing on the Products pages.
   */
  redirects: {
    '/ar/consulting/': '/ar/products/',
    '/ar/consulting/exam-results-system/': '/ar/products/',
    '/ar/store/': '/ar/products/',
    '/ar/store/nafha-perfume-shop/': '/ar/products/',
    '/en/consulting/': '/en/products/',
    '/en/consulting/exam-results-system/': '/en/products/',
    '/en/store/': '/en/products/',
    '/en/store/nafha-perfume-shop/': '/en/products/',
    '/ar/work/': '/ar/products/',
    '/en/work/': '/en/products/',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ar',
        locales: { ar: 'ar', en: 'en' },
      },
      // Exclude: root redirect stub, 404, and the redirect routes
      // (legacy consulting/store paths + the former /work/ routes).
      filter: (page) =>
        page !== `${SITE}/` &&
        !page.includes('/404') &&
        !page.includes('/consulting/') &&
        !page.includes('/store/') &&
        !page.includes('/work/'),
    }),
  ],
});
