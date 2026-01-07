import { MapPin } from "lucide-react";

interface ServiceAreasGridProps {
  title: string;
  items: { name: string }[];
  linkMode?: "none" | "hubAnchor";
}

/**
 * Displays a grid of service area pills/chips.
 * Used on CityDetail pages to show "Also Serving" subcities.
 * 
 * linkMode:
 * - "hubAnchor" (default): Links to #service-areas anchor on same page
 * - "none": No links, just displays the city names
 */
export function ServiceAreasGrid({ 
  title, 
  items, 
  linkMode = "hubAnchor" 
}: ServiceAreasGridProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section 
      id="service-areas" 
      className="py-12 lg:py-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 bg-[#f5f5f5]"
    >
      <div className="container mx-auto max-w-6xl">
        <h2 className="font-product-sans font-black text-2xl md:text-3xl text-[#323232] text-center mb-8">
          {title}
        </h2>
        
        <div className="flex flex-wrap justify-center gap-3">
          {items.map((item, index) => {
            const content = (
              <>
                <MapPin size={14} className="text-[#fec300] flex-shrink-0" />
                <span className="font-product-sans text-sm text-[#323232]">
                  {item.name}
                </span>
              </>
            );

            if (linkMode === "hubAnchor") {
              return (
                <a
                  key={index}
                  href="#service-areas"
                  className="inline-flex items-center gap-2 bg-white border border-[#e0e0e0] rounded-full px-4 py-2 hover:border-[#fec300] hover:shadow-sm transition-all"
                >
                  {content}
                </a>
              );
            }

            return (
              <span
                key={index}
                className="inline-flex items-center gap-2 bg-white border border-[#e0e0e0] rounded-full px-4 py-2"
              >
                {content}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}


