import { Link } from "react-router-dom";
import { ContactQuickActions } from "../components/ContactQuickActions";
import { Button } from "../components/ui/button";
import { Seo } from "../components/seo/Seo";

export function Contact() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <main className="bg-white pb-10 lg:pb-14">
      <Seo
        title="Contact Us - 24/7 Garage Door Repair DFW"
        description="Contact Garage Cowboy for fast garage door repair in Dallas-Fort Worth. Call (817) 256-0122, email us, or book a free inspection appointment online."
        canonicalPath="/contact"
        breadcrumbs={breadcrumbs}
      />

      {/* Header */}
      <section className="py-12 lg:py-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 bg-gradient-to-b from-gc-yellow/10 to-white">
        <div className="container mx-auto max-w-5xl">
          <nav className="mb-4">
            <Link
              to="/"
              className="inline-flex min-h-11 items-center py-2 font-product-sans text-gc-ink underline underline-offset-2 outline-none transition-colors hover:text-gc-yellow focus-visible:ring-2 focus-visible:ring-gc-yellow focus-visible:ring-offset-2 rounded"
            >
              ← Back to Home
            </Link>
          </nav>

          <h1 className="font-product-sans font-black text-3xl md:text-4xl lg:text-5xl text-gc-ink mb-4 uppercase">
            Contact Us for Garage Door Repair in DFW
          </h1>

          <ContactQuickActions showEmail />
        </div>
      </section>

      {/* Business Hours */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 pb-4">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gc-yellow/10 border-2 border-gc-yellow rounded-[10px] p-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <h2 className="font-product-sans font-black text-xl md:text-2xl text-gc-ink uppercase mb-1">
                Garage Door Service Hours
              </h2>
              <p className="font-product-sans text-lg text-gc-ink">
                Open <strong>24 hours a day, 7 days a week</strong>, including holidays and after-hours emergencies.
              </p>
            </div>
            <Button asChild variant="primary" size="cta" className="whitespace-nowrap">
              <a href="tel:8172560122">
                (817) 256-0122
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Business Address & Email */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 pb-4">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white border-2 border-gc-gray-200 rounded-[10px] p-6 flex flex-col sm:flex-row items-start gap-6">
            <div className="flex-1">
              <h3 className="font-product-sans font-black text-lg text-gc-ink uppercase mb-2">
                Our Location
              </h3>
              <address className="font-product-sans text-gc-ink not-italic leading-relaxed">
                801 W Vickery Blvd<br />
                Fort Worth, TX 76104
              </address>
            </div>
            <div className="flex-1">
              <h3 className="font-product-sans font-black text-lg text-gc-ink uppercase mb-2">
                Email Us
              </h3>
              <a
                href="mailto:deno@garagecowboy.com"
                className="inline-flex min-h-11 items-center font-product-sans text-gc-ink hover:text-gc-yellow transition-colors underline decoration-gc-yellow decoration-2 underline-offset-2"
              >
                deno@garagecowboy.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;

