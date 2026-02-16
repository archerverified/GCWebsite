export const SITE_NAME = "Garage Cowboy";
export const DEFAULT_TITLE = "Garage Cowboy - 24/7 Garage Door Repair in DFW";
export const DEFAULT_DESCRIPTION = "24/7 emergency garage door repair in Dallas-Fort Worth, TX. Same-day service for broken springs, openers, cables & more. Licensed & insured. Call (817) 256-0122!";

// Use environment variable with fallback
export const SITE_URL = import.meta.env.VITE_SITE_URL || "https://garagecowboy.com";

export const DEFAULT_OG_IMAGE = "/social-preview.png";

// Business information for schema
export const BUSINESS_INFO = {
  businessName: "Garage Cowboy",
  telephone: "+18172560122",
  priceRange: "$$",
  serviceArea: [
    "Dallas",
    "Fort Worth",
    "Arlington",
    "Plano",
    "Irving",
    "Garland",
    "Frisco",
    "McKinney",
    "Grand Prairie",
    "Keller",
    "Mansfield",
    "Weatherford",
    "Denton",
    "Southlake",
    "Burleson",
    "Cleburne"
  ],
  openingHours: "Mo,Tu,We,Th,Fr,Sa,Su 00:00-24:00",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61577149727757",
    "https://www.yelp.com/biz/garage-cowboy-fort-worth",
    "https://share.google/cW1X5hiNDh12RmEl9"
  ]
};
