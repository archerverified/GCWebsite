import { Link } from "react-router-dom";
import { Home, Phone } from "lucide-react";

export function NotFound() {
  return (
    <main className="bg-white min-h-[60vh] flex items-center justify-center px-[48px] md:px-[96px] lg:px-[192px] xl:px-[288px]">
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
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-3 bg-[#fec300] border-2 border-[#35363a] rounded-[20px] px-8 py-4 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Home size={24} className="text-[#222]" />
            <span className="font-product-sans font-black text-lg text-[#222] uppercase">
              Go Home
            </span>
          </Link>
          <a
            href="tel:8172560122"
            className="inline-flex items-center justify-center gap-3 bg-[#35363a] border-2 border-[#35363a] rounded-[20px] px-8 py-4 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Phone size={24} className="text-white" />
            <span className="font-product-sans font-black text-lg text-white uppercase">
              Call Us
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}
