#!/usr/bin/env node
/**
 * Post-build checks for dist/ (run: `npm run build && npm run verify`).
 * Zero dependencies; reads files only — no network requests.
 *
 *  1. Scripts: the ONLY allowed <script> is type="application/ld+json"
 *     (with valid JSON). Any other script tag, inline event handler or
 *     javascript: URL fails (AGENTS.md "zero executable scripts").
 *  2. Internal URLs: every href/src/srcset, canonical, hreflang
 *     alternate, OG/Twitter image, meta-refresh target, CSS url()
 *     (inline <style> and built .css) and
 *     sitemap <loc>/alternate resolves to a file in dist/ (directory
 *     URLs must end with "/" and contain index.html; #fragments must
 *     exist on the target page).
 *  3. External URLs: format only — mailto:, wa.me (digits + encoded
 *     text), and well-formed https:// URLs.
 *  4. Deployment files: CNAME and .nojekyll exist.
 *
 * Exits 1 on any failure.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = join(root, 'dist');
const ORIGIN = 'https://ellipsoft.com';

const failures = [];
const counts = { pages: 0, internal: 0, external: 0, jsonLd: 0 };
const fail = (source, message) => failures.push(`${source}: ${message}`);

/** Recursively list files under a directory. */
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const decode = (value) =>
  value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

/** Parse `<tag a="b">` attributes into a plain object. */
function attributes(raw) {
  const out = {};
  for (const [, name, value = ''] of raw.matchAll(/([\w:-]+)(?:\s*=\s*"([^"]*)")?/g)) {
    out[name.toLowerCase()] = decode(value);
  }
  return out;
}

/** Map a site URL path to the dist file it must resolve to (or null). */
function distFileFor(pathname) {
  if (pathname.endsWith('/')) return join(dist, pathname, 'index.html');
  const file = join(dist, pathname);
  return existsSync(file) && statSync(file).isFile() ? file : null;
}

const idCache = new Map();
/** Element ids declared in an HTML file. */
function idsIn(file) {
  if (!idCache.has(file)) {
    const html = readFileSync(file, 'utf8');
    idCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idCache.get(file);
}

/** Check one internal URL (absolute on ORIGIN, root-relative or relative). */
function checkInternal(source, url, baseFile) {
  counts.internal += 1;
  const base = `${ORIGIN}/${relative(dist, baseFile).replace(/index\.html$/, '')}`;
  const { pathname, hash } = new URL(url, base);
  const file = distFileFor(decodeURIComponent(pathname));
  if (!file || !existsSync(file)) return fail(source, `broken internal URL ${url}`);
  if (hash && file.endsWith('.html') && !idsIn(file).has(hash.slice(1))) {
    fail(source, `missing #fragment ${url}`);
  }
}

/** Format-only validation of an external URL (no request is made). */
function checkExternal(source, url) {
  counts.external += 1;
  if (url.startsWith('mailto:')) {
    if (!/^mailto:[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(url)) fail(source, `bad mailto ${url}`);
    return;
  }
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return fail(source, `malformed URL ${url}`);
  }
  if (parsed.protocol !== 'https:') fail(source, `non-https URL ${url}`);
  if (/\s/.test(url)) fail(source, `unencoded whitespace in ${url}`);
  if (parsed.hostname === 'wa.me') checkWhatsApp(source, parsed);
}

/** wa.me/<digits> with an optional, properly encoded ?text=. */
function checkWhatsApp(source, parsed) {
  if (!/^\/\d{8,15}$/.test(parsed.pathname)) fail(source, `bad wa.me number ${parsed.href}`);
  const keys = [...parsed.searchParams.keys()];
  if (keys.some((key) => key !== 'text')) fail(source, `unexpected wa.me params ${parsed.href}`);
}

/** Route a URL to the internal or external check. */
function checkUrl(source, url, baseFile) {
  if (!url || url.startsWith('#') && url.length === 1) return;
  if (/^javascript:/i.test(url)) return fail(source, `javascript: URL ${url}`);
  const isInternal = url.startsWith(ORIGIN) || !/^[a-z][a-z0-9+.-]*:/i.test(url);
  if (isInternal) checkInternal(source, url, baseFile);
  else checkExternal(source, url);
}

/** Script, event-handler and JSON-LD checks for one page. */
function checkScripts(source, html) {
  for (const [, raw, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const { type, src } = attributes(raw);
    if (type !== 'application/ld+json' || src !== undefined) {
      fail(source, `executable <script${raw}>`);
      continue;
    }
    counts.jsonLd += 1;
    try {
      JSON.parse(body);
    } catch {
      fail(source, 'invalid JSON in application/ld+json');
    }
  }
  if (/<[a-z][^>]*\son[a-z]+\s*=/i.test(html)) fail(source, 'inline event handler attribute');
}

/** URLs carried by one HTML tag. */
function urlsOf(tag, attrs) {
  const urls = [];
  if (attrs.href !== undefined) urls.push(attrs.href);
  if (attrs.src !== undefined) urls.push(attrs.src);
  if (attrs.srcset) urls.push(...attrs.srcset.split(',').map((s) => s.trim().split(/\s+/)[0]));
  if (tag === 'meta' && /^(og:image|og:url|twitter:image)$/.test(attrs.property ?? attrs.name ?? '')) {
    urls.push(attrs.content);
  }
  if (tag === 'meta' && attrs['http-equiv']?.toLowerCase() === 'refresh') {
    urls.push(attrs.content.replace(/^\s*\d+\s*;\s*url=/i, ''));
  }
  return urls;
}

/** All checks for one HTML page. */
function checkPage(file) {
  counts.pages += 1;
  const source = `/${relative(dist, file)}`;
  const html = readFileSync(file, 'utf8');
  checkScripts(source, html);
  for (const [, css] of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) checkCssText(source, css, file);
  for (const [, tag, raw] of html.matchAll(/<(a|link|img|meta|source|iframe|form)\b([^>]*)>/gi)) {
    for (const url of urlsOf(tag.toLowerCase(), attributes(raw))) checkUrl(source, url, file);
  }
}

/** url() references in CSS text (built .css files or inline <style>). */
function checkCssText(source, css, file) {
  for (const [, url] of css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
    if (!url.startsWith('data:')) checkUrl(source, url, file);
  }
}

/** url() references inside a built CSS file. */
function checkCss(file) {
  checkCssText(`/${relative(dist, file)}`, readFileSync(file, 'utf8'), file);
}

/** Sitemap <loc> and xhtml:link alternates. */
function checkSitemaps() {
  const index = join(dist, 'sitemap-index.xml');
  if (!existsSync(index)) return fail('/sitemap-index.xml', 'missing');
  const xml = readFileSync(index, 'utf8');
  for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    checkUrl('/sitemap-index.xml', loc, index);
    const child = join(dist, new URL(loc).pathname);
    if (!existsSync(child)) continue;
    const childXml = readFileSync(child, 'utf8');
    for (const [, url] of childXml.matchAll(/(?:<loc>([^<]+)<\/loc>)/g)) checkUrl(loc, url, child);
    for (const [, url] of childXml.matchAll(/<xhtml:link[^>]*href="([^"]+)"/g)) checkUrl(loc, url, child);
  }
}

const files = walk(dist);
files.filter((f) => f.endsWith('.html')).forEach(checkPage);
files.filter((f) => f.endsWith('.css')).forEach(checkCss);
checkSitemaps();
for (const name of ['CNAME', '.nojekyll']) {
  if (!existsSync(join(dist, name))) fail(`/${name}`, 'missing from dist/');
}

console.log(
  `verify-dist: ${counts.pages} pages, ${counts.internal} internal + ${counts.external} external URLs, ` +
    `${counts.jsonLd} JSON-LD blocks checked`,
);
if (failures.length > 0) {
  console.error(`\n${failures.length} problem(s):\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
console.log('verify-dist: OK');
