import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import svgPaths from "../../imports/svg-4h36s9ufjv";
import imgGoogle from "figma:asset/43868bc8eeea26f5e93f178b6ba8e3677c4213e1.png";
import imgFacebook from "figma:asset/8dbe5f86efa1469441d188b9e45cc6558331091f.png";
import imgYelp from "figma:asset/9397697363694d03af296d09c2d018d15b0d2911.png";
import imgGoogleMaps from "figma:asset/9b3ea44960a30e76204c97c302b0f370311844da.png";
import { colors } from "../../styles/design-tokens";

const servicesDropdown = [
  { name: "Broken Spring Repair", path: "/services/broken-spring-repair" },
  { name: "Opener Repair & Installation", path: "/services/opener-repair-installation" },
  { name: "Garage Door Off-Track", path: "/services/garage-door-off-track" },
  { name: "Broken Cable Repair", path: "/services/broken-cable-repair" },
  { name: "New Door Installation", path: "/services/new-door-installation" },
  { name: "Remote Repair & Programming", path: "/services/remote-repair-programming" },
  { name: "Garage Door Roller Repair", path: "/services/garage-door-roller-repair" },
  { name: "Door Service & Maintenance", path: "/services/door-service-maintenance" }
];

const texasDropdown = [
  { name: "Dallas", path: "/texas/dallas" },
  { name: "Fort Worth", path: "/texas/fort-worth" },
  { name: "Arlington", path: "/texas/arlington" },
  { name: "Plano", path: "/texas/plano" },
  { name: "Irving", path: "/texas/irving" },
  { name: "Garland", path: "/texas/garland" },
  { name: "Frisco", path: "/texas/frisco" },
  { name: "McKinney", path: "/texas/mckinney" },
  { name: "Grand Prairie", path: "/texas/grand-prairie" },
  { name: "Keller", path: "/texas/keller" },
  { name: "Mansfield", path: "/texas/mansfield" },
  { name: "Weatherford", path: "/texas/weatherford" },
  { name: "Denton", path: "/texas/denton" },
  { name: "Southlake", path: "/texas/southlake" },
  { name: "Burleson", path: "/texas/burleson" },
  { name: "Cleburne", path: "/texas/cleburne" }
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  // Check if current path starts with the given path (for dropdown parent highlighting)
  const isPathActive = (path: string) => location.pathname.startsWith(path);

  // Determine if we're on the homepage (no yellow top border there)
  const isHome = location.pathname === "/" || location.pathname === "/home";

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-product-sans font-bold text-lg md:text-xl uppercase transition-colors ${
      isActive ? `text-[${colors.brand.yellowPrimary}]` : `text-white hover:text-[${colors.brand.yellowPrimary}]`
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `font-product-sans font-bold text-base uppercase block ${
      isActive ? `text-[${colors.brand.yellowPrimary}]` : "text-white"
    }`;

  return (
    <nav 
      className={`w-full relative rounded-t-[10px] h-[118px] ${
        isHome 
          ? "border-0" 
          : "border-t-2 border-t-[#fec300] border-x-0 border-b-0"
      }`}
      style={{ backgroundColor: colors.brand.dark }}
      data-font-probe="nav"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-28">
        <div className="flex items-center justify-between py-4 md:py-5 lg:py-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10 font-product-sans" role="menubar">
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
                className={`font-product-sans font-bold text-xl uppercase transition-colors flex items-center gap-2 ${
                  isPathActive("/services") ? "text-[#fec300]" : "text-white hover:text-[#fec300]"
                }`}
                aria-expanded={activeDropdown === "services"}
                aria-haspopup="true"
                aria-label="Services menu"
              >
                Services
                <svg className="w-4 h-3" viewBox="0 0 18 10.2106" fill="none" aria-hidden="true">
                  <path d={svgPaths.p82c3080} fill={colors.brand.yellowSecondary} />
                </svg>
              </button>
              {activeDropdown === "services" && (
                <div 
                  className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-[250px] z-50"
                  role="menu"
                  aria-label="Services submenu"
                >
                  <Link
                    to="/services"
                    onClick={closeMenu}
                    className="block w-full text-left px-4 py-2 hover:bg-[#fec300] hover:text-white transition-colors font-product-sans font-semibold border-b border-gray-200"
                    role="menuitem"
                  >
                    All Services
                  </Link>
                  {servicesDropdown.map((service, idx) => (
                    <Link
                      key={idx}
                      to={service.path}
                      onClick={closeMenu}
                      className="block w-full text-left px-4 py-2 hover:bg-[#fec300] hover:text-white transition-colors font-product-sans"
                      role="menuitem"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Texas Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("texas")}
                className={`font-product-sans font-bold text-xl uppercase transition-colors flex items-center gap-2 ${
                  isPathActive("/texas") ? "text-[#fec300]" : "text-white hover:text-[#fec300]"
                }`}
                aria-expanded={activeDropdown === "texas"}
                aria-haspopup="true"
                aria-label="Texas service areas menu"
              >
                Texas
                <svg className="w-4 h-3" viewBox="0 0 18 10.2106" fill="none" aria-hidden="true">
                  <path d={svgPaths.p82c3080} fill={colors.brand.yellowSecondary} />
                </svg>
              </button>
              {activeDropdown === "texas" && (
                <div 
                  className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-50"
                  role="menu"
                  aria-label="Texas areas submenu"
                >
                  <Link
                    to="/texas"
                    onClick={closeMenu}
                    className="block w-full text-left px-4 py-2 hover:bg-[#fec300] hover:text-white transition-colors font-product-sans font-semibold border-b border-gray-200"
                    role="menuitem"
                  >
                    All Areas
                  </Link>
                  {texasDropdown.map((city, idx) => (
                    <Link
                      key={idx}
                      to={city.path}
                      onClick={closeMenu}
                      className="block w-full text-left px-4 py-2 hover:bg-[#fec300] hover:text-white transition-colors font-product-sans"
                      role="menuitem"
                    >
                      {city.name}
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
          </div>

          {/* Social Icons */}
          <div className="hidden lg:flex items-center gap-4" aria-label="Social media links">
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

          {/* CTA Button */}
          <a
            href="tel:8712560122"
            className="hidden xl:flex items-center gap-3 rounded-[20px] px-6 py-3 shadow-md hover:shadow-lg transition-all font-product-sans"
            style={{ 
              backgroundColor: colors.brand.yellowPrimary, 
              border: `2px solid ${colors.brand.dark}` 
            }}
            aria-label="Call to schedule a free inspection at 871-256-0122"
          >
            <Phone size={24} style={{ color: colors.brand.black }} aria-hidden="true" />
            <div className="text-left">
              <div 
                className="font-product-sans font-black text-base leading-tight"
                style={{ color: colors.brand.black }}
              >
                SCHEDULE A
              </div>
              <div 
                className="font-product-sans font-black text-base leading-tight"
                style={{ color: colors.brand.black }}
              >
                FREE INSPECTION
              </div>
            </div>
          </a>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="lg:hidden pb-4 space-y-4"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <NavLink to="/" className={mobileNavLinkClass} onClick={closeMenu} end role="menuitem">
              Home
            </NavLink>
            <NavLink to="/about-us" className={mobileNavLinkClass} onClick={closeMenu} role="menuitem">
              About Us
            </NavLink>
            <NavLink to="/services" className={mobileNavLinkClass} onClick={closeMenu} role="menuitem">
              Services
            </NavLink>
            <NavLink to="/texas" className={mobileNavLinkClass} onClick={closeMenu} role="menuitem">
              Texas
            </NavLink>
            <NavLink to="/residential" className={mobileNavLinkClass} onClick={closeMenu} role="menuitem">
              Residential
            </NavLink>
            <NavLink to="/commercial" className={mobileNavLinkClass} onClick={closeMenu} role="menuitem">
              Commercial
            </NavLink>
            
            {/* Mobile Social Icons */}
            <div className="flex items-center gap-4 pt-4" aria-label="Social media links">
              <a href="#" aria-label="Visit our Yelp page">
                <img src={imgYelp} alt="Yelp reviews" className="w-8 h-8" loading="lazy" />
              </a>
              <a href="#" aria-label="Visit our Google Business page">
                <img src={imgGoogle} alt="Google reviews" className="w-8 h-8" loading="lazy" />
              </a>
              <a href="#" aria-label="Find us on Google Maps">
                <img src={imgGoogleMaps} alt="Google Maps location" className="w-8 h-8" loading="lazy" />
              </a>
              <a href="#" aria-label="Visit our Facebook page">
                <img src={imgFacebook} alt="Facebook page" className="w-8 h-8" loading="lazy" />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
