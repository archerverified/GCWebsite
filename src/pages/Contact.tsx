import { Link } from "react-router-dom";
import { AppointmentBookingSection } from "../components/AppointmentBookingSection";
import { ContactQuickActions } from "../components/ContactQuickActions";
import { Seo } from "../components/seo/Seo";

export function Contact() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <main className="bg-white">
      <Seo
        title="Contact Us - 24/7 Garage Door Repair DFW"
        description="Contact Garage Cowboy for fast garage door repair in Dallas-Fort Worth. Call (817) 256-0122, email us, or book a free inspection appointment online."
        canonicalPath="/contact"
        breadcrumbs={breadcrumbs}
      />

      {/* Header */}
      <section className="py-12 lg:py-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 bg-gradient-to-b from-[#FEC300]/10 to-white">
        <div className="container mx-auto max-w-5xl">
          <nav className="mb-6">
            <Link to="/" className="text-[#FEC300] hover:underline font-product-sans">
              ← Back to Home
            </Link>
          </nav>

          <h1 className="font-product-sans font-black text-3xl md:text-4xl lg:text-5xl text-[#323232] mb-4 uppercase">
            Contact Us for Garage Door Repair in DFW
          </h1>

          <ContactQuickActions showEmail />
        </div>
      </section>

      {/* Business Hours */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 pb-4">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-[#FEC300]/10 border-2 border-[#FEC300] rounded-[10px] p-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1">
              <h2 className="font-product-sans font-black text-xl md:text-2xl text-[#323232] uppercase mb-1">
                Business Hours
              </h2>
              <p className="font-product-sans text-lg text-[#323232]">
                Open <strong>24 hours a day, 7 days a week</strong> — including holidays and after-hours emergencies.
              </p>
            </div>
            <a
              href="tel:8172560122"
              className="inline-flex items-center gap-2 bg-[#fec300] border-2 border-[#35363a] rounded-[10px] px-6 py-3 hover:scale-105 transition-all whitespace-nowrap"
            >
              <span className="font-product-sans font-black text-lg text-[#222] uppercase">
                (817) 256-0122
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Booking Form (short version - no testimonials) */}
      <section className="py-10 lg:py-12 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="container mx-auto max-w-5xl">
          <AppointmentBookingSection includeTestimonials={false} />
        </div>
      </section>
    </main>
  );
}

export default Contact;

