import { SITE_URL, BUSINESS_INFO } from './site';
import { HUBS, SUBAREAS_BY_HUB, getHubBySlug, type Hub } from './areas';

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": BUSINESS_INFO.businessName,
  "telephone": BUSINESS_INFO.telephone,
  "priceRange": BUSINESS_INFO.priceRange,
  "openingHours": BUSINESS_INFO.openingHours,
  "areaServed": BUSINESS_INFO.serviceArea.map(city => ({
    "@type": "City",
    "name": city,
    "addressRegion": "TX"
  })),
  "sameAs": BUSINESS_INFO.sameAs,
  "url": SITE_URL,
  "description": "Professional garage door repair and installation services in Dallas-Fort Worth metroplex. 24/7 emergency service available.",
  "image": `${SITE_URL}/og/og-default.png`
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

export function createServiceSchema(serviceName: string, description: string, slug?: string) {
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
    "url": slug ? `${SITE_URL}/services/${slug}` : undefined,
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
        "sameAs": BUSINESS_INFO.sameAs,
        "logo": `${SITE_URL}/og/og-default.png`
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
        "priceRange": BUSINESS_INFO.priceRange,
        "openingHours": BUSINESS_INFO.openingHours,
        "description": "Professional garage door repair and installation services in Dallas-Fort Worth metroplex. 24/7 emergency service available.",
        "image": `${SITE_URL}/og/og-default.png`,
        "sameAs": BUSINESS_INFO.sameAs,
        "areaServed": HUBS.filter(h => h.slug !== "dfw").map(hub => ({
          "@type": "City",
          "name": hub.name,
          "addressRegion": hub.state
        }))
      }
    ]
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
