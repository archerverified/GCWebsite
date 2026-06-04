import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import svgPaths from "../../imports/svg-4h36s9ufjv";
import imgGoogle from "figma:asset/43868bc8eeea26f5e93f178b6ba8e3677c4213e1.png";
import imgFacebook from "figma:asset/8dbe5f86efa1469441d188b9e45cc6558331091f.png";
import imgYelp from "figma:asset/9397697363694d03af296d09c2d018d15b0d2911.png";
import imgGoogleMaps from "figma:asset/9b3ea44960a30e76204c97c302b0f370311844da.png";
import { MobileMenuDropdown } from "./nav/MobileMenuDropdown";
import { SERVICES_ITEMS, TEXAS_ITEMS } from "./nav/navConfig";

export function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const closeMenu = () => {
    setActiveDropdown(null);
  };

  // Check if current path starts with the given path (for dropdown parent highlighting)
  const isPathActive = (path: string) => location.pathname.startsWith(path);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-product-sans font-bold text-base uppercase whitespace-nowrap transition-colors rounded outline-none focus-visible:ring-2 focus-visible:ring-gc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-gc-ink ${
      isActive ? "text-gc-yellow" : "text-white hover:text-gc-yellow"
    }`;

  return (
    <nav
      className="w-full h-16 lg:h-[118px] relative bg-gc-ink"
      data-font-probe="nav"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 h-full">
        <div className="h-full relative flex items-center justify-between gap-4 lg:gap-6">

          {/* Mobile Menu - Absolutely Centered */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden z-20">
            <MobileMenuDropdown />
          </div>

          {/* Desktop Navigation (takes available width, centered within) */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-3 xl:gap-5 font-product-sans min-w-0" role="menubar">
            <NavLink to="/" className={navLinkClass} end aria-label="Go to Home page">
              Home
            </NavLink>
            <NavLink to="/about-us" className={navLinkClass} aria-label="Go to About Us page">
              About Us
            </NavLink>
            
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("services")}
                className={`font-product-sans font-bold text-base uppercase whitespace-nowrap transition-colors flex items-center gap-2 rounded outline-none focus-visible:ring-2 focus-visible:ring-gc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-gc-ink ${
                  isPathActive("/services") ? "text-gc-yellow" : "text-white hover:text-gc-yellow"
                }`}
                aria-expanded={activeDropdown === "services"}
                aria-haspopup="true"
                aria-label="Services menu"
              >
                Services
                <svg className="w-4 h-3" viewBox="0 0 18 10.2106" fill="none" aria-hidden="true">
                  <path d={svgPaths.p82c3080} className="fill-gc-yellow" />
                </svg>
              </button>
              {activeDropdown === "services" && (
                <div
                  className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-[250px] z-50 animate-gc-dropdown"
                  role="menu"
                  aria-label="Services submenu"
                >
                  {SERVICES_ITEMS.map((service, idx) => (
                    <Link
                      key={idx}
                      to={service.to}
                      onClick={closeMenu}
                      className={`block w-full text-left px-4 py-2.5 hover:bg-gc-gray-100 hover:text-gc-yellow transition-colors font-product-sans ${
                        idx === 0 ? "font-semibold border-b border-gc-gray-200" : ""
                      }`}
                      role="menuitem"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Texas Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("texas")}
                className={`font-product-sans font-bold text-base uppercase whitespace-nowrap transition-colors flex items-center gap-2 rounded outline-none focus-visible:ring-2 focus-visible:ring-gc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-gc-ink ${
                  isPathActive("/texas") ? "text-gc-yellow" : "text-white hover:text-gc-yellow"
                }`}
                aria-expanded={activeDropdown === "texas"}
                aria-haspopup="true"
                aria-label="Texas service areas menu"
              >
                Texas
                <svg className="w-4 h-3" viewBox="0 0 18 10.2106" fill="none" aria-hidden="true">
                  <path d={svgPaths.p82c3080} className="fill-gc-yellow" />
                </svg>
              </button>
              {activeDropdown === "texas" && (
                <div
                  className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-50 animate-gc-dropdown"
                  role="menu"
                  aria-label="Texas areas submenu"
                >
                  {TEXAS_ITEMS.map((city, idx) => (
                    <Link
                      key={idx}
                      to={city.to}
                      onClick={closeMenu}
                      className={`block w-full text-left px-4 py-2.5 hover:bg-gc-gray-100 hover:text-gc-yellow transition-colors font-product-sans ${
                        idx === 0 ? "font-semibold border-b border-gc-gray-200" : ""
                      }`}
                      role="menuitem"
                    >
                      {city.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/residential" className={navLinkClass} aria-label="Go to Residential services page">
              Residential
            </NavLink>
            <NavLink to="/commercial" className={navLinkClass} aria-label="Go to Commercial services page">
              Commercial
            </NavLink>
            <NavLink to="/blog" className={navLinkClass} aria-label="Go to Blog page">
              Blog
            </NavLink>
            <NavLink to="/contact" className={navLinkClass} aria-label="Go to Contact page">
              Contact
            </NavLink>
          </div>

          {/* Right side (social + CTA) */}
          <div className="flex items-center justify-end h-full ml-auto lg:ml-0 shrink-0 gap-3 xl:gap-5">
            {/* Social Icons - Desktop only */}
            <div className="hidden min-[1800px]:flex items-center gap-4 px-2" aria-label="Social media links">
              <a
                href="https://www.google.com/search?q=garage+cowboy+fort+worth&sca_esv=cea07bd29ebaa7bd&ei=giRYafyPA4eWvr0P4rHXmAk&ved=0ahUKEwj82MWY0-2RAxUHi68BHeLYFZMQ4dUDCBE&uact=5&oq=garage+cowboy+fort+worth&gs_lp=Egxnd3Mtd2l6LXNlcnAiGGdhcmFnZSBjb3dib3kgZm9ydCB3b3J0aDIFECEYoAEyBRAhGKABSMwYUOEBWKUXcAN4AZABAJgBYqAB5giqAQIxM7gBA8gBAPgBAZgCEKACkQnCAgoQABiwAxjWBBhHwgINEAAYsAMY1gQYRxjJA8ICDhAAGIAEGLADGJIDGIoFwgIKEAAYgAQYQxiKBcICBRAAGIAEwgIGEAAYFhgewgIFEAAY7wXCAggQABiABBiiBMICCxAAGIAEGIYDGIoFmAMAiAYBkAYJkgcEMTUuMaAHw0eyBwQxMi4xuAeICcIHBjIuMTMuMcgHHYAIAA&sclient=gws-wiz-serp&lqi=ChhnYXJhZ2UgY293Ym95IGZvcnQgd29ydGhIm9TVhM2zgIAIWiYQABABGAAYARgCGAMiGGdhcmFnZSBjb3dib3kgZm9ydCB3b3J0aJIBFGdhcmFnZV9kb29yX3N1cHBsaWVymgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDJ0RmVsb3dTakZSYkRsTlkwZG9XbE5YVWpKU2VsWk9UVmQ0U0dReVl4QUL6AQUIkwMQPQ"
                className="hover:opacity-80 transition-opacity"
                aria-label="Visit our Google reviews"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={imgGoogle} alt="Google reviews" className="w-10 h-10 object-contain" loading="lazy" />
              </a>
              <a
                href="https://share.google/cW1X5hiNDh12RmEl9"
                className="hover:opacity-80 transition-opacity"
                aria-label="Find us on Google Maps"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={imgGoogleMaps} alt="Google Maps location" className="w-10 h-10 object-contain" loading="lazy" />
              </a>
              <a
                href="https://www.yelp.com/biz/garage-cowboy-fort-worth"
                className="hover:opacity-80 transition-opacity"
                aria-label="Visit our Yelp page"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={imgYelp} alt="Yelp reviews" className="w-10 h-10 object-contain" loading="lazy" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61577149727757"
                className="hover:opacity-80 transition-opacity"
                aria-label="Visit our Facebook page"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={imgFacebook} alt="Facebook page" className="w-10 h-10 object-contain" loading="lazy" />
              </a>
            </div>

            {/* Mobile: Icon-only phone button (below xl) */}
            <a
              href="tel:8172560122"
              className="xl:hidden flex items-center justify-center w-12 h-12 rounded-full hover:bg-gc-gray-100 transition-colors group"
              aria-label="Call 817-256-0122"
            >
              <Phone
                className="w-6 h-6 text-white group-hover:text-gc-yellow transition-colors"
                aria-hidden="true"
              />
            </a>

            {/* Desktop: Full CTA button (xl+) */}
            <a
              href="tel:8172560122"
              className="hidden xl:flex items-center gap-2 rounded-[var(--radius-gc-xl)] px-4 2xl:px-6 py-3 bg-gc-yellow border-2 border-gc-ink shadow-md hover:shadow-lg transition-all font-product-sans whitespace-nowrap shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-gc-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-gc-ink"
              aria-label="Call to schedule a free inspection at 817-256-0122"
            >
              <Phone size={22} className="text-gc-ink" aria-hidden="true" />
              <span className="font-product-sans font-black text-sm 2xl:text-base leading-none whitespace-nowrap text-gc-ink">
                SCHEDULE A FREE INSPECTION
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
