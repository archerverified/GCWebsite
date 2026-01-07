import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

        {/* FAQ Accordion */}
        <div className="max-w-5xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <button
              key={index}
              onClick={() => toggleFAQ(index)}
              className="w-full bg-[rgba(230,230,230,0.5)] border-[2.5px] border-[#323232] rounded-[5px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] p-6 md:p-8 flex items-center justify-between hover:bg-[rgba(230,230,230,0.7)] transition-all group"
              style={{
                borderTopLeftRadius: index === 0 ? "5px" : "5px",
                borderTopRightRadius: index === 0 ? "5px" : "5px",
                borderBottomLeftRadius: index === faqData.length - 1 ? "5px" : "5px",
                borderBottomRightRadius: index === faqData.length - 1 ? "5px" : "5px"
              }}
            >
              <div className="flex-1 text-left pr-4">
                <h3 className="font-product-sans font-black text-xl md:text-2xl lg:text-3xl text-[#323232] leading-8 uppercase m-[0px]">
                  {faq.question}
                </h3>
                {openIndex === index && (
                  <p className="font-product-sans text-base md:text-lg lg:text-xl text-[#323232] mt-4 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
              <div className="bg-[#eaeaea] border-4 border-[#323232] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                <ChevronDown 
                  className={`w-5 h-5 text-[#f7bd15] transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="font-product-sans font-black text-3xl md:text-4xl lg:text-5xl text-black uppercase mb-8">
            HAVE MORE QUESTIONS?
          </h3>
          <a
            href="tel:8172560122"
            className="inline-flex items-center gap-3 bg-[#fec300] border-2 border-[#35363a] rounded-[10px] px-8 md:px-12 py-4 md:py-6 shadow-[0px_5px_5px_0px_rgba(0,0,0,0.25)] hover:shadow-xl transition-all hover:scale-105"
          >
            <span className="font-product-sans font-black text-2xl md:text-3xl lg:text-4xl text-[#222] uppercase leading-9">
              CALL US TODAY
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}