import { useParams, Link } from "react-router-dom";
import { Phone, ArrowLeft, MapPin } from "lucide-react";
import { ReadyToGetStartedCTA } from "../components/sections/ReadyToGetStartedCTA";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { useContent, ContentLoading, ContentError } from "../hooks/useContent";
import type { MarkdownContent } from "../types/content";
import { Accordion } from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Seo } from "../components/seo/Seo";
import { buildCityServiceSchema, createFAQSchema } from "../seo/schemas";
import { SUBAREAS_BY_HUB, getHubBySlug } from "../seo/areas";
import { ServiceAreasGrid } from "../components/sections/ServiceAreasGrid";
import { ServiceAreaMap } from "../components/maps/ServiceAreaMap";
import { ArrowRight } from "lucide-react";
import combosData from "../data/combos.json";

/** Short link labels for the combo services available in a city. */
const COMBO_SERVICE_LABELS: Record<string, string> = {
  "broken-spring-repair": "Broken Spring Repair",
  "opener-repair-installation": "Opener Repair & Installation",
};

/**
 * Hub map configurations with center coordinates and zoom levels.
 * Zoom levels are adjusted to show the hub city boundary + surrounding subcities.
 */
const HUB_MAP_CONFIG: Record<string, { lat: number; lng: number; zoom: number }> = {
  "dallas": { lat: 32.7767, lng: -96.7970, zoom: 10 },
  "fort-worth": { lat: 32.7555, lng: -97.3308, zoom: 10 },
  "arlington": { lat: 32.7357, lng: -97.1081, zoom: 11 },
  "plano": { lat: 33.0198, lng: -96.6989, zoom: 11 },
  "irving": { lat: 32.8140, lng: -96.9489, zoom: 11 },
  "frisco": { lat: 33.1507, lng: -96.8236, zoom: 11 },
  "grand-prairie": { lat: 32.7459, lng: -96.9978, zoom: 11 },
  "keller": { lat: 32.9346, lng: -97.2517, zoom: 11 },
  "mansfield": { lat: 32.5632, lng: -97.1417, zoom: 10 },
  "weatherford": { lat: 32.7593, lng: -97.7972, zoom: 10 },
  "denton": { lat: 33.2148, lng: -97.1331, zoom: 10 },
  "southlake": { lat: 32.9412, lng: -97.1342, zoom: 11 },
  "burleson": { lat: 32.5421, lng: -97.3208, zoom: 11 },
  "cleburne": { lat: 32.3476, lng: -97.3867, zoom: 11 },
  "mckinney": { lat: 33.1972, lng: -96.6397, zoom: 10 }
};

/**
 * Generate Google Maps embed URL showing the hub city with its boundary.
 * Uses the hub city name for search (to get city boundary outline) and
 * coordinates for proper centering to show surrounding service areas.
 */
function generateServiceAreaMapUrl(hubSlug: string, hubName: string): string {
  const config = HUB_MAP_CONFIG[hubSlug];
  
  if (config) {
    // Use coordinates-based embed centered on the hub with zoom to show surrounding areas
    // Searching for just the hub city name shows its boundary (the red dotted line)
    return `https://www.google.com/maps?q=${encodeURIComponent(hubName + ', TX')}&ll=${config.lat},${config.lng}&z=${config.zoom}&output=embed`;
  }
  
  // Fallback to simple search
  return `https://www.google.com/maps?q=${encodeURIComponent(hubName + ', TX')}&t=m&z=10&output=embed`;
}

// Helper to extract city name from slug
const getCityDisplayName = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function CityDetail() {
  const { city } = useParams<{ city: string }>();
  const { data: content, loading, error } = useContent<MarkdownContent>(`city-${city}`);

  if (loading) return <ContentLoading />;
  if (error) return <ContentError message={error} />;
  if (!content) return <ContentError message="City not found" />;

  const citySlug = city || '';
  const hub = getHubBySlug(citySlug);
  const cityName = hub?.name || getCityDisplayName(citySlug);
  const subcities = SUBAREAS_BY_HUB[citySlug] ?? [];

  // City + service combo pages available for this hub (pilot cities only).
  const cityCombos = (combosData.combos as { city: string; service: string }[]).filter(
    (c) => c.city === citySlug,
  );

  // Generate map URL showing hub city boundary + surrounding service area
  const mapSrc = generateServiceAreaMapUrl(citySlug, cityName);

  // Create schemas for SEO - use new buildCityServiceSchema that includes subcities
  const serviceSchema = buildCityServiceSchema(citySlug, `Garage Door Repair in ${cityName}`);

  const schemas: object[] = [serviceSchema];
  
  // Add FAQ schema if FAQs exist
  if (content.faqs && content.faqs.length > 0) {
    schemas.push(createFAQSchema(content.faqs));
  }

  return (
    <main className="bg-white">
      <Seo
        title={`Garage Door Service in ${cityName}, TX`}
        description={`Professional garage door repair and installation in ${cityName}, Texas. Same-day service, 24/7 emergency repairs. Call (817) 256-0122.`}
        canonicalPath={`/texas/${city}`}
        schema={schemas}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Texas", path: "/texas" },
          { name: cityName, path: `/texas/${city}` }
        ]}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[400px] bg-gc-ink bg-cover bg-center flex items-center justify-center">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-16">
          <Link
            to="/texas"
            className="inline-flex min-h-11 items-center gap-2 py-2 text-white mb-4 rounded outline-none transition-colors hover:text-gc-yellow focus-visible:ring-2 focus-visible:ring-gc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-gc-ink"
          >
            <ArrowLeft size={20} aria-hidden="true" />
            <span className="font-product-sans font-bold uppercase">Back to Service Areas</span>
          </Link>
          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4 mb-6">
            <MapPin size={40} className="shrink-0 text-gc-yellow sm:size-12" aria-hidden="true" />
            <h1 className="font-product-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
              {content.title}
            </h1>
          </div>
          <Button asChild variant="primary" size="cta">
            <a href="tel:8172560122">
              <Phone />
              Call Now
            </a>
          </Button>
        </div>
      </section>

      {/* Main Content - Intro */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none font-product-sans text-gc-ink prose-headings:font-product-sans prose-headings:font-black prose-strong:font-bold prose-ul:list-disc prose-li:marker:text-gc-yellow">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {content.intro}
            </ReactMarkdown>
          </div>
        </div>
      </section>

      {/* Sections — standardized on shadcn Card (border-2 border-gc-ink,
          token radius/shadow) to match the home value cards. Section titles
          stay <h2> (not CardTitle, which renders <h4>) to preserve heading order. */}
      {content.sections && content.sections.length > 0 && (
        <section className="py-16 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 bg-gc-gray-100">
          <div className="container mx-auto max-w-6xl flex flex-col gap-8 lg:gap-10">
            {content.sections.map((section, index) => (
              <Card
                key={index}
                className="border-2 border-gc-ink rounded-[var(--radius-gc-md)] shadow-gc-card"
              >
                <CardHeader>
                  <h2 className="font-product-sans font-black text-2xl md:text-3xl text-gc-ink leading-tight">
                    {section.title}
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-lg max-w-none font-product-sans text-gc-ink prose-headings:font-product-sans prose-headings:font-black prose-strong:font-bold prose-ul:list-disc prose-li:marker:text-gc-yellow">
                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                      {section.content}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* City + service combo pages (pilot cities): deep links into the
          most-requested services for this city. */}
      {cityCombos.length > 0 && (
        <section className="py-16 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
          <div className="container mx-auto max-w-6xl">
            <h2 className="font-product-sans font-black text-2xl md:text-3xl text-gc-ink mb-8 text-center">
              Popular Garage Door Services in {cityName}
            </h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {cityCombos.map((combo) => (
                <li key={combo.service}>
                  <Link
                    to={`/texas/${combo.city}/${combo.service}`}
                    className="flex min-h-11 items-center justify-between gap-2 rounded-[var(--radius-gc-md)] border-2 border-gc-ink bg-white px-5 py-4 font-product-sans font-bold text-gc-ink transition-colors hover:bg-gc-yellow"
                  >
                    {COMBO_SERVICE_LABELS[combo.service] ?? combo.service} in {cityName}
                    <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Also Serving Section - displays subcities for this hub */}
      {subcities.length > 0 && (
        <ServiceAreasGrid 
          title={`Also Serving Near ${cityName}`}
          items={subcities}
          linkMode="hubAnchor"
        />
      )}

      {/* FAQs Section */}
      {content.faqs && content.faqs.length > 0 && (
        <Accordion 
          faqs={content.faqs} 
          title={`${cityName} Garage Door FAQs`} 
        />
      )}

      {/* Map Section - Shows hub city and all subcities with markers and polygon */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-product-sans font-black text-2xl md:text-3xl text-gc-ink mb-8 text-center">
            {subcities.length > 0
              ? `Service Area: ${cityName} & Surrounding Cities`
              : `Service Area: ${cityName}, TX`
            }
          </h2>
          <ServiceAreaMap
            hubSlug={citySlug}
            hubName={cityName}
            subcities={subcities}
            fallbackEmbedUrl={mapSrc}
          />
        </div>
      </section>

      {/* CTA Section */}
      <ReadyToGetStartedCTA 
        title={`Need Garage Door Service in ${cityName}?`}
        subtitle="Our expert technicians are ready to help with any garage door repair or installation"
      />
    </main>
  );
}

export default CityDetail;
