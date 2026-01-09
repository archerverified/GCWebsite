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
        title="Contact Garage Cowboy"
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
            CONTACT GARAGE COWBOY
          </h1>

          <p className="font-product-sans font-black text-xl md:text-2xl text-[#323232] mb-6">
            (817) 256-0122
          </p>

          <ContactQuickActions showEmail />
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

