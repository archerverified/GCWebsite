export type Hub = { slug: string; name: string; state: "TX" };
export type Subarea = { name: string };

/**
 * NOTE:
 * The Texas service areas master content lists 15 primary city hubs.
 * We also include an overall "DFW" hub entry so HUBS is 16 total (master + 15 hubs).
 */
export const HUBS: Hub[] = [
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

export const SUBAREAS_BY_HUB: Record<string, Subarea[]> = {
  dfw: [
    { name: "Dallas, TX" },
    { name: "Fort Worth, TX" },
    { name: "Arlington, TX" },
    { name: "Plano, TX" },
    { name: "Irving, TX" },
    { name: "Frisco, TX" },
    { name: "Grand Prairie, TX" },
    { name: "Keller, TX" },
    { name: "Mansfield, TX" },
    { name: "Weatherford, TX" },
    { name: "Denton, TX" },
    { name: "Southlake, TX" },
    { name: "Burleson, TX" },
    { name: "Cleburne, TX" },
    { name: "McKinney, TX" },
  ],

  "dallas": [
    { name: "University Park, TX" },
    { name: "Highland Park, TX" },
    { name: "Addison, TX" },
    { name: "Farmers Branch, TX" },
    { name: "Cedar Hill, TX" },
    { name: "DeSoto, TX" },
    { name: "Duncanville, TX" },
    { name: "Lancaster, TX" },
    { name: "Garland, TX" },
    { name: "Rowlett, TX" },
    { name: "Richardson, TX" },
  ],

  "fort-worth": [
    { name: "Benbrook, TX" },
    { name: "White Settlement, TX" },
    { name: "River Oaks, TX" },
    { name: "Lake Worth, TX" },
    { name: "Sansom Park, TX" },
    { name: "Westworth Village, TX" },
    { name: "Blue Mound, TX" },
    { name: "Saginaw, TX" },
    { name: "Watauga, TX" },
    { name: "Haltom City, TX" },
    { name: "Richland Hills, TX" },
    { name: "Forest Hill, TX" },
    { name: "Crowley, TX" },
    { name: "Everman, TX" },
    { name: "Rendon, TX" },
    { name: "Aledo, TX" },
  ],

  "arlington": [
    { name: "Kennedale, TX" },
    { name: "Mansfield, TX" },
    { name: "Grand Prairie, TX" },
    { name: "Dalworthington Gardens, TX" },
    { name: "Pantego, TX" },
  ],

  "plano": [
    { name: "Richardson, TX" },
    { name: "Allen, TX" },
    { name: "Addison, TX" },
    { name: "Murphy, TX" },
    { name: "Wylie, TX" },
  ],

  "irving": [
    { name: "Coppell, TX" },
    { name: "Farmers Branch, TX" },
    { name: "Carrollton, TX" },
    { name: "Grapevine, TX" },
    { name: "Euless, TX" },
    { name: "Bedford, TX" },
    { name: "Hurst, TX" },
    { name: "Grand Prairie, TX" },
  ],

  "frisco": [
    { name: "The Colony, TX" },
    { name: "Little Elm, TX" },
    { name: "Prosper, TX" },
    { name: "Celina, TX" },
    { name: "McKinney, TX" },
    { name: "West Frisco / North Plano adjacency, TX" },
  ],

  "grand-prairie": [
    { name: "Irving, TX" },
    { name: "Arlington, TX" },
    { name: "Dallas, TX" },
    { name: "Coppell, TX" },
  ],

  "keller": [
    { name: "Southlake, TX" },
    { name: "Colleyville, TX" },
    { name: "Watauga, TX" },
    { name: "North Richland Hills, TX" },
    { name: "Roanoke, TX" },
    { name: "Trophy Club, TX" },
    { name: "Westlake, TX" },
    { name: "Northlake, TX" },
  ],

  "mansfield": [
    { name: "Arlington, TX" },
    { name: "Kennedale, TX" },
    { name: "Midlothian, TX" },
    { name: "Venus, TX" },
    { name: "Alvarado, TX" },
    { name: "Cedar Hill, TX" },
    { name: "DeSoto, TX" },
  ],

  "weatherford": [
    { name: "Willow Park, TX" },
    { name: "Aledo, TX" },
    { name: "Springtown, TX" },
    { name: "Hudson Oaks, TX" },
    { name: "Brock, TX" },
    { name: "Peaster, TX" },
  ],

  "denton": [
    { name: "Corinth, TX" },
    { name: "Lake Dallas, TX" },
    { name: "Highland Village, TX" },
    { name: "Argyle, TX" },
    { name: "Northlake, TX" },
    { name: "Aubrey, TX" },
    { name: "Krum, TX" },
    { name: "Sanger, TX" },
    { name: "Oak Point, TX" },
  ],

  "southlake": [
    { name: "Colleyville, TX" },
    { name: "Grapevine, TX" },
    { name: "Trophy Club, TX" },
    { name: "Westlake, TX" },
    { name: "Keller, TX" },
    { name: "Coppell, TX" },
  ],

  "burleson": [
    { name: "Crowley, TX" },
    { name: "Everman, TX" },
    { name: "Joshua, TX" },
    { name: "Alvarado, TX" },
    { name: "Venus, TX" },
    { name: "Rendon, TX" },
  ],

  "cleburne": [
    { name: "Joshua, TX" },
    { name: "Alvarado, TX" },
    { name: "Venus, TX" },
    { name: "Keene, TX" },
    { name: "Godley, TX" },
  ],

  "mckinney": [
    { name: "Allen, TX" },
    { name: "Prosper, TX" },
    { name: "Celina, TX" },
    { name: "Melissa, TX" },
    { name: "Anna, TX" },
    { name: "Fairview, TX" },
    { name: "Lucas, TX" },
  ],
};

/**
 * Helper to get hub by slug
 */
export function getHubBySlug(slug: string): Hub | undefined {
  return HUBS.find(h => h.slug === slug);
}

/**
 * Helper to get subcities for a hub
 */
export function getSubareasForHub(hubSlug: string): Subarea[] {
  return SUBAREAS_BY_HUB[hubSlug] ?? [];
}


