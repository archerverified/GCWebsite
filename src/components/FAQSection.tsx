import { Button } from "./ui/button";
import { FAQAccordion } from "./ui/accordion";

export const faqData = [
  {
    question: "WHAT ARE YOUR BUSINESS HOURS?",
    answer: "Garage Cowboy is available 24 hours a day, 7 days a week. We offer same-day garage door repair and after-hours emergency service throughout the Dallas–Fort Worth area at no additional charge. Call (817) 256-0122 anytime."
  },
  {
    question: "HOW LONG DOES A GARAGE DOOR TYPICALLY LAST?",
    answer: "Most garage doors in North Texas last 15–30 years, depending on usage, climate exposure, door quality, and maintenance. Regular tune-ups and properly matched components can significantly extend lifespan."
  },
  {
    question: "HOW OFTEN SHOULD A GARAGE DOOR BE SERVICED?",
    answer: "For most residential doors, once per year is recommended. Heavily used doors or commercial systems may need more frequent service to maintain safe operation."
  },
  {
    question: "WHY IS MY GARAGE DOOR LOUD OR SHAKY?",
    answer: "Noise is commonly caused by worn rollers, dry hinges, loose hardware, misaligned tracks, or an aging opener. In many cases, a professional tune-up or roller upgrade can dramatically reduce noise."
  },
  {
    question: "IS IT SAFE TO USE A GARAGE DOOR THAT ISN'T WORKING PROPERLY?",
    answer: "No. If your door is crooked, jerky, unusually loud, or struggling to open, continued use can cause further damage or create a safety hazard. We recommend stopping use and scheduling professional service."
  }
];

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
