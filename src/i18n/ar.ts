import type { Dictionary } from './types';

/**
 * Arabic dictionary (default locale).
 * All UI and page copy here is final (owner-approved) — change it only
 * with the owner's approval.
 */
export const ar: Dictionary = {
  skipToContent: 'تجاوز إلى المحتوى الرئيسي',
  nav: {
    home: 'الرئيسية',
    services: 'الخدمات',
    products: 'منتجاتنا',
    about: 'من نحن',
    contact: 'تواصل معنا',
  },
  mainNavLabel: 'التنقل الرئيسي',
  menuLabel: 'فتح القائمة',
  switchLangLabel: 'English',

  footerTagline: 'شركة برمجيات متخصصة في أنظمة المؤسسات وتكامل وكلاء الذكاء الاصطناعي.',
  footerContactTitle: 'قنوات التواصل',
  emailLabel: 'البريد الإلكتروني',
  whatsappLabel: 'راسلنا عبر واتساب',
  facebookLabel: 'صفحتنا على فيسبوك',
  copyright: '© {year} EllipSoft — جميع الحقوق محفوظة.',

  og: {
    companyAlt: 'EllipSoft — نبني أنظمة موثوقة تصمد تحت الضغط — ellipsoft.com',
    waraqAlt: 'ورق — دفترك المالي بالدولار والليرة — ellipsoft.com',
  },

  products: {
    statusComingSoon: 'قريبًا على Google Play',
    statusAvailable: 'متاح الآن',
    viewProduct: 'اعرف المزيد عن {name}',
    aboutHeading: 'ما هو {name}؟',
    featuresHeading: 'المميزات',
    screenshotsHeading: 'لقطات الشاشة',
    googlePlayLabel: 'حمّله من Google Play',
    privacyLinkLabel: 'اقرأ سياسة الخصوصية الكاملة ←',
    privacyHeading: 'سياسة الخصوصية لتطبيق {name}',
    privacyTitle: 'سياسة الخصوصية لتطبيق {name} — EllipSoft',
    privacyDescription: 'سياسة الخصوصية لتطبيق {name} من EllipSoft.',
    privacyLastUpdated: 'آخر تحديث:',
  },

  pages: {
    home: {
      title: 'EllipSoft — نبني أنظمة موثوقة تصمد تحت الضغط',
      description:
        'EllipSoft شركة برمجيات متخصصة في أنظمة المؤسسات، وتطبيقات SaaS، وتكامل وكلاء الذكاء الاصطناعي.',
      heroTitle: 'نبني أنظمة موثوقة تصمد تحت الضغط',
      heroSubtitle:
        'EllipSoft شركة برمجيات متخصصة في أنظمة المؤسسات، وتطبيقات SaaS، وتكامل وكلاء الذكاء الاصطناعي. نبدأ من التصميم المعماري، لأن أغلب مشاكل الأنظمة قرارات أُجّلت في البداية.',
      heroPrimaryCta: 'ابدأ مشروعك',
      heroSecondaryCta: 'تعرّف على خدماتنا',
      offerHeading: 'ما نقدّمه',
      offerLink: 'كل التفاصيل في صفحة الخدمات ←',
      whyHeading: 'لماذا EllipSoft',
      whyItems: [
        { title: 'خبرة تتجاوز 14 عامًا', text: 'في أنظمة المؤسسات والأنظمة المالية.' },
        { title: 'المعمارية أولًا', text: 'نصمم قبل أن نكتب الكود.' },
        { title: 'تتعامل مع المهندس مباشرة', text: 'من يناقش مشروعك هو من يبنيه.' },
      ],
      productsHeading: 'من منتجاتنا',
      finalCtaHeading: 'هل لديك مشروع أو نظام يحتاج مراجعة؟',
      finalCtaText: 'أخبرنا بما تحتاجه، ونرد عليك بخطوة واضحة.',
      finalCtaLabel: 'تواصل معنا',
    },
    services: {
      title: 'خدماتنا — EllipSoft',
      description:
        'خمسة مجالات نعمل فيها فعليًا، من بناء نظام كامل إلى مراجعة معمارية لنظام قائم.',
      heroTitle: 'خدماتنا',
      heroSubtitle:
        'خمسة مجالات نعمل فيها فعليًا، من بناء نظام كامل إلى مراجعة معمارية لنظام قائم.',
      workHeading: 'كيف نعمل معك',
      workSteps: [
        { title: 'محادثة أولى', text: 'نفهم مشكلتك وهدفك، دون التزام.' },
        { title: 'نطاق عمل مكتوب', text: 'ما سنبنيه، وما لن نبنيه، والمدة، والتكلفة.' },
        { title: 'تنفيذ على مراحل', text: 'تستلم وترى التقدم في كل مرحلة، لا في النهاية فقط.' },
        { title: 'تسليم كامل', text: 'الكود، والتوثيق، وكل ما يلزم لتستمر بدوننا إن أردت.' },
      ],
      ctaHeading: 'لست متأكدًا أي خدمة تناسبك؟',
      ctaText: 'أخبرنا بمشكلتك، ونقترح عليك الطريق الأنسب.',
      ctaLabel: 'تواصل معنا',
    },
    products: {
      title: 'منتجاتنا — EllipSoft',
      description: 'منتجات نبنيها لحل مشاكل حقيقية، ونستخدمها بأنفسنا قبل أن نقدّمها لك.',
      heading: 'منتجاتنا',
      body: 'منتجات نبنيها لحل مشاكل حقيقية، ونستخدمها بأنفسنا قبل أن نقدّمها لك.',
    },
    about: {
      title: 'EllipSoft: نبني أنظمة تصمد',
      description:
        'شركة برمجيات صغيرة متخصصة في أنظمة المؤسسات، وتطبيقات SaaS، وتكامل وكلاء الذكاء الاصطناعي، وتبني منتجاتها الخاصة أيضًا.',
      heroTitle: 'EllipSoft: نبني أنظمة تصمد',
      heroSubtitle:
        'شركة برمجيات صغيرة متخصصة في أنظمة المؤسسات، وتطبيقات SaaS، وتكامل وكلاء الذكاء الاصطناعي، وتبني منتجاتها الخاصة أيضًا.',
      behindHeading: 'من يقف خلف EllipSoft',
      behindText:
        'يقود EllipSoft مهندس برمجيات بخبرة تتجاوز 14 عامًا في بناء أنظمة المؤسسات والأنظمة المالية، وعمل مع عملاء دوليين على منصات متعددة المستأجرين، وتكامل الأنظمة، والبنية السحابية على Azure.',
      workHeading: 'كيف نعمل',
      workItems: [
        {
          title: 'المعمارية أولًا',
          text: 'أغلب مشاكل الأنظمة قرارات معمارية أُجّلت في البداية، لذلك نبدأ بالتصميم قبل الكود.',
        },
        {
          title: 'تتعامل مع المهندس مباشرة',
          text: 'لا وسطاء ولا طبقات إدارية. من يناقش مشروعك هو من يبنيه.',
        },
        {
          title: 'وضوح كامل',
          text: 'نطاق عمل مكتوب، وتقديرات صريحة، و"لا" واضحة عندما لا يناسبنا المشروع.',
        },
        {
          title: 'أنظمة تُسلَّم لتعيش',
          text: 'كود موثّق وقابل للصيانة، يستطيع فريقك أو أي مطوّر آخر متابعته بعدنا.',
        },
      ],
      productsHeading: 'نبني منتجاتنا أيضًا',
      productsText:
        'لا نكتفي بالعمل للعملاء. نبني منتجاتنا الخاصة ونستخدمها بأنفسنا، وأولها ورق: تطبيق محاسبة شخصي بالدولار والليرة يعمل دون إنترنت.',
      productsLink: 'تعرّف على ورق ←',
      ctaHeading: 'هل لديك مشروع أو نظام يحتاج مراجعة؟',
      ctaLabel: 'تواصل معنا',
    },
    contact: {
      title: 'تواصل معنا — EllipSoft',
      description: 'أخبرنا عن مشروعك أو مشكلتك، وسنقترح عليك الخطوة التالية.',
      heroTitle: 'تواصل معنا',
      heroSubtitle: 'أخبرنا عن مشروعك أو مشكلتك، وسنقترح عليك الخطوة التالية.',
      channelsHeading: 'طرق التواصل',
      whatsappChannel: 'واتساب (الأسرع)',
      emailChannel: 'البريد الإلكتروني',
      facebookChannel: 'فيسبوك',
      facebookLinkLabel: 'صفحة EllipSoft',
      usefulHeading: 'لتكون رسالتك الأولى مفيدة',
      usefulIntro: 'اذكر باختصار:',
      usefulItems: [
        'ما الذي يفعله نظامك، أو ما الذي تريد بناءه.',
        'المشكلة التي تواجهها، أو الهدف الذي تريده.',
        'الموعد الذي تحتاج فيه النتيجة.',
      ],
      nextHeading: 'ماذا يحدث بعد ذلك',
      nextText: 'نقرأ رسالتك ونرد عليك بأسئلة توضيحية أو موعد لمحادثة أولى، دون أي التزام.',
    },
  },

  notFound: {
    title: 'الصفحة غير موجودة — EllipSoft',
    description: 'الرابط الذي استخدمته غير صحيح، أو أن الصفحة نُقلت.',
    heading: 'الصفحة غير موجودة',
    body: 'الرابط الذي استخدمته غير صحيح، أو أن الصفحة نُقلت.',
    linkHome: 'العودة إلى الصفحة الرئيسية',
  },
};
