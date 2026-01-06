import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "../../types/content";

// #region agent log
fetch('http://127.0.0.1:7244/ingest/23ab62f1-5c38-48eb-b223-f0625384f7d1',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/ui/accordion.tsx:module',message:'Accordion module loaded',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'netlify-fix',hypothesisId:'H1'})}).catch(()=>{});
// #endregion

interface AccordionProps {
  faqs: FAQ[];
  title?: string;
  showHeader?: boolean;
}

/**
 * Reusable Accordion component for FAQs
 * Accepts dynamic FAQ content from JSON data
 */
export function Accordion({ faqs, title = "Frequently Asked Questions", showHeader = true }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/23ab62f1-5c38-48eb-b223-f0625384f7d1',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/ui/accordion.tsx:Accordion',message:'Accordion render start',data:{faqCount:faqs?.length ?? 0,title,showHeader},timestamp:Date.now(),sessionId:'debug-session',runId:'netlify-fix',hypothesisId:'H1'})}).catch(()=>{});
  // #endregion

  const toggleFAQ = (index: number) => {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/23ab62f1-5c38-48eb-b223-f0625384f7d1',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/ui/accordion.tsx:toggleFAQ',message:'Toggle FAQ',data:{index,prevOpenIndex:openIndex},timestamp:Date.now(),sessionId:'debug-session',runId:'netlify-fix',hypothesisId:'H1'})}).catch(()=>{});
    // #endregion
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white py-12 lg:py-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 font-product-sans">
      <div className="container mx-auto max-w-5xl">
        {showHeader && (
          <div className="text-center mb-10">
            <h2 className="font-product-sans font-black text-3xl md:text-4xl lg:text-5xl text-black leading-tight">
              {title}
            </h2>
          </div>
        )}

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[rgba(230,230,230,0.5)] border-[2.5px] border-[#323232] rounded-[5px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 md:p-8 flex items-center justify-between hover:bg-[rgba(230,230,230,0.7)] transition-all text-left"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="font-product-sans font-black text-lg md:text-xl lg:text-2xl text-[#323232] leading-tight uppercase pr-4">
                  {faq.question}
                </h3>
                <div className="bg-[#eaeaea] border-4 border-[#323232] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <ChevronDown 
                    className={`w-5 h-5 text-[#f7bd15] transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>
              {openIndex === index && (
                <div 
                  id={`faq-answer-${index}`}
                  className="px-6 md:px-8 pb-6 md:pb-8"
                >
                  <p className="font-product-sans text-base md:text-lg text-[#323232] leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Accordion;
