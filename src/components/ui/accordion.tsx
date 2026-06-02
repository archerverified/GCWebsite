import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "../../types/content";
import { cn } from "./utils";

/**
 * Brand-styled FAQ accordion built on Radix (`@radix-ui/react-accordion`),
 * `type="single"` + `collapsible` (one panel open at a time, all can close).
 *
 * SEO: every answer must be present in the prerendered HTML even when its panel
 * is collapsed. Plain Radix UNMOUNTS closed content; `forceMount` keeps it
 * mounted but (because Radix's internal `isPresent` stays true) would render it
 * visible. So we force-mount AND hide collapsed panels with
 * `data-[state=closed]:hidden` — the answer text stays in the DOM but is not
 * displayed until its panel opens.
 */

interface FAQItemProps {
  value: string;
  question: string;
  answer: string;
}

function FAQItem({ value, question, answer }: FAQItemProps) {
  return (
    <AccordionPrimitive.Item
      value={value}
      className="overflow-hidden rounded-gc-card border-[2.5px] border-gc-ink bg-gc-well shadow-gc-faq"
    >
      {/* Radix Header renders the <h3>; the question lives in a <span> inside
          the trigger so we don't nest a second heading. */}
      <AccordionPrimitive.Header className="m-0">
        <AccordionPrimitive.Trigger
          className={cn(
            "group flex w-full items-center justify-between gap-4 p-6 text-left outline-none transition-colors md:p-8",
            "hover:bg-gc-well-hover focus-visible:bg-gc-well-hover",
          )}
        >
          <span className="font-product-sans text-lg font-black uppercase leading-tight text-gc-ink md:text-xl lg:text-2xl">
            {question}
          </span>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-4 border-gc-ink bg-gc-gray-100">
            <ChevronDown className="size-5 text-gc-yellow transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content
        forceMount
        className="px-6 pb-6 data-[state=closed]:hidden md:px-8 md:pb-8"
      >
        <p className="whitespace-pre-line font-product-sans text-base leading-relaxed text-gc-ink md:text-lg">
          {answer}
        </p>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}

/**
 * The single styled FAQ list (single source of truth). Renders just the
 * accordion — no section chrome — so it can be embedded under any heading.
 */
export function FAQAccordion({
  faqs,
  className,
}: {
  faqs: FAQ[];
  className?: string;
}) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      data-speakable="faq"
      className={cn("flex flex-col gap-4", className)}
    >
      {faqs.map((faq, index) => (
        <FAQItem
          key={index}
          value={`faq-${index}`}
          question={faq.question}
          answer={faq.answer}
        />
      ))}
    </AccordionPrimitive.Root>
  );
}

interface AccordionProps {
  faqs: FAQ[];
  title?: string;
  showHeader?: boolean;
}

/**
 * Section-level FAQ block used across pages: an optional centered heading plus
 * the shared {@link FAQAccordion}. Public API is unchanged from the previous
 * hand-rolled component so existing `<Accordion faqs=… title=… />` call sites
 * keep working.
 */
export function Accordion({
  faqs,
  title = "Frequently Asked Questions",
  showHeader = true,
}: AccordionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="w-full bg-white px-4 py-12 font-product-sans sm:px-6 md:px-10 lg:px-16 lg:py-16 xl:px-24">
      <div className="container mx-auto max-w-5xl">
        {showHeader && (
          <div className="mb-10 text-center">
            <h2 className="font-product-sans text-3xl font-black leading-tight text-black md:text-4xl lg:text-5xl">
              {title}
            </h2>
          </div>
        )}

        <FAQAccordion faqs={faqs} />
      </div>
    </section>
  );
}

export default Accordion;
