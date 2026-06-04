/**
 * site-data.mjs — single source of truth for build-time AI/SEO endpoint
 * generation (llms.txt, llms-full.txt, .well-known/ai.txt, ai/summary.json,
 * ai/faq.json).
 *
 * The build scripts run in plain Node and can't import the TypeScript source
 * in src/seo/*, so this module mirrors src/seo/areas.ts and src/seo/site.ts.
 * Keep it in sync with those files. VERIFIED FACTS ONLY — no pricing, no
 * invented metrics. Any general industry claim belongs in page content (where
 * it can be flagged), not here.
 */

export const SITE_URL =
  process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://garagecowboy.com';

// Owner-verified business facts (mirrors src/seo/site.ts + schemas.ts).
export const BUSINESS = {
  name: 'Garage Cowboy',
  description:
    'Locally owned, 24/7 garage door repair and installation serving the Dallas–Fort Worth metroplex. Same-day service, licensed and insured, with a warranty on every product installed.',
  founder: 'Deno Borghi',
  founderTitle: 'Owner & President',
  founded: 2023,
  phone: '(817) 256-0122',
  phoneE164: '+18172560122',
  email: 'deno@garagecowboy.com',
  address: {
    street: '801 W Vickery Blvd',
    city: 'Fort Worth',
    region: 'TX',
    postalCode: '76104',
    country: 'US',
  },
  geo: { latitude: 32.7555, longitude: -97.3308 },
  hours: '24/7, including weekends and holidays',
  rating: { value: '5.0', count: 24 },
  credentials: [
    'Locally owned, not a franchise',
    'Licensed & insured',
    'Warranty on every product installed',
    '5.0-star rating across 24 Google reviews',
    '24/7 same-day service',
  ],
};

// The two "About" paragraphs surfaced in llms.txt / llms-full.txt.
export const ABOUT_PARAGRAPHS = [
  'Garage Cowboy is a professional garage door repair and installation company serving the Dallas-Fort Worth metroplex in Texas. We provide 24/7 emergency service, same-day repairs, and expert technicians for both residential and commercial customers. Our team specializes in all aspects of garage door service, from spring repairs to complete new door installations.',
  'Founded in 2023 by owner and president Deno Borghi, Garage Cowboy is a locally owned, 100% referral-based company, not a franchise. We are licensed and insured, back every product we install with a warranty, and hold a 5.0-star rating across 24 Google reviews. Our certified local technicians live and work in North Texas. We understand that a malfunctioning garage door is not just an inconvenience. It can be a security risk, which is why we offer round-the-clock availability and fast, same-day response throughout the metroplex.',
];

// Hub + subcity data (mirrors src/seo/areas.ts). The master "dfw" entry is
// filtered out for city listings via cityHubs().
export const HUBS = [
  { slug: 'dfw', name: 'Dallas–Fort Worth (DFW)', state: 'TX' },
  { slug: 'dallas', name: 'Dallas', state: 'TX' },
  { slug: 'fort-worth', name: 'Fort Worth', state: 'TX' },
  { slug: 'arlington', name: 'Arlington', state: 'TX' },
  { slug: 'plano', name: 'Plano', state: 'TX' },
  { slug: 'irving', name: 'Irving', state: 'TX' },
  { slug: 'frisco', name: 'Frisco', state: 'TX' },
  { slug: 'grand-prairie', name: 'Grand Prairie', state: 'TX' },
  { slug: 'keller', name: 'Keller', state: 'TX' },
  { slug: 'mansfield', name: 'Mansfield', state: 'TX' },
  { slug: 'weatherford', name: 'Weatherford', state: 'TX' },
  { slug: 'denton', name: 'Denton', state: 'TX' },
  { slug: 'southlake', name: 'Southlake', state: 'TX' },
  { slug: 'burleson', name: 'Burleson', state: 'TX' },
  { slug: 'cleburne', name: 'Cleburne', state: 'TX' },
  { slug: 'mckinney', name: 'McKinney', state: 'TX' },
];

export const SUBAREAS_BY_HUB = {
  dfw: [
    'Dallas, TX', 'Fort Worth, TX', 'Arlington, TX', 'Plano, TX', 'Irving, TX',
    'Frisco, TX', 'Grand Prairie, TX', 'Keller, TX', 'Mansfield, TX',
    'Weatherford, TX', 'Denton, TX', 'Southlake, TX', 'Burleson, TX',
    'Cleburne, TX', 'McKinney, TX',
  ],
  dallas: [
    'University Park, TX', 'Highland Park, TX', 'Addison, TX', 'Farmers Branch, TX',
    'Cedar Hill, TX', 'DeSoto, TX', 'Duncanville, TX', 'Lancaster, TX',
    'Garland, TX', 'Rowlett, TX', 'Richardson, TX',
  ],
  'fort-worth': [
    'Benbrook, TX', 'White Settlement, TX', 'River Oaks, TX', 'Lake Worth, TX',
    'Sansom Park, TX', 'Westworth Village, TX', 'Blue Mound, TX', 'Saginaw, TX',
    'Watauga, TX', 'Haltom City, TX', 'Richland Hills, TX', 'Forest Hill, TX',
    'Crowley, TX', 'Everman, TX', 'Rendon, TX', 'Aledo, TX',
  ],
  arlington: [
    'Kennedale, TX', 'Mansfield, TX', 'Grand Prairie, TX',
    'Dalworthington Gardens, TX', 'Pantego, TX',
  ],
  plano: [
    'Richardson, TX', 'Allen, TX', 'Addison, TX', 'Murphy, TX', 'Wylie, TX',
  ],
  irving: [
    'Coppell, TX', 'Farmers Branch, TX', 'Carrollton, TX', 'Grapevine, TX',
    'Euless, TX', 'Bedford, TX', 'Hurst, TX', 'Grand Prairie, TX',
  ],
  frisco: [
    'The Colony, TX', 'Little Elm, TX', 'Prosper, TX', 'Celina, TX',
    'McKinney, TX', 'West Frisco / North Plano adjacency, TX',
  ],
  'grand-prairie': [
    'Irving, TX', 'Arlington, TX', 'Dallas, TX', 'Coppell, TX',
  ],
  keller: [
    'Southlake, TX', 'Colleyville, TX', 'Watauga, TX', 'North Richland Hills, TX',
    'Roanoke, TX', 'Trophy Club, TX', 'Westlake, TX', 'Northlake, TX',
  ],
  mansfield: [
    'Arlington, TX', 'Kennedale, TX', 'Midlothian, TX', 'Venus, TX',
    'Alvarado, TX', 'Cedar Hill, TX', 'DeSoto, TX',
  ],
  weatherford: [
    'Willow Park, TX', 'Aledo, TX', 'Springtown, TX', 'Hudson Oaks, TX',
    'Brock, TX', 'Peaster, TX',
  ],
  denton: [
    'Corinth, TX', 'Lake Dallas, TX', 'Highland Village, TX', 'Argyle, TX',
    'Northlake, TX', 'Aubrey, TX', 'Krum, TX', 'Sanger, TX', 'Oak Point, TX',
  ],
  southlake: [
    'Colleyville, TX', 'Grapevine, TX', 'Trophy Club, TX', 'Westlake, TX',
    'Keller, TX', 'Coppell, TX',
  ],
  burleson: [
    'Crowley, TX', 'Everman, TX', 'Joshua, TX', 'Alvarado, TX',
    'Venus, TX', 'Rendon, TX',
  ],
  cleburne: [
    'Joshua, TX', 'Alvarado, TX', 'Venus, TX', 'Keene, TX', 'Godley, TX',
  ],
  mckinney: [
    'Allen, TX', 'Prosper, TX', 'Celina, TX', 'Melissa, TX',
    'Anna, TX', 'Fairview, TX', 'Lucas, TX',
  ],
};

// Primary services — display name paired with its page slug in ONE array so
// the two can never drift. Order here is the order surfaced in llms.txt.
export const SERVICES = [
  { name: 'Broken Spring Repair', slug: 'broken-spring-repair' },
  { name: 'Garage Door Opener Repair & Installation', slug: 'opener-repair-installation' },
  { name: 'Broken Cable Repair', slug: 'broken-cable-repair' },
  { name: 'Garage Door Off-Track Repair', slug: 'garage-door-off-track' },
  { name: 'Garage Door Roller Repair', slug: 'garage-door-roller-repair' },
  { name: 'New Door Installation', slug: 'new-door-installation' },
  { name: 'Remote Repair & Programming', slug: 'remote-repair-programming' },
  { name: 'Door Service & Maintenance', slug: 'door-service-maintenance' },
];

// Key URLs to cite.
export const KEY_URLS = [
  { path: '/', title: 'Home' },
  { path: '/services', title: 'All Services' },
  { path: '/texas', title: 'Texas Service Areas' },
  { path: '/services/broken-spring-repair', title: 'Spring Repair' },
  { path: '/services/opener-repair-installation', title: 'Opener Installation' },
  { path: '/services/new-door-installation', title: 'New Door Installation' },
  { path: '/services/garage-door-off-track', title: 'Off-Track Repair' },
  { path: '/residential', title: 'Residential Services' },
  { path: '/commercial', title: 'Commercial Services' },
];

/** Hub cities excluding the master "dfw" entry (15 cities). */
export const cityHubs = () => HUBS.filter((h) => h.slug !== 'dfw');
