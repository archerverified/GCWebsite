import { Phone } from "lucide-react";
import { ReadyToGetStartedCTA } from "../components/sections/ReadyToGetStartedCTA";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { useContent, ContentLoading, ContentError } from "../hooks/useContent";
import type { MarkdownContent } from "../types/content";
import { Accordion } from "../components/ui/accordion";
import { Seo } from "../components/seo/Seo";
import { createBreadcrumbSchema } from "../seo/schemas";

export function AboutUs() {
  const { data: content, loading, error } = useContent<MarkdownContent>("about-us");

  if (loading) return <ContentLoading />;
  if (error) return <ContentError message={error} />;
  if (!content) return <ContentError message="No content available" />;

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about-us" }
  ]);

  return (
    <main className="bg-white">
      <Seo
        title="About Garage Cowboy - Your Trusted DFW Garage Door Experts"
        description="Learn about Garage Cowboy's commitment to quality garage door services in Dallas-Fort Worth. Family-owned, professional technicians, 24/7 availability."
        canonicalPath="/about-us"
        schema={breadcrumbSchema}
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
          <a 
            href="tel:8172560122"
            className="inline-flex items-center gap-3 bg-[#fec300] border-2 border-[#35363a] rounded-[20px] px-8 py-4 shadow-lg hover:shadow-xl transition-all hover:scale-105 mt-8"
          >
            <Phone size={24} className="text-[#222]" />
            <span className="font-product-sans font-black text-xl text-[#222] uppercase">
              Call Now
            </span>
          </a>
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

      {/* FAQs Section */}
      {content.faqs && content.faqs.length > 0 && (
        <Accordion faqs={content.faqs} title="Frequently Asked Questions" />
      )}

      {/* CTA Section */}
      <ReadyToGetStartedCTA ctaLabel="(817) 256-0122" />
    </main>
  );
}
