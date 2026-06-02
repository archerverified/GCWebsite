import { Button } from "./ui/button";
import { FAQAccordion } from "./ui/accordion";
import faqData from "../data/faq.json";

// Home/site FAQ — single source lives in src/data/faq.json so the build-time
// AI endpoint generator (public/ai/faq.json) reuses the exact same data.
export { faqData };

export function FAQSection() {
  return (
    <section className="w-full bg-white lg:py-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 py-[7px] mx-[0px] my-[64px] font-product-sans" data-font-probe="faq">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-product-sans text-3xl md:text-4xl lg:text-5xl text-black leading-tight mb-4">
            Garage Door FAQs
          </h2>
          <h3 className="font-product-sans font-black text-3xl md:text-4xl lg:text-5xl text-black leading-tight mb-8">
            Expert Answers from Garage Cowboy
          </h3>

          <div className="max-w-4xl mx-auto">
            <p className="font-product-sans text-lg md:text-xl lg:text-2xl text-black uppercase leading-7 mb-4">
              <span>Garage doors are </span>
              <span className="font-product-sans font-black">one of the most-used systems</span>
              <span> in a home or commercial property, yet </span>
              <span className="font-product-sans font-black">many problems go unnoticed</span>
              <span> until something fails.</span>
            </p>
            <p className="font-product-sans text-lg md:text-xl lg:text-2xl text-black uppercase leading-7">
              <span>Below are </span>
              <span className="font-product-sans font-black">clear</span>
              <span>, </span>
              <span className="font-product-sans font-black">expert answers</span>
              <span> to the </span>
              <span className="font-product-sans font-black">most common</span>
              <span> garage door questions we hear across the entire state of texas.</span>
            </p>
          </div>
        </div>

        {/* FAQ Accordion — shared, single-open Radix component (answers stay in
            the DOM when collapsed for SEO) */}
        <FAQAccordion faqs={faqData} className="max-w-5xl mx-auto" />

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="font-product-sans font-black text-3xl md:text-4xl lg:text-5xl text-black uppercase mb-8">
            HAVE MORE QUESTIONS?
          </h3>
          <Button asChild variant="primary" size="cta">
            <a href="tel:8172560122">
              CALL US TODAY
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
