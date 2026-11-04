import type { PageId } from './ui';

/** Per-page strings. `title` and `description` feed the SEO head. */
export interface PageStrings {
  title: string;
  description: string;
  heading: string;
  body: string;
}

/** Home page strings (final copy, owner-approved 2026-11). */
export interface HomeStrings {
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  /** Primary hero button → Contact page. */
  heroPrimaryCta: string;
  /** Secondary hero button → Services page. */
  heroSecondaryCta: string;
  offerHeading: string;
  /** Link to the Services page below the offer cards (arrow included). */
  offerLink: string;
  whyHeading: string;
  whyItems: TitledItem[];
  /** "From our products" section heading (card comes from the catalogue). */
  productsHeading: string;
  finalCtaHeading: string;
  finalCtaText: string;
  finalCtaLabel: string;
}

/** One "Title — text" item (About "how we work" list, Services steps). */
export interface TitledItem {
  title: string;
  text: string;
}

/** About page strings (final copy, owner-approved 2026-11). */
export interface AboutStrings {
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  behindHeading: string;
  behindText: string;
  workHeading: string;
  workItems: TitledItem[];
  productsHeading: string;
  productsText: string;
  /** Link label to the first product's page (arrow included). */
  productsLink: string;
  ctaHeading: string;
  ctaLabel: string;
}

/** Services page strings (final copy, owner-approved 2026-11). The
 *  repeating service cards live in src/data/services.ts. */
export interface ServicesStrings {
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  workHeading: string;
  workSteps: TitledItem[];
  ctaHeading: string;
  ctaText: string;
  ctaLabel: string;
}

/** Contact page strings (final copy, owner-approved 2026-11). */
export interface ContactStrings {
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  channelsHeading: string;
  /** Channel labels. */
  whatsappChannel: string;
  emailChannel: string;
  facebookChannel: string;
  /** Facebook link text (distinct from the footer label). */
  facebookLinkLabel: string;
  usefulHeading: string;
  usefulIntro: string;
  usefulItems: string[];
  nextHeading: string;
  nextText: string;
}

export interface NotFoundStrings {
  title: string;
  description: string;
  heading: string;
  body: string;
  linkHome: string;
}

export interface Dictionary {
  /* Accessibility & chrome */
  skipToContent: string;
  /** Navigation labels, keyed by page id. */
  nav: Record<PageId, string>;
  mainNavLabel: string;
  menuLabel: string;
  switchLangLabel: string;

  /* Footer */
  footerTagline: string;
  footerContactTitle: string;
  emailLabel: string;
  whatsappLabel: string;
  facebookLabel: string;
  /** May contain a `{year}` placeholder. */
  copyright: string;

  /* Open Graph images (rendered by scripts/og/, see npm run og). */
  og: {
    /** Alt for the default company image of this language. */
    companyAlt: string;
    /** Alt for the Waraq images (used on Waraq pages). */
    waraqAlt: string;
  };

  /* Products (listing cards, product page, privacy page). */
  products: {
    /** Badge for unpublished products. */
    statusComingSoon: string;
    /** Badge for published products. */
    statusAvailable: string;
    /** Card link label (listing + home feature). May contain {name}. */
    viewProduct: string;
    /** "What it is" heading on the product page. Contains {name}. */
    aboutHeading: string;
    /** Features section heading. */
    featuresHeading: string;
    /** Screenshots section heading. */
    screenshotsHeading: string;
    /** Google Play CTA label (when available + listing URL set). */
    googlePlayLabel: string;
    /** Link to the full privacy policy on the product page. */
    privacyLinkLabel: string;
    /** Privacy page h1. Contains {name}. */
    privacyHeading: string;
    /** Privacy page <title>. Contains {name}. */
    privacyTitle: string;
    /** Privacy page meta description. Contains {name}. */
    privacyDescription: string;
    /** "Last updated" label on the privacy page. */
    privacyLastUpdated: string;
  };

  /* Per-page strings keyed by page id (home/about/services carry extra
     structured copy of their own). */
  pages: {
    home: HomeStrings;
    about: AboutStrings;
    services: ServicesStrings;
    contact: ContactStrings;
  } & Record<Exclude<PageId, 'home' | 'about' | 'services' | 'contact'>, PageStrings>;

  /* 404 page. */
  notFound: NotFoundStrings;
}
