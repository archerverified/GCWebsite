import { useParams, Link } from "react-router-dom";
import { Phone, ArrowLeft } from "lucide-react";
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

  const schemas: object[] = [serviceSchema, breadcrumbSchema];
  
  // Add FAQ schema if FAQs exist
  if (content.faqs && content.faqs.length > 0) {
    schemas.push(createFAQSchema(content.faqs));
  }

  return (
    <main className="bg-white">
      <Seo
        title={content.metaTitle || content.title}
        description={content.intro || content.description || `Professional ${content.title} services in Dallas-Fort Worth. Expert technicians, same-day service. Call (817) 256-0122.`}
        canonicalPath={`/services/${slug}`}
        schema={schemas}
      />
      
      {/* Hero Section */}
      <section className="relative min-h-[400px] bg-gc-ink bg-cover bg-center flex items-center justify-center">
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-16">
          <Link
            to="/services"
            className="inline-flex min-h-11 items-center gap-2 py-2 text-white mb-4 rounded outline-none transition-colors hover:text-gc-yellow focus-visible:ring-2 focus-visible:ring-gc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-gc-ink"
          >
            <ArrowLeft size={20} aria-hidden="true" />
            <span className="font-product-sans font-bold uppercase">Back to Services</span>
          </Link>
          <h1 className="font-product-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            {content.title}
          </h1>
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
