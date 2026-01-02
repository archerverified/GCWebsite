import { Phone } from "lucide-react";
import imgBackgroundTop from "figma:asset/1e540751c4a94b57d2d98c37fda165d4dbe79475.png";
import imgContacts from "figma:asset/b8be1fd15140cd16a4057de1244424c380b3e121.png";

export function HeroSection() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/3b9dec33-55db-414b-9cbe-62f230d8aae6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'HeroSection.tsx:6',message:'HeroSection rendering',data:{imgBackgroundTop},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  return (
    <section 
      className="relative w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[660px] bg-cover bg-center border-2 border-black rounded-b-[8px]"
      style={{ backgroundImage: `url('${imgBackgroundTop}')` }}
      data-font-probe="hero"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-28 py-8 sm:py-12 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="font-product-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-white drop-shadow-lg mb-6 sm:mb-8">
            <span className="text-[#f7bd15]">Same-day Garage Door Repair</span>
            {" "}across{" "}
            <span className="text-white">DALLAS-FORT WORTH (DFW)</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>& ALL surrounding cities
          </h1>

          {/* Contact Us Today */}
          <div className="mb-8 sm:mb-12">
            <h2 className="font-product-sans font-black text-xl sm:text-2xl md:text-3xl text-white uppercase mb-4 sm:mb-6">
              CONTACT US TODAY
            </h2>
            
            {/* Phone Button */}
            <a 
              href="tel:8712560122"
              className="inline-flex items-center gap-2 sm:gap-3 bg-[#fec300] border-2 border-[#35363a] rounded-[10px] px-5 sm:px-8 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <img src={imgContacts} alt="" className="w-6 h-6 sm:w-[30px] sm:h-[30px]" />
              <span className="font-product-sans font-black text-lg sm:text-xl md:text-2xl text-[#222] uppercase">
                (871) 256-0122
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}