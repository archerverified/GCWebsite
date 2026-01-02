import { HeroSection } from "../components/HeroSection";
import { FormFiller } from "../components/FormFiller";
import { GarageDoorRepair } from "../components/GarageDoorRepair";
import { GarageCowboyStoryWhySection } from "../components/GarageCowboyStoryWhySection";
import { FAQSection } from "../components/FAQSection";
import { ServiceAreasSection } from "../components/ServiceAreasSection";

export function Home() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/3b9dec33-55db-414b-9cbe-62f230d8aae6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Home.tsx:9',message:'Home component rendering',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  return (
    <>
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

