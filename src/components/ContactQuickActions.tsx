import { Mail, Phone, UserPlus } from "lucide-react";

interface ContactQuickActionsProps {
  className?: string;
  showEmail?: boolean;
}

export function ContactQuickActions({
  className,
  showEmail = false,
}: ContactQuickActionsProps) {
  return (
    <div
      className={
        className ??
        "flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
      }
    >
      <a
        href="/garage-cowboy.vcf"
        download="garage-cowboy.vcf"
        className="inline-flex items-center gap-2 sm:gap-3 bg-[#fec300] border-2 border-[#35363a] rounded-[10px] px-5 sm:px-8 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all hover:scale-105"
        aria-label="Add Garage Cowboy to contacts"
      >
        <UserPlus className="w-6 h-6 sm:w-7 sm:h-7 text-[#222]" />
        <span className="font-product-sans font-black text-base sm:text-lg md:text-xl text-[#222] uppercase">
          Add to Contacts
        </span>
      </a>

      <a
        href="tel:+18172560122"
        className="inline-flex items-center gap-2 sm:gap-3 bg-[#fec300] border-2 border-[#35363a] rounded-[10px] px-5 sm:px-8 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all hover:scale-105"
        aria-label="Call Garage Cowboy"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#222]" />
        <span className="font-product-sans font-black text-base sm:text-lg md:text-xl text-[#222] uppercase">
          Call Now
        </span>
      </a>

      {showEmail && (
        <a
          href="mailto:deno@garagecowboy.com"
          className="inline-flex items-center gap-2 sm:gap-3 bg-[#fec300] border-2 border-[#35363a] rounded-[10px] px-5 sm:px-8 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          aria-label="Email Garage Cowboy"
        >
          <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#222]" />
          <span className="font-product-sans font-black text-base sm:text-lg md:text-xl text-[#222] uppercase">
            Email Us
          </span>
        </a>
      )}
    </div>
  );
}

