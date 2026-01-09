/**
 * SERP Preview Generator
 * 
 * Generates a markdown report showing each important URL with computed
 * <title> and meta description, including character counts and warnings.
 * 
 * Usage: npm run seo:serp
 * Output: SERP_PREVIEW.md in project root
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

// Site configuration (mirrors src/seo/site.ts)
const SITE_NAME = "Garage Cowboy";
const SITE_URL = "https://garagecowboy.com";

// Hub data (mirrors src/seo/areas.ts)
const HUBS = [
  { slug: "dfw", name: "Dallas–Fort Worth (DFW)", state: "TX" },
  { slug: "dallas", name: "Dallas", state: "TX" },
  { slug: "fort-worth", name: "Fort Worth", state: "TX" },
  { slug: "arlington", name: "Arlington", state: "TX" },
  { slug: "plano", name: "Plano", state: "TX" },
  { slug: "irving", name: "Irving", state: "TX" },
  { slug: "frisco", name: "Frisco", state: "TX" },
  { slug: "grand-prairie", name: "Grand Prairie", state: "TX" },
  { slug: "keller", name: "Keller", state: "TX" },
  { slug: "mansfield", name: "Mansfield", state: "TX" },
  { slug: "weatherford", name: "Weatherford", state: "TX" },
  { slug: "denton", name: "Denton", state: "TX" },
  { slug: "southlake", name: "Southlake", state: "TX" },
  { slug: "burleson", name: "Burleson", state: "TX" },
  { slug: "cleburne", name: "Cleburne", state: "TX" },
  { slug: "mckinney", name: "McKinney", state: "TX" },
];

// Title and description limits
const TITLE_MAX = 60;
const DESC_MAX = 160;

/**
 * Define all pages with their SEO data
 */
function getPages() {
  const pages = [
    // Core pages
    {
      url: "/",
      title: "Garage Cowboy - 24/7 Garage Door Repair in Dallas-Fort Worth",
      description: "Professional garage door repair and installation services in Dallas-Fort Worth. Same-day service, expert technicians, competitive prices. Call (817) 256-0122."
    },
    {
      url: "/about-us",
      title: "About Garage Cowboy | Dallas-Fort Worth Garage Door Experts",
      description: "Learn about Garage Cowboy - your trusted garage door repair and installation experts serving Dallas-Fort Worth. Locally owned, licensed, and insured."
    },
    {
      url: "/services",
      title: "Garage Door Services | Repair & Installation | Garage Cowboy",
      description: "Complete garage door services: spring repair, opener installation, cable repair, new door installation, and more. Serving Dallas-Fort Worth 24/7."
    },
    {
      url: "/residential",
      title: "Residential Garage Door Services | Garage Cowboy",
      description: "Expert residential garage door repair and installation in DFW. Same-day service for springs, openers, cables, and more. Call (817) 256-0122."
    },
    {
      url: "/commercial",
      title: "Commercial Garage Door Services | Garage Cowboy",
      description: "Professional commercial garage door repair and installation in Dallas-Fort Worth. Roll-up doors, sectional doors, high-speed doors. 24/7 service."
    },
    {
      url: "/texas",
      title: "Service Areas in Texas | Garage Cowboy",
      description: "Garage Cowboy serves the entire Dallas-Fort Worth metroplex and surrounding cities. Find your city and schedule same-day garage door service."
    },
    {
      url: "/privacy",
      title: "Privacy Policy | Garage Cowboy",
      description: "Privacy policy for Garage Cowboy. Learn how we collect, use, and protect your personal information when you use our website and services."
    },
    {
      url: "/terms",
      title: "Terms of Service | Garage Cowboy",
      description: "Terms of service for Garage Cowboy. Read about our service terms, warranty information, and policies for garage door repair and installation."
    },
  ];

  // Add hub city pages (skip 'dfw' as it's the master)
  for (const hub of HUBS.filter(h => h.slug !== 'dfw')) {
    pages.push({
      url: `/texas/${hub.slug}`,
      title: `Garage Door Service in ${hub.name}, TX | Garage Cowboy`,
      description: `Professional garage door repair and installation in ${hub.name} and surrounding areas. Same-day service, 24/7 emergency repairs. Call (817) 256-0122.`
    });
  }

  return pages;
}

/**
 * Analyze a page and return warnings
 */
function analyzePage(page) {
  const warnings = [];
  
  if (page.title.length > TITLE_MAX) {
    warnings.push(`⚠️ Title too long (${page.title.length} chars, max ${TITLE_MAX})`);
  }
  
  if (page.description.length > DESC_MAX) {
    warnings.push(`⚠️ Description too long (${page.description.length} chars, max ${DESC_MAX})`);
  }
  
  if (page.title.length < 30) {
    warnings.push(`⚠️ Title may be too short (${page.title.length} chars)`);
  }
  
  if (page.description.length < 120) {
    warnings.push(`⚠️ Description may be too short (${page.description.length} chars)`);
  }
  
  return warnings;
}

/**
 * Generate the SERP preview markdown
 */
function generateSerpPreview() {
  const pages = getPages();
  const timestamp = new Date().toISOString();
  
  let markdown = `# SERP Preview Report

Generated: ${timestamp}

This report shows how pages will appear in Google search results.

## Guidelines

- **Title**: 50-60 characters (Google truncates at ~60)
- **Description**: 150-160 characters (Google truncates at ~160)
- ✅ = Within limits
- ⚠️ = Warning (too long/short)

---

## Summary

| Status | Count |
|--------|-------|
| ✅ Pages OK | ${pages.filter(p => analyzePage(p).length === 0).length} |
| ⚠️ Pages with warnings | ${pages.filter(p => analyzePage(p).length > 0).length} |
| **Total** | ${pages.length} |

---

## Page Details

`;

  for (const page of pages) {
    const warnings = analyzePage(page);
    const status = warnings.length === 0 ? '✅' : '⚠️';
    const fullUrl = `${SITE_URL}${page.url}`;
    
    markdown += `### ${status} ${page.url}

**URL:** ${fullUrl}

**Title** (${page.title.length} chars):
\`\`\`
${page.title}
\`\`\`

**Description** (${page.description.length} chars):
\`\`\`
${page.description}
\`\`\`

`;

    if (warnings.length > 0) {
      markdown += `**Warnings:**\n`;
      for (const warning of warnings) {
        markdown += `- ${warning}\n`;
      }
      markdown += '\n';
    }

    // Add a visual preview (simplified SERP appearance)
    markdown += `**SERP Preview:**
> **${page.title.substring(0, 60)}${page.title.length > 60 ? '...' : ''}**
> ${fullUrl.replace('https://', '')}
> ${page.description.substring(0, 160)}${page.description.length > 160 ? '...' : ''}

---

`;
  }

  // Add recommendations section
  markdown += `## Recommendations

### What "Good" Looks Like

1. **Title Tags:**
   - Include primary keyword near the beginning
   - Include brand name at the end
   - 50-60 characters
   - Example: "Garage Door Repair in Dallas | Garage Cowboy"

2. **Meta Descriptions:**
   - Include primary keyword naturally
   - Include call-to-action (phone number, "Call now", etc.)
   - 150-160 characters
   - Compelling and relevant to the page content

3. **Consistency:**
   - Each page should have a unique title and description
   - Follow the pattern: "{Service/Location} | {Brand}"

### How to Run This Report

\`\`\`bash
npm run seo:serp
\`\`\`

This generates/updates the SERP_PREVIEW.md file with the latest analysis.
`;

  return markdown;
}

// Main execution
console.log('📊 Generating SERP Preview Report...');

const markdown = generateSerpPreview();
const outputPath = path.join(ROOT_DIR, 'SERP_PREVIEW.md');

fs.writeFileSync(outputPath, markdown);

console.log(`✅ SERP Preview generated: ${outputPath}`);

// Count warnings
const pages = getPages();
const pagesWithWarnings = pages.filter(p => analyzePage(p).length > 0).length;

if (pagesWithWarnings > 0) {
  console.log(`⚠️  ${pagesWithWarnings} page(s) have warnings - check SERP_PREVIEW.md for details`);
} else {
  console.log('✅ All pages within recommended limits!');
}

