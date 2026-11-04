/**
 * Services catalogue — the single source of truth for the Services page.
 *
 * Each entry has a title, a description, and a "good fit for" line
 * (which includes its own localized prefix: "مناسبة لـ: …" /
 * "Good fit for: …"), in both languages side by side. The page itself
 * (hero, process steps, CTA) lives in the i18n dictionaries
 * (`pages.services`) because it is one-off page copy, not repeating data.
 *
 * Adding a service = appending ONE entry to `services` below.
 */

import type { Localized } from './products';

export interface Service {
  /** Service title. */
  title: Localized;
  /** One-line summary used on the Home page cards. */
  summary: Localized;
  /** What the service is (Services page card). */
  description: Localized;
  /** "Good fit for" line, prefix included, verbatim. */
  goodFitFor: Localized;
}

export const services: Service[] = [
  {
    title: { ar: 'تطوير أنظمة المؤسسات', en: 'Enterprise systems development' },
    summary: {
      ar: 'أنظمة خلفية قوية بـ ASP.NET Core تتحمل الضغط وتتوسع مع عملك.',
      en: 'Robust ASP.NET Core backends that handle load and scale with your business.',
    },
    description: {
      ar: 'أنظمة داخلية وخلفية (Backend) قوية باستخدام ASP.NET Core، مصممة لتتحمل الضغط وتتوسع مع نمو عملك.',
      en: 'Robust internal and backend systems built with ASP.NET Core, designed to handle load and scale as your business grows.',
    },
    goodFitFor: {
      ar: 'مناسبة لـ: الشركات التي تحتاج نظامًا خاصًا بعملياتها، بدل حلول جاهزة لا تناسبها.',
      en: "Good fit for: companies that need a system built around their own operations, instead of off-the-shelf tools that don't fit.",
    },
  },
  {
    title: { ar: 'تطبيقات SaaS متعددة المستأجرين', en: 'Multi-tenant SaaS applications' },
    summary: {
      ar: 'منصة واحدة تخدم عملاء متعددين من قاعدة كود واحدة.',
      en: 'One platform serving many customers from a single codebase.',
    },
    description: {
      ar: 'منصة واحدة تخدم عملاء متعددين، لكل منهم بياناته المعزولة وإعداداته الخاصة، من قاعدة كود واحدة.',
      en: 'One platform serving many customers, each with isolated data and their own settings, from a single codebase.',
    },
    goodFitFor: {
      ar: 'مناسبة لـ: من يريد تحويل فكرته أو خدمته إلى منتج اشتراكات.',
      en: 'Good fit for: anyone who wants to turn an idea or a service into a subscription product.',
    },
  },
  {
    title: { ar: 'تكامل وكلاء الذكاء الاصطناعي', en: 'AI agent integration' },
    summary: {
      ar: 'أتمتة المهام المتكررة داخل أنظمتك القائمة.',
      en: 'Automating repetitive work inside your existing systems.',
    },
    description: {
      ar: 'دمج وكلاء ذكاء اصطناعي داخل أنظمتك القائمة لأتمتة المهام المتكررة، مع الحفاظ على أمان بياناتك وتحكمك الكامل.',
      en: 'Integrating AI agents into your existing systems to automate repetitive work, while keeping your data secure and fully under your control.',
    },
    goodFitFor: {
      ar: 'مناسبة لـ: الفرق التي تضيع وقتها في عمليات يدوية يمكن أتمتتها.',
      en: 'Good fit for: teams losing time on manual processes that can be automated.',
    },
  },
  {
    title: { ar: 'تطوير تطبيقات الويب المتكاملة', en: 'Full-stack web development' },
    summary: {
      ar: 'واجهات حديثة بـ React وNext.js مربوطة بخلفية متينة.',
      en: 'Modern React and Next.js interfaces connected to a solid backend.',
    },
    description: {
      ar: 'واجهات حديثة باستخدام React وNext.js، مربوطة بخلفية متينة.',
      en: 'Modern interfaces built with React and Next.js, connected to a solid backend.',
    },
    goodFitFor: {
      ar: 'مناسبة لـ: من يحتاج نظامًا كاملًا من الواجهة إلى قاعدة البيانات.',
      en: 'Good fit for: anyone who needs a complete system, from the interface to the database.',
    },
  },
  {
    title: { ar: 'الاستشارات والمراجعة المعمارية', en: 'Consulting and architecture review' },
    summary: {
      ar: 'خطة عملية لإصلاح نظام بطيء أو أصبح تعديله مكلفًا.',
      en: 'A practical plan to fix a system that is slow or has become expensive to change.',
    },
    description: {
      ar: 'مراجعة نظامك القائم وتحديد نقاط الضعف في الأداء والأمان وقابلية التوسع، مع خطة إصلاح عملية ومرتبة حسب الأولوية.',
      en: 'A review of your existing system that identifies weaknesses in performance, security, and scalability — with a practical, prioritized remediation plan.',
    },
    goodFitFor: {
      ar: 'مناسبة لـ: نظام بطيء، أو يتعطل تحت الضغط، أو أصبح تعديله مكلفًا.',
      en: 'Good fit for: a system that is slow, breaks under load, or has become expensive to change.',
    },
  },
];
