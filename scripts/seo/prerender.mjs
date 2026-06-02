/**
 * Build-time prerenderer.
 *
 * After `vite build`, this script serves the build with `vite preview` (wired
 * via start-server-and-test in package.json) and visits every route returned by
 * `all-routes.mjs` in a headless Chromium. For each route it captures the
 * fully-rendered HTML — per-route <title>, meta, canonical, JSON-LD (injected by
 * react-helmet-async) AND the visible body copy (rendered by React) — and writes
 * it to `build/<route>/index.html`.
 *
 * Runtime behaviour is unchanged: the built module bundle and all template
 * scaffolding (GTM bootstrap, font preloads, the LeadConnector widget <script>)
 * are preserved verbatim in every snapshot, so the SPA still boots and React
 * re-renders into #root on load.
 *
 * Third-party scripts (analytics + the chat widget) are blocked at the network
 * layer DURING snapshotting so they never execute or inject DOM into the static
 * HTML — only their original <script> tags from index.html survive. This keeps
 * the widget present for real visitors while keeping its runtime-injected DOM
 * (and duplicate analytics loads) out of the prerendered files.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { getAllRoutes } from './all-routes.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..', '..');
const BUILD_DIR = path.join(ROOT_DIR, 'build');
const BASE_URL = (process.env.PRERENDER_BASE_URL || 'http://127.0.0.1:4180').replace(/\/$/, '');

// The original LeadConnector loader tag in index.html — must be preserved.
const LEADCONNECTOR_LOADER = 'https://widgets.leadconnectorhq.com/loader.js';

// Third-party hosts blocked during snapshotting so their scripts never execute
// or inject DOM. Their original <script> tags remain in the template untouched.
const BLOCKED_HOST_PATTERNS = [
  /(^|\.)leadconnectorhq\.com$/i,
  /(^|\.)googletagmanager\.com$/i,
  /(^|\.)google-analytics\.com$/i,
  /(^|\.)analytics\.google\.com$/i,
  /(^|\.)doubleclick\.net$/i,
];

function isBlockedUrl(url) {
  let host;
  try {
    host = new URL(url).hostname;
  } catch {
    return false;
  }
  return BLOCKED_HOST_PATTERNS.some((re) => re.test(host));
}

/** Map a route to its output file (`/` -> build/index.html, `/a/b` -> build/a/b/index.html). */
function routeToFilePath(route) {
  if (route === '/') return path.join(BUILD_DIR, 'index.html');
  const rel = route.replace(/^\/+/, '').replace(/\/+$/, '');
  return path.join(BUILD_DIR, rel, 'index.html');
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  try {
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.isInterceptResolutionHandled()) return;
      if (isBlockedUrl(req.url())) {
        req.abort().catch(() => {});
      } else {
        req.continue().catch(() => {});
      }
    });

    const url = `${BASE_URL}${route}`;
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

    // Wait for React to render real content and for react-helmet-async to set
    // the document title (i.e. not just the empty #root shell).
    await page.waitForFunction(
      () => {
        const root = document.getElementById('root');
        return !!root && root.children.length > 0 && !!document.title;
      },
      { timeout: 30000 },
    );

    // Defensive cleanup: remove any third-party nodes that were inserted before
    // their (blocked) network request resolved — e.g. the GTM <script> injected
    // by the inline bootstrap, or any chat-widget DOM. The ORIGINAL LeadConnector
    // loader <script> from index.html is explicitly preserved.
    await page.evaluate((loaderSrc) => {
      const thirdParty = /leadconnectorhq|googletagmanager|google-analytics|analytics\.google|doubleclick/i;
      document.querySelectorAll('script, iframe, div, link').forEach((el) => {
        const src = el.getAttribute('src') || el.getAttribute('href') || '';
        if (el.tagName === 'SCRIPT' && src === loaderSrc) return; // keep widget loader
        const id = el.getAttribute('id') || '';
        if (thirdParty.test(src) || /^lc_|leadconnector|chat-widget/i.test(id)) {
          el.remove();
        }
      });
    }, LEADCONNECTOR_LOADER);

    const html = await page.content();

    if (!html.includes(LEADCONNECTOR_LOADER)) {
      throw new Error('LeadConnector widget loader missing from snapshot');
    }

    const filePath = routeToFilePath(route);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, html, 'utf-8');
    return { route, filePath, bytes: html.length };
  } finally {
    await page.close();
  }
}

async function main() {
  const routes = await getAllRoutes();
  console.log(`🪄 Prerendering ${routes.length} route(s) from ${BASE_URL}\n`);

  // Chromium's sandbox cannot run as root or in many CI/container images
  // (e.g. Vercel's build container), so disable it only there. On a normal
  // dev machine the sandbox stays ON. We only ever render our own trusted,
  // first-party build, so the residual risk is minimal regardless.
  const sandboxUnavailable =
    process.env.PRERENDER_NO_SANDBOX === '1' ||
    process.env.CI === '1' ||
    process.env.CI === 'true' ||
    !!process.env.VERCEL ||
    (typeof process.getuid === 'function' && process.getuid() === 0);

  const browser = await puppeteer.launch({
    headless: true,
    args: sandboxUnavailable ? ['--no-sandbox', '--disable-setuid-sandbox'] : [],
  });

  const failures = [];
  try {
    for (const route of routes) {
      try {
        const result = await prerenderRoute(browser, route);
        const rel = path.relative(ROOT_DIR, result.filePath);
        console.log(`  ✅ ${route.padEnd(34)} → ${rel} (${(result.bytes / 1024).toFixed(1)} KB)`);
      } catch (error) {
        console.error(`  ❌ ${route.padEnd(34)} → ${error.message}`);
        failures.push({ route, error: error.message });
      }
    }
  } finally {
    await browser.close();
  }

  console.log(`\n✨ Prerendered ${routes.length - failures.length}/${routes.length} route(s).`);
  if (failures.length > 0) {
    console.error('❌ Prerender failed for:', failures.map((f) => f.route).join(', '));
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('❌ Prerender failed:', error);
  process.exit(1);
});
