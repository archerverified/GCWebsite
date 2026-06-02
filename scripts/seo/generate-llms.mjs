/**
 * Generate llms.txt for AI search optimization (AIO).
 * This file provides a structured summary of the business for AI crawlers.
 *
 * All data comes from ./site-data.mjs (single source of truth, also used by
 * generate-ai-endpoints.mjs). buildLlmsTxt() is exported so the deeper
 * llms-full.txt variant can reuse this exact base without duplicating it.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import {
  SITE_URL,
  BUSINESS,
  ABOUT_PARAGRAPHS,
  SUBAREAS_BY_HUB,
  SERVICES,
  KEY_URLS,
  cityHubs,
} from './site-data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..', '..');

/**
 * Build the llms.txt content string from the shared site data.
 * @returns {string}
 */
export function buildLlmsTxt() {
  const hubs = cityHubs();

  let content = `# Garage Cowboy - AI Information Summary
# Generated: ${new Date().toISOString()}
# URL: ${SITE_URL}

## About Garage Cowboy

${ABOUT_PARAGRAPHS[0]}

${ABOUT_PARAGRAPHS[1]}

## Primary Services

`;

  // Add services
  SERVICES.forEach((service) => {
    content += `- ${service.name}\n`;
  });

  content += `
## Service Areas

Garage Cowboy serves the entire Dallas-Fort Worth metroplex, including 15 primary hub cities and their surrounding communities.

### Primary Hub Cities

`;

  // Add hub cities
  hubs.forEach((hub) => {
    content += `- ${hub.name}, ${hub.state}\n`;
  });

  content += `
### Detailed Service Coverage by Hub

`;

  // Add subcities grouped by hub
  hubs.forEach((hub) => {
    const subcities = SUBAREAS_BY_HUB[hub.slug];
    if (subcities && subcities.length > 0) {
      content += `#### ${hub.name}, ${hub.state}\n`;
      content += `Also serving: ${subcities.join(', ')}\n\n`;
    }
  });

  content += `## Key URLs

`;

  // Add key URLs
  KEY_URLS.forEach((url) => {
    content += `- ${url.title}: ${SITE_URL}${url.path}\n`;
  });

  content += `
## Contact Information

- Phone: ${BUSINESS.phone}
- Website: ${SITE_URL}
- Service Hours: ${BUSINESS.hours}
- Emergency Service: Available

## Business Type

- Industry: Home Services / Construction
- Specialization: Garage Door Repair and Installation
- Owner & President: ${BUSINESS.founder}
- Founded: ${BUSINESS.founded} (locally owned, not a franchise)
- Credentials: Licensed & insured; warranties on all products; 5.0-star rating (24 Google reviews)
- Service Area: Dallas-Fort Worth Metroplex, Texas
- Service Model: On-site service at customer locations

---
# End of llms.txt
`;

  return content;
}

async function generateLlmsTxt() {
  console.log('🤖 Generating llms.txt for AI search optimization...');

  const content = buildLlmsTxt();

  const outputPath = path.join(ROOT_DIR, 'public', 'llms.txt');
  await fs.writeFile(outputPath, content, 'utf-8');

  console.log(`✅ llms.txt generated successfully`);
  console.log(`   Hub cities: ${cityHubs().length}`);
  console.log(`   Services listed: ${SERVICES.length}`);
  console.log(`   Key URLs: ${KEY_URLS.length}`);
  console.log(`   Saved to: ${outputPath}`);
}

// Only auto-run when invoked directly (not when imported by another generator).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  generateLlmsTxt().catch((error) => {
    console.error('❌ Failed to generate llms.txt:', error);
    process.exit(1);
  });
}
