import { Link } from "react-router-dom";
import imgLogo from "figma:asset/0c2b872f2c474c2f7c570ef0cd5e8697f4e13e90.png";
import { AppointmentBookingSection } from "../components/AppointmentBookingSection";
import { Seo } from "../components/seo/Seo";
import { BUSINESS_INFO } from "../seo/site";

/**
 * Bare quote-request page: the booking form and nothing else.
 *
 * Deliberately contains NO navigation, NO call-to-action buttons, NO sticky bar, and no
 * outbound links beyond the two required legal ones (see below). `/quote` is listed in
 * MainLayout's BARE_ROUTES so no site chrome renders at all. The single job of this page
 * is to present the form.
 *
 * The two links to /terms and /privacy CANNOT be removed. The SMS consent text the
 * customer agrees to explicitly references them, and A2P/10DLC carrier rules require the
 * consent disclosure to be reachable from the opt-in form. Dropping them would break the
 * compliance the consent checkbox exists to satisfy.
 *
 * Not to be confused with quote.garagecowboy.com, which is the separate "Build Your
 * Perfect Garage Door" configurator deployed from the repo's quote/ directory by the
 * gc-quote Vercel project (rootDirectory: "quote"). This page is unrelated to it.
 *
 * noindex, and kept out of the sitemap, so it does not compete with /contact or
 * /free-quote in organic results: all three carry substantially the same form.
 */
export function Quote() {
  return (
    <main className="min-h-screen bg-gc-surface font-product-sans">
      <Seo
        title="Request a Free Garage Door Quote"
        description="Request a free garage door repair quote in Dallas-Fort Worth. Tell us what you need and we will get back to you."
        canonicalPath="/quote"
        noindex
      />

      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Logo only. Intentionally not a link: this page has no way out by design. */}
        <div className="mb-7 flex justify-center">
          <img
            src={imgLogo}
            alt={`${BUSINESS_INFO.businessName} logo`}
            className="h-12 w-auto sm:h-14"
            width={190}
            height={56}
          />
        </div>

        <h1 className="mb-6 text-center font-product-sans text-2xl font-black uppercase leading-tight text-gc-ink sm:text-3xl">
          Request Your Free Quote
        </h1>

        {/* The entire point of the page. */}
        <AppointmentBookingSection includeTestimonials={false} source="quote-page" />

        {/* Legally required disclosure. See the note at the top of this file before
            removing anything here. */}
        <p className="mt-8 text-center text-xs text-gc-ink-75">
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
      </div>
    </main>
  );
}

export default Quote;
