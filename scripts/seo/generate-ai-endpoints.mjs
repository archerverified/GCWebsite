/**
 * Generate AI-discovery / GEO endpoints from the SAME source data as
 * llms.txt (scripts/seo/site-data.mjs) — one source of truth, no second copy.
 *
 * Emits:
 *   public/llms-full.txt        deeper variant of llms.txt (+ per-service and
 *                               per-hub-city detail pulled from src/data)
 *   public/.well-known/ai.txt   minimal AI-usage / discovery declaration
 *   public/ai/summary.json      machine-readable business summary
 *   public/ai/faq.json          the site FAQ as {question, answer}[]
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
  cityHubs,
} from './site-data.mjs';
import { buildLlmsTxt } from './generate-llms.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..', '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const DATA_DIR = path.join(ROOT_DIR, 'src', 'data');

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

async function buildLlmsFull() {
  // Reuse the exact llms.txt base, retitle it, and strip its end marker so we
  // can append the deeper detail.
  let out = buildLlmsTxt()
    .replace(
      '# Garage Cowboy - AI Information Summary',
      '# Garage Cowboy - Full AI Information Summary (llms-full.txt)'
    )
    .replace(/\n---\n# End of llms\.txt\n$/, '\n');

  // Per-service detail
  out += `## Service Details\n\n`;
  for (const { slug } of SERVICES) {
    const svc = await tryReadJson(path.join(DATA_DIR, `services-${slug}.json`));
    if (!svc) continue;
    out += `### ${svc.title}\n`;
    out += `URL: ${SITE_URL}/services/${slug}\n`;
    const summary = plainSummary(svc.intro || svc.description || '');
    if (summary) out += `${summary}\n`;
    if (Array.isArray(svc.faqs) && svc.faqs.length > 0) {
      out += `Common questions:\n`;
      svc.faqs.slice(0, 6).forEach((f) => {
        out += `- ${f.question}\n`;
      });
    }
    out += `\n`;
  }

  // Per-hub-city detail
  out += `## Service Area Detail by Hub City\n\n`;
  for (const hub of cityHubs()) {
    const city = await tryReadJson(path.join(DATA_DIR, `city-${hub.slug}.json`));
    out += `### ${hub.name}, ${hub.state}\n`;
    out += `URL: ${SITE_URL}/texas/${hub.slug}\n`;
    if (city) {
      const summary = plainSummary(city.intro || '');
      if (summary) out += `${summary}\n`;
    }
    const subs = SUBAREAS_BY_HUB[hub.slug];
    if (subs && subs.length > 0) out += `Also serving: ${subs.join(', ')}\n`;
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

  // 1) llms-full.txt
  const full = await buildLlmsFull();
  await fs.writeFile(path.join(PUBLIC_DIR, 'llms-full.txt'), full, 'utf-8');

  // 2) .well-known/ai.txt
  await fs.writeFile(path.join(PUBLIC_DIR, '.well-known', 'ai.txt'), buildAiTxt(), 'utf-8');

  // 3) ai/summary.json
  await fs.writeFile(
    path.join(PUBLIC_DIR, 'ai', 'summary.json'),
    JSON.stringify(buildSummaryJson(), null, 2) + '\n',
    'utf-8'
  );

  // 4) ai/faq.json — reuse the single home/site FAQ source (src/data/faq.json)
  const faq = await readJson(path.join(DATA_DIR, 'faq.json'));
  await fs.writeFile(
    path.join(PUBLIC_DIR, 'ai', 'faq.json'),
    JSON.stringify(faq, null, 2) + '\n',
    'utf-8'
  );

  console.log('✅ AI endpoints generated:');
  console.log('   public/llms-full.txt');
  console.log('   public/.well-known/ai.txt');
  console.log('   public/ai/summary.json');
  console.log(`   public/ai/faq.json (${faq.length} Q&A)`);
}

generate().catch((error) => {
  console.error('❌ Failed to generate AI endpoints:', error);
  process.exit(1);
});
