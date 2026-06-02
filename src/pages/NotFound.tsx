import { Link } from "react-router-dom";
import { Home, Phone } from "lucide-react";
import { Seo } from "../components/seo/Seo";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <main className="bg-white min-h-[60vh] flex items-center justify-center px-[48px] md:px-[96px] lg:px-[192px] xl:px-[288px]">
      <Seo
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Contact Garage Cowboy for 24/7 garage door repair in Dallas-Fort Worth. Call (817) 256-0122."
        noindex={true}
      />
      <div className="text-center max-w-2xl mx-auto py-20">
        <div className="font-product-sans font-black text-[120px] md:text-[180px] text-[#fec300] leading-none mb-4">
          404
        </div>
        <h1 className="font-product-sans font-black text-3xl md:text-4xl text-[#323232] mb-4">
          Page Not Found
        </h1>
        <p className="font-product-sans text-lg text-[#666] mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="primary" size="cta">
            <Link to="/">
              <Home />
              Go Home
            </Link>
          </Button>
          <Button asChild variant="ink" size="cta">
            <a href="tel:8172560122">
              <Phone />
              Call Us
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}
