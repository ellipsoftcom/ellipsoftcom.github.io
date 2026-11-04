/**
 * Site-wide settings — the single source of truth for identity and
 * contact details used across layouts and components.
 */
export const SITE = {
  /** Site name used in the header, titles and OG tags. */
  name: 'EllipSoft',
  /** Canonical production origin (no trailing slash). */
  url: 'https://ellipsoft.com',
  /** Logo (PNG, light-background variant) used in structured data. */
  logo: '/brand/ellipsoft-logo.png',
  /** Contact email (decision #5). */
  email: 'hello@ellipsoft.com',
  /**
   * WhatsApp number in international format, digits only (Syria +963).
   */
  whatsapp: '963954661527',
  /** Same number formatted for on-page display (always an LTR run). */
  whatsappDisplay: '+963 954 661 527',
  /** Facebook page URL (carried over from the previous site). */
  facebook: 'https://www.facebook.com/people/EllipSoft/61593004914802/',
} as const;

/** WhatsApp deep link (https://wa.me/<number>). */
export const whatsappUrl = `https://wa.me/${SITE.whatsapp}`;

/** WhatsApp deep link with a URL-encoded prefilled message. */
export const whatsappUrlWithText = (text: string): string =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
