import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { Button } from "../components/ui/button";
import { FAQAccordion } from "../components/ui/accordion";
import { Seo } from "../components/seo/Seo";
import { createFAQSchema, buildSpeakableWebPage } from "../seo/schemas";
import { HUBS } from "../seo/areas";
import type { FAQ } from "../types/content";
import homeFaqsRaw from "../data/faq.json";
import servicesPage from "../data/services.json";
import texasPage from "../data/texas.json";

/**
 * /faq: the site-wide FAQ hub.
 *
 * Aggregates EVERY page FAQ from its single source (src/data) into one grouped,
 * in-DOM accordion + one FAQPage schema. This mirrors the AI-endpoint generator
 * (scripts/seo/generate-ai-endpoints.mjs) but for the on-page experience, using
 * import.meta.glob so new service-/city- data files are picked up automatically.
 * No FAQ text is authored here; it is read verbatim from the page content.
 */

type RawPage = { title?: string; faqs?: FAQ[] };

interface FaqGroup {
  id: string;
  label: string;
  href: string;
  faqs: FAQ[];
}

const serviceModules = import.meta.glob<{ default: RawPage }>(
  "../data/services-*.json",
  { eager: true },
);
const cityModules = import.meta.glob<{ default: RawPage }>(
  "../data/city-*.json",
  { eager: true },
);

/** '../data/services-broken-spring-repair.json' -> 'broken-spring-repair' */
function slugFromPath(path: string, prefix: string): string {
  const file = path.split("/").pop() ?? "";
  return file.replace(prefix, "").replace(".json", "");
}

/** Sentence-case an all-caps question (home FAQ); leave mixed-case untouched. */
function normalizeQuestion(q: string): string {
  const isAllCaps = /[A-Z]/.test(q) && !/[a-z]/.test(q);
  if (!isAllCaps) return q;
  const lower = q.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function mapFaqs(faqs: FAQ[]): FAQ[] {
  return faqs.map((f) => ({ question: normalizeQuestion(f.question), answer: f.answer }));
}

/** "Broken Garage Door Spring Repair in DFW" -> "Broken Garage Door Spring Repair" */
function cleanServiceLabel(title: string, slug: string): string {
  return (title || slug).replace(/\s+in DFW$/i, "").trim();
}

function buildGroups(): FaqGroup[] {
  const groups: FaqGroup[] = [];

  // 1) General / home FAQ.
  const homeFaqs = (homeFaqsRaw as FAQ[]) ?? [];
  if (homeFaqs.length > 0) {
    groups.push({ id: "general", label: "General Questions", href: "/", faqs: mapFaqs(homeFaqs) });
  }

  // 2) One group per service page (sorted by slug for stable order).
  Object.entries(serviceModules)
    .map(([path, mod]) => ({ slug: slugFromPath(path, "services-"), data: mod.default }))
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .forEach(({ slug, data }) => {
      const faqs = data?.faqs ?? [];
      if (faqs.length === 0) return;
      groups.push({
        id: `service-${slug}`,
        label: cleanServiceLabel(data?.title ?? "", slug),
        href: `/services/${slug}`,
        faqs: mapFaqs(faqs),
      });
    });

  // 3) One group per hub city (ordered by HUBS; skip the dfw master hub).
  const cityBySlug: Record<string, RawPage> = {};
  for (const [path, mod] of Object.entries(cityModules)) {
    cityBySlug[slugFromPath(path, "city-")] = mod.default;
  }
  for (const hub of HUBS) {
    if (hub.slug === "dfw") continue;
    const faqs = cityBySlug[hub.slug]?.faqs ?? [];
    if (faqs.length === 0) continue;
    groups.push({
      id: `city-${hub.slug}`,
      label: `${hub.name}, ${hub.state}`,
      href: `/texas/${hub.slug}`,
      faqs: mapFaqs(faqs),
    });
  }

  // 4) Index / overview pages.
  const servicesOverview = (servicesPage as RawPage).faqs ?? [];
  if (servicesOverview.length > 0) {
    groups.push({ id: "all-services", label: "All Services", href: "/services", faqs: mapFaqs(servicesOverview) });
  }
  const texasOverview = (texasPage as RawPage).faqs ?? [];
  if (texasOverview.length > 0) {
    groups.push({ id: "service-areas", label: "Texas Service Areas", href: "/texas", faqs: mapFaqs(texasOverview) });
  }

  return groups;
}

const GROUPS = buildGroups();
const ALL_FAQS: FAQ[] = GROUPS.flatMap((g) => g.faqs);

/**
 * FAQPage schema must not repeat the same question — Google ignores a FAQ rich
 * result that contains duplicate Question entities. Several questions recur
 * across city/service groups (e.g. "Can you fix a garage door that won't
 * open?"), so we dedupe by normalized question text for the SCHEMA ONLY. Every
 * group still renders in full in the visible DOM (answers stay in the markup).
 */
const SCHEMA_FAQS: FAQ[] = (() => {
  const seen = new Set<string>();
  const out: FAQ[] = [];
  for (const f of ALL_FAQS) {
    const key = f.question.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(f);
  }
  return out;
})();

export function Faq() {
  const schemas: object[] = [
    createFAQSchema(SCHEMA_FAQS),
    buildSpeakableWebPage("/faq", ["h1", "[data-speakable='faq']"]),
  ];

  return (
    <main className="bg-white">
      <Seo
        title="Garage Door Repair FAQ"
        description="Answers to the most common garage door questions across Dallas-Fort Worth: broken springs, openers, off-track doors, maintenance, and our service areas. Call (817) 256-0122."
        canonicalPath="/faq"
        schema={schemas}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-gc-ink flex items-center justify-center">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-16 lg:py-20">
          <h1 className="font-product-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Garage Door Repair FAQ
          </h1>
          <p className="font-product-sans text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Straight answers to {ALL_FAQS.length} of the questions we hear most about garage door
            repair, springs, openers, and service across the Dallas-Fort Worth metroplex.
          </p>
          <Button asChild variant="primary" size="cta">
            <a href="tel:8172560122">
              <Phone />
              Call (817) 256-0122
            </a>
          </Button>
        </div>
      </section>

      {/* Jump links */}
      <section className="border-b border-gc-hair bg-gc-gray-100 px-4 py-8 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-product-sans font-black text-lg uppercase text-gc-ink mb-4 text-center">
            Jump to a Topic
          </h2>
          <nav aria-label="FAQ topics" className="flex flex-wrap justify-center gap-2">
            {GROUPS.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="inline-flex min-h-11 items-center rounded-full border border-gc-gray-300 bg-white px-4 py-2 font-product-sans text-sm text-gc-ink transition-all outline-none hover:border-gc-yellow hover:shadow-sm focus-visible:ring-2 focus-visible:ring-gc-yellow focus-visible:ring-offset-2"
              >
                {group.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Grouped FAQs */}
      <div className="px-4 py-12 sm:px-6 md:px-10 lg:px-16 lg:py-16 xl:px-24">
        <div className="container mx-auto flex max-w-5xl flex-col gap-12">
          {GROUPS.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-24">
              <div className="mb-6 flex flex-col gap-1 border-b-2 border-gc-ink pb-3 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="font-product-sans text-2xl font-black uppercase leading-tight text-gc-ink md:text-3xl">
                  {group.label}
                </h2>
                <Link
                  to={group.href}
                  className="inline-flex min-h-11 items-center font-product-sans text-sm font-bold uppercase text-gc-ink transition-colors hover:text-gc-yellow"
                >
                  View page
                </Link>
              </div>
              <FAQAccordion faqs={group.faqs} />
            </section>
          ))}
        </div>
      </div>

      {/* Still have questions */}
      <section className="bg-gc-gray-100 px-4 py-12 text-center sm:px-6 md:px-10 lg:px-16 lg:py-16 xl:px-24">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-product-sans text-2xl font-black text-gc-ink md:text-3xl">
            Still have a question?
          </h2>
          <p className="mt-3 font-product-sans text-lg text-gc-ink">
            Call us any time at{" "}
            <a href="tel:8172560122" className="font-black underline transition-colors hover:text-gc-yellow">
              (817) 256-0122
            </a>{" "}
            or read{" "}
            <Link to="/reviews" className="font-black underline transition-colors hover:text-gc-yellow">
              what our customers say
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

export default Faq;
