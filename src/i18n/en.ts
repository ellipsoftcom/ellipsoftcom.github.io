import type { Dictionary } from './types';

/**
 * English dictionary.
 * All UI and page copy here is final (owner-approved) — change it only
 * with the owner's approval.
 */
export const en: Dictionary = {
  skipToContent: 'Skip to main content',
  nav: {
    home: 'Home',
    services: 'Services',
    products: 'Products',
    about: 'About',
    contact: 'Contact',
  },
  mainNavLabel: 'Main navigation',
  menuLabel: 'Open menu',
  switchLangLabel: 'العربية',

  footerTagline: 'A software company specializing in enterprise systems and AI agent integration.',
  footerContactTitle: 'Contact channels',
  emailLabel: 'Email',
  whatsappLabel: 'Message us on WhatsApp',
  facebookLabel: 'Our Facebook page',
  copyright: '© {year} EllipSoft — All rights reserved.',

  og: {
    companyAlt: 'EllipSoft — We build reliable systems that hold up under pressure — ellipsoft.com',
    waraqAlt: 'Waraq — Your money notebook in dollars and Syrian pounds — ellipsoft.com',
  },

  products: {
    statusComingSoon: 'Coming soon on Google Play',
    statusAvailable: 'Available now',
    viewProduct: 'Learn more about {name}',
    aboutHeading: 'What is {name}?',
    featuresHeading: 'Features',
    screenshotsHeading: 'Screenshots',
    googlePlayLabel: 'Get it on Google Play',
    privacyLinkLabel: 'Read the full privacy policy →',
    privacyHeading: '{name} Privacy Policy',
    privacyTitle: '{name} Privacy Policy — EllipSoft',
    privacyDescription: 'Privacy policy for the {name} app by EllipSoft.',
    privacyLastUpdated: 'Last updated:',
  },

  pages: {
    home: {
      title: 'EllipSoft — We build reliable systems that hold up under pressure',
      description:
        'EllipSoft is a software company specializing in enterprise systems, SaaS applications, and AI agent integration.',
      heroTitle: 'We build reliable systems that hold up under pressure',
      heroSubtitle:
        'EllipSoft is a software company specializing in enterprise systems, SaaS applications, and AI agent integration. We start with architecture, because most system problems are decisions that were postponed at the start.',
      heroPrimaryCta: 'Start your project',
      heroSecondaryCta: 'Explore our services',
      offerHeading: 'What we offer',
      offerLink: 'Full details on the services page →',
      whyHeading: 'Why EllipSoft',
      whyItems: [
        { title: '14+ years of experience', text: 'in enterprise and financial systems.' },
        { title: 'Architecture first', text: 'We design before we write code.' },
        {
          title: 'You work directly with the engineer',
          text: 'The person who discusses your project is the person who builds it.',
        },
      ],
      productsHeading: 'From our products',
      finalCtaHeading: 'Have a project or a system that needs a review?',
      finalCtaText: "Tell us what you need, and we'll reply with a clear next step.",
      finalCtaLabel: 'Contact us',
    },
    services: {
      title: 'Our services — EllipSoft',
      description:
        'Five areas we genuinely work in — from building a complete system to an architecture review of an existing one.',
      heroTitle: 'Our services',
      heroSubtitle:
        'Five areas we genuinely work in — from building a complete system to an architecture review of an existing one.',
      workHeading: 'How we work with you',
      workSteps: [
        { title: 'A first conversation', text: 'We understand your problem and your goal, with no commitment.' },
        { title: 'A written scope of work', text: "What we'll build, what we won't, the timeline, and the cost." },
        { title: 'Delivery in milestones', text: 'You receive and see progress at every stage, not only at the end.' },
        {
          title: 'A complete handover',
          text: 'The code, the documentation, and everything you need to continue without us if you choose.',
        },
      ],
      ctaHeading: 'Not sure which service fits you?',
      ctaText: "Tell us about your problem, and we'll suggest the best way forward.",
      ctaLabel: 'Contact us',
    },
    products: {
      title: 'Products — EllipSoft',
      description:
        'Products we build to solve real problems — and use ourselves before we offer them to you.',
      heading: 'Our products',
      body: 'Products we build to solve real problems — and use ourselves before we offer them to you.',
    },
    about: {
      title: 'EllipSoft: we build systems that hold up',
      description:
        'A small software company specializing in enterprise systems, SaaS applications, and AI agent integration — and building its own products too.',
      heroTitle: 'EllipSoft: we build systems that hold up',
      heroSubtitle:
        'A small software company specializing in enterprise systems, SaaS applications, and AI agent integration — and building its own products too.',
      behindHeading: "Who's behind EllipSoft",
      behindText:
        'EllipSoft is led by a software engineer with more than 14 years of experience building enterprise and financial systems, who has worked with international clients on multi-tenant platforms, systems integration, and cloud infrastructure on Azure.',
      workHeading: 'How we work',
      workItems: [
        {
          title: 'Architecture first',
          text: 'Most system problems are architectural decisions that were postponed at the start, so we design before we write code.',
        },
        {
          title: 'You work directly with the engineer',
          text: 'No middlemen, no management layers. The person who discusses your project is the person who builds it.',
        },
        {
          title: 'Full transparency',
          text: 'A written scope of work, honest estimates, and a clear "no" when a project isn\u0027t a good fit for us.',
        },
        {
          title: 'Systems delivered to last',
          text: 'Documented, maintainable code that your team, or any other developer, can continue after us.',
        },
      ],
      productsHeading: 'We build our own products too',
      productsText:
        "We don't only work for clients. We build our own products and use them ourselves — the first is Waraq: a personal accounting app in dollars and Syrian pounds that works without internet.",
      productsLink: 'Discover Waraq →',
      ctaHeading: 'Have a project or a system that needs a review?',
      ctaLabel: 'Contact us',
    },
    contact: {
      title: 'Contact us — EllipSoft',
      description: "Tell us about your project or your problem, and we'll suggest the next step.",
      heroTitle: 'Contact us',
      heroSubtitle: "Tell us about your project or your problem, and we'll suggest the next step.",
      channelsHeading: 'How to reach us',
      whatsappChannel: 'WhatsApp (fastest)',
      emailChannel: 'Email',
      facebookChannel: 'Facebook',
      facebookLinkLabel: 'EllipSoft on Facebook',
      usefulHeading: 'Make your first message useful',
      usefulIntro: 'Briefly tell us:',
      usefulItems: [
        'What your system does, or what you want to build.',
        "The problem you're facing, or the goal you want to reach.",
        'When you need the result.',
      ],
      nextHeading: 'What happens next',
      nextText:
        'We read your message and reply with clarifying questions or a time for a first conversation — with no commitment.',
    },
  },

  notFound: {
    title: 'Page not found — EllipSoft',
    description: 'The link you used is incorrect, or the page has moved.',
    heading: 'Page not found',
    body: 'The link you used is incorrect, or the page has moved.',
    linkHome: 'Back to the homepage',
  },
};
