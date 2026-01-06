import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { colors } from "../../styles/design-tokens";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110"
          style={{
            backgroundColor: colors.brand.yellowPrimary,
            border: `2px solid ${colors.brand.dark}`,
          }}
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} style={{ color: colors.brand.dark }} />
        </button>
      )}
    </>
  );
}

