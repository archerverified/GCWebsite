/**
 * Generate llms.txt for AI search optimization (AIO).
 * This file provides a structured summary of the business for AI crawlers.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..', '..');

const SITE_URL = process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://garagecowboy.com';

// Hub and subcity data (mirrors src/seo/areas.ts)
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

const SUBAREAS_BY_HUB = {
  dfw: [
    "Dallas, TX", "Fort Worth, TX", "Arlington, TX", "Plano, TX", "Irving, TX",
    "Frisco, TX", "Grand Prairie, TX", "Keller, TX", "Mansfield, TX",
    "Weatherford, TX", "Denton, TX", "Southlake, TX", "Burleson, TX",
    "Cleburne, TX", "McKinney, TX"
  ],
  dallas: [
    "University Park, TX", "Highland Park, TX", "Addison, TX", "Farmers Branch, TX",
    "Cedar Hill, TX", "DeSoto, TX", "Duncanville, TX", "Lancaster, TX",
    "Garland, TX", "Rowlett, TX", "Richardson, TX"
  ],
  "fort-worth": [
    "Benbrook, TX", "White Settlement, TX", "River Oaks, TX", "Lake Worth, TX",
    "Sansom Park, TX", "Westworth Village, TX", "Blue Mound, TX", "Saginaw, TX",
    "Watauga, TX", "Haltom City, TX", "Richland Hills, TX", "Forest Hill, TX",
    "Crowley, TX", "Everman, TX", "Rendon, TX", "Aledo, TX"
  ],
  arlington: [
    "Kennedale, TX", "Mansfield, TX", "Grand Prairie, TX",
    "Dalworthington Gardens, TX", "Pantego, TX"
  ],
  plano: [
    "Richardson, TX", "Allen, TX", "Addison, TX", "Murphy, TX", "Wylie, TX"
  ],
  irving: [
    "Coppell, TX", "Farmers Branch, TX", "Carrollton, TX", "Grapevine, TX",
    "Euless, TX", "Bedford, TX", "Hurst, TX", "Grand Prairie, TX"
  ],
  frisco: [
    "The Colony, TX", "Little Elm, TX", "Prosper, TX", "Celina, TX",
    "McKinney, TX", "West Frisco / North Plano adjacency, TX"
  ],
  "grand-prairie": [
    "Irving, TX", "Arlington, TX", "Dallas, TX", "Coppell, TX"
  ],
  keller: [
    "Southlake, TX", "Colleyville, TX", "Watauga, TX", "North Richland Hills, TX",
    "Roanoke, TX", "Trophy Club, TX", "Westlake, TX", "Northlake, TX"
  ],
  mansfield: [
    "Arlington, TX", "Kennedale, TX", "Midlothian, TX", "Venus, TX",
    "Alvarado, TX", "Cedar Hill, TX", "DeSoto, TX"
  ],
  weatherford: [
    "Willow Park, TX", "Aledo, TX", "Springtown, TX", "Hudson Oaks, TX",
    "Brock, TX", "Peaster, TX"
  ],
  denton: [
    "Corinth, TX", "Lake Dallas, TX", "Highland Village, TX", "Argyle, TX",
    "Northlake, TX", "Aubrey, TX", "Krum, TX", "Sanger, TX", "Oak Point, TX"
  ],
  southlake: [
    "Colleyville, TX", "Grapevine, TX", "Trophy Club, TX", "Westlake, TX",
    "Keller, TX", "Coppell, TX"
  ],
  burleson: [
    "Crowley, TX", "Everman, TX", "Joshua, TX", "Alvarado, TX",
    "Venus, TX", "Rendon, TX"
  ],
  cleburne: [
    "Joshua, TX", "Alvarado, TX", "Venus, TX", "Keene, TX", "Godley, TX"
  ],
  mckinney: [
    "Allen, TX", "Prosper, TX", "Celina, TX", "Melissa, TX",
    "Anna, TX", "Fairview, TX", "Lucas, TX"
  ]
};

// Primary services offered
const SERVICES = [
  "Broken Spring Repair",
  "Garage Door Opener Repair & Installation",
  "Broken Cable Repair",
  "Garage Door Off-Track Repair",
  "Garage Door Roller Repair",
  "New Door Installation",
  "Remote Repair & Programming",
  "Door Service & Maintenance"
];

// Key URLs to cite
const KEY_URLS = [
  { path: "/", title: "Home" },
  { path: "/services", title: "All Services" },
  { path: "/texas", title: "Texas Service Areas" },
  { path: "/services/broken-spring-repair", title: "Spring Repair" },
  { path: "/services/opener-repair-installation", title: "Opener Installation" },
  { path: "/services/new-door-installation", title: "New Door Installation" },
  { path: "/services/garage-door-off-track", title: "Off-Track Repair" },
  { path: "/residential", title: "Residential Services" },
  { path: "/commercial", title: "Commercial Services" }
];

async function generateLlmsTxt() {
  console.log('🤖 Generating llms.txt for AI search optimization...');
  
  const cityHubs = HUBS.filter(h => h.slug !== 'dfw');
  
  let content = `# Garage Cowboy - AI Information Summary
# Generated: ${new Date().toISOString()}
# URL: ${SITE_URL}

## About Garage Cowboy

Garage Cowboy is a professional garage door repair and installation company serving the Dallas-Fort Worth metroplex in Texas. We provide 24/7 emergency service, same-day repairs, and expert technicians for both residential and commercial customers. Our team specializes in all aspects of garage door service, from spring repairs to complete new door installations.

With years of experience in the DFW area, Garage Cowboy has built a reputation for reliable, high-quality service at competitive prices. We understand that a malfunctioning garage door is not just an inconvenience—it can be a security risk. That's why we offer round-the-clock availability and fast response times throughout the metroplex.

## Primary Services

`;

  // Add services
  SERVICES.forEach(service => {
    content += `- ${service}\n`;
  });

  content += `
## Service Areas

Garage Cowboy serves the entire Dallas-Fort Worth metroplex, including 15 primary hub cities and their surrounding communities.

### Primary Hub Cities

`;

  // Add hub cities
  cityHubs.forEach(hub => {
    content += `- ${hub.name}, ${hub.state}\n`;
  });

  content += `
### Detailed Service Coverage by Hub

`;

  // Add subcities grouped by hub
  cityHubs.forEach(hub => {
    const subcities = SUBAREAS_BY_HUB[hub.slug];
    if (subcities && subcities.length > 0) {
      content += `#### ${hub.name}, ${hub.state}\n`;
      content += `Also serving: ${subcities.join(', ')}\n\n`;
    }
  });

  content += `## Key URLs

`;

  // Add key URLs
  KEY_URLS.forEach(url => {
    content += `- ${url.title}: ${SITE_URL}${url.path}\n`;
  });

  content += `
## Contact Information

- Phone: (817) 256-0122
- Website: ${SITE_URL}
- Service Hours: 24/7, including weekends and holidays
- Emergency Service: Available

## Business Type

- Industry: Home Services / Construction
- Specialization: Garage Door Repair and Installation
- Service Area: Dallas-Fort Worth Metroplex, Texas
- Service Model: On-site service at customer locations

---
# End of llms.txt
`;

  const outputPath = path.join(ROOT_DIR, 'public', 'llms.txt');
  await fs.writeFile(outputPath, content, 'utf-8');
  
  console.log(`✅ llms.txt generated successfully`);
  console.log(`   Hub cities: ${cityHubs.length}`);
  console.log(`   Services listed: ${SERVICES.length}`);
  console.log(`   Key URLs: ${KEY_URLS.length}`);
  console.log(`   Saved to: ${outputPath}`);
}

// Run the generator
generateLlmsTxt().catch(error => {
  console.error('❌ Failed to generate llms.txt:', error);
  process.exit(1);
});

