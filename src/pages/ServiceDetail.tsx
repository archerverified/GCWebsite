import { useParams, Link } from "react-router-dom";
import { Phone, ArrowLeft } from "lucide-react";
import { ReadyToGetStartedCTA } from "../components/sections/ReadyToGetStartedCTA";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { useContent, ContentLoading, ContentError } from "../hooks/useContent";
import type { MarkdownContent } from "../types/content";
import { colors } from "../styles/design-tokens";
import { Accordion } from "../components/ui/accordion";
import { Seo } from "../components/seo/Seo";
import { createServiceSchema, createBreadcrumbSchema, createFAQSchema } from "../seo/schemas";

export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: content, loading, error } = useContent<MarkdownContent>(`services-${slug}`);

  if (loading) return <ContentLoading />;
  if (error) return <ContentError message={error} />;
  if (!content) return <ContentError message="Service not found" />;

  // Create schemas for this page
  const serviceSchema = createServiceSchema(
    content.title, 
    content.intro || content.description || `Professional ${content.title} services in Dallas-Fort Worth`,
    slug
  );
  
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: content.title, url: `/services/${slug}` }
  ]);

  const schemas = [serviceSchema, breadcrumbSchema];
  
  // Add FAQ schema if FAQs exist
  if (content.faqs && content.faqs.length > 0) {
    schemas.push(createFAQSchema(content.faqs));
  }

  return (
    <main className="bg-white">
      <Seo
        title={`${content.title} in DFW - Garage Cowboy`}
        description={content.intro || content.description || `Professional ${content.title} services in Dallas-Fort Worth. Expert technicians, same-day service. Call (817) 256-0122.`}
        canonicalPath={`/services/${slug}`}
        schema={schemas}
      />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundColor: colors.brand.dark }}
      >
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-16">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-white mb-6 hover:text-[#fec300] transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-product-sans font-bold uppercase">Back to Services</span>
          </Link>
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

      {/* Sections */}
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
        <Accordion 
          faqs={content.faqs} 
          title={`${content.title} FAQs`} 
        />
      )}

      {/* CTA Section */}
      <ReadyToGetStartedCTA 
        title={`Need ${content.title}?`}
        subtitle="Our expert technicians are ready to help"
      />
    </main>
  );
}

export default ServiceDetail;
