import { Link } from "react-router-dom";
import imgEmergency from "figma:asset/96eaf4517d4bf6650d76b0ac09c0f6969f9475e6.png";
import imgLogo from "figma:asset/0c2b872f2c474c2f7c570ef0cd5e8697f4e13e90.png";
import { colors } from "../../styles/design-tokens";

export function Header() {
  return (
    <header className="w-full bg-white border-b-0 py-4 md:py-6 lg:py-8">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-start">
            <Link to="/">
              <img 
                src={imgLogo} 
                alt="Garage Cowboy Logo" 
                className="h-14 md:h-16 lg:h-20 w-auto object-contain"
              />
            </Link>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
            <div className="relative">
              <img 
                src={imgEmergency} 
                alt="24/7 Emergency Service" 
                className="h-16 lg:h-20 w-auto object-contain"
              />
            </div>
            <div className="text-center lg:text-left">
              <p className="font-product-sans text-base lg:text-xl mb-1 font-black">
                Call us at
              </p>
              <a 
                href="tel:8172560122" 
                className="font-product-sans font-black text-2xl lg:text-3xl transition-colors"
                style={{ color: colors.brand.black }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.brand.yellowPrimary}
                onMouseLeave={(e) => e.currentTarget.style.color = colors.brand.black}
              >
                (817) 256-0122
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

