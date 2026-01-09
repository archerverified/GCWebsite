import imgBackgroundTop from "figma:asset/1e540751c4a94b57d2d98c37fda165d4dbe79475.png";
import { ContactQuickActions } from "./ContactQuickActions";

export function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[660px] bg-cover bg-center border-2 border-black rounded-b-[8px]"
      style={{ backgroundImage: `url('${imgBackgroundTop}')` }}
      data-font-probe="hero"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-28 py-8 sm:py-12 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-product-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-white drop-shadow-lg mb-6 sm:mb-8">
            <span className="text-[#f7bd15]">Same-day Garage Door Repair</span>{" "}
            across <span className="text-white">DALLAS-FORT WORTH (DFW)</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>& ALL surrounding cities
          </h1>

          <div className="mb-8 sm:mb-12">
            <h2 className="font-product-sans font-black text-xl sm:text-2xl md:text-3xl text-white uppercase mb-4 sm:mb-6">
              CONTACT US TODAY
            </h2>

            <p className="font-product-sans font-black text-lg sm:text-xl md:text-2xl text-white mb-4">
              (817) 256-0122
            </p>

            <ContactQuickActions />
          </div>
        </div>
      </div>
    </section>
  );
}

