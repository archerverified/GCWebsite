import { Link } from "react-router-dom";
import { Phone, Wrench } from "lucide-react";
import { ReadyToGetStartedCTA } from "../components/sections/ReadyToGetStartedCTA";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { useContent, ContentLoading, ContentError } from "../hooks/useContent";
import type { MarkdownContent } from "../types/content";
import { colors } from "../styles/design-tokens";
import { Accordion } from "../components/ui/accordion";
import { Seo } from "../components/seo/Seo";
import { createBreadcrumbSchema } from "../seo/schemas";

// List of service slugs for the hub grid
const SERVICE_SLUGS = [
  'broken-spring-repair',
  'opener-repair-installation', 
  'garage-door-off-track',
  'broken-cable-repair',
  'new-door-installation',
  'remote-repair-programming',
  'garage-door-roller-repair',
  'door-service-maintenance'
];

// Custom title mappings for slugs that need special formatting
const TITLE_OVERRIDES: Record<string, string> = {
  'garage-door-off-track': 'Garage Door Off-Track',
  'opener-repair-installation': 'Opener Repair & Installation',
  'remote-repair-programming': 'Remote Repair & Programming',
  'door-service-maintenance': 'Door Service & Maintenance'
};

export function Services() {
  const { data: content, loading, error } = useContent<MarkdownContent>("services");

  if (loading) return <ContentLoading />;
  if (error) return <ContentError message={error} />;
  if (!content) return <ContentError message="No content available" />;

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" }
  ]);

  return (
    <main className="bg-white">
      <Seo
        title="Garage Door Services in DFW - Repair & Installation"
        description="Complete garage door services including spring repair, opener installation, off-track repair, and new door installation. 24/7 emergency service available in Dallas-Fort Worth."
        canonicalPath="/services"
        schema={breadcrumbSchema}
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
          <div className="font-product-sans text-xl md:text-2xl text-white mb-8 opacity-90 prose prose-invert prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {content.intro}
            </ReactMarkdown>
          </div>
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

      {/* Services Grid Hub */}
      <section id="services" className="py-16 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-product-sans font-black text-3xl md:text-4xl text-[#323232] text-center mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {SERVICE_SLUGS.map((slug) => {
              // Use override if available, otherwise convert slug to title
              const title = TITLE_OVERRIDES[slug] || slug
                .replace(/-/g, ' ')
                .replace(/\b\w/g, c => c.toUpperCase());
              
              return (
                <Link 
                  key={slug}
                  to={`/services/${slug}`}
                  className="bg-white rounded-[15px] border-2 border-[#35363a] p-6 hover:shadow-lg transition-all hover:border-[#fec300] block text-center"
                >
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Wrench size={24} className="text-[#fec300]" />
                    <h3 className="font-product-sans font-bold text-lg text-[#323232]">
                      {title}
                    </h3>
                  </div>
                  <p className="font-product-sans text-sm text-[#666] mb-4">
                    Residential, Commercial, Emergency
                  </p>
                  <span className="block w-full text-center bg-[#fec300] rounded-[10px] py-2 font-product-sans font-bold text-sm text-[#222] uppercase hover:bg-[#f7bd15] transition-colors">
                    View Details
                  </span>
                </Link>
              );
            })}
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
        <Accordion faqs={content.faqs} title="Service FAQs" />
      )}

      {/* CTA Section */}
      <ReadyToGetStartedCTA 
        title="Need Garage Door Service?"
        subtitle="Our expert technicians are ready to help"
      />
    </main>
  );
}
