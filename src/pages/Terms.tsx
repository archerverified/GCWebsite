import { Link } from "react-router-dom";
import { Seo } from "../components/seo/Seo";

export function Terms() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Terms of Service", path: "/terms" }
  ];

  return (
    <main className="bg-white">
      <Seo
        title="Terms of Service"
        description="Terms of service for Garage Cowboy. Read about our service terms, warranty information, and policies for garage door repair and installation."
        canonicalPath="/terms"
        breadcrumbs={breadcrumbs}
      />

      {/* Header */}
      <section className="py-12 lg:py-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 bg-gradient-to-b from-gc-yellow/10 to-white">
        <div className="container mx-auto max-w-4xl">
          <nav className="mb-6">
            <Link
              to="/"
              className="inline-flex min-h-11 items-center py-2 font-product-sans text-gc-ink underline underline-offset-2 outline-none transition-colors hover:text-gc-yellow focus-visible:ring-2 focus-visible:ring-gc-yellow focus-visible:ring-offset-2 rounded"
            >
              ← Back to Home
            </Link>
          </nav>
          <h1 className="font-product-sans font-black text-3xl md:text-4xl lg:text-5xl text-gc-ink mb-4">
            Terms of Service
          </h1>
          <p className="font-product-sans text-gc-gray-600 text-lg">
            Last updated: July 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className="container mx-auto max-w-4xl prose prose-lg">
          <h2 className="font-product-sans font-bold text-2xl text-gc-ink mt-8 mb-4">
            1. Who We Are
          </h2>
          <p className="font-product-sans text-gc-gray-600 mb-6">
            This website and the services described on it are operated by Garage Cowboy LLC, doing
            business as ("DBA") Garage Cowboy. "Garage Cowboy" is the trade name (DBA) of Garage Cowboy
            LLC; both names refer to the same company. Throughout these Terms of Service, references to
            "Garage Cowboy," "we," "us," and "our" mean Garage Cowboy LLC DBA Garage Cowboy.
          </p>

          <h2 className="font-product-sans font-bold text-2xl text-gc-ink mt-8 mb-4">
            2. Acceptance of Terms
          </h2>
          <p className="font-product-sans text-gc-gray-600 mb-6">
            By accessing and using the Garage Cowboy website and services, you accept and agree to be bound
            by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
          </p>

          <h2 className="font-product-sans font-bold text-2xl text-gc-ink mt-8 mb-4">
            3. Services
          </h2>
          <p className="font-product-sans text-gc-gray-600 mb-6">
            Garage Cowboy provides professional garage door repair, installation, and maintenance services 
            in the Dallas-Fort Worth metropolitan area and surrounding cities. Our services include but are 
            not limited to:
          </p>
          <ul className="font-product-sans text-gc-gray-600 mb-6 list-disc pl-6 space-y-2">
            <li>Garage door spring repair and replacement</li>
            <li>Garage door opener installation and repair</li>
            <li>Cable repair and replacement</li>
            <li>Door off-track repair</li>
            <li>New garage door installation</li>
            <li>Routine maintenance and service</li>
            <li>Remote and keypad programming</li>
          </ul>

          <h2 className="font-product-sans font-bold text-2xl text-gc-ink mt-8 mb-4">
            4. Service Appointments
          </h2>
          <p className="font-product-sans text-gc-gray-600 mb-6">
            When you schedule an appointment through our website or by phone, you agree to:
          </p>
          <ul className="font-product-sans text-gc-gray-600 mb-6 list-disc pl-6 space-y-2">
            <li>Provide accurate contact and service location information</li>
            <li>Be available at the scheduled appointment time or provide 24-hour notice for cancellations</li>
            <li>Allow our technicians safe access to your property and garage door</li>
            <li>Inform us of any special circumstances or safety concerns</li>
          </ul>

          <h2 className="font-product-sans font-bold text-2xl text-gc-ink mt-8 mb-4">
            5. Pricing and Payment
          </h2>
          <p className="font-product-sans text-gc-gray-600 mb-6">
            We provide free inspections and estimates for all garage door services. Final pricing is 
            determined after our technician has assessed the work required. We accept various payment 
            methods including cash, credit cards, and checks. Payment is due upon completion of service 
            unless otherwise agreed.
          </p>

          <h2 className="font-product-sans font-bold text-2xl text-gc-ink mt-8 mb-4">
            6. Warranty
          </h2>
          <p className="font-product-sans text-gc-gray-600 mb-6">
            Garage Cowboy stands behind our work. We offer warranties on parts and labor as follows:
          </p>
          <ul className="font-product-sans text-gc-gray-600 mb-6 list-disc pl-6 space-y-2">
            <li>Parts: Manufacturer's warranty applies to all parts we install</li>
            <li>Labor: 90-day warranty on all labor performed</li>
            <li>New door installations: Extended warranty as specified in your installation agreement</li>
          </ul>
          <p className="font-product-sans text-gc-gray-600 mb-6">
            Warranty does not cover damage caused by misuse, accidents, natural disasters, or modifications 
            made by others after our service.
          </p>

          <h2 className="font-product-sans font-bold text-2xl text-gc-ink mt-8 mb-4">
            7. Limitation of Liability
          </h2>
          <p className="font-product-sans text-gc-gray-600 mb-6">
            To the maximum extent permitted by law, Garage Cowboy shall not be liable for any indirect, 
            incidental, special, consequential, or punitive damages, or any loss of profits or revenues, 
            whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
          </p>

          <h2 className="font-product-sans font-bold text-2xl text-gc-ink mt-8 mb-4">
            8. Website Use
          </h2>
          <p className="font-product-sans text-gc-gray-600 mb-6">
            You agree to use our website only for lawful purposes and in accordance with these Terms. 
            You agree not to:
          </p>
          <ul className="font-product-sans text-gc-gray-600 mb-6 list-disc pl-6 space-y-2">
            <li>Use the website in any way that violates any applicable law or regulation</li>
            <li>Attempt to gain unauthorized access to any part of the website</li>
            <li>Submit false or misleading information through our forms</li>
            <li>Interfere with the proper working of the website</li>
          </ul>

          <h2 className="font-product-sans font-bold text-2xl text-gc-ink mt-8 mb-4">
            9. Intellectual Property
          </h2>
          <p className="font-product-sans text-gc-gray-600 mb-6">
            All content on this website, including text, graphics, logos, images, and software, is the 
            property of Garage Cowboy or its content suppliers and is protected by intellectual property laws. 
            You may not reproduce, distribute, modify, or create derivative works from any content without 
            our express written permission.
          </p>

          <h2 className="font-product-sans font-bold text-2xl text-gc-ink mt-8 mb-4">
            10. Changes to Terms
          </h2>
          <p className="font-product-sans text-gc-gray-600 mb-6">
            We reserve the right to modify these Terms of Service at any time. Changes will be effective 
            immediately upon posting to this page. Your continued use of our website or services after any 
            changes constitutes acceptance of the new terms.
          </p>

          <h2 className="font-product-sans font-bold text-2xl text-gc-ink mt-8 mb-4">
            11. SMS / Text Messaging Terms
          </h2>

          <h3 className="font-product-sans font-bold text-lg text-gc-ink mt-6 mb-2">
            Opt-In &amp; Message Types
          </h3>
          <p className="font-product-sans text-gc-gray-600 mb-4">
            By opting in to receive SMS messages from Garage Cowboy LLC (DBA Garage Cowboy), you agree to receive text
            messages from Garage Cowboy LLC related to appointment reminders, appointment confirmations,
            service updates, customer care messages, promotional offers, discounts, and other relevant
            business communications.
          </p>

          <h3 className="font-product-sans font-bold text-lg text-gc-ink mt-6 mb-2">
            Message Frequency &amp; Rates
          </h3>
          <p className="font-product-sans text-gc-gray-600 mb-4">
            Message frequency may vary. Message and data rates may apply for any messages sent to you
            from us and to us from you. If you have questions about your text or data plan, contact your
            wireless provider.
          </p>

          <h3 className="font-product-sans font-bold text-lg text-gc-ink mt-6 mb-2">
            Opting Out
          </h3>
          <p className="font-product-sans text-gc-gray-600 mb-4">
            You can cancel the SMS service at any time. Just text STOP to (817) 256-0122. After you send
            STOP, we will send you an SMS message confirming that you have been unsubscribed. After this,
            you will no longer receive SMS messages from us. If you want to join again, simply sign up as
            you did the first time and we will start sending SMS messages to you again.
          </p>

          <h3 className="font-product-sans font-bold text-lg text-gc-ink mt-6 mb-2">
            Help &amp; Support
          </h3>
          <p className="font-product-sans text-gc-gray-600 mb-4">
            If you are experiencing issues with the messaging program, you can reply HELP for more
            assistance, or you can contact us directly at deno@garagecowboy.com or (817) 256-0122.
          </p>

          <h3 className="font-product-sans font-bold text-lg text-gc-ink mt-6 mb-2">
            Carrier Liability
          </h3>
          <p className="font-product-sans text-gc-gray-600 mb-4">
            Carriers are not liable for delayed or undelivered messages.
          </p>
          <p className="font-product-sans text-gc-gray-600 mb-6">
            If you have any questions regarding privacy, please review our{" "}
            <Link
              to="/privacy"
              className="text-gc-ink underline underline-offset-2 transition-colors hover:text-gc-yellow"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <h2 className="font-product-sans font-bold text-2xl text-gc-ink mt-8 mb-4">
            12. Contact Information
          </h2>
          <p className="font-product-sans text-gc-gray-600 mb-6">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="font-product-sans text-gc-gray-600 mb-6 bg-gray-50 p-6 rounded-lg">
            <p className="font-bold text-gc-ink">Garage Cowboy LLC DBA Garage Cowboy</p>
            <p>Email: <a href="mailto:deno@garagecowboy.com" className="text-gc-ink underline underline-offset-2 transition-colors hover:text-gc-yellow">deno@garagecowboy.com</a></p>
            <p>Phone: <a href="tel:+18172560122" className="text-gc-ink underline underline-offset-2 transition-colors hover:text-gc-yellow">(817) 256-0122</a></p>
          </div>

          <h2 className="font-product-sans font-bold text-2xl text-gc-ink mt-8 mb-4">
            13. Governing Law
          </h2>
          <p className="font-product-sans text-gc-gray-600 mb-6">
            These Terms of Service are governed by and construed in accordance with the laws of the State 
            of Texas, without regard to its conflict of law provisions. Any disputes arising from these 
            terms shall be resolved in the courts of Texas.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Terms;

