import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { useContent, ContentLoading, ContentError } from "../hooks/useContent";
import type { MarkdownContent } from "../types/content";
import { Accordion } from "../components/ui/accordion";
import { Seo } from "../components/seo/Seo";
import { buildTexasItemList } from "../seo/schemas";
import { HUBS } from "../seo/areas";

// Filter out the DFW master hub for the city grid display
const cityHubs = HUBS.filter(h => h.slug !== "dfw");

export function Texas() {
  const { data: content, loading, error } = useContent<MarkdownContent>("texas");

  if (loading) return <ContentLoading />;
  if (error) return <ContentError message={error} />;
  if (!content) return <ContentError message="No content available" />;

  // Build ItemList schema for the hub cities
  const itemListSchema = buildTexasItemList(cityHubs);

  return (
    <main className="bg-white">
      <Seo
        title="Garage Door Services in Texas - Dallas-Fort Worth Metroplex"
        description="Professional garage door repair and installation services throughout the Dallas-Fort Worth metroplex. Same-day service in all major cities."
        canonicalPath="/texas"
        schema={itemListSchema}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Texas Service Areas", path: "/texas" }
        ]}
      />
      
      {/* Hero (markdown-first: title + intro) */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 bg-[#35363a]">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="font-product-sans font-black text-4xl md:text-5xl lg:text-6xl text-white mb-8">
            {content.title}
          </h1>
          <div className="prose prose-lg prose-invert max-w-3xl mx-auto font-product-sans">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {content.intro}
            </ReactMarkdown>
          </div>
        </div>
      </section>

      {/* Cities Grid Hub */}
      <section id="cities" className="py-16 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-product-sans font-black text-3xl md:text-4xl text-[#323232] text-center mb-12">
            Service Areas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cityHubs.map((hub) => (
              <Link 
                key={hub.slug}
                to={`/texas/${hub.slug}`}
                className="bg-white rounded-[15px] border-2 border-[#35363a] p-6 hover:shadow-lg transition-all hover:border-[#fec300] block text-center"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <MapPin size={24} className="text-[#fec300]" />
                  <h3 className="font-product-sans font-bold text-xl text-[#323232]">
                    {hub.name}
                  </h3>
                </div>
                <p className="font-product-sans text-sm text-[#666] mb-4">
                  Residential, Commercial, Emergency
                </p>
                <span className="block w-full text-center bg-[#fec300] rounded-[10px] py-2 font-product-sans font-bold text-sm text-[#222] uppercase hover:bg-[#f7bd15] transition-colors">
                  View Details
                </span>
              </Link>
            ))}
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
        <Accordion faqs={content.faqs} title="Texas Service Area FAQs" />
      )}
    </main>
  );
}
