/**
 * Generate AI-discovery / GEO endpoints from the SAME source data as
 * llms.txt (scripts/seo/site-data.mjs) — one source of truth, no second copy.
 *
 * Emits:
 *   public/llms-full.txt        deeper variant of llms.txt (+ per-service and
 *                               per-hub-city detail, plus the full FAQ — every
 *                               home, service, city and service-area Q&A —
 *                               pulled from src/data)
 *   public/.well-known/ai.txt   minimal AI-usage / discovery declaration
 *   public/ai/summary.json      machine-readable business summary
 *   public/ai/faq.json          EVERY site FAQ (home + service + city +
 *                               service-area pages), grouped/tagged by source
 *                               page: {business, url, count, groups[]}
 *
 * VERIFIED FACTS ONLY. The deeper detail is pulled verbatim/summarized from the
 * existing page content in src/data — nothing new is invented here.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  SITE_URL,
  BUSINESS,
  SUBAREAS_BY_HUB,
  SERVICES,
  KEY_URLS,
  cityHubs,
} from './site-data.mjs';
import { buildLlmsTxt } from './generate-llms.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..', '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const DATA_DIR = path.join(ROOT_DIR, 'src', 'data');

// Index/overview pages whose FAQs round out the set: the All-Services and
// Texas-Service-Areas hubs. The group label + canonical path come from
// KEY_URLS (site-data) so they can't drift from the site's own nav; only the
// data filename lives here.
const OVERVIEW_PAGES = [
  { keyUrl: '/services', file: 'services.json' },
  { keyUrl: '/texas', file: 'texas.json' },
];

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf-8'));
}

async function tryReadJson(file) {
  try {
    return await readJson(file);
  } catch {
    return null;
  }
}

/**
 * Reduce a markdown intro to a short plain-text summary: the first prose
 * paragraph (skipping the leading bullet list / headings / italic notes),
 * stripped of markup, capped at maxSentences. Staying within one paragraph
 * avoids gluing unrelated clauses together when a line lacks end punctuation.
 */
function plainSummary(md, maxSentences = 2) {
  const blocks = String(md || '').split(/\n{2,}/);
  let para = '';
  for (const block of blocks) {
    const proseLines = block
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('*') && !l.startsWith('-') && !l.startsWith('#'));
    if (proseLines.length) {
      para = proseLines.join(' ');
      break;
    }
  }
  const clean = para
    .replace(/\*\*/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // [text](url) -> text
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return clean.split(/(?<=[.!?])\s+/).slice(0, maxSentences).join(' ').trim();
}

/**
 * Conservatively convert a fully-UPPERCASE question to sentence case for the
 * machine endpoints ONLY. The on-page / source data stays UPPERCASE brand
 * style — we never touch it. Mixed-case questions (the service FAQs) pass
 * through verbatim, so no proper noun or acronym in already-sentence-cased
 * data is ever mangled; only all-caps strings (the home FAQ) are lowered and
 * sentence-cased.
 */
function toSentenceCase(s) {
  const str = String(s);
  const isAllCaps = /[A-Z]/.test(str) && !/[a-z]/.test(str);
  if (!isAllCaps) return str;
  const lower = str.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

/** Read every services-<slug>.json once, paired with its canonical name. */
async function loadServiceData() {
  const services = [];
  for (const { name, slug } of SERVICES) {
    const data = await tryReadJson(path.join(DATA_DIR, `services-${slug}.json`));
    services.push({ name, slug, data });
  }
  return services;
}

/** Read every city-<slug>.json once, paired with its canonical hub name. */
async function loadCityData() {
  const cities = [];
  for (const { name, slug, state } of cityHubs()) {
    const data = await tryReadJson(path.join(DATA_DIR, `city-${slug}.json`));
    cities.push({ name, slug, state, data });
  }
  return cities;
}

/**
 * Aggregate EVERY site FAQ from its single source (src/data) into groups,
 * tagged by the page each question belongs to:
 *   - home / general FAQ     (src/data/faq.json)             -> "General"
 *   - one group per service  (src/data/services-<slug>.json) -> service name
 *   - one group per hub city (src/data/city-<slug>.json)     -> "City, TX"
 *   - All-Services + Texas-Service-Areas index pages         -> KEY_URLS title
 * No FAQ text lives in this generator — it is read verbatim from the
 * page-content JSON. Answers are passed through untouched; only all-caps
 * questions are sentence-cased for the machine output (see toSentenceCase).
 */
async function collectFaqGroups(services, cities) {
  const groups = [];
  const mapFaqs = (faqs) =>
    faqs.map((f) => ({ question: toSentenceCase(f.question), answer: f.answer }));

  // Home / general FAQ.
  const home = await tryReadJson(path.join(DATA_DIR, 'faq.json'));
  if (Array.isArray(home) && home.length > 0) {
    groups.push({ category: 'General', url: `${SITE_URL}/`, faqs: mapFaqs(home) });
  }

  // One group per service page.
  for (const { name, slug, data } of services) {
    const faqs = data && Array.isArray(data.faqs) ? data.faqs : [];
    if (faqs.length === 0) continue;
    groups.push({
      category: name,
      service: slug,
      url: `${SITE_URL}/services/${slug}`,
      faqs: mapFaqs(faqs),
    });
  }

  // One group per hub city page (/texas/<slug>).
  for (const { name, slug, state, data } of cities) {
    const faqs = data && Array.isArray(data.faqs) ? data.faqs : [];
    if (faqs.length === 0) {
      // Surface drift: an expected hub city contributed nothing (missing /
      // emptied city-<slug>.json) so a silently dropped group is visible.
      console.warn(`⚠️  No FAQs for hub city "${slug}" (city-${slug}.json) — group omitted.`);
      continue;
    }
    groups.push({
      category: `${name}, ${state}`,
      hub: slug,
      url: `${SITE_URL}/texas/${slug}`,
      faqs: mapFaqs(faqs),
    });
  }

  // Index / overview pages (All Services, Texas Service Areas). Label + path
  // come from KEY_URLS so they stay in lockstep with the site nav.
  for (const { keyUrl, file } of OVERVIEW_PAGES) {
    const meta = KEY_URLS.find((u) => u.path === keyUrl);
    const data = await tryReadJson(path.join(DATA_DIR, file));
    const faqs = data && Array.isArray(data.faqs) ? data.faqs : [];
    if (!meta || faqs.length === 0) {
      // Surface drift: a renamed KEY_URL or missing/empty index page would
      // otherwise drop this group (and the total count) without a trace.
      console.warn(`⚠️  No FAQs / missing KEY_URL for overview page ${keyUrl} (${file}) — group omitted.`);
      continue;
    }
    groups.push({ category: meta.title, url: `${SITE_URL}${meta.path}`, faqs: mapFaqs(faqs) });
  }

  return groups;
}

/** The combined FAQ machine endpoint: grouped + tagged by source page. */
function buildFaqJson(faqGroups) {
  const count = faqGroups.reduce((n, g) => n + g.faqs.length, 0);
  return { business: BUSINESS.name, url: SITE_URL, count, groups: faqGroups };
}

async function buildLlmsFull(services, cities, faqGroups) {
  // Reuse the exact llms.txt base, retitle it, and strip its end marker so we
  // can append the deeper detail.
  let out = buildLlmsTxt()
    .replace(
      '# Garage Cowboy - AI Information Summary',
      '# Garage Cowboy - Full AI Information Summary (llms-full.txt)'
    )
    .replace(/\n---\n# End of llms\.txt\n$/, '\n');

  // Per-service detail (the full Q&A lives in the FAQ section below)
  out += `## Service Details\n\n`;
  for (const { slug, data } of services) {
    if (!data) continue;
    out += `### ${data.title}\n`;
    out += `URL: ${SITE_URL}/services/${slug}\n`;
    const summary = plainSummary(data.intro || data.description || '');
    if (summary) out += `${summary}\n`;
    out += `\n`;
  }

  // Per-hub-city detail (cities preloaded once; shared with the FAQ section)
  out += `## Service Area Detail by Hub City\n\n`;
  for (const { name, slug, state, data } of cities) {
    out += `### ${name}, ${state}\n`;
    out += `URL: ${SITE_URL}/texas/${slug}\n`;
    if (data) {
      const summary = plainSummary(data.intro || '');
      if (summary) out += `${summary}\n`;
    }
    const subs = SUBAREAS_BY_HUB[slug];
    if (subs && subs.length > 0) out += `Also serving: ${subs.join(', ')}\n`;
    out += `\n`;
  }

  // Full FAQ — every home + service question with its verbatim answer, grouped
  // and tagged by service (same single source as public/ai/faq.json).
  out += `## Frequently Asked Questions\n\n`;
  for (const group of faqGroups) {
    out += `### ${group.category}\n`;
    out += `URL: ${group.url}\n`;
    for (const f of group.faqs) {
      out += `Q: ${f.question}\n`;
      out += `A: ${f.answer}\n`;
    }
    out += `\n`;
  }

  out += `---\n# End of llms-full.txt\n`;
  return out;
}

function buildAiTxt() {
  return `# ai.txt — AI usage & discovery declaration for ${BUSINESS.name}
# Emerging convention; kept simple and honest.
# Machine-readable data: ${SITE_URL}/ai/summary.json

Business: ${BUSINESS.name}
Owner: ${BUSINESS.founder} (${BUSINESS.founderTitle})
Phone: ${BUSINESS.phone}
Email: ${BUSINESS.email}
Website: ${SITE_URL}

# Structured resources for AI assistants and answer engines
AI-Summary: ${SITE_URL}/llms.txt
AI-Summary-Full: ${SITE_URL}/llms-full.txt
AI-Data: ${SITE_URL}/ai/summary.json
AI-FAQ: ${SITE_URL}/ai/faq.json
Sitemap: ${SITE_URL}/sitemap.xml

# Usage stance
# ${BUSINESS.name} welcomes AI search engines and assistants using this public
# business information (services, service area, hours, contact) to answer user
# questions, with attribution and a link back to the website.
Usage: cite-with-attribution
Attribution: ${SITE_URL}
`;
}

function buildSummaryJson() {
  return {
    name: BUSINESS.name,
    description: BUSINESS.description,
    services: SERVICES.map((s) => s.name),
    areasServed: cityHubs().map((h) => `${h.name}, ${h.state}`),
    contact: {
      phone: BUSINESS.phone,
      email: BUSINESS.email,
      address: `${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.region} ${BUSINESS.address.postalCode}`,
      url: SITE_URL,
    },
    aggregateRating: { value: BUSINESS.rating.value, count: BUSINESS.rating.count },
    founder: BUSINESS.founder,
    founded: BUSINESS.founded,
    hours: '24/7',
    url: SITE_URL,
  };
}

async function generate() {
  console.log('🤖 Generating AI-discovery endpoints (GEO)...');

  await fs.mkdir(path.join(PUBLIC_DIR, '.well-known'), { recursive: true });
  await fs.mkdir(path.join(PUBLIC_DIR, 'ai'), { recursive: true });

  // Load page-content once; both llms-full.txt and ai/faq.json read from it.
  const services = await loadServiceData();
  const cities = await loadCityData();
  const faqGroups = await collectFaqGroups(services, cities);

  // 1) llms-full.txt
  const full = await buildLlmsFull(services, cities, faqGroups);
  await fs.writeFile(path.join(PUBLIC_DIR, 'llms-full.txt'), full, 'utf-8');

  // 2) .well-known/ai.txt
  await fs.writeFile(path.join(PUBLIC_DIR, '.well-known', 'ai.txt'), buildAiTxt(), 'utf-8');

  // 3) ai/summary.json
  await fs.writeFile(
    path.join(PUBLIC_DIR, 'ai', 'summary.json'),
    JSON.stringify(buildSummaryJson(), null, 2) + '\n',
    'utf-8'
  );

  // 4) ai/faq.json — EVERY site FAQ (home + service + city + service-area),
  //    single-sourced from src/data, grouped and tagged by source page.
  const faqJson = buildFaqJson(faqGroups);
  await fs.writeFile(
    path.join(PUBLIC_DIR, 'ai', 'faq.json'),
    JSON.stringify(faqJson, null, 2) + '\n',
    'utf-8'
  );

  console.log('✅ AI endpoints generated:');
  console.log('   public/llms-full.txt');
  console.log('   public/.well-known/ai.txt');
  console.log('   public/ai/summary.json');
  console.log(`   public/ai/faq.json (${faqJson.count} Q&A across ${faqGroups.length} groups)`);
}

generate().catch((error) => {
  console.error('❌ Failed to generate AI endpoints:', error);
  process.exit(1);
});
