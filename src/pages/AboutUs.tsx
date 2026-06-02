import { Phone, Check } from "lucide-react";
import { ReadyToGetStartedCTA } from "../components/sections/ReadyToGetStartedCTA";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { useContent, ContentLoading, ContentError } from "../hooks/useContent";
import type { MarkdownContent } from "../types/content";
import { Accordion } from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { LazyImage } from "../components/ui/LazyImage";
import { Seo } from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  buildPersonSchema,
  buildAboutPageSchema,
} from "../seo/schemas";

// Last content review date — kept in sync between the visible "Updated" label
// and the AboutPage schema's dateModified for freshness signals.
const LAST_UPDATED_ISO = "2026-06-02";
const LAST_UPDATED_LABEL = "June 2, 2026";

// Truthful, owner-verified trust signals (no tenure overstatement).
const TRUST_SIGNALS = [
  "Licensed & Insured",
  "Locally Owned — Not a Franchise",
  "Serving DFW Since 2023",
  "5.0★ on Google (24 reviews)",
  "Warranties on All Products",
  "Certified Local Technicians",
  "24/7 Same-Day Service",
];

export function AboutUs() {
  const { data: content, loading, error } = useContent<MarkdownContent>("about-us");

  if (loading) return <ContentLoading />;
  if (error) return <ContentError message={error} />;
  if (!content) return <ContentError message="No content available" />;

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about-us" }
  ]);

  // AboutPage (freshness) + founder Person (E-E-A-T) + breadcrumb.
  const schema = [
    buildAboutPageSchema(LAST_UPDATED_ISO),
    buildPersonSchema(),
    breadcrumbSchema,
  ];

  return (
    <main className="bg-white">
      <Seo
        title="About Us - DFW Garage Door Experts"
        description="Meet Deno Borghi, President of Garage Cowboy — a locally owned, licensed & insured DFW garage door company serving Dallas–Fort Worth since 2023."
        canonicalPath="/about-us"
        schema={schema}
      />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 bg-[#35363a]/90 rounded-b-[20px] border-t-2 border-t-[#fec300] border-x-0 border-b-0">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="font-product-sans font-black text-4xl md:text-5xl lg:text-6xl text-white mb-8">
            {content.title || "About Garage Cowboy"}
          </h1>
          {content.intro && (
            <div className="prose prose-lg prose-invert max-w-3xl mx-auto font-product-sans">
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                {content.intro}
              </ReactMarkdown>
            </div>
          )}
          <Button asChild variant="primary" size="cta" className="mt-8">
            <a href="tel:8172560122">
              <Phone />
              Call Now
            </a>
          </Button>
        </div>
      </section>

      {/* Markdown Content Sections */}
      {content.sections && content.sections.length > 0 && (
        <section className="py-16 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
          <div className="container mx-auto max-w-6xl">
            {content.sections.map((section, index) => (
              <div key={index} className="mb-12 last:mb-0">
                <h2 className="font-product-sans font-black text-2xl md:text-3xl text-[#323232] mb-6">
                  {section.title}
                </h2>
                <div className="prose prose-lg max-w-none font-product-sans text-[#323232] prose-headings:font-product-sans prose-headings:font-black prose-strong:font-bold prose-ul:list-disc prose-li:marker:text-[#fec300]">
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                    {section.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Meet the Owner — founder section (E-E-A-T) */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 bg-[#35363a]/[0.03]">
        <div className="container mx-auto max-w-6xl">
          <div className="rounded-[20px] border-2 border-[#35363a] bg-white shadow-lg overflow-hidden">
            <div className="grid items-stretch lg:grid-cols-[minmax(0,40%)_1fr]">
              {/* Photo */}
              <div className="bg-[#35363a] border-b-2 lg:border-b-0 lg:border-r-2 border-[#35363a]">
                <LazyImage
                  src="/images/authors/deno-borghi.jpg"
                  alt="Deno Borghi, President and founder of Garage Cowboy"
                  className="w-full h-full min-h-[320px] lg:min-h-[480px]"
                  placeholderColor="#35363a"
                  objectFit="cover"
                />
              </div>

              {/* Bio */}
              <div className="p-8 md:p-10 lg:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-1 w-10 rounded-full bg-gc-yellow" aria-hidden="true" />
                  <span className="font-product-sans font-bold uppercase tracking-wider text-sm text-[#35363a]">
                    Meet the Owner
                  </span>
                </div>

                <h2 className="font-product-sans font-black text-3xl md:text-4xl text-[#323232] mb-1">
                  Deno Borghi
                </h2>
                <p className="font-product-sans font-bold text-lg text-[#35363a]/70 mb-6">
                  President &amp; Founder
                </p>

                <div className="space-y-5 font-product-sans text-lg leading-relaxed text-[#323232]">
                  <p>
                    When you call Garage Cowboy, you don&rsquo;t get a call center or a national
                    franchise. You get a locally owned company that Deno Borghi built on one
                    promise: treat every garage door like it&rsquo;s his own.
                  </p>
                  <p>
                    Deno founded Garage Cowboy in 2023 and grew it the hard way &mdash; 100% by
                    referral, one happy neighbor at a time. His certified local technicians live
                    and work right here in North Texas, so you get fast response times, honest
                    pricing, and a warranty on every product they install.
                  </p>
                  <p>
                    Licensed, insured, and available 24/7, Deno and his team have earned a
                    5.0-star rating across 24 Google reviews. That&rsquo;s the Texas-sized promise
                    behind every job: if it&rsquo;s not right, we&rsquo;ll make it right.
                  </p>
                </div>

                <ul className="mt-8 flex flex-wrap gap-2.5">
                  {TRUST_SIGNALS.map((signal) => (
                    <li
                      key={signal}
                      className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#35363a] bg-gc-yellow px-3.5 py-1.5 font-product-sans font-bold text-sm text-[#222]"
                    >
                      <Check size={15} strokeWidth={3} className="text-[#35363a]" aria-hidden="true" />
                      {signal}
                    </li>
                  ))}
                </ul>

                <p className="mt-8 text-sm font-product-sans text-[#35363a]/70">
                  Updated {LAST_UPDATED_LABEL}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      {content.faqs && content.faqs.length > 0 && (
        <Accordion faqs={content.faqs} title="Frequently Asked Questions" />
      )}

      {/* CTA Section */}
      <ReadyToGetStartedCTA ctaLabel="(817) 256-0122" />
    </main>
  );
}
