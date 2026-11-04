# AGENTS.md — Rules for AI agents working on this repository

You are NOT the decision maker. The owner relays decisions (usually via an
advisor). Implement what is asked; when something is ambiguous or blocking,
**stop and ask** instead of guessing.

## Product decisions (fixed — do not change without owner approval)

1. **Repo & deployment**: source code lives in this repo
   (`ellipsoftcom/ellipsoftcom.github.io`). Deployment is via GitHub Actions
   (`.github/workflows/deploy.yml`): Node from `.nvmrc`, `npm ci`, ONE
   build, then `npm run verify` on that exact `dist/`; the Pages artifact
   is uploaded and deployed only if verify passes (no rebuild in
   between). Never weaken or skip the verify gate.
   All work happens on the `rebuild` branch until launch.
2. **Stack**: Astro (latest stable), TypeScript strict, npm, Node LTS
   (`.nvmrc`).
3. **Pages** (both languages): Home, Services, Products (listing + one
   page per product + a per-product privacy policy), About, Contact.
4. **Brand**: keep the existing logo (`public/brand/`) and core colors —
   slate `#0F172A`, teal `#2DD4BF`. Everything else (layout, typography,
   components) is new. Theme (owner decision, 2026-11): **light content
   surfaces** with **dark slate `#0F172A` brand sections only** (header,
   home hero, footer) via the `.brand-surface` token scope in
   `src/styles/global.css`. No dark-mode toggle. Teal `#2DD4BF` is used
   for text only on dark surfaces (9.59:1); on light surfaces the accent
   is teal-700 `#0F766E` (5.23:1 on `#F8FAFC`, passes WCAG AA).
   Font weights: **400 and 700 only** (owner decision, 2026-11: the
   desktop nav uses 400; the current page is marked by accent color +
   underline, not by weight). Do not reintroduce weight 500 — it would
   add ~64 KB of font downloads to Arabic desktop pages.
5. **Contact**: `hello@ellipsoft.com` + WhatsApp button + Facebook link.
   **No contact form.**
6. **Language**: Arabic is the default. Root `/` redirects to `/ar/`
   (meta refresh; static hosting cannot send a real 301).
7. **Positioning**: a small software company. The founder is NOT named
   anywhere on the site — no personal name, no photo, no personal links.
   The About page mentions the founder's experience anonymously ("led by
   a software engineer with 14+ years of experience"). Never imply a
   large team (avoid the word "team" for EllipSoft itself). Do NOT
   mention Damascus, Germany, or any company license/registration until
   the owner explicitly provides them — the company license is planned
   but not yet issued; when issued, its details will be added to the
   footer.
8. **Products, not client work**: only projects the owner OWNS are shown
   on the site — no client projects. Currently one product: **Waraq**
   (Arabic: ورق — "Waraq" in Latin script inside English text, "ورق" in
   Arabic text).
9. **Work became Products**: Waraq has its own product page and a
   privacy-policy page (required for Google Play publishing). Waraq is a
   free, offline personal accounting Android app for tracking personal
   projects and expenses; status: in development, coming soon on Google
   Play, free — no paid plans for now.

## Hard rules

- **Never push to `main`.** Never force-push. All work goes to `rebuild`
  (or feature branches off it) unless the owner explicitly approves a
  merge/launch.
- **Never change repository/GitHub settings** (Pages source, domains,
  secrets, branch protection). Settings changes are owner-only actions.
- **Never remove or empty `public/CNAME`** (binds `ellipsoft.com`) or
  **`public/.nojekyll`** (without it, GitHub Pages/Jekyll ignores the
  underscore-prefixed `_astro/` asset directory and the site loses its
  fonts/CSS assets).
- **Keep URLs stable.** The 14 content routes (`/ar|en/{, services,
  products/, products/waraq/, products/waraq/privacy/, about, contact}/`)
  and the 10 redirects (legacy `consulting`/`store` paths plus the former
  `/ar|en/work/` routes → `/ar|en/products/`, defined in
  `astro.config.mjs`) must keep working. The privacy-policy URLs are
  submitted to Google Play — never rename them. Do not rename routes
  casually.
- **Zero EXECUTABLE scripts** (owner decision, 2026-11). The ONLY
  allowed script tag is `<script type="application/ld+json">` holding
  static structured data (built in `src/seo/jsonLd.ts`, emitted by
  `BaseLayout`). No other `<script>` of any kind, no framework
  hydration, no analytics until the owner asks for it.
  `npm run verify` fails on any other script tag in `dist/`.
- **No secrets in the repo.** Nothing here needs env vars.

## Git identity (repository is public — founder must not be identifiable)

- **All commits in this repo MUST use the repo-local identity** already
  set via `git config` (no `--global`): `user.name = EllipSoft`,
  `user.email = 312907258+ellipsoftcom@users.noreply.github.com`
  (GitHub noreply address of the `ellipsoftcom` account). Before
  committing, check `git config user.name` — never commit with a
  personal identity, and never change the global git config.
- Do NOT rewrite existing history on your own. **Launch plan (owner
  approval required — do NOT execute now):** at launch, `main` will be
  published with a fresh history (a single initial commit authored by
  EllipSoft, e.g. created from an orphan branch) and the remote
  `rebuild` branch will be deleted, so the founder's name no longer
  appears in the visible commit history.

## Conventions

- **TypeScript strict** (`astro/tsconfigs/strict`). `npm run build` and
  `npm run check` must pass before handing work back.
- **i18n**: UI strings live in the typed dictionaries `src/i18n/ar.ts` /
  `src/i18n/en.ts` (`Dictionary` type enforces parity). Route helpers in
  `src/i18n/utils.ts`; always build URLs with `localizedPath()` so the
  `ar`/`en` prefix and trailing slash are consistent. Dates are formatted
  site-wide with `formatDate()` from the same module: **Levantine month
  names + Western digits in Arabic** ("1 تشرين الثاني 2026", matching
  the Waraq app — never Arabic-Indic digits), "November 1, 2026" in
  English.
- **Site-wide settings** (name, email, WhatsApp number, Facebook URL)
  live ONLY in `src/config.ts`.
- **Products** (decision #8–9): the catalogue is a typed data file,
  `src/data/products.ts` — one entry per product. Adding a product means
  appending ONE entry: the listing cards, home feature, product page and
  privacy page are all generated from the array via `getStaticPaths()`.
  Product copy (name/tagline/description/features, ar+en side by side)
  lives in that file, NOT in the i18n dictionaries; product-page UI
  chrome strings (badges, CTA labels) live in the dictionaries.
- **Structured data (JSON-LD)**: generated from `src/config.ts` and
  `src/data/products.ts` by `src/seo/jsonLd.ts` — never hard-code values.
  Home (ar+en): Organization + WebSite. Product pages: MobileApplication
  with the Organization as publisher. No founder/person/address/phone;
  no ratings, reviews or downloadUrl until the owner says so.
- **Open Graph images**: templates in `scripts/og/templates.mjs` are the
  source of truth; regenerate with `npm run og` and COMMIT the PNGs
  (`public/og/`, plus the `public/og-image.png` fallback). Per-page
  overrides via `ogImagePath`/`ogImageAlt` props on `BaseLayout`.
- **Styling**: design tokens are defined once in `src/styles/global.css`;
  components use Astro **scoped styles** and reference tokens. No CSS
  framework. **Use CSS logical properties** (`margin-inline`,
  `padding-inline`, `inset-inline-start`, `border-inline-start`, …) so
  RTL (ar) and LTR (en) work from a single set of rules.
- **Fonts**: self-hosted via Fontsource (`@fontsource/ibm-plex-sans-arabic`
  for Arabic pages, `@fontsource/ibm-plex-sans` for English). The
  `@font-face` rules live in `src/styles/fonts.css` (woff2 only, weights
  400 + 700 only, with Fontsource's `unicode-range` so each page
  downloads only the subsets it uses). `BaseLayout.astro` preloads ONLY the critical body font
  (arabic-400 on Arabic pages, latin-400 on English pages). CSS is
  inlined into each page (`build.inlineStylesheets: 'always'`) to save
  a round trip on slow connections. Do not add Google Fonts or CDN links.
- **SEO**: pages set `<title>`, description, canonical, Open Graph, Twitter
  card, and hreflang (`ar`, `en`, `x-default` → Arabic version) via
  `BaseLayout`. The root stub `/` and `404` are `noindex`. The sitemap
  excludes the root stub, 404, and legacy redirect routes — preserve those
  exclusions when touching `astro.config.mjs`.
- **Commits**: small, logical, Conventional Commits
  (`feat:`, `fix:`, `chore:`, `docs:`, `ci:`, `feat(scope):`…).

## Build & verify

```bash
nvm use && npm install
npm run build     # must succeed
npm run verify    # dist/ checks: no executable scripts, all internal
                  # links/assets/canonicals/hreflang/sitemap/OG URLs resolve
npm run preview   # spot-check /ar/, /en/, /ar/about/ ↔ /en/about/ switch,
                  # /ar/consulting/ → /ar/products/, /ar/work/ → /ar/products/,
                  # and that CNAME + .nojekyll land in dist/
```

## Launch checklist (owner-only actions — never do these yourself)

1. Merge `rebuild` → `main` (owner approval).
2. Switch **Settings → Pages → Source** to **"GitHub Actions"**.
3. Verify https://ellipsoft.com serves the new build, custom domain still
   attached, DNS unchanged (apex A records + www CNAME).
