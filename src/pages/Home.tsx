import { HeroSection } from "../components/HeroSection";
import { HomeTestimonials } from "../components/sections/HomeTestimonials";
import { GarageDoorRepair } from "../components/GarageDoorRepair";
import { GarageCowboyStoryWhySection } from "../components/GarageCowboyStoryWhySection";
import { FAQSection } from "../components/FAQSection";
import { ServiceAreasSection } from "../components/ServiceAreasSection";
import { Seo } from "../components/seo/Seo";
import { buildBaseGraph, createFAQSchema } from "../seo/schemas";
import { faqData } from "../components/FAQSection";

export function Home() {
  const baseGraph = buildBaseGraph();
  const faqSchema = createFAQSchema(faqData);

  return (
    <>
      <Seo
        title="Garage Cowboy - 24/7 Garage Door Repair in DFW"
        description="Professional garage door repair & installation in Dallas-Fort Worth. Same-day service, expert technicians. Call (817) 256-0122 now!"
        canonicalPath="/"
        schema={[baseGraph, faqSchema]}
      />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Customer Testimonials */}
      <div className="py-12 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-28">
        <HomeTestimonials />
      </div>

      {/* Garage Door Repair Services */}
      <GarageDoorRepair />
      
      {/* Garage Cowboy Story & Why Section */}
      <div className="py-12 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-28">
        <GarageCowboyStoryWhySection />
      </div>
      
      {/* FAQ */}
      <FAQSection />
      
      {/* Service Areas (Major Hubs) */}
      <ServiceAreasSection />
    </>
  );
}

