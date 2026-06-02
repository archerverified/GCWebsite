import { Link } from "react-router-dom";
import { Button } from "../ui/button";

/**
 * Sticky mobile call bar (hidden >= md).
 *
 * Persistent primary actions so tap-to-call is always one tap away on phones.
 * Reuses the existing tel: target and /contact route — no new links.
 * - safe-area aware (env(safe-area-inset-bottom) for notched devices)
 * - reserves the bottom-right corner so it never overlaps the floating
 *   LeadConnector chat launcher (fixed bottom:20px right:20px, ~58px wide)
 */
export function StickyCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      role="region"
      aria-label="Quick contact"
    >
      {/* pr-20 (5rem) keeps the bar clear of the LeadConnector launcher corner */}
      <div className="flex items-stretch gap-2 border-t-2 border-gc-ink bg-gc-surface px-3 py-2 pr-20 shadow-[0_-2px_12px_rgba(0,0,0,0.15)]">
        <Button
          asChild
          variant="primary"
          size="cta"
          className="min-w-0 flex-1 px-1.5 text-sm sm:px-4 sm:text-base"
        >
          <a href="tel:8172560122" aria-label="Call Garage Cowboy at 817-256-0122">
            <span className="truncate">Call (817) 256-0122</span>
          </a>
        </Button>
        <Button
          asChild
          variant="ink"
          size="cta"
          className="min-w-0 shrink-0 basis-[6.5rem] px-1.5 text-sm sm:basis-auto sm:px-4 sm:text-base"
        >
          <Link to="/contact" aria-label="Request a free quote">
            <span className="truncate">Free Quote</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
