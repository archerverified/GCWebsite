import { useState } from "react";
import { ChevronDown } from "lucide-react";
import imgHat from "figma:asset/cec67c9176b88456cc934d95fdc03002a1d8e2b9.png";

const whyWorkWithUs = [
  {
    title: "SAFETY, SECURITY & FREE GARAGE DOOR INSPECTIONS",
    body: "Every service call includes a complimentary 23 point inspection of your garage door system to identify safety risks, worn components, or potential failures. We check springs, cables, rollers, tracks, and safety features to ensure your door operates securely and reliably."
  },
  {
    title: "SAME-DAY GARAGE DOOR REPAIR & MAINTENANCE",
    body: "We offer same-day garage door repair and maintenance when available to minimize downtime and inconvenience. Our technicians arrive prepared to diagnose issues quickly and complete most repairs during the initial visit."
  },
  {
    title: "24/7 EMERGENCY GARAGE DOOR REPAIR",
    body: "Garage door emergencies can happen at any time. We provide after-hours and emergency garage door repair across the DFW area to secure and repair doors that are stuck open, off track, or unsafe—at no additional charge."
  },
  {
    title: "COMPETITIVE & TRANSPARENT PRICING",
    body: "We provide clear, upfront pricing before any work begins. No hidden fees, no surprise charges—just honest recommendations and fair pricing based on the work your garage door actually needs."
  },
  {
    title: "GUARANTEED QUALITY & DURABILITY",
    body: "We use high-quality, manufacturer-approved parts and proven repair methods to ensure long-lasting results. Every repair and installation is completed with durability and reliability in mind."
  },
  {
    title: "EXPERT GARAGE DOOR SPECIALISTS",
    body: "Our technicians are trained specifically in garage door repair, installation, and maintenance. From broken springs to full door replacements, your system is handled by specialists—not general contractors."
  },
  {
    title: "CUSTOMER SATISFACTION PROMISE",
    body: "We stand behind our work. If you’re not completely satisfied with the service provided, we’ll return and make it right—no questions asked. Our business is built on referrals and long-term trust."
  }
];

export function GarageCowboyStoryWhySection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter(i => i !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  return (
    <section className="w-full bg-white font-product-sans" data-font-probe="story">
      <div className="container mx-auto max-w-6xl px-4 lg:px-8">
      {/* Story Section */}
      <div className="relative bg-gradient-to-r from-[#f7bd15] to-[#f7bd15] rounded-tl-[20px] rounded-tr-[20px] border-[3px] border-[#303135]">
        {/* Header with hats */}
        <div className="bg-white rounded-tl-[20px] rounded-tr-[20px] border-b-[3px] border-black py-8 relative">
          {/* Left Hat */}
          <div className="absolute left-8 md:left-12 lg:left-16 top-1/2 -translate-y-1/2 w-24 md:w-32 lg:w-40">
            <img 
              src={imgHat} 
              alt="" 
              className="w-full h-auto"
            />
          </div>
          
          {/* Title */}
          <div className="text-center px-4">
            <h2 className="font-product-sans font-black text-2xl md:text-3xl lg:text-4xl text-[#323232] leading-tight">
              THE STORY OF
            </h2>
            <h3 
              className="text-[#323232] text-center font-product-sans font-black not-italic"
              style={{
                textShadow: "0 8px 2px rgba(0, 0, 0, 0.13), 0 4px 4px rgba(247, 189, 21, 0.75)",
                fontSize: "36px",
                fontWeight: 700,
                lineHeight: "42px"
              }}
            >
              GARAGE COWBOY
            </h3>
          </div>

          {/* Right Hat (flipped) */}
          <div className="absolute right-8 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 w-24 md:w-32 lg:w-40">
            <img 
              src={imgHat} 
              alt="" 
              className="w-full h-auto transform scale-x-[-1]"
            />
          </div>
        </div>

        {/* Story Content */}
        <div className="px-4 md:px-8 lg:px-16 py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="font-['Product_Sans'] text-lg md:text-xl lg:text-2xl text-black leading-7 space-y-6">
              <p>
                <span className="font-['Product_Sans'] font-black">Garage Cowboy</span>
                {` is a locally owned `}
                <span className="font-['Product_Sans'] font-black">garage door company</span>
                {` serving `}
                <span className="font-['Product_Sans'] font-black">Fort Worth</span>
                {` and the `}
                <span className="font-['Product_Sans'] font-black">greater Dallas–Fort Worth metroplex</span>
                {`. We specialize in `}
                <span className="font-['Product_Sans'] font-black">fast</span>
                {`, `}
                <span className="font-['Product_Sans'] font-black">dependable garage door repair</span>
                {`, `}
                <span className="font-['Product_Sans'] font-black">professional installations</span>
                {`, and `}
                <span className="font-['Product_Sans'] font-black">long-term maintenance</span>
                {` for both residential and commercial properties. Our goal is simple: `}
                <span className="font-['Product_Sans'] font-black">deliver quality work, honest pricing</span>
                {`, and `}
                <span className="font-['Product_Sans'] font-black">service you can rely on</span>.
              </p>

              <p>
                {`Our certified local technicians provide `}
                <span className="font-['Product_Sans'] font-black">same-day service</span>
                {` throughout DFW, using only `}
                <span className="font-['Product_Sans'] font-black">high-quality</span>
                {`, `}
                <span className="font-['Product_Sans'] font-black">manufacturer-approved parts</span>
                {` to keep your garage door operating `}
                <span className="font-['Product_Sans'] font-black">safely</span>
                {` and `}
                <span className="font-['Product_Sans'] font-black">smoothly</span>
                {`. From broken springs and off-track doors to complete system replacements, `}
                <span className="font-['Product_Sans'] font-black">we fix the problem right the first time</span>.
              </p>

              <p>
                {`Built as a 100% referral-based business, `}
                <span className="font-['Product_Sans'] font-black">Garage Cowboy stands behind every job we do</span>
                {`. If you're not completely satisfied, we'll come back and make it right, no questions asked. That's our `}
                <span className="font-['Product_Sans'] font-black">Texas-sized promise</span>.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-12">
              <p className="font-['Product_Sans'] font-black text-xl md:text-2xl text-[#323232] leading-7">
                Deno Borghi
              </p>
              <p className="font-['Product_Sans:Regular'] text-xl md:text-2xl text-[#323232] leading-7 font-[Product_Sans]">
                <span className="font-['Product_Sans'] font-black">President</span>, Garage Cowboy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Work With Us Section */}
      <div className="border-x-[3px] border-b-[3px] border-[#303135] pb-12 lg:pb-20">
        <div className="px-4 md:px-8 lg:px-16 py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="font-product-sans text-2xl md:text-3xl lg:text-4xl text-[#323232] leading-tight mb-2">
                WHY WORK WITH US?
              </h2>
              <p className="font-product-sans font-black text-lg md:text-xl lg:text-2xl text-[#323232]">
                QUALITY WORK, HONEST PRICING & RELIABLE SERVICES
              </p>
            </div>

            {/* List */}
            <div className="space-y-4">
              {whyWorkWithUs.map((item, index) => (
                <div key={index} className="space-y-2">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full bg-[rgba(230,230,230,0.5)] border-[2.5px] border-[#323232] rounded-[5px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] p-6 md:p-8 flex items-center justify-between hover:bg-[rgba(230,230,230,0.7)] transition-all group"
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <span 
                        className="font-product-sans font-black text-3xl md:text-4xl text-black"
                        style={{ textShadow: "0px 2px 2px #f7bd15" }}
                      >
                        {index + 1}.
                      </span>
                      <span className="font-product-sans font-black text-xl md:text-2xl lg:text-3xl text-[#323232] text-left leading-8">
                        {item.title}
                      </span>
                    </div>
                    <div className="bg-[#eaeaea] border-4 border-[#323232] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <ChevronDown 
                        className={`w-5 h-5 text-[#f7bd15] transition-transform ${
                          openItems.includes(index) ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>
                  {openItems.includes(index) && (
                    <div className="mt-2 px-4 md:px-8 lg:px-10 pb-4 text-left">
                      <p className="font-product-sans text-base md:text-lg text-[#323232] leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}