import { Link, useLocation } from "react-router-dom";
import imgLogo from "figma:asset/0c2b872f2c474c2f7c570ef0cd5e8697f4e13e90.png";
import { Seo } from "../components/seo/Seo";
import { BUSINESS_INFO } from "../seo/site";

/**
 * Google Ads conversion page. A successful booking on /free-quote navigates here
 * (AppointmentBookingSection redirects when source === "google-ads"); every other form
 * keeps its in-place success state. This page exists so the Ads conversion can fire on a
 * real URL, the way the Google Ads team's instructions expect: the GTM conversion tag for
 * AW-18399788005 is triggered by this page's path (History Change + Page View triggers).
 *
 * Same rules as /free-quote: BARE_ROUTES (no site chrome), noindex, absent from the
 * sitemap, but prerendered. Direct visits render fine; Ads counts "one conversion per
 * click", so a refresh or revisit does not inflate conversions.
 */

const PHONE_DISPLAY = "(817) 256-0122";
const PHONE_HREF = "tel:8172560122";

const NEXT_STEPS = [
  {
    stat: "Booked",
    label: "Your appointment is on our calendar",
  },
  {
    stat: "Email",
    label: "A confirmation is on its way to your inbox",
  },
  {
    stat: "We call",
    label: "A technician confirms your time window before arrival",
  },
];

export function FreeQuoteThankYou() {
  // Set by the booking form on redirect. A direct visit has no state; the copy
  // below works either way, so nothing here depends on it being present.
  const { state } = useLocation() as {
    state: { emailStatus?: string } | null;
  };
  const emailDelayed = state?.emailStatus === "delayed";

  return (
    <main className="min-h-screen bg-gc-surface font-product-sans">
      <Seo
        title="Appointment Scheduled | Free Garage Door Inspection"
        description="Your free garage door inspection in Dallas-Fort Worth is booked. We'll see you soon."
        canonicalPath="/free-quote/thank-you"
        noindex
      />

      {/* Header: identical to /free-quote. Logo + call, no links, no exits. */}
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

      {/* Confirmation hero: the success block's design, promoted to a full page. */}
      <section className="bg-gradient-to-b from-gc-yellow/15 to-gc-surface px-4 pt-12 pb-10 sm:px-6 lg:px-10 lg:pt-16">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="font-product-sans text-3xl font-black uppercase leading-tight text-gc-ink md:text-4xl">
            Appointment <span className="bg-gc-yellow px-2">Scheduled!</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg font-bold text-gc-ink">
            {emailDelayed
              ? "Your free inspection is booked. Email may be delayed, but your appointment is confirmed."
              : "Your free inspection is booked and a confirmation email is on its way."}
          </p>

          <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {NEXT_STEPS.map((s) => (
              <li
                key={s.stat}
                className="rounded-[var(--radius-gc-md)] border-2 border-gc-ink bg-white px-4 py-3 shadow-gc-faq"
              >
                <span className="block text-xl font-black uppercase text-gc-ink">
                  {s.stat}
                </span>
                <span className="mt-1 block text-sm leading-snug text-gc-ink">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Need anything before then: one action, call. */}
      <section className="border-y-2 border-gc-ink bg-white px-4 py-8 text-center sm:px-6 lg:px-10">
        <div className="container mx-auto max-w-3xl">
          <p className="text-base font-bold uppercase text-gc-ink">
            Need to change your appointment, or is your door an emergency?
          </p>
          <a
            href={PHONE_HREF}
            className="mt-4 inline-flex min-h-12 items-center justify-center rounded-[var(--radius-gc-md)] border-2 border-gc-ink bg-gc-yellow px-6 text-base font-black uppercase text-gc-ink shadow-gc-button transition-colors hover:bg-gc-ink hover:text-gc-yellow"
            aria-label={`Call ${BUSINESS_INFO.businessName} at ${PHONE_DISPLAY}`}
          >
            Call {PHONE_DISPLAY}
          </a>
          <p className="mt-3 text-sm font-bold text-gc-ink">
            Open 24 hours a day, 7 days a week
          </p>
        </div>
      </section>

      {/* Minimal footer, same shape as /free-quote. */}
      <footer className="px-4 py-8 text-center sm:px-6 lg:px-10">
        <p className="text-xs text-gc-ink-75">
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
    </main>
  );
}

export default FreeQuoteThankYou;
