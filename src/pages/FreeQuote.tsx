import { Link } from "react-router-dom";
import imgLogo from "figma:asset/0c2b872f2c474c2f7c570ef0cd5e8697f4e13e90.png";
import { AppointmentBookingSection } from "../components/AppointmentBookingSection";
import { Seo } from "../components/seo/Seo";
import { BUSINESS_INFO } from "../seo/site";

/**
 * Paid-traffic landing page (Google Ads).
 *
 * Renders WITHOUT site chrome: `/free-quote` is listed in MainLayout's BARE_ROUTES, so no
 * header, nav, footer, or site-wide sticky bar appears. That is deliberate — every nav
 * link is an exit on a click that was paid for. The only two actions here are call or book.
 *
 * Kept out of the sitemap and marked noindex so it never competes with /contact in organic
 * results, but it IS prerendered (see scripts/seo/all-routes.mjs) because Ads quality score
 * rewards fast loads. robots.txt is deliberately NOT used to block it: that would stop
 * Google's ad crawler from reviewing the page and can get ads disapproved.
 */

const PHONE_DISPLAY = "(817) 256-0122";
const PHONE_HREF = "tel:8172560122";

const PROOF_POINTS = [
  { stat: "24/7", label: "Emergency service, including holidays" },
  { stat: "Same-day", label: "Repairs across Dallas-Fort Worth" },
  { stat: "Free", label: "Inspection with every appointment" },
];

const TRUST_SIGNALS = [
  "Rated 5.0 from 24 reviews",
  "Licensed and insured",
  "Serving all of Dallas-Fort Worth",
  "Upfront pricing, no hidden fees",
];

export function FreeQuote() {
  return (
    <main className="min-h-screen bg-gc-surface font-product-sans">
      <Seo
        title="Free Garage Door Repair Quote in DFW"
        description="Book a free garage door inspection in Dallas-Fort Worth. Same-day service, 24/7 emergency repairs, licensed and insured. Call (817) 256-0122."
        canonicalPath="/free-quote"
        noindex
      />

      {/* Header: logo + call. No links anywhere, by design. */}
      <header className="border-b-2 border-gc-ink bg-white">
        <div className="container mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
          <img
            src={imgLogo}
            alt={`${BUSINESS_INFO.businessName} logo`}
            className="h-10 w-auto sm:h-12"
            width={160}
            height={48}
          />
          <a
            href={PHONE_HREF}
            className="rounded-[var(--radius-gc-md)] border-2 border-gc-ink bg-gc-yellow px-3 py-2 text-sm font-black uppercase text-gc-ink shadow-gc-faq transition-colors hover:bg-gc-ink hover:text-gc-yellow focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-gc-yellow sm:px-5 sm:text-base"
            aria-label={`Call ${BUSINESS_INFO.businessName} at ${PHONE_DISPLAY}`}
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-gc-yellow/15 to-gc-surface px-4 pt-10 pb-8 sm:px-6 lg:px-10 lg:pt-14">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-product-sans text-3xl font-black uppercase leading-tight text-gc-ink md:text-4xl lg:text-5xl">
            24/7 Garage Door Repair in{" "}
            <span className="bg-gc-yellow px-2">Dallas-Fort Worth</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-bold text-gc-ink sm:text-xl">
            Same-day service from licensed technicians. Book below and your
            inspection is free.
          </p>

          <ul className="mx-auto mt-7 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {PROOF_POINTS.map((p) => (
              <li
                key={p.stat}
                className="rounded-[var(--radius-gc-md)] border-2 border-gc-ink bg-white px-4 py-3 shadow-gc-faq"
              >
                <span className="block text-xl font-black uppercase text-gc-ink">
                  {p.stat}
                </span>
                <span className="mt-1 block text-sm leading-snug text-gc-ink">
                  {p.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The one thing this page exists for. */}
      <section className="px-4 pb-10 sm:px-6 lg:px-10">
        <div className="container mx-auto max-w-5xl">
          <AppointmentBookingSection
            includeTestimonials={false}
            source="google-ads"
          />
        </div>
      </section>

      {/* Trust band */}
      <section className="border-y-2 border-gc-ink bg-white px-4 py-8 sm:px-6 lg:px-10">
        <div className="container mx-auto max-w-5xl">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_SIGNALS.map((t) => (
              <li
                key={t}
                className="flex items-start gap-2 text-sm font-bold text-gc-ink"
              >
                <svg
                  className="mt-0.5 size-5 shrink-0 text-gc-ink"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Minimal footer. Terms + Privacy are REQUIRED here: the SMS consent text in the
          booking form references them, so they cannot be dropped from this page. */}
      <footer className="px-4 py-8 pb-24 text-center sm:px-6 lg:px-10 md:pb-8">
        <a
          href={PHONE_HREF}
          className="text-2xl font-black uppercase text-gc-ink underline decoration-gc-yellow decoration-4 underline-offset-4"
        >
          {PHONE_DISPLAY}
        </a>
        <p className="mt-2 text-sm font-bold text-gc-ink">
          Open 24 hours a day, 7 days a week
        </p>
        <p className="mt-5 text-xs text-gc-ink-75">
          &copy; {new Date().getFullYear()} {BUSINESS_INFO.legalName} DBA{" "}
          {BUSINESS_INFO.businessName}.{" "}
          <Link to="/terms" className="underline underline-offset-2">
            Terms of Service
          </Link>{" "}
          &middot;{" "}
          <Link to="/privacy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
        </p>
      </footer>

      {/* Landing-page-local sticky call bar. The site-wide StickyCallBar is deliberately
          NOT used: its second button points at /contact, which would leak the visitor
          straight off the page we paid to get them to. */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="border-t-2 border-gc-ink bg-gc-surface px-3 py-2 pr-20 shadow-[0_-2px_12px_rgba(0,0,0,0.15)]">
          <a
            href={PHONE_HREF}
            className="flex min-h-12 items-center justify-center rounded-[var(--radius-gc-md)] border-2 border-gc-ink bg-gc-yellow px-4 text-base font-black uppercase text-gc-ink"
            aria-label={`Call ${BUSINESS_INFO.businessName} at ${PHONE_DISPLAY}`}
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </main>
  );
}

export default FreeQuote;
