/**
 * Open Graph image templates — the SOURCE OF TRUTH for all OG images.
 *
 * Edit the text/geometry here, then run `npm run og` to regenerate the
 * PNGs into public/og/ (and the public/og-image.png fallback). The PNGs
 * are committed, so deploys never run the renderer.
 *
 * Canvas: 1200×630 (OG standard). Content stays inside a central safe
 * column (x 280–920) so center/square-cropping apps (WhatsApp & co.)
 * don't cut key text. Arabic images are right-aligned (RTL), English
 * left-aligned. No status text ("coming soon" etc.) — it would go stale.
 *
 * Colors match the site tokens: bg #0F172A, text #F1F5F9, muted #94A3B8,
 * accent #2DD4BF. Fonts: IBM Plex Sans Arabic (ar) / IBM Plex Sans (en),
 * loaded from scripts/og/fonts/ by the renderer (no system-font
 * fallback — a missing font fails loudly, never silently).
 *
 * NOTE: headline sizes are the largest that keep every line inside the
 * 640px safe column (measured): Arabic 66px, English 54px.
 */

const BG = '#0F172A';
const TEXT = '#F1F5F9';
const MUTED = '#94A3B8';
const ACCENT = '#2DD4BF';

/** Safe column edges (key content lives between these). */
const SAFE_START = 280;
const SAFE_END = 920;

/** The logo mark (from public/brand/ellipsoft-mark-dark.svg): a tilted
 *  teal ellipse ring with a white core, scaled to `size` px. */
function logoMark(x, y, size) {
  const scale = size / 32;
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <g transform="rotate(-20 16 16)">
      <ellipse cx="16" cy="16" rx="11.2" ry="6.6" fill="none" stroke="${ACCENT}" stroke-width="2.8"/>
      <ellipse cx="16" cy="16" rx="4" ry="2.4" fill="#FFFFFF"/>
    </g>
  </g>`;
}

/** Subtle teal glow, same motif as the site hero. */
function glow() {
  return `<radialGradient id="glow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.14"/>
    <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
  </radialGradient>
  <circle cx="1050" cy="-40" r="520" fill="url(#glow)"/>`;
}

/**
 * Company image: logo lockup + headline + domain.
 * Arabic is right-aligned inside the safe column (RTL), English left.
 */
export function companySvg(lang) {
  const ar = lang === 'ar';
  const family = ar ? 'IBM Plex Sans Arabic' : 'IBM Plex Sans';
  const headline = ar
    ? ['نبني أنظمة موثوقة', 'تصمد تحت الضغط']
    : ['We build reliable systems', 'that hold up under pressure'];

  const size = ar ? 66 : 54;
  const lineGap = ar ? 82 : 70; // ≈1.25–1.3 line height
  const firstBaseline = ar ? 298 : 292;
  // Slight tracking tightening keeps the longer English lines in-column.
  const tracking = ar ? '' : ' letter-spacing="-1"';

  const align = ar ? 'text-anchor="end" direction="rtl"' : 'text-anchor="start"';
  const edge = ar ? SAFE_END : SAFE_START; // text edge inside the safe column
  const markSize = 46;
  const markX = ar ? SAFE_END - markSize : SAFE_START;
  const wordmarkX = ar ? SAFE_END - markSize - 16 : SAFE_START + markSize + 16;

  const lines = headline
    .map(
      (line, i) =>
        `<text x="${edge}" y="${firstBaseline + i * lineGap}" ${align} font-family="${family}" font-size="${size}" font-weight="700" fill="${TEXT}"${tracking}>${line}</text>`,
    )
    .join('\n  ');
  const lastBaseline = firstBaseline + (headline.length - 1) * lineGap;
  const ruleY = lastBaseline + 44;
  const domainY = ruleY + 58;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>${glow()}</defs>
  <rect width="1200" height="630" fill="${BG}"/>
  ${logoMark(markX, 148, markSize)}
  <text x="${wordmarkX}" y="184" ${ar ? 'text-anchor="end"' : 'text-anchor="start"'} font-family="${family}" font-size="34" font-weight="700" fill="${TEXT}">EllipSoft</text>
  ${lines}
  <rect x="${ar ? SAFE_END - 76 : SAFE_START}" y="${ruleY}" width="76" height="5" rx="2.5" fill="${ACCENT}"/>
  <text x="${edge}" y="${domainY}" ${align} font-family="${family}" font-size="26" font-weight="400" fill="${MUTED}">ellipsoft.com</text>
</svg>`;
}

/**
 * Waraq image: the product name is the main element, in accent teal,
 * with a large tilted ellipse-ring accent (the logo geometry, oversized)
 * breaking the edge opposite the text. Visually distinct from the
 * company images; no invented app icon.
 *
 * Vertical rhythm is derived from the LAST subtitle line so 1-line
 * (Arabic) and 2-line (English) subtitles both get the same gap to the
 * domain line.
 */
export function waraqSvg(lang) {
  const ar = lang === 'ar';
  const family = ar ? 'IBM Plex Sans Arabic' : 'IBM Plex Sans';
  const name = ar ? 'ورق' : 'Waraq';
  const nameSize = ar ? 150 : 120;
  const nameBaseline = ar ? 290 : 260;
  const subtitle = ar
    ? ['دفترك المالي بالدولار والليرة']
    : ['Your money notebook', 'in dollars and Syrian pounds'];

  const align = ar ? 'text-anchor="end" direction="rtl"' : 'text-anchor="start"';
  const edge = ar ? SAFE_END : SAFE_START;
  const SUB_LINE_GAP = 52;
  const DOMAIN_GAP = 72; // baseline gap from the last subtitle line

  // Giant ring accent on the edge opposite the text.
  const ring = ar
    ? `<g transform="rotate(-20 90 520)"><ellipse cx="90" cy="520" rx="300" ry="176" fill="none" stroke="${ACCENT}" stroke-width="26" opacity="0.16"/></g>
       <ellipse cx="90" cy="520" rx="46" ry="27" fill="${ACCENT}" opacity="0.28" transform="rotate(-20 90 520)"/>`
    : `<g transform="rotate(-20 110 110)"><ellipse cx="110" cy="110" rx="300" ry="176" fill="none" stroke="${ACCENT}" stroke-width="26" opacity="0.16"/></g>
       <ellipse cx="110" cy="110" rx="46" ry="27" fill="${ACCENT}" opacity="0.28" transform="rotate(-20 110 110)"/>`;

  const subFirst = nameBaseline + (ar ? 112 : 104);
  const subLines = subtitle
    .map(
      (line, i) =>
        `<text x="${edge}" y="${subFirst + i * SUB_LINE_GAP}" ${align} font-family="${family}" font-size="38" font-weight="400" fill="${TEXT}">${line}</text>`,
    )
    .join('\n  ');
  const domainBaseline = subFirst + (subtitle.length - 1) * SUB_LINE_GAP + DOMAIN_GAP;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  ${ring}
  <text x="${edge}" y="${nameBaseline}" ${align} font-family="${family}" font-size="${nameSize}" font-weight="700" fill="${ACCENT}">${name}</text>
  ${subLines}
  <text x="${edge}" y="${domainBaseline}" ${align} font-family="${family}" font-size="24" font-weight="400" fill="${MUTED}">ellipsoft.com</text>
</svg>`;
}

/** All images to render, in `public/og/`. `defaultFamily` is the resvg
 *  fallback family for the image (its main family). */
export const ogImages = [
  { file: 'ellipsoft-ar.png', lang: 'ar', defaultFamily: 'IBM Plex Sans Arabic', svg: companySvg('ar') },
  { file: 'ellipsoft-en.png', lang: 'en', defaultFamily: 'IBM Plex Sans', svg: companySvg('en') },
  { file: 'waraq-ar.png', lang: 'ar', defaultFamily: 'IBM Plex Sans Arabic', svg: waraqSvg('ar') },
  { file: 'waraq-en.png', lang: 'en', defaultFamily: 'IBM Plex Sans', svg: waraqSvg('en') },
];
