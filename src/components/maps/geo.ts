/**
 * Geocoding utilities and convex hull algorithm for ServiceAreaMap.
 * Provides caching via sessionStorage to minimize API calls.
 */

const CACHE_PREFIX = 'gc-geo-';

/**
 * Normalize a place name to ensure consistent "City, TX" format for geocoding.
 */
export function normalizeQuery(name: string): string {
  const trimmed = name.trim();
  
  // If already ends with ", TX" (case insensitive), just clean up
  if (/,\s*TX$/i.test(trimmed)) {
    return trimmed.replace(/,\s*TX$/i, ', TX');
  }
  
  // Add ", TX" suffix
  return `${trimmed}, TX`;
}

/**
 * Get cached coordinates from sessionStorage.
 */
export function getCachedLatLng(key: string): google.maps.LatLngLiteral | null {
  try {
    const cacheKey = CACHE_PREFIX + key.toLowerCase().replace(/\s+/g, '-');
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && typeof parsed.lat === 'number' && typeof parsed.lng === 'number') {
        return parsed as google.maps.LatLngLiteral;
      }
    }
  } catch {
    // Ignore storage errors
  }
  return null;
}

/**
 * Store coordinates in sessionStorage cache.
 */
export function setCachedLatLng(key: string, value: google.maps.LatLngLiteral): void {
  try {
    const cacheKey = CACHE_PREFIX + key.toLowerCase().replace(/\s+/g, '-');
    sessionStorage.setItem(cacheKey, JSON.stringify(value));
  } catch {
    // Ignore storage errors (quota exceeded, etc.)
  }
}

/**
 * Cross product for convex hull calculation.
 * Returns positive if counter-clockwise, negative if clockwise, 0 if collinear.
 */
function cross(
  o: google.maps.LatLngLiteral,
  a: google.maps.LatLngLiteral,
  b: google.maps.LatLngLiteral
): number {
  return (a.lng - o.lng) * (b.lat - o.lat) - (a.lat - o.lat) * (b.lng - o.lng);
}

/**
 * Compute the convex hull of a set of points using the monotonic chain algorithm.
 * Returns points in counter-clockwise order.
 * 
 * @param points - Array of lat/lng coordinates
 * @returns Array of points forming the convex hull
 */
export function convexHull(points: google.maps.LatLngLiteral[]): google.maps.LatLngLiteral[] {
  // Handle edge cases
  if (points.length < 3) {
    return [...points];
  }

  // Sort points lexicographically by (lng, lat) - x is lng, y is lat
  const sorted = [...points].sort((a, b) => {
    if (a.lng !== b.lng) return a.lng - b.lng;
    return a.lat - b.lat;
  });

  // Remove duplicates
  const unique: google.maps.LatLngLiteral[] = [];
  for (const p of sorted) {
    if (unique.length === 0 || 
        unique[unique.length - 1].lat !== p.lat || 
        unique[unique.length - 1].lng !== p.lng) {
      unique.push(p);
    }
  }

  if (unique.length < 3) {
    return unique;
  }

  // Build lower hull
  const lower: google.maps.LatLngLiteral[] = [];
  for (const p of unique) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
      lower.pop();
    }
    lower.push(p);
  }

  // Build upper hull
  const upper: google.maps.LatLngLiteral[] = [];
  for (let i = unique.length - 1; i >= 0; i--) {
    const p = unique[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
      upper.pop();
    }
    upper.push(p);
  }

  // Remove last point of each half (it's repeated at the beginning of the other)
  lower.pop();
  upper.pop();

  // Concatenate to form complete hull
  return [...lower, ...upper];
}

/**
 * Geocode an address using Google Maps Geocoding service.
 * Uses cache to avoid redundant API calls.
 */
export async function geocodeAddress(
  geocoder: google.maps.Geocoder,
  address: string
): Promise<google.maps.LatLngLiteral | null> {
  const normalizedAddress = normalizeQuery(address);
  
  // Check cache first
  const cached = getCachedLatLng(normalizedAddress);
  if (cached) {
    return cached;
  }

  try {
    const result = await geocoder.geocode({ address: normalizedAddress });
    
    if (result.results && result.results.length > 0) {
      const location = result.results[0].geometry.location;
      const latLng: google.maps.LatLngLiteral = {
        lat: location.lat(),
        lng: location.lng()
      };
      
      // Cache the result
      setCachedLatLng(normalizedAddress, latLng);
      
      return latLng;
    }
  } catch (error) {
    console.warn(`Geocoding failed for "${address}":`, error);
  }

  return null;
}


