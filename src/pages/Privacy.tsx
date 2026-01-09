import { Link } from "react-router-dom";
import { Seo } from "../components/seo/Seo";

export function Privacy() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" }
  ];

  return (
    <main className="bg-white">
      <Seo
        title="Privacy Policy"
        description="Privacy policy for Garage Cowboy. Learn how we collect, use, and protect your personal information when you use our website and services."
        canonicalPath="/privacy"
        breadcrumbs={breadcrumbs}
      />

      {/* Header */}
      <section className="py-12 lg:py-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 bg-gradient-to-b from-[#FEC300]/10 to-white">
        <div className="container mx-auto max-w-4xl">
          <nav className="mb-6">
            <Link to="/" className="text-[#FEC300] hover:underline font-product-sans">
              ← Back to Home
            </Link>
          </nav>
          <h1 className="font-product-sans font-black text-3xl md:text-4xl lg:text-5xl text-[#323232] mb-4">
            Privacy Policy
          </h1>
          <p className="font-product-sans text-[#666] text-lg">
            Last updated: January 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="container mx-auto max-w-4xl prose prose-lg">
          <h2 className="font-product-sans font-bold text-2xl text-[#323232] mt-8 mb-4">
            1. Information We Collect
          </h2>
          <p className="font-product-sans text-[#666] mb-4">
            When you use our website or request our services, we may collect the following information:
          </p>
          <ul className="font-product-sans text-[#666] mb-6 list-disc pl-6 space-y-2">
            <li>Contact information (name, email address, phone number)</li>
            <li>Service address and zip code</li>
            <li>Information about your garage door service needs</li>
            <li>Appointment preferences (date, time)</li>
            <li>Messages or communications you send us</li>
          </ul>

          <h2 className="font-product-sans font-bold text-2xl text-[#323232] mt-8 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="font-product-sans text-[#666] mb-4">
            We use the information we collect to:
          </p>
          <ul className="font-product-sans text-[#666] mb-6 list-disc pl-6 space-y-2">
            <li>Provide and schedule garage door repair and installation services</li>
            <li>Communicate with you about your service appointments</li>
            <li>Send confirmation emails and reminders</li>
            <li>Respond to your inquiries and provide customer support</li>
            <li>Improve our website and services</li>
          </ul>

          <h2 className="font-product-sans font-bold text-2xl text-[#323232] mt-8 mb-4">
            3. Information Sharing
          </h2>
          <p className="font-product-sans text-[#666] mb-6">
            We do not sell, trade, or rent your personal information to third parties. We may share your 
            information with trusted service providers who assist us in operating our website and conducting 
            our business, such as email service providers and scheduling tools. These parties are obligated 
            to keep your information confidential.
          </p>

          <h2 className="font-product-sans font-bold text-2xl text-[#323232] mt-8 mb-4">
            4. Cookies and Analytics
          </h2>
          <p className="font-product-sans text-[#666] mb-6">
            Our website may use cookies and similar technologies to enhance your browsing experience. 
            We use Google Analytics to understand how visitors interact with our website. This helps us 
            improve our services and user experience. You can control cookie preferences through your 
            browser settings.
          </p>

          <h2 className="font-product-sans font-bold text-2xl text-[#323232] mt-8 mb-4">
            5. Data Security
          </h2>
          <p className="font-product-sans text-[#666] mb-6">
            We implement appropriate security measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
            over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="font-product-sans font-bold text-2xl text-[#323232] mt-8 mb-4">
            6. Your Rights
          </h2>
          <p className="font-product-sans text-[#666] mb-4">
            You have the right to:
          </p>
          <ul className="font-product-sans text-[#666] mb-6 list-disc pl-6 space-y-2">
            <li>Request access to your personal information</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2 className="font-product-sans font-bold text-2xl text-[#323232] mt-8 mb-4">
            7. Contact Us
          </h2>
          <p className="font-product-sans text-[#666] mb-6">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="font-product-sans text-[#666] mb-6 bg-gray-50 p-6 rounded-lg">
            <p className="font-bold text-[#323232]">Garage Cowboy</p>
            <p>Email: <a href="mailto:deno@garagecowboy.com" className="text-[#FEC300] hover:underline">deno@garagecowboy.com</a></p>
            <p>Phone: <a href="tel:+18172560122" className="text-[#FEC300] hover:underline">(817) 256-0122</a></p>
          </div>

          <h2 className="font-product-sans font-bold text-2xl text-[#323232] mt-8 mb-4">
            8. Changes to This Policy
          </h2>
          <p className="font-product-sans text-[#666] mb-6">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page 
            with an updated "Last updated" date. We encourage you to review this policy periodically.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Privacy;

