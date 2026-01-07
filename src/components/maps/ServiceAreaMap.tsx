import { useEffect, useRef, useState, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { normalizeQuery, geocodeAddress, convexHull } from './geo';

interface ServiceAreaMapProps {
  hubSlug: string;
  hubName: string;
  subcities: { name: string }[];
  className?: string;
  fallbackEmbedUrl?: string;
}

type MapStatus = 'loading' | 'ready' | 'error' | 'fallback';

/**
 * ServiceAreaMap displays a Google Maps view of the service area
 * with markers for the hub city and all subcities, plus a polygon outline.
 * Falls back to iframe embed if no API key is configured.
 */
export function ServiceAreaMap({
  hubSlug,
  hubName,
  subcities,
  className = '',
  fallbackEmbedUrl
}: ServiceAreaMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const polygonRef = useRef<google.maps.Polygon | null>(null);
  
  const [status, setStatus] = useState<MapStatus>('loading');
  
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  // Cleanup function to remove markers and polygon
  const cleanup = useCallback(() => {
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null;
    }
  }, []);

  useEffect(() => {
    // If no API key, use fallback
    if (!apiKey) {
      setStatus('fallback');
      return;
    }

    let isMounted = true;

    const initializeMap = async () => {
      if (!mapRef.current) return;

      try {
        // Load Google Maps API
        const loader = new Loader({
          apiKey,
          version: 'weekly',
          libraries: ['places', 'geometry']
        });

        const google = await loader.load();
        
        if (!isMounted || !mapRef.current) return;

        // Create the map
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 32.7767, lng: -96.9970 }, // DFW center
          zoom: 10,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        mapInstanceRef.current = map;

        // Create geocoder
        const geocoder = new google.maps.Geocoder();

        // Geocode all locations (hub + subcities)
        const allLocations = [
          { name: hubName, isHub: true },
          ...subcities.map(s => ({ name: s.name, isHub: false }))
        ];

        // Deduplicate by normalized name
        const seen = new Set<string>();
        const uniqueLocations = allLocations.filter(loc => {
          const normalized = normalizeQuery(loc.name).toLowerCase();
          if (seen.has(normalized)) return false;
          seen.add(normalized);
          return true;
        });

        // Geocode all locations in parallel
        const geocodeResults = await Promise.allSettled(
          uniqueLocations.map(async (loc) => {
            const coords = await geocodeAddress(geocoder, loc.name);
            return coords ? { ...loc, coords } : null;
          })
        );

        if (!isMounted) return;

        // Filter successful results
        const successfulLocations = geocodeResults
          .filter((r): r is PromiseFulfilledResult<{ name: string; isHub: boolean; coords: google.maps.LatLngLiteral } | null> => 
            r.status === 'fulfilled' && r.value !== null
          )
          .map(r => r.value!);

        if (successfulLocations.length === 0) {
          // No locations geocoded, fall back to iframe
          setStatus('fallback');
          return;
        }

        // Create bounds for auto-fit
        const bounds = new google.maps.LatLngBounds();

        // Create markers
        const markers: google.maps.Marker[] = [];
        const points: google.maps.LatLngLiteral[] = [];

        successfulLocations.forEach(loc => {
          const marker = new google.maps.Marker({
            position: loc.coords,
            map,
            title: normalizeQuery(loc.name),
            icon: loc.isHub ? {
              // Hub marker: larger red pin
              path: google.maps.SymbolPath.CIRCLE,
              scale: 12,
              fillColor: '#EF4444',
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 3
            } : {
              // Subcity marker: smaller yellow pin
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#FEC300',
              fillOpacity: 1,
              strokeColor: '#35363A',
              strokeWeight: 2
            }
          });

          markers.push(marker);
          points.push(loc.coords);
          bounds.extend(loc.coords);
        });

        markersRef.current = markers;

        // Draw convex hull polygon if we have enough points
        if (points.length >= 3) {
          const hullPoints = convexHull(points);
          
          const polygon = new google.maps.Polygon({
            paths: hullPoints,
            strokeColor: '#EF4444',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#EF4444',
            fillOpacity: 0.1, // Very light fill for visibility
            map
          });

          polygonRef.current = polygon;
        }

        // Fit map to bounds with padding
        map.fitBounds(bounds, {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50
        });

        setStatus('ready');

      } catch (error) {
        console.error('Failed to initialize Google Maps:', error);
        if (isMounted) {
          setStatus('fallback');
        }
      }
    };

    initializeMap();

    return () => {
      isMounted = false;
      cleanup();
    };
  }, [apiKey, hubSlug, hubName, subcities, cleanup]);

  // Fallback: render iframe embed
  if (status === 'fallback') {
    if (fallbackEmbedUrl) {
      return (
        <div 
          className={`rounded-[20px] overflow-hidden shadow-lg border-2 border-[#35363a] ${className}`}
          role="region"
          aria-label={`Service area map for ${hubName}`}
        >
          <iframe
            src={fallbackEmbedUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map of ${hubName} and surrounding service areas`}
          />
        </div>
      );
    }

    // No fallback URL, show placeholder
    return (
      <div 
        className={`rounded-[20px] overflow-hidden shadow-lg border-2 border-[#35363a] bg-gray-100 h-[360px] sm:h-[420px] lg:h-[450px] flex items-center justify-center ${className}`}
        role="region"
        aria-label={`Service area map for ${hubName}`}
      >
        <div className="text-center text-gray-500 px-4">
          <p className="font-product-sans font-bold text-lg mb-2">Service Area Map</p>
          <p className="text-sm">
            Serving {hubName} and {subcities.length} surrounding cities
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (status === 'loading') {
    return (
      <div 
        className={`rounded-[20px] overflow-hidden shadow-lg border-2 border-[#35363a] bg-gray-100 h-[360px] sm:h-[420px] lg:h-[450px] flex items-center justify-center ${className}`}
        role="region"
        aria-label={`Loading service area map for ${hubName}`}
      >
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-[#FEC300] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="font-product-sans text-gray-500">Loading map...</p>
        </div>
      </div>
    );
  }

  // Map container
  return (
    <div 
      className={`rounded-[20px] overflow-hidden shadow-lg border-2 border-[#35363a] ${className}`}
      role="region"
      aria-label={`Service area map for ${hubName}`}
    >
      <div 
        ref={mapRef}
        className="w-full h-[360px] sm:h-[420px] lg:h-[450px]"
      />
    </div>
  );
}

export default ServiceAreaMap;


