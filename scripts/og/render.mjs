/**
 * Render the Open Graph images from scripts/og/templates.mjs into
 * public/og/ (plus the public/og-image.png fallback = Arabic company
 * image, Arabic being the default site language).
 *
 *   npm run og
 *
 * Uses @resvg/resvg-js (devDependency only): it shapes text with
 * rustybuzz (HarfBuzz port), so Arabic renders correctly connected and
 * RTL (`direction="rtl"` + `text-anchor="end"` in the templates).
 * Fonts are the committed IBM Plex TTFs in scripts/og/fonts/.
 * The generated PNGs are committed — deploys never run this script.
 */
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const fontsDir = join(root, 'scripts', 'og', 'fonts');
const outDir = join(root, 'public', 'og');

const fontFiles = [
  'IBMPlexSansArabic-400.ttf',
  'IBMPlexSansArabic-700.ttf',
  'IBMPlexSans-400.ttf',
  'IBMPlexSans-700.ttf',
].map((name) => readFileSync(join(fontsDir, name)));

mkdirSync(outDir, { recursive: true });

const { ogImages } = await import('./templates.mjs');

const MAX_BYTES = 300 * 1024;
for (const { file, svg, defaultFamily } of ogImages) {
  // loadSystemFonts:false ⇒ only the committed IBM Plex TTFs are
  // available; a family mismatch fails loudly (missing text) instead of
  // silently falling back to a system font.
  const resvg = new Resvg(svg, {
    fontFiles,
    loadSystemFonts: false,
    defaultFontFamily: defaultFamily,
    fitTo: { mode: 'width', size: 1200 },
  });
  const png = resvg.render().asPng();
  const out = join(outDir, file);
  writeFileSync(out, png);
  const kb = (png.length / 1024).toFixed(1);
  const flag = png.length > MAX_BYTES ? '  ⚠ OVER 300 KB' : '';
  console.log(`${file}: ${kb} KB${flag}`);
}

// Stable fallback for old links/caches: Arabic company image.
writeFileSync(join(root, 'public', 'og-image.png'), readFileSync(join(outDir, 'ellipsoft-ar.png')));
console.log('og-image.png: updated (copy of ellipsoft-ar.png)');
