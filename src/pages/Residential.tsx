import { Phone } from "lucide-react";
import { ReadyToGetStartedCTA } from "../components/sections/ReadyToGetStartedCTA";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { useContent, ContentLoading, ContentError } from "../hooks/useContent";
import type { MarkdownContent } from "../types/content";
import { colors } from "../styles/design-tokens";
import { Accordion } from "../components/ui/accordion";
import { Seo } from "../components/seo/Seo";
import { createBreadcrumbSchema, createServiceSchema, createFAQSchema } from "../seo/schemas";

export function Residential() {
  const { data: content, loading, error } = useContent<MarkdownContent>("residential");

  if (loading) return <ContentLoading />;
  if (error) return <ContentError message={error} />;
  if (!content) return <ContentError message="No content available" />;

  // Create schemas for SEO
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Residential", url: "/residential" }
  ]);

  const serviceSchema = createServiceSchema(
    "Residential Garage Door Services",
    content.intro || "Professional residential garage door repair and installation in Dallas-Fort Worth. Spring repair, opener installation, new doors.",
    undefined
  );

  const schemas = [breadcrumbSchema, serviceSchema];
  
  // Add FAQ schema if FAQs exist
  if (content.faqs && content.faqs.length > 0) {
    schemas.push(createFAQSchema(content.faqs));
  }

  return (
    <main className="bg-white">
      <Seo
        title="Residential Garage Door Services in DFW"
        description="Professional residential garage door repair and installation in Dallas-Fort Worth. Spring repair, opener installation, new doors. Call (817) 256-0122."
        canonicalPath="/residential"
        schema={schemas}
      />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundColor: colors.brand.dark }}
      >
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-16">
          <h1 className="font-product-sans font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            {content.title}
          </h1>
          <a 
            href="tel:8172560122"
            className="inline-flex items-center gap-3 bg-[#fec300] border-2 border-[#35363a] rounded-[20px] px-8 py-4 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Phone size={24} className="text-[#222]" />
            <span className="font-product-sans font-black text-xl text-[#222] uppercase">
              Call Now
            </span>
          </a>
        </div>
      </section>

      {/* Main Content - Intro */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none font-product-sans text-[#323232] prose-headings:font-product-sans prose-headings:font-black prose-strong:font-bold prose-ul:list-disc prose-li:marker:text-[#fec300]">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {content.intro}
            </ReactMarkdown>
          </div>
        </div>
      </section>

      {/* Markdown Content Sections */}
      {content.sections && content.sections.length > 0 && (
        <section className="py-16 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 bg-[#f5f5f5]">
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
        <Accordion faqs={content.faqs} title="Residential FAQs" />
      )}

      {/* CTA Section */}
      <ReadyToGetStartedCTA 
        title="Need Residential Garage Door Service?"
        subtitle="Our expert technicians are ready to help"
      />
    </main>
  );
}
