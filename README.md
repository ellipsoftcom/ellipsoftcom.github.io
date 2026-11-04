# EllipSoft Website

Bilingual (Arabic default / English) company website for EllipSoft, built with
[Astro](https://astro.build) and deployed to GitHub Pages at
**https://ellipsoft.com** (`/ar/` Arabic, `/en/` English).

- **Zero executable JavaScript** — plain HTML + CSS (Astro scoped styles).
  The only `<script>` is static `application/ld+json` structured data.
- **Self-hosted fonts** (Fontsource: IBM Plex Sans Arabic / IBM Plex Sans),
  declared with `unicode-range` in `src/styles/fonts.css`; weights 400 and
  700 only (the desktop nav uses 400).
- **Manual i18n routing** — every page exists under `/ar/…` and `/en/…`.
- **Typed product catalogue** — one entry in `src/data/products.ts` per
  product; listing, product and privacy pages are generated from it.

## Requirements

- **Node.js ≥ 22.23.4** (LTS recommended; `.nvmrc` pins Node 24)
- **npm** ≥ 9.6.5

```bash
nvm use        # reads .nvmrc
```

## Getting started

```bash
npm install    # install dependencies
npm run dev    # dev server → http://localhost:4321
```

## Scripts

| Command           | Action                                        |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the dev server (live reload)            |
| `npm run build`   | Build the production site to `./dist/`        |
| `npm run preview` | Preview the production build locally          |
| `npm run check`   | TypeScript diagnostics for `.astro` files     |
| `npm run og`      | Regenerate the Open Graph PNGs (see below)    |
| `npm run verify`  | Check `dist/`: scripts, internal links, SEO URLs |

## Project structure

```
/
├── public/               # Copied verbatim to dist/ (CNAME, .nojekyll, robots.txt,
│   ├── brand/            #   favicon, logo files)
│   └── og/               #   Open Graph images + og-image.png fallback
├── scripts/og/           # OG image templates + renderer (npm run og) + fonts
├── src/
│   ├── config.ts         # Single source of truth: site name, email, WhatsApp, Facebook
│   ├── data/
│   │   ├── products.ts   # Product catalogue (typed): one entry per product
│   │   └── services.ts   # Service catalogue (typed): one entry per service
│   ├── i18n/
│   │   ├── ui.ts         # Locales, page ids → routes, OG locale codes
│   │   ├── types.ts      # Dictionary type (all UI strings)
│   │   ├── ar.ts / en.ts # Arabic & English dictionaries
│   │   └── utils.ts      # getDictionary, localizedPath, switchLocalePath…
│   ├── layouts/
│   │   └── BaseLayout.astro  # <html lang/dir>, SEO head, header/footer, fonts
│   ├── components/
│   │   ├── Header.astro  # Logo, nav (5 pages), lang switcher, no-JS mobile menu
│   │   └── Footer.astro  # Email, WhatsApp, Facebook, copyright
│   ├── views/            # Shared page templates (one per page, locale-agnostic)
│   ├── pages/
│   │   ├── index.astro   # Root "/" stub → instant redirect to /ar/ (noindex)
│   │   ├── 404.astro     # Bilingual 404 (noindex)
│   │   └── ar/ · en/     # Thin wrappers: one file per page per language;
│   │                     # products/[slug]/ routes use getStaticPaths()
│   └── styles/
│       └── global.css    # Design tokens + shared primitives (logical properties)
└── astro.config.mjs      # site, i18n, trailingSlash, redirects, sitemap
```

## Products

The Products section is driven by the typed catalogue in
`src/data/products.ts` (only owner-owned products — no client work).
Each entry carries slug, localized name/tagline/description, status
(`coming-soon` | `available`), platform, price label, Google Play URL,
features, screenshots and a privacy policy.

**Adding a product** = appending one entry to `products`. Routes are
generated automatically:

- `/{ar,en}/products/` — listing cards (from `views/Products.astro`)
- `/{ar,en}/products/<slug>/` — product page (`views/ProductDetail.astro`);
  the CTA switches from WhatsApp early access to a Google Play button
  when `status: 'available'` and `playStoreUrl` is set
- `/{ar,en}/products/<slug>/privacy/` — privacy policy
  (`views/ProductPrivacy.astro`); these URLs go to Google Play, keep them
  stable

## i18n workflow

- UI strings live in the typed dictionaries `src/i18n/ar.ts` / `src/i18n/en.ts`
  (the `Dictionary` type enforces parity between languages).
- Localized URLs: `localizedPath('ar', '/about/')` → `/ar/about/`.
- The language switcher maps every page 1:1 to its counterpart
  (`/ar/about/ ↔ /en/about/`).
- `hreflang` alternates are emitted on every page (`ar`, `en`,
  `x-default` → the Arabic version).

**Adding a page:** add strings to both dictionaries (keyed by page id in
`ui.ts`), create `src/views/<Page>.astro`, add wrapper files in
`src/pages/ar/` and `src/pages/en/`, and extend the nav via the page ids.

## Open Graph images

Social-share images live in `public/og/` (1200×630): `ellipsoft-{ar,en}.png`
(company, the default per language), `waraq-{ar,en}.png` (Waraq pages), plus
the stable fallback `public/og-image.png` (= the Arabic company image).

- **Source of truth:** `scripts/og/templates.mjs` — SVG builders using the
  brand tokens and a central safe column so center-cropping apps (WhatsApp
  etc.) don't cut key text. Arabic images are right-aligned RTL.
- **To change the text:** edit `scripts/og/templates.mjs`, run `npm run og`,
  and commit the regenerated PNGs. Rendering uses `@resvg/resvg-js`
  (devDependency only) with the committed IBM Plex TTFs in
  `scripts/og/fonts/` — correct Arabic shaping via rustybuzz.
- **Per-page override:** pass `ogImagePath` / `ogImageAlt` to `BaseLayout`
  (the Waraq pages do); defaults come from the page language and the
  `og.companyAlt` / `og.waraqAlt` dictionary strings.

## Redirects

URLs from the previous site, plus the former Work routes, are redirected
to the **Products** page (configured under `redirects` in
`astro.config.mjs`, emitted as static meta-refresh pages and excluded
from the sitemap):

| Old URL                             | New URL        |
| ----------------------------------- | -------------- |
| `/ar/consulting/`                   | `/ar/products/` |
| `/ar/consulting/exam-results-system/` | `/ar/products/` |
| `/ar/store/`                        | `/ar/products/` |
| `/ar/store/nafha-perfume-shop/`     | `/ar/products/` |
| `/ar/work/`                         | `/ar/products/` |
| `/en/consulting/`                   | `/en/products/` |
| `/en/consulting/exam-results-system/` | `/en/products/` |
| `/en/store/`                        | `/en/products/` |
| `/en/store/nafha-perfume-shop/`     | `/en/products/` |
| `/en/work/`                         | `/en/products/` |

## Deployment

The site is **live** (since 2026-11-04). Deployment runs on GitHub Actions
(`.github/workflows/deploy.yml`, Pages source "GitHub Actions") and
triggers on pushes to `main` or manual dispatch — every push to `main`
goes to production. Changes are made on a short-lived local branch,
checked (`npm run check && npm run build && npm run verify`), approved
by the owner, then fast-forwarded into `main` and pushed — no pull
requests, no force pushes (see **Change workflow** in `AGENTS.md`).
The workflow:

1. `actions/setup-node` with the version from `.nvmrc`, then `npm ci`.
2. `npm run build` — the site is built **once**.
3. `npm run verify` on that exact `dist/` (scripts, internal links,
   SEO URLs, CNAME/.nojekyll).
4. Only if verify passes: `actions/upload-pages-artifact` uploads that
   same `dist/`, and the `deploy` job (`actions/deploy-pages`) publishes
   it. A failed verify means nothing is uploaded or deployed.

Every deployment MUST keep in `public/`:

- `CNAME` — binds the custom domain `ellipsoft.com`
- `.nojekyll` — required so GitHub serves the underscore-prefixed `_astro/` assets

## Local verification

```bash
npm run build && npm run preview
```

Then check `dist/`: both language trees (7 content pages each:
home, services, products, products/waraq, products/waraq/privacy,
about, contact), the 10 redirect pages, `sitemap-index.xml` (14 URLs +
alternates), `robots.txt`, `404.html`, and the root redirect stub.
