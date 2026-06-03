import { SITE_URL, BUSINESS_INFO } from './site';
import { HUBS, SUBAREAS_BY_HUB, getHubBySlug, type Hub } from './areas';

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": BUSINESS_INFO.businessName,
  "telephone": BUSINESS_INFO.telephone,
  "email": BUSINESS_INFO.email,
  "priceRange": BUSINESS_INFO.priceRange,
  "openingHours": BUSINESS_INFO.openingHours,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "801 W Vickery Blvd",
    "addressLocality": "Fort Worth",
    "addressRegion": "TX",
    "postalCode": "76104",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "32.7555",
    "longitude": "-97.3308"
  },
  "areaServed": BUSINESS_INFO.serviceArea.map(city => ({
    "@type": "City",
    "name": city,
    "addressRegion": "TX"
  })),
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "24",
    "bestRating": "5",
    "worstRating": "1"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday", "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "sameAs": BUSINESS_INFO.sameAs,
  "url": SITE_URL,
  "description": "24/7 emergency garage door repair in Dallas-Fort Worth, TX. Same-day service for broken springs, openers, cables & more. Licensed & insured technicians serving DFW since 2023.",
  "image": {
    "@type": "ImageObject",
    "url": `${SITE_URL}/social-preview.png`,
    "width": 1200,
    "height": 630
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Garage Cowboy",
  "url": SITE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_URL}/services?search={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

export function createServiceSchema(serviceName: string, description: string, slug?: string, dateModified?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName,
    "provider": {
      "@id": `${SITE_URL}#localbusiness`
    },
    "areaServed": BUSINESS_INFO.serviceArea.map(city => ({
      "@type": "City",
      "name": city,
      "addressRegion": "TX"
    })),
    "description": description,
    ...(dateModified ? { "dateModified": dateModified } : {}),
    "url": slug ? `${SITE_URL}/services/${slug}` : undefined,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "USD"
      }
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceLocation": {
        "@type": "Place",
        "name": "Dallas-Fort Worth Metroplex"
      },
      "servicePhone": BUSINESS_INFO.telephone,
      "serviceUrl": SITE_URL
    }
  };
}

export function createFAQSchema(faqs: Array<{question: string; answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function createBreadcrumbSchema(items: Array<{name: string; url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${SITE_URL}${item.url}`
    }))
  };
}

// ============================================================================
// NEW: Graph-based schema builders with stable @id references
// ============================================================================

/**
 * Founder / owner Person node (E-E-A-T entity).
 * No @context — designed to live inside an @graph. Use buildPersonSchema()
 * for a standalone, validator-ready object.
 */
const founderNode = {
  "@type": "Person",
  "@id": `${SITE_URL}#founder`,
  "name": "Deno Borghi",
  "jobTitle": "President",
  "worksFor": { "@id": `${SITE_URL}#localbusiness` },
  "image": `${SITE_URL}/images/authors/deno-borghi.jpg`,
  "url": `${SITE_URL}/about-us`,
  "knowsAbout": [
    "garage door repair",
    "garage door installation",
    "garage door maintenance"
  ],
  "description": "Deno Borghi is the President and founder of Garage Cowboy, a locally owned, licensed and insured garage door company serving the Dallas–Fort Worth metroplex since 2023."
};

/**
 * Standalone Person schema for the founder/owner (Deno Borghi).
 * Links to the LocalBusiness via @id for E-E-A-T entity linking.
 */
export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    ...founderNode
  };
}

/**
 * Build AboutPage schema with a dateModified for content freshness.
 * Declares the founder as the page's main entity and links to the business.
 * @param dateModified - ISO date (e.g. "2026-06-02") shown as "Updated" on-page.
 */
export function buildAboutPageSchema(dateModified: string) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/about-us#webpage`,
    "url": `${SITE_URL}/about-us`,
    "name": "About Garage Cowboy",
    "description": "Meet Deno Borghi, President of Garage Cowboy — a locally owned, licensed and insured garage door company serving the Dallas–Fort Worth metroplex since 2023.",
    "isPartOf": { "@id": `${SITE_URL}#website` },
    "about": { "@id": `${SITE_URL}#localbusiness` },
    "mainEntity": { "@id": `${SITE_URL}#founder` },
    "dateModified": dateModified
  };
}

/**
 * Build base graph for home page with Organization, WebSite, and LocalBusiness.
 * Uses stable @id references for entity linking.
 */
export function buildBaseGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        "name": BUSINESS_INFO.businessName,
        "url": SITE_URL,
        "telephone": BUSINESS_INFO.telephone,
        "email": BUSINESS_INFO.email,
        "sameAs": BUSINESS_INFO.sameAs,
        "founder": {
          "@id": `${SITE_URL}#founder`
        },
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/social-preview.png`,
          "width": 1200,
          "height": 630
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "801 W Vickery Blvd",
          "addressLocality": "Fort Worth",
          "addressRegion": "TX",
          "postalCode": "76104",
          "addressCountry": "US"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        "name": BUSINESS_INFO.businessName,
        "url": SITE_URL,
        "publisher": {
          "@id": `${SITE_URL}#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${SITE_URL}/services?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": `${SITE_URL}#localbusiness`,
        "name": BUSINESS_INFO.businessName,
        "url": SITE_URL,
        "telephone": BUSINESS_INFO.telephone,
        "email": BUSINESS_INFO.email,
        "priceRange": BUSINESS_INFO.priceRange,
        "openingHours": BUSINESS_INFO.openingHours,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "801 W Vickery Blvd",
          "addressLocality": "Fort Worth",
          "addressRegion": "TX",
          "postalCode": "76104",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "32.7555",
          "longitude": "-97.3308"
        },
        "description": "24/7 emergency garage door repair in Dallas-Fort Worth, TX. Same-day service for broken springs, openers, cables & more. Licensed & insured technicians serving DFW since 2023.",
        "image": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/social-preview.png`,
          "width": 1200,
          "height": 630
        },
        "sameAs": BUSINESS_INFO.sameAs,
        "founder": {
          "@id": `${SITE_URL}#founder`
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "24",
          "bestRating": "5",
          "worstRating": "1"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday", "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        },
        "areaServed": HUBS.filter(h => h.slug !== "dfw").map(hub => ({
          "@type": "City",
          "name": hub.name,
          "addressRegion": hub.state
        }))
      },
      founderNode,
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        "url": SITE_URL,
        "name": "Garage Cowboy - 24/7 Garage Door Repair in DFW",
        "isPartOf": { "@id": `${SITE_URL}#website` },
        "about": { "@id": `${SITE_URL}#localbusiness` },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["h1", "[data-speakable='faq']"]
        }
      }
    ]
  };
}

/**
 * Build a standalone WebPage node carrying a SpeakableSpecification — a
 * voice-assistant hint marking the answer-first intro + FAQ region of a page.
 * Has its own @context so it can sit alongside the per-page Service/FAQ schemas.
 */
export function buildSpeakableWebPage(pagePath: string, cssSelector: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${pagePath}#webpage`,
    "url": `${SITE_URL}${pagePath}`,
    "isPartOf": { "@id": `${SITE_URL}#website` },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": cssSelector
    }
  };
}

/**
 * Build ItemList schema for Texas service areas hub page.
 * Lists all hub cities as an ItemList for rich results.
 * Defensively filters out the "dfw" master hub.
 */
export function buildTexasItemList(hubs: Hub[]) {
  // Defensively filter out dfw hub regardless of what's passed
  const list = hubs.filter(h => h.slug !== "dfw");
  
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Garage Door Service Areas in Texas",
    "description": "Professional garage door repair and installation services throughout the Dallas-Fort Worth metroplex.",
    "numberOfItems": list.length,
    "itemListElement": list.map((hub, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": `${hub.name}, ${hub.state}`,
      "url": `${SITE_URL}/texas/${hub.slug}`
    }))
  };
}

/**
 * Build Service schema for city detail pages.
 * Includes the hub city plus all subcities as areaServed.
 * Uses normalizePlaceName to properly parse "City, TX" format.
 */
export function buildCityServiceSchema(hubSlug: string, serviceName?: string) {
  const hub = getHubBySlug(hubSlug);
  const subcities = SUBAREAS_BY_HUB[hubSlug] ?? [];
  
  // Build areaServed array: hub city + all subcities
  const areaServed: Array<{ "@type": string; name: string; addressRegion?: string }> = [];
  
  // Add hub city first
  if (hub) {
    areaServed.push({
      "@type": "City",
      "name": hub.name,
      "addressRegion": hub.state
    });
  }
  
  // Add all subcities with proper normalization
  subcities.forEach(subcity => {
    // For non-standard place names (like "West Frisco / North Plano adjacency, TX"),
    // use Place type instead of City
    const isStandardCity = 
      !subcity.name.includes("/") && 
      !subcity.name.toLowerCase().includes("adjacency");
    
    // Normalize the place name to extract addressRegion if present
    const normalized = normalizePlaceName(subcity.name);
    
    areaServed.push({
      "@type": isStandardCity ? "City" : "Place",
      ...normalized
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName || "Garage Door Repair and Installation",
    "provider": {
      "@id": `${SITE_URL}#localbusiness`
    },
    "areaServed": areaServed,
    "description": `Professional garage door services in ${hub?.name || hubSlug}, TX and surrounding areas. 24/7 emergency service available.`,
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceLocation": {
        "@type": "Place",
        "name": hub?.name ? `${hub.name}, TX` : "Dallas-Fort Worth Metroplex"
      },
      "servicePhone": BUSINESS_INFO.telephone,
      "serviceUrl": SITE_URL
    }
  };
}

/**
 * Build BreadcrumbList schema from path segments.
 * Alternative to createBreadcrumbSchema with simpler interface.
 */
export function buildBreadcrumbList(crumbs: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${SITE_URL}${crumb.path}`
    }))
  };
}

// ============================================================================
// Blog Schema Builders
// ============================================================================

/**
 * Build BlogPosting schema for individual blog posts.
 * Includes author, publisher, dates, and image metadata.
 */
export function createBlogPostingSchema(post: {
  title: string;
  description: string;
  slug: string;
  author: { name: string; title: string };
  publishDate: string;
  lastModified: string;
  featuredImage: { url: string; width: number; height: number };
  wordCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    ...(post.wordCount ? { "wordCount": post.wordCount } : {}),
    "image": {
      "@type": "ImageObject",
      "url": post.featuredImage.url.startsWith('http')
        ? post.featuredImage.url
        : `${SITE_URL}${post.featuredImage.url}`,
      "width": post.featuredImage.width,
      "height": post.featuredImage.height
    },
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.title,
      "url": `${SITE_URL}/about-us`
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      "name": BUSINESS_INFO.businessName,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/social-preview.png`
      }
    },
    "datePublished": post.publishDate,
    "dateModified": post.lastModified,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`
    }
  };
}

/**
 * Build ItemList schema for blog listing page.
 * Enables carousel rich results for blog posts.
 */
export function buildBlogItemList(posts: Array<{ slug: string; title: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": posts.map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${SITE_URL}/blog/${post.slug}`,
      "name": post.title
    }))
  };
}

/**
 * Build Blog/CollectionPage schema for the blog listing page.
 */
export function createBlogListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Garage Cowboy Blog",
    "description": "Expert tips, guides, and insights on garage door repair, maintenance, and installation from the Garage Cowboy team.",
    "url": `${SITE_URL}/blog`,
    "isPartOf": {
      "@id": `${SITE_URL}#website`
    },
    "publisher": {
      "@id": `${SITE_URL}#organization`
    }
  };
}

// ============================================================================
// Shared building blocks (single source for new-page schemas)
// ============================================================================

/**
 * Owner-verified Google Business Profile rating: 5.0 across 24 reviews.
 * Mirrors the #localbusiness node in buildBaseGraph() and REVIEW_SUMMARY in
 * src/data/testimonials.ts. Keep all three in lockstep.
 */
export const AGGREGATE_RATING = {
  "@type": "AggregateRating",
  "ratingValue": "5.0",
  "reviewCount": "24",
  "bestRating": "5",
  "worstRating": "1",
};

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  "streetAddress": "801 W Vickery Blvd",
  "addressLocality": "Fort Worth",
  "addressRegion": "TX",
  "postalCode": "76104",
  "addressCountry": "US",
};

const GEO_COORDINATES = {
  "@type": "GeoCoordinates",
  "latitude": "32.7555",
  "longitude": "-97.3308",
};

const OPENING_HOURS_24_7 = {
  "@type": "OpeningHoursSpecification",
  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  "opens": "00:00",
  "closes": "23:59",
};

const BUSINESS_IMAGE = {
  "@type": "ImageObject",
  "url": `${SITE_URL}/social-preview.png`,
  "width": 1200,
  "height": 630,
};

// ============================================================================
// Guide (Article) + Reviews + City-Service combo schema builders
// ============================================================================

/**
 * Build Article schema for the /guides/* buyer guides. Author is the founder
 * (Deno Borghi) for E-E-A-T; publisher is the Garage Cowboy Organization.
 */
export function buildArticleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": opts.headline,
    "description": opts.description,
    "author": {
      "@type": "Person",
      "name": "Deno Borghi",
      "jobTitle": "President",
      "url": `${SITE_URL}/about-us`,
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      "name": BUSINESS_INFO.businessName,
      "logo": BUSINESS_IMAGE,
    },
    "datePublished": opts.datePublished,
    "dateModified": opts.dateModified,
    "image": BUSINESS_IMAGE,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}${opts.path}`,
    },
  };
}

/**
 * Build the LocalBusiness node for the /reviews page: the canonical
 * #localbusiness entity carrying the aggregateRating (5.0/24) plus the real,
 * attributed reviews shown on the page. A 5.0 average across 24 reviews means
 * every review is 5 stars, so each displayed review is marked 5/5 truthfully.
 */
export function buildReviewsLocalBusiness(
  reviews: Array<{ author: string; fullReview: string; source: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}#localbusiness`,
    "name": BUSINESS_INFO.businessName,
    "url": `${SITE_URL}/reviews`,
    "telephone": BUSINESS_INFO.telephone,
    "email": BUSINESS_INFO.email,
    "priceRange": BUSINESS_INFO.priceRange,
    "address": POSTAL_ADDRESS,
    "geo": GEO_COORDINATES,
    "image": BUSINESS_IMAGE,
    "sameAs": BUSINESS_INFO.sameAs,
    "openingHoursSpecification": OPENING_HOURS_24_7,
    "aggregateRating": AGGREGATE_RATING,
    "review": reviews.map((r) => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": r.author },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1",
      },
      "reviewBody": r.fullReview,
      "publisher": { "@type": "Organization", "name": r.source },
    })),
  };
}

/**
 * Build a city-scoped LocalBusiness node for a /texas/:city/:service combo page.
 * Uses the canonical #localbusiness @id (so the page's Service.provider resolves
 * to it) and carries the same aggregateRating, with areaServed narrowed to the
 * combo's city.
 */
export function buildComboLocalBusiness(cityName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}#localbusiness`,
    "name": BUSINESS_INFO.businessName,
    "url": SITE_URL,
    "telephone": BUSINESS_INFO.telephone,
    "email": BUSINESS_INFO.email,
    "priceRange": BUSINESS_INFO.priceRange,
    "address": POSTAL_ADDRESS,
    "geo": GEO_COORDINATES,
    "image": BUSINESS_IMAGE,
    "sameAs": BUSINESS_INFO.sameAs,
    "openingHoursSpecification": OPENING_HOURS_24_7,
    "aggregateRating": AGGREGATE_RATING,
    "areaServed": { "@type": "City", "name": cityName, "addressRegion": "TX" },
  };
}

/**
 * Build the Service schema for a /texas/:city/:service combo page. areaServed is
 * the single combo city; provider links to the on-page #localbusiness node.
 */
export function buildComboServiceSchema(opts: {
  serviceName: string;
  description: string;
  path: string;
  cityName: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": opts.serviceName,
    "provider": { "@id": `${SITE_URL}#localbusiness` },
    "areaServed": { "@type": "City", "name": opts.cityName, "addressRegion": "TX" },
    "description": opts.description,
    "dateModified": opts.dateModified,
    "url": `${SITE_URL}${opts.path}`,
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceLocation": {
        "@type": "Place",
        "name": `${opts.cityName}, TX`,
      },
      "servicePhone": BUSINESS_INFO.telephone,
      "serviceUrl": `${SITE_URL}${opts.path}`,
    },
  };
}

// ============================================================================
// Helpers
// ============================================================================

/**
 * Normalize place names like "City, TX" into structured { name, addressRegion }.
 * Handles cases where state suffix is included in the name string.
 */
function normalizePlaceName(raw: string): { name: string; addressRegion?: string } {
  const match = raw.match(/^(.*?),\s*(TX)$/i);
  if (match) {
    return { name: match[1].trim(), addressRegion: "TX" };
  }
  return { name: raw };
}
