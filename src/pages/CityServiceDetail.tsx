import { useParams, Link } from "react-router-dom";
import { Phone, ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Accordion } from "../components/ui/accordion";
import { ReadyToGetStartedCTA } from "../components/sections/ReadyToGetStartedCTA";
import { Seo } from "../components/seo/Seo";
import {
  buildComboServiceSchema,
  buildComboLocalBusiness,
  createFAQSchema,
  buildSpeakableWebPage,
} from "../seo/schemas";
import type { FAQ } from "../types/content";
import combosData from "../data/combos.json";

interface Combo {
  city: string;
  cityName: string;
  service: string;
  serviceName: string;
  serviceShort: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: { title: string; content: string }[];
  faqs: FAQ[];
  dateModified: string;
}

const COMBOS = combosData.combos as Combo[];

/** Short, link-friendly service labels (the full serviceName carries an &). */
const SERVICE_LABELS: Record<string, string> = {
  "broken-spring-repair": "Broken Spring Repair",
  "opener-repair-installation": "Opener Repair & Installation",
};

/** Short, link-friendly label for a service slug (falls back to the full name). */
function serviceLabel(slug: string, fallback: string): string {
  return SERVICE_LABELS[slug] ?? fallback;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-06-03" -> "June 2026" (no Date parsing; avoids timezone drift). */
function formatMonthYear(iso: string): string {
  const [year, month] = iso.split("-");
  const m = Number(month);
  return m >= 1 && m <= 12 ? `${MONTHS[m - 1]} ${year}` : iso;
}

/**
 * Render a /texas/:city/:service combo page (Service + LocalBusiness +
 * BreadcrumbList + FAQPage + Speakable schema, cross-links) or a noindex
 * not-found fallback for an unknown city/service pair.
 */
export function CityServiceDetail() {
  const { city, service } = useParams<{ city: string; service: string }>();
  const combo = COMBOS.find((c) => c.city === city && c.service === service);

  if (!combo) {
    return (
      <main className="bg-white">
        <Seo
          title="Page Not Found"
          description="The page you are looking for could not be found."
          noindex
        />
        <section className="px-4 py-24 text-center">
          <h1 className="font-product-sans text-3xl font-black text-gc-ink">Page not found</h1>
          <p className="mt-4 font-product-sans text-lg text-gc-ink">
            <Link to="/texas" className="font-bold underline hover:text-gc-yellow">
              Browse our Texas service areas
            </Link>
          </p>
        </section>
      </main>
    );
  }

  const path = `/texas/${combo.city}/${combo.service}`;

  // Sibling combo: the other service in the same city.
  const siblingCombo = COMBOS.find((c) => c.city === combo.city && c.service !== combo.service);
  // Same service in other cities.
  const otherCityCombos = COMBOS.filter(
    (c) => c.service === combo.service && c.city !== combo.city,
  );

  const schemas: object[] = [
    buildComboServiceSchema({
      serviceName: combo.serviceName,
      description: combo.metaDescription,
      path,
      cityName: combo.cityName,
      dateModified: combo.dateModified,
    }),
    buildComboLocalBusiness(combo.cityName),
    createFAQSchema(combo.faqs),
    buildSpeakableWebPage(path, ["h1", "[data-speakable='answer']", "[data-speakable='faq']"]),
  ];

  return (
    <main className="bg-white">
      <Seo
        title={combo.metaTitle}
        description={combo.metaDescription}
        canonicalPath={path}
        schema={schemas}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Texas", path: "/texas" },
          { name: combo.cityName, path: `/texas/${combo.city}` },
          { name: serviceLabel(combo.service, combo.serviceName), path },
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[360px] bg-gc-ink flex items-center justify-center">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-16">
          <Link
            to={`/texas/${combo.city}`}
            className="inline-flex min-h-11 items-center gap-2 py-2 text-white mb-4 rounded outline-none transition-colors hover:text-gc-yellow focus-visible:ring-2 focus-visible:ring-gc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-gc-ink"
          >
            <ArrowLeft size={20} aria-hidden="true" />
            <span className="font-product-sans font-bold uppercase">Back to {combo.cityName}</span>
          </Link>
          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4 mb-6">
            <MapPin size={36} className="shrink-0 text-gc-yellow sm:size-11" aria-hidden="true" />
            <h1 className="font-product-sans font-black text-3xl sm:text-4xl md:text-5xl text-white">
              {combo.h1}
            </h1>
          </div>
          <Button asChild variant="primary" size="cta">
            <a href="tel:8172560122">
              <Phone />
              Call (817) 256-0122
            </a>
          </Button>
        </div>
      </section>

      {/* Answer-first intro */}
      <section className="py-12 lg:py-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="container mx-auto max-w-4xl">
          <div
            data-speakable="answer"
            className="prose prose-lg max-w-none font-product-sans text-gc-ink prose-headings:font-product-sans prose-headings:font-black prose-strong:font-bold prose-ul:list-disc prose-li:marker:text-gc-yellow"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{combo.intro}</ReactMarkdown>
          </div>
          <p className="mt-8 font-product-sans text-sm text-gc-gray-600">
            Updated <time dateTime={combo.dateModified}>{formatMonthYear(combo.dateModified)}</time>
          </p>
        </div>
      </section>

      {/* Sections */}
      {combo.sections.length > 0 && (
        <section className="py-12 lg:py-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 bg-gc-gray-100">
          <div className="container mx-auto max-w-5xl flex flex-col gap-8 lg:gap-10">
            {combo.sections.map((section, index) => (
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
                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{section.content}</ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      {combo.faqs.length > 0 && (
        <Accordion faqs={combo.faqs} title={`${combo.serviceName} in ${combo.cityName}: FAQs`} />
      )}

      {/* Internal links */}
      <section className="bg-gc-gray-100 px-4 py-12 sm:px-6 md:px-10 lg:px-16 lg:py-16 xl:px-24">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-product-sans text-2xl font-black text-gc-ink md:text-3xl text-center mb-8">
            Garage Door Service in {combo.cityName}
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <li>
              <Link
                to={`/texas/${combo.city}`}
                className="flex min-h-11 items-center justify-between gap-2 rounded-[var(--radius-gc-md)] border-2 border-gc-ink bg-white px-5 py-3 font-product-sans font-bold text-gc-ink transition-colors hover:bg-gc-yellow"
              >
                All garage door repair in {combo.cityName}
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </Link>
            </li>
            {siblingCombo && (
              <li>
                <Link
                  to={`/texas/${siblingCombo.city}/${siblingCombo.service}`}
                  className="flex min-h-11 items-center justify-between gap-2 rounded-[var(--radius-gc-md)] border-2 border-gc-ink bg-white px-5 py-3 font-product-sans font-bold text-gc-ink transition-colors hover:bg-gc-yellow"
                >
                  {serviceLabel(siblingCombo.service, siblingCombo.serviceName)} in {combo.cityName}
                  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </Link>
              </li>
            )}
            <li>
              <Link
                to={`/services/${combo.service}`}
                className="flex min-h-11 items-center justify-between gap-2 rounded-[var(--radius-gc-md)] border-2 border-gc-ink bg-white px-5 py-3 font-product-sans font-bold text-gc-ink transition-colors hover:bg-gc-yellow"
              >
                About our {combo.serviceShort}
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </Link>
            </li>
          </ul>

          {otherCityCombos.length > 0 && (
            <>
              <h3 className="font-product-sans text-lg font-black uppercase text-gc-ink mt-10 mb-4 text-center">
                {serviceLabel(combo.service, combo.serviceName)} in Other DFW Cities
              </h3>
              <ul className="flex flex-wrap justify-center gap-3">
                {otherCityCombos.map((c) => (
                  <li key={c.city}>
                    <Link
                      to={`/texas/${c.city}/${c.service}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-gc-gray-300 bg-white px-4 py-2 font-product-sans text-sm text-gc-ink transition-all hover:border-gc-yellow hover:shadow-sm"
                    >
                      {c.cityName}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <ReadyToGetStartedCTA
        title={`Need ${combo.serviceName} in ${combo.cityName}?`}
        subtitle="Locally owned, licensed and insured, with 24/7 same-day service"
      />
    </main>
  );
}

export default CityServiceDetail;
