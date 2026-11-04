/**
 * Product catalogue — the single source of truth for everything shown in
 * the "Products" section of the site.
 *
 * Owner decisions (AGENTS.md #8–9): only products the owner OWNS are
 * listed here — no client projects. "Work" became "Products".
 *
 * HOW TO ADD A PRODUCT: append ONE entry to `products` below. All routes
 * are generated from the array — no new page templates needed:
 *   /{ar,en}/products/<slug>/          → src/views/ProductDetail.astro
 *   /{ar,en}/products/<slug>/privacy/  → src/views/ProductPrivacy.astro
 * via getStaticPaths() in src/pages/{ar,en}/products/[slug]/…
 * Cards on the products listing and the home-page feature section also
 * derive from this array.
 */

/** A string localized per language (keep both languages in parity). */
export interface Localized {
  ar: string;
  en: string;
}

/** Release status — drives the badge and the CTA on the product page. */
export type ProductStatus = 'coming-soon' | 'available';

/** One section of a product's privacy policy. Numbered automatically
 *  (array order + 1) when rendered. */
export interface PrivacySection {
  heading: Localized;
  /** Main body paragraph. */
  paragraph?: Localized;
  /** Bullet list under the paragraph. */
  list?: { ar: string[]; en: string[] };
  /** Permissions table (rendered after paragraph/list). */
  table?: PrivacyTable;
}

/** "App permissions" table: one row per permission. */
export interface PrivacyTable {
  /** Header cells. */
  columns: { permission: Localized; reason: Localized };
  rows: { permission: Localized; reason: Localized }[];
  /** Note rendered after the table. */
  note: Localized;
}

/** A product's privacy policy (required for Google Play publishing). */
export interface ProductPrivacy {
  /** "Last updated" date shown on the page (ISO yyyy-mm-dd). */
  lastUpdated: string;
  sections: PrivacySection[];
}

/** One feature entry: bold title ("الدولار والليرة دون خلط") + its text. */
export interface ProductFeature {
  title: Localized;
  text: Localized;
}

/** Product-page call to action (shown while status is coming-soon). */
export interface ProductCta {
  heading: Localized;
  text: Localized;
  /** Button label (links to WhatsApp with the prefilled message). */
  label: Localized;
}

export interface Product {
  /** Route slug → /{ar,en}/products/<slug>/. Stable once published. */
  slug: string;
  /** Short display name: Arabic script in `ar`, Latin script in `en`. */
  name: Localized;
  /** Hero title — also the headline on listing cards and the home feature. */
  headline: Localized;
  /** Hero subtitle — also the description on cards and the home feature. */
  subtitle: Localized;
  /** SEO meta description (~155 chars max, derived from the subtitle). */
  metaDescription: Localized;
  /** "What it is" paragraph. */
  about: Localized;
  /** Release status. */
  status: ProductStatus;
  /** Platform label shown on cards (e.g. 'Android'). */
  platform: string;
  /** schema.org `applicationCategory` used in structured data
   *  (e.g. 'FinanceApplication'). */
  applicationCategory: string;
  /** Price label (e.g. 'مجاني' / 'Free') — also a hero badge. */
  price: Localized;
  /** Machine-readable price for structured data (schema.org Offer). */
  offer: { price: string; priceCurrency: string };
  /** Google Play listing URL — empty string until the app is published. */
  playStoreUrl: string;
  /** Feature list. */
  features: ProductFeature[];
  /** Screenshot paths under /public — an empty list hides the section. */
  screenshots: string[];
  /** Privacy-highlights section on the product page. */
  privacyHighlights: {
    heading: Localized;
    items: { ar: string[]; en: string[] };
  };
  /** Early-access CTA (used while status is coming-soon). */
  cta: ProductCta;
  /** Prefilled WhatsApp early-access message (used while coming-soon). */
  earlyAccessMessage: Localized;
  /** Privacy policy content. */
  privacy: ProductPrivacy;
}

export const products: Product[] = [
  {
    slug: 'waraq',
    name: { ar: 'ورق', en: 'Waraq' },
    headline: {
      ar: 'ورق: دفترك المالي بالدولار والليرة',
      en: 'Waraq: your money notebook in dollars and Syrian pounds',
    },
    subtitle: {
      ar: 'سجّل دخلك ومصاريفك وديونك ومشاريعك بعملتين منفصلتين، دون إنترنت ودون حساب. بياناتك على هاتفك فقط، ولا تخرج إلا إن صدّرتها أنت.',
      en: 'Track your income, expenses, debts and projects in two separate currencies — no internet, no account. Your data stays on your phone, and leaves only when you export it yourself.',
    },
    metaDescription: {
      ar: 'سجّل دخلك ومصاريفك وديونك ومشاريعك بعملتين منفصلتين، دون إنترنت ودون حساب. بياناتك على هاتفك فقط، ولا تخرج إلا إن صدّرتها أنت.',
      en: 'Track your income, expenses, debts and projects in two separate currencies — no internet, no account.',
    },
    about: {
      ar: 'وُلد ورق ليحلّ محلّ الدفتر الورقي الذي نسجّل فيه حساباتنا. صُمّم لواقعنا: عملتان لا تختلطان، وإنترنت لا يُعتمد عليه، وخصوصية لا تُساوَم عليها.',
      en: "Waraq was born to replace the paper notebook we keep our accounts in. It's built for our reality: two currencies that never mix, an internet connection you can't rely on, and privacy that isn't up for negotiation.",
    },
    status: 'coming-soon',
    platform: 'Android',
    applicationCategory: 'FinanceApplication',
    price: { ar: 'مجاني', en: 'Free' },
    offer: { price: '0', priceCurrency: 'USD' },
    playStoreUrl: '',
    features: [
      {
        title: { ar: 'الدولار والليرة دون خلط', en: 'Dollars and pounds, never mixed' },
        text: {
          ar: 'لكل محفظة عملتها، والمجاميع منفصلة دائمًا. وعند الصرف تسجّل المبلغين كما دفعتهما فعلًا، دون أسعار صرف.',
          en: 'Each wallet has its own currency, and totals always stay separate. When you exchange money, you record both amounts exactly as they happened — no exchange rates.',
        },
      },
      {
        title: { ar: 'يعمل دون إنترنت تمامًا', en: 'Fully offline' },
        text: {
          ar: 'لا يحتاج اتصالًا، بل لا يملك صلاحية الوصول للإنترنت أصلًا.',
          en: 'It needs no connection; in fact, it has no internet permission at all.',
        },
      },
      {
        title: { ar: 'مشاريع حياتك', en: 'Your life projects' },
        text: {
          ar: 'بناء البيت، والدراسة، ومصاريف العائلة. لكل مشروع مصاريفه ومراحله ومهامه وعقوده.',
          en: 'Building a house, your studies, family expenses. Each project has its own expenses, phases, tasks and contracts.',
        },
      },
      {
        title: { ar: 'الديون والميزانيات', en: 'Debts and budgets' },
        text: {
          ar: 'من لك ومن عليك بالعملتين، مع تنبيه عند اقتراب الميزانية من حدها.',
          en: 'Who owes you and whom you owe, in both currencies, with an alert when a budget nears its limit.',
        },
      },
      {
        title: { ar: 'مستنداتك وإيصالاتك', en: 'Your documents and receipts' },
        text: {
          ar: 'صوّر الإيصال، واحفظ العقود والوثائق مع تذكير قبل انتهاء صلاحيتها.',
          en: 'Photograph receipts, and keep contracts and documents with a reminder before they expire.',
        },
      },
      {
        title: { ar: 'تقارير PDF', en: 'PDF reports' },
        text: {
          ar: 'كشف حساب جاهز ترسله للمقاول أو الشريك عبر واتساب.',
          en: 'A ready-made statement to send to your contractor or partner over WhatsApp.',
        },
      },
    ],
    screenshots: [],
    privacyHighlights: {
      heading: {
        ar: 'خصوصيتك مضمونة بالتصميم، لا بالوعود',
        en: 'Private by design, not by promise',
      },
      items: {
        ar: [
          'لا حساب ولا تسجيل دخول.',
          'لا إعلانات ولا تتبع، ولا اتصال بأي خادم.',
          'بياناتك على هاتفك، ولا تخرج إلا عندما تصدّر نسخة احتياطية أو تقريرًا بنفسك.',
          'قفل بالبصمة، ونسخ احتياطي مشفّر بكلمة سر تختارها أنت.',
        ],
        en: [
          'No account, no sign-in.',
          'No ads, no tracking, no connection to any server.',
          'Your data stays on your phone, and leaves only when you export a backup or a report yourself.',
          'Fingerprint lock, and encrypted backups protected by a password you choose.',
        ],
      },
    },
    cta: {
      heading: { ar: 'هل تريد تجربة ورق قبل نشره؟', en: 'Want to try Waraq before launch?' },
      text: {
        ar: 'تواصل معنا عبر واتساب لتحصل على نسخة مبكرة.',
        en: 'Contact us on WhatsApp to get an early version.',
      },
      label: { ar: 'اطلب نسخة مبكرة عبر واتساب', en: 'Request early access via WhatsApp' },
    },
    earlyAccessMessage: {
      ar: 'مرحبًا، أرغب بتجربة تطبيق ورق مبكرًا',
      en: "Hi, I'd like early access to the Waraq app",
    },
    privacy: {
      lastUpdated: '2026-11-01',
      sections: [
        {
          heading: { ar: 'مقدمة', en: 'Introduction' },
          paragraph: {
            ar: 'ورق تطبيق محاسبة شخصي لهواتف Android، تنشره EllipSoft. صُمّم ليعمل دون إنترنت بالكامل. توضح هذه السياسة ما يحدث لبياناتك، والجواب المختصر: لا نجمع أي شيء.',
            en: 'Waraq is a personal accounting app for Android phones, published by EllipSoft. It is designed to work completely offline. This policy explains what happens to your data — and the short answer is: we collect nothing.',
          },
        },
        {
          heading: { ar: 'البيانات التي نجمعها', en: 'Data we collect' },
          paragraph: {
            ar: 'لا شيء. لا نجمع ولا نستقبل ولا نخزّن أي بيانات عنك أو عن استخدامك للتطبيق. فلا حساب ولا تسجيل دخول، ولا تحليلات استخدام، ولا تقارير أعطال، ولا إعلانات، ولا معرّفات للجهاز أو للإعلانات.',
            en: 'None. We do not collect, receive, or store any data about you or how you use the app. There is no account and no sign-in, no usage analytics, no crash reporting, no ads, and no device or advertising identifiers.',
          },
        },
        {
          heading: { ar: 'أين تُحفظ بياناتك', en: 'Where your data is stored' },
          paragraph: {
            ar: 'كل ما تُدخله في ورق يُحفظ داخل التطبيق على هاتفك فقط: معاملاتك، ومحافظك، ومشاريعك، ومستنداتك، وصورك المرفقة، وملفك الشخصي الاختياري (الاسم، والشركة، ورقم الهاتف، والبريد، والشعار). وهي محمية بنظام حماية Android الذي يمنع أي تطبيق آخر من الوصول إليها.',
            en: "Everything you enter in Waraq is stored inside the app on your phone only: your transactions, wallets, projects, documents, attached photos, and your optional profile (name, company, phone number, email, and logo). It is protected by Android's app sandbox, which prevents other apps from accessing it.",
          },
          list: {
            ar: [
              'لا يملك ورق صلاحية الوصول للإنترنت، ولا يتصل بأي خادم.',
              'النسخ الاحتياطي التلقائي من Google معطّل لبيانات ورق، وكذلك النقل التلقائي بين الأجهزة.',
            ],
            en: [
              'Waraq has no internet permission and does not connect to any server.',
              "Google's automatic backup is disabled for Waraq's data, and so is automatic device-to-device transfer.",
            ],
          },
        },
        {
          heading: { ar: 'متى تخرج بياناتك من هاتفك', en: 'When your data leaves your phone' },
          paragraph: {
            ar: 'فقط عندما تقرر أنت ذلك:',
            en: 'Only when you decide:',
          },
          list: {
            ar: [
              'النسخ الاحتياطي: تحفظ ملفًا مشفّرًا بكلمة سر تختارها أنت في مكان تحدده (مثل مجلد على هاتفك أو Google Drive). إن اخترت مجلدًا متزامنًا مع خدمة سحابية، فالملف يخضع لسياسة تلك الخدمة. إذا نسيت كلمة السر، لا يمكن استعادة النسخة، ولا نستطيع نحن ذلك أيضًا.',
              'تقارير PDF والمستندات: عندما تشارك تقريرًا أو مستندًا (مثلًا عبر واتساب)، يصل إلى الجهة التي اخترتها.',
            ],
            en: [
              "Backups: you save a file encrypted with a password you choose, to a location you pick (such as a folder on your phone or Google Drive). If you choose a folder synced with a cloud service, the file is subject to that service's policy. If you forget the password, the backup cannot be recovered — not even by us.",
              'PDF reports and documents: when you share a report or document (for example via WhatsApp), it goes to the recipient you chose.',
            ],
          },
        },
        // PENDING: awaiting final permission list and the erase-all-data
        // decision from the Waraq team.
        {
          heading: { ar: 'صلاحيات التطبيق', en: 'App permissions' },
          table: {
            columns: {
              permission: { ar: 'الصلاحية', en: 'Permission' },
              reason: { ar: 'سبب وجودها', en: 'Why it is needed' },
            },
            rows: [
              {
                permission: { ar: 'البصمة/قفل الشاشة', en: 'Fingerprint / screen lock' },
                reason: {
                  ar: 'لفتح التطبيق بأمان. لا يخزّن ورق بصمتك ولا أي رمز، فالتحقق يتم بالكامل عبر نظام Android.',
                  en: 'To open the app securely. Waraq does not store your fingerprint or any PIN — verification is handled entirely by Android.',
                },
              },
              {
                permission: { ar: 'الإشعارات', en: 'Notifications' },
                reason: {
                  ar: 'لتنبيهات الميزانية، وتذكيرات النسخ الاحتياطي، وانتهاء صلاحية المستندات.',
                  en: 'For budget alerts, backup reminders, and document expiry reminders.',
                },
              },
              {
                permission: {
                  ar: 'العمل في الخلفية وعند تشغيل الهاتف',
                  en: 'Background work and start at boot',
                },
                reason: {
                  ar: 'لتنفيذ النسخ الاحتياطي التلقائي والتذكيرات في وقتها.',
                  en: 'To run automatic backups and reminders on time.',
                },
              },
              {
                permission: { ar: 'حالة الشبكة', en: 'Network state' },
                reason: {
                  ar: 'تضيفها تلقائيًا مكتبة جدولة المهام من Android. ورق لا يستخدمها للاتصال بأي شيء، فهو لا يملك صلاحية الإنترنت أصلًا.',
                  en: "Added automatically by Android's task-scheduling library. Waraq does not use it to connect to anything — it has no internet permission at all.",
                },
              },
            ],
            note: {
              ar: 'لا يطلب ورق صلاحية الموقع، ولا جهات الاتصال، ولا الكاميرا (الصور تُلتقط عبر تطبيق الكاميرا في هاتفك)، ولا الوصول العام للملفات.',
              en: "Waraq does not request location, contacts, camera (photos are taken through your phone's camera app), or broad file access.",
            },
          },
        },
        {
          heading: { ar: 'الأطفال', en: 'Children' },
          paragraph: {
            ar: 'ورق غير موجّه للأطفال، ولا يجمع بيانات من أي مستخدم في كل الأحوال.',
            en: 'Waraq is not directed at children, and it does not collect data from any user in any case.',
          },
        },
        // PENDING: awaiting final permission list and the erase-all-data
        // decision from the Waraq team.
        {
          heading: { ar: 'حذف بياناتك', en: 'Deleting your data' },
          paragraph: {
            ar: 'يمكنك حذف أي سجل من داخل التطبيق. ولحذف كل البيانات نهائيًا، احذف التطبيق من هاتفك، فتُحذف كل بياناته معه. أما ملفات النسخ الاحتياطي التي حفظتها بنفسك خارج التطبيق فلا تُحذف تلقائيًا، ويمكنك حذفها يدويًا.',
            en: 'You can delete any record from inside the app. To permanently delete all data, uninstall the app from your phone — all of its data is deleted with it. Backup files you saved yourself outside the app are not deleted automatically; you can delete them manually.',
          },
        },
        {
          heading: { ar: 'التغييرات على هذه السياسة', en: 'Changes to this policy' },
          paragraph: {
            ar: 'إن تغيّرت طريقة تعامل ورق مع البيانات، مثلًا عند إضافة مزامنة سحابية اختيارية مستقبلًا، نحدّث هذه الصفحة ونغيّر تاريخ "آخر تحديث" قبل إصدار التحديث.',
            en: 'If the way Waraq handles data changes — for example, if optional cloud sync is added in the future — we will update this page and its "Last updated" date before releasing that update.',
          },
        },
        {
          heading: { ar: 'التواصل', en: 'Contact' },
          paragraph: {
            ar: 'لأي سؤال عن الخصوصية: hello@ellipsoft.com',
            en: 'For any privacy question: hello@ellipsoft.com',
          },
        },
      ],
    },
  },
];

/** Slugs for getStaticPaths(). */
export const productSlugs: string[] = products.map((product) => product.slug);

/** Look up a product by slug. */
export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
