import { useState, useEffect } from "react";
import svgPaths from "../../imports/svg-pry7uv8zg5";
import imgVerified from "figma:asset/52e672056319f396f2b1bf45a03eee134d6b47d8.png";
import { testimonials } from "../../data/testimonials";

export function HomeTestimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-white border-2 border-gc-ink rounded-[var(--radius-gc-lg)] font-product-sans uppercase">
      <div className="py-8 lg:py-12 px-4 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1.25px] w-20 md:w-40 lg:w-80 bg-gc-gray-500" />
            <img src={imgVerified} alt="Verified" className="w-8 h-8" />
            <div className="h-[1.25px] w-20 md:w-40 lg:w-80 bg-gc-gray-500" />
          </div>
          <h2 className="font-product-sans text-xl md:text-2xl text-gc-ink mb-1 uppercase">
            TAKE IT FROM OUR
          </h2>
          <h3 className="font-product-sans text-xl md:text-2xl text-gc-ink font-black uppercase">
            VALUED CUSTOMERS
          </h3>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <p className="font-product-sans font-bold text-lg md:text-xl text-black mb-3 italic">
              "{testimonials[currentSlide].quote}"
            </p>
            <p className="font-product-sans text-base md:text-lg text-black">
              <span className="text-sm">--</span> {testimonials[currentSlide].author}
            </p>
          </div>

          <div className="overflow-hidden min-h-[100px] mb-6">
            <div className="text-center">
              <p className="font-product-sans italic text-base md:text-lg lg:text-xl text-black leading-relaxed">
                "{testimonials[currentSlide].fullReview}"
              </p>
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-gc-ink outline-none transition-colors hover:text-gc-yellow focus-visible:ring-2 focus-visible:ring-gc-yellow focus-visible:ring-offset-2"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 25 25" aria-hidden="true">
              <path d={svgPaths.p63ffa80} />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-center gap-1 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="flex h-11 w-7 items-center justify-center rounded outline-none focus-visible:ring-2 focus-visible:ring-gc-yellow"
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === currentSlide ? "true" : undefined}
            >
              <span
                className={`block h-2.5 w-2.5 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-gc-ink"
                    : "bg-gc-ink opacity-20 hover:opacity-50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
