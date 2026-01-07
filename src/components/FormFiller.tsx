import { useState, FormEvent, useEffect } from "react";
import { toast } from "sonner";
import svgPaths from "../imports/svg-pry7uv8zg5";
import imgVerified from "figma:asset/52e672056319f396f2b1bf45a03eee134d6b47d8.png";

const testimonials = [
  {
    quote: "Great price, professional and courteous.",
    author: "T. Bradley",
    fullReview: "Deno and crew did a great job. They arrived on time and finished in a timely manner. Great price, professional and courteous. Would highly recommend his company."
  },
  {
    quote: "Fast, accurate, and extremely reasonable pricing.",
    author: "Yeon Young Kim",
    fullReview: "Our garage door was completely broken, and Deno responded very quickly. He handled everything promptly and professionally, and I am extremely satisfied. Excellent service at a very reasonable price."
  },
  {
    quote: "He almost totally redid both doors.",
    author: "Linda W.",
    fullReview: "Oh my goodness, this guy is AMAZING. I had all kinds of problems with both doors and he almost totally redid them. Very reasonably priced. I would totally recommend him."
  },
  {
    quote: "Arrived early, finished quickly, pricing couldn't be beat.",
    author: "Katrina M.",
    fullReview: "Deno was friendly and professional. He arrived early and finished quickly. His pricing couldn't be beat! Highly recommend!"
  },
  {
    quote: "Local, honest, and not a big franchise.",
    author: "Cliff C.",
    fullReview: "I was looking for a local garage door contractor to replace a broken spring. Came across Garage Cowboy and decided to give them a call. Don't let the lack of reviews fool you—Deno is local and not part of one of the big franchises."
  },
  {
    quote: "Best prices in town & comes out right away for emergencies.",
    author: "Dee",
    fullReview: "Garage Cowboy is the best for fixing garage repairs or replacing the garage door in general. He literally comes out right away for emergencies and has the best prices in town. Very kind and knowledgeable."
  },
  {
    quote: "Very knowledgeable, even with 25-year-old equipment.",
    author: "Anthony R. (Local Guide)",
    fullReview: "Deno was very knowledgeable about my garage door issue, even though my equipment was 25 years old. He offered multiple options and pricing. Definitely A1 in the garage business."
  },
  {
    quote: "Helped when a DIY project became too much.",
    author: "Eric S.",
    fullReview: "I thought I could handle a large roll-up door myself and quickly realized it was too much. Deno was extremely helpful and got everything installed quickly and affordably."
  }
];

export function FormFiller() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/3b9dec33-55db-414b-9cbe-62f230d8aae6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'FormFiller.tsx:50',message:'FormFiller component rendering',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'J'})}).catch(()=>{});
  // #endregion
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zipCode: "",
    message: "",
    preferredDate: "",
    preferredTime: ""
  });

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Thank you! We'll contact you within 24 hours.");
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      zipCode: "",
      message: "",
      preferredDate: "",
      preferredTime: ""
    });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-[#f7bd15] rounded-tl-[20px] rounded-tr-[20px] border-l-[3px] border-r-[3px] border-[#303135] relative font-product-sans" data-font-probe="form">
      {/* Header Banner */}
      <div className="bg-[rgba(255,255,255,0.5)] border-2 border-black rounded-tl-[16px] rounded-tr-[16px] py-4 lg:py-5">
        <p
          className="font-product-sans text-base md:text-lg lg:text-2xl text-center text-[#222] uppercase px-4 font-black"
          data-font-probe="cta-banner"
        >
          BOOK AN APPOINTMENT & GET A FREE INSPECTION TODAY
        </p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="px-4 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
          {/* Name & Email Column */}
          <div className="space-y-4">
            <div className="bg-[rgba(255,255,255,0.5)] border-2 border-[#303135] rounded-tl-[5px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]">
              <input
                type="text"
                placeholder="Name*"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-4 bg-transparent font-product-sans font-medium text-[13px] text-[rgba(48,49,53,0.75)] placeholder:text-[rgba(48,49,53,0.75)] focus:outline-none focus:ring-2 focus:ring-[#fec300]"
                required
              />
            </div>
            <div className="bg-[rgba(255,255,255,0.5)] border-2 border-[#303135] rounded-bl-[5px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]">
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-4 bg-transparent font-product-sans font-medium text-[13px] text-[rgba(48,49,53,0.75)] placeholder:text-[rgba(48,49,53,0.75)] focus:outline-none focus:ring-2 focus:ring-[#fec300]"
              />
            </div>
          </div>

          {/* Phone & Zip Column */}
          <div className="space-y-4">
            <div className="bg-[rgba(255,255,255,0.5)] border-2 border-[#303135] rounded-tr-[5px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]">
              <input
                type="tel"
                placeholder="Phone Number*"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-4 bg-transparent font-product-sans font-medium text-[13px] text-[rgba(48,49,53,0.75)] placeholder:text-[rgba(48,49,53,0.75)] focus:outline-none focus:ring-2 focus:ring-[#fec300]"
                required
              />
            </div>
            <div className="bg-[rgba(255,255,255,0.5)] border-2 border-[#303135] rounded-br-[5px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]">
              <input
                type="text"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                className="w-full px-4 py-4 bg-transparent font-product-sans font-medium text-[13px] text-[rgba(48,49,53,0.75)] placeholder:text-[rgba(48,49,53,0.75)] focus:outline-none focus:ring-2 focus:ring-[#fec300]"
              />
            </div>
          </div>

          {/* Date & Time Column */}
          <div className="space-y-4">
            <div className="bg-[rgba(255,255,255,0.5)] border-2 border-[#303135] rounded-[5px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]">
              <label htmlFor="preferredDate" className="sr-only">Preferred Date</label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                placeholder="Preferred Date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-4 py-4 bg-transparent font-product-sans font-medium text-[13px] text-[rgba(48,49,53,0.75)] placeholder:text-[rgba(48,49,53,0.75)] focus:outline-none focus:ring-2 focus:ring-[#fec300]"
                aria-label="Preferred Date"
              />
            </div>
            <div className="bg-[rgba(255,255,255,0.5)] border-2 border-[#303135] rounded-[5px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]">
              <label htmlFor="preferredTime" className="sr-only">Preferred Time</label>
              <input
                type="time"
                id="preferredTime"
                name="preferredTime"
                placeholder="Preferred Time"
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-4 py-4 bg-transparent font-product-sans font-medium text-[13px] text-[rgba(48,49,53,0.75)] placeholder:text-[rgba(48,49,53,0.75)] focus:outline-none focus:ring-2 focus:ring-[#fec300]"
                aria-label="Preferred Time"
              />
            </div>
          </div>

          {/* Message Column */}
          <div className="sm:col-span-1">
            <div className="bg-[rgba(255,255,255,0.5)] border-2 border-[#222] rounded-tr-[5px] rounded-br-[5px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] h-full">
              <textarea
                placeholder="Type your message..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full h-full px-4 py-4 bg-transparent font-product-sans text-[13px] text-[rgba(48,49,53,0.75)] placeholder:text-[rgba(48,49,53,0.75)] resize-none focus:outline-none focus:ring-2 focus:ring-[#fec300]"
              />
            </div>
          </div>

          {/* Submit Column */}
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              type="submit"
              className="w-full max-w-[208px] bg-[#fec300] border-2 border-[#35363a] rounded-[5px] px-8 py-4 shadow-[0px_2px_5px_0px_#535458] hover:shadow-lg transition-all hover:scale-105 font-product-sans"
            >
              <span className="font-product-sans font-black text-[13px] text-[#303135] uppercase">
                SUBMIT
              </span>
            </button>
          </div>
        </div>

        {/* Required note */}
        <p className="font-product-sans font-black text-[12px] text-[#FEC300] mt-4">
          *REQUIRED
        </p>
      </form>

      {/* Testimonials Section */}
      <div className="bg-white border-[2px] border-[#303135] mx-0 mb-0">
        <div className="py-8 lg:py-12 px-4 lg:px-8 border-b-2 border-black">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1.25px] w-20 md:w-40 lg:w-80 bg-[#8b8b92]" />
              <img src={imgVerified} alt="Verified" className="w-8 h-8" />
              <div className="h-[1.25px] w-20 md:w-40 lg:w-80 bg-[#8b8b92]" />
            </div>
            <h2 className="font-product-sans text-xl md:text-2xl text-[#323232] mb-1 uppercase">
              TAKE IT FROM OUR
            </h2>
            <h3 className="font-product-sans text-xl md:text-2xl text-[#323232] font-black uppercase">
              VALUED CUSTOMERS
            </h3>
          </div>

          {/* Testimonial Content */}
          <div className="relative max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <p className="font-['Product_Sans:Bold'] text-lg md:text-xl text-black mb-3 italic">
                "{testimonials[currentSlide].quote}"
              </p>
              <p className="font-['Product_Sans:Regular'] text-base md:text-lg text-black">
                <span className="text-sm">--</span> {testimonials[currentSlide].author}
              </p>
            </div>

            {/* Full Review */}
            <div className="overflow-hidden min-h-[100px] mb-6">
              <div className="text-center">
                <p className="font-['Product_Sans_Regular'] italic text-base md:text-lg lg:text-xl text-black leading-relaxed">
                  "{testimonials[currentSlide].fullReview}"
                </p>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[#ededed] hover:text-[#fec300] transition-colors opacity-90"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 25 25">
                <path d={svgPaths.p63ffa80} />
              </svg>
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-3 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-black"
                    : "bg-black opacity-20 hover:opacity-50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}