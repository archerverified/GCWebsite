import { useParams, Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { Button } from "../components/ui/button";
import { ReadyToGetStartedCTA } from "../components/sections/ReadyToGetStartedCTA";
import { Seo } from "../components/seo/Seo";
import { Accordion } from "../components/ui/accordion";
import { buildArticleSchema, createFAQSchema, buildSpeakableWebPage } from "../seo/schemas";
import type { FAQ } from "../types/content";
import guidesData from "../data/guides.json";
import combosData from "../data/combos.json";

interface Guide {
  slug: string;
  city: string;
  cityName: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  datePublished: string;
  dateModified: string;
  sections: { title: string; content: string }[];
  faqs: FAQ[];
}

const GUIDES = guidesData.guides as Guide[];

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

const SERVICE_LABELS: Record<string, string> = {
  "broken-spring-repair": "Broken spring repair",
  "opener-repair-installation": "Garage door opener repair",
};

/**
 * Render a /guides/:slug buyer guide (Article + FAQ + Speakable schema, related
 * city links) or a noindex not-found fallback for an unknown slug.
 */
export function GuideDetail() {
  const { slug } = useParams<{ slug: string }>();
  const guide = GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    return (
      <main className="bg-white">
        <Seo title="Guide Not Found" description="The guide you are looking for could not be found." noindex />
        <section className="px-4 py-24 text-center">
          <h1 className="font-product-sans text-3xl font-black text-gc-ink">Guide not found</h1>
          <p className="mt-4 font-product-sans text-lg text-gc-ink">
            <Link to="/" className="font-bold underline hover:text-gc-yellow">Return home</Link>
          </p>
        </section>
      </main>
    );
  }

  const path = `/guides/${guide.slug}`;
  const cityCombos = (combosData.combos as { city: string; service: string }[]).filter(
    (c) => c.city === guide.city,
  );
  const otherGuides = GUIDES.filter((g) => g.slug !== guide.slug);

  const schemas: object[] = [
    buildArticleSchema({
      headline: guide.h1,
      description: guide.metaDescription,
      path,
      datePublished: guide.datePublished,
      dateModified: guide.dateModified,
    }),
    createFAQSchema(guide.faqs),
    buildSpeakableWebPage(path, ["h1", "[data-speakable='answer']", "[data-speakable='faq']"]),
  ];

  return (
    <main className="bg-white">
      <Seo
        title={guide.metaTitle}
        description={guide.metaDescription}
        canonicalPath={path}
        schema={schemas}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: `${guide.cityName} Service`, path: `/texas/${guide.city}` },
          { name: "Choosing a Repair Company", path },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-gc-ink flex items-center justify-center">
        <div className="relative z-10 px-4 max-w-4xl mx-auto py-16 lg:py-20 text-center">
          <p className="font-product-sans text-sm font-bold uppercase tracking-wide text-gc-yellow mb-3">
            Garage Door Buyer Guide
          </p>
          <h1 className="font-product-sans font-black text-3xl sm:text-4xl md:text-5xl text-white mb-5">
            {guide.h1}
          </h1>
          <Button asChild variant="primary" size="cta">
            <a href="tel:8172560122">
              <Phone />
              Call (817) 256-0122
            </a>
          </Button>
        </div>
      </section>

      {/* Article */}
      <article className="px-4 py-12 sm:px-6 md:px-10 lg:px-16 lg:py-16 xl:px-24">
        <div className="container mx-auto max-w-3xl">
          <p className="font-product-sans text-sm text-gc-gray-600 mb-6">
            Updated <time dateTime={guide.dateModified}>{formatMonthYear(guide.dateModified)}</time> by Deno Borghi, President of Garage Cowboy
          </p>

          <div
            data-speakable="answer"
            className="prose prose-lg max-w-none font-product-sans text-gc-ink prose-headings:font-product-sans prose-headings:font-black prose-strong:font-bold prose-ul:list-disc prose-li:marker:text-gc-yellow"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{guide.intro}</ReactMarkdown>
          </div>

          <div className="mt-10 flex flex-col gap-10">
            {guide.sections.map((section, index) => (
              <section key={index}>
                <h2 className="font-product-sans font-black text-2xl md:text-3xl text-gc-ink mb-4 leading-tight">
                  {section.title}
                </h2>
                <div className="prose prose-lg max-w-none font-product-sans text-gc-ink prose-headings:font-product-sans prose-headings:font-black prose-strong:font-bold prose-ul:list-disc prose-li:marker:text-gc-yellow">
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{section.content}</ReactMarkdown>
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>

      {/* FAQs */}
      {guide.faqs.length > 0 && (
        <Accordion faqs={guide.faqs} title={`${guide.cityName} Garage Door FAQs`} />
      )}

      {/* Related links */}
      <section className="bg-gc-gray-100 px-4 py-12 sm:px-6 md:px-10 lg:px-16 lg:py-16 xl:px-24">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-product-sans text-2xl font-black text-gc-ink md:text-3xl text-center mb-8">
            Garage Door Help in {guide.cityName}
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <li>
              <Link
                to={`/texas/${guide.city}`}
                className="flex min-h-11 items-center justify-between gap-2 rounded-[var(--radius-gc-md)] border-2 border-gc-ink bg-white px-5 py-3 font-product-sans font-bold text-gc-ink transition-colors hover:bg-gc-yellow"
              >
                Garage door repair in {guide.cityName}
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </Link>
            </li>
            {cityCombos.map((combo) => (
              <li key={combo.service}>
                <Link
                  to={`/texas/${combo.city}/${combo.service}`}
                  className="flex min-h-11 items-center justify-between gap-2 rounded-[var(--radius-gc-md)] border-2 border-gc-ink bg-white px-5 py-3 font-product-sans font-bold text-gc-ink transition-colors hover:bg-gc-yellow"
                >
                  {SERVICE_LABELS[combo.service] ?? combo.service} in {guide.cityName}
                  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>

          {otherGuides.length > 0 && (
            <>
              <h3 className="font-product-sans text-lg font-black uppercase text-gc-ink mt-10 mb-4 text-center">
                Guides for Other Cities
              </h3>
              <ul className="flex flex-wrap justify-center gap-3">
                {otherGuides.map((g) => (
                  <li key={g.slug}>
                    <Link
                      to={`/guides/${g.slug}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-gc-gray-300 bg-white px-4 py-2 font-product-sans text-sm text-gc-ink transition-all hover:border-gc-yellow hover:shadow-sm"
                    >
                      Choosing repair in {g.cityName}
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
        title={`Need Garage Door Repair in ${guide.cityName}?`}
        subtitle="Locally owned, licensed and insured, with 24/7 same-day service"
      />
    </main>
  );
}

export default GuideDetail;
