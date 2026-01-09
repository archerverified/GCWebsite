import { HeroSection } from "../components/HeroSection";
import { FormFiller } from "../components/FormFiller";
import { GarageDoorRepair } from "../components/GarageDoorRepair";
import { GarageCowboyStoryWhySection } from "../components/GarageCowboyStoryWhySection";
import { FAQSection } from "../components/FAQSection";
import { ServiceAreasSection } from "../components/ServiceAreasSection";
import { Seo } from "../components/seo/Seo";
import { buildBaseGraph } from "../seo/schemas";

export function Home() {
  return (
    <>
      <Seo
        title="Garage Cowboy - 24/7 Garage Door Repair in Dallas-Fort Worth"
        description="Professional garage door repair and installation services in Dallas-Fort Worth. Same-day service, expert technicians, competitive prices. Call (817) 256-0122 for immediate assistance."
        canonicalPath="/"
        schema={buildBaseGraph()}
      />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Form Filler (Contact Form + Testimonials) */}
      <div className="-mt-6 sm:-mt-8 lg:-mt-12 relative z-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-28">
        <FormFiller />
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

