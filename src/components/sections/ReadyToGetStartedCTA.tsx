import { Phone } from "lucide-react";
import { PAGE_X_PADDING, READY_CTA_WRAPPER } from "../../styles/layoutStyles";

interface ReadyToGetStartedCTAProps {
  /** Main heading text */
  title?: string;
  /** Subheading/description text */
  subtitle?: string;
  /** Button label text */
  ctaLabel?: string;
  /** Additional CSS classes for the outer wrapper */
  className?: string;
}

/**
 * Shared CTA Section Component
 * Used at the bottom of pages to encourage users to call
 * Styled with yellow background, grey border, and rounded corners
 */
export function ReadyToGetStartedCTA({
  title = "Ready to Get Started?",
  subtitle = "Contact us today for a free estimate",
  ctaLabel = "Call Now",
  className = "",
}: ReadyToGetStartedCTAProps) {
  return (
    <div className={`${READY_CTA_WRAPPER} ${className}`}>
      <section className={`py-16 lg:py-24 ${PAGE_X_PADDING} bg-[#fec300]`}>
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-product-sans font-black text-3xl md:text-4xl text-[#222] mb-4">
            {title}
          </h2>
          <p className="font-product-sans text-xl text-[#222] mb-8 opacity-80">
            {subtitle}
          </p>
          <a
            href="tel:8172560122"
            className="inline-flex items-center gap-3 bg-[#35363a] border-2 border-[#222] rounded-[20px] px-8 py-4 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Phone size={24} className="text-white" />
            <span className="font-product-sans font-black text-xl text-white uppercase">
              {ctaLabel}
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}

