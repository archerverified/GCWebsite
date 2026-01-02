import { Link } from "react-router-dom";
import imgLogo from "figma:asset/0c2b872f2c474c2f7c570ef0cd5e8697f4e13e90.png";
import imgGoogle from "figma:asset/43868bc8eeea26f5e93f178b6ba8e3677c4213e1.png";
import imgFacebook from "figma:asset/8dbe5f86efa1469441d188b9e45cc6558331091f.png";
import imgYelp from "figma:asset/9397697363694d03af296d09c2d018d15b0d2911.png";
import { colors } from "../../styles/design-tokens";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Services", path: "/services" },
  { name: "Residential", path: "/residential" },
  { name: "Commercial", path: "/commercial" },
];

const serviceLinks = [
  { name: "Spring Repair", path: "/services/broken-spring-repair" },
  { name: "Opener Installation", path: "/services/opener-repair-installation" },
  { name: "Door Off Track", path: "/services/garage-door-off-track" },
  { name: "Cable Repair", path: "/services/broken-cable-repair" },
  { name: "New Door Installation", path: "/services/new-door-installation" },
  { name: "Remote Programming", path: "/services/remote-repair-programming" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="w-full py-12 lg:py-16 font-product-sans px-[48px] md:px-[96px] lg:px-[192px] xl:px-[288px]" 
      style={{ backgroundColor: colors.neutral.white }}
      data-font-probe="footer"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/">
              <img 
                src={imgLogo} 
                alt="Garage Cowboy Logo" 
                className="h-16 w-auto object-contain mb-4"
              />
            </Link>
            <p 
              className="font-product-sans text-sm leading-relaxed"
              style={{ color: colors.text.secondary }}
            >
              Professional garage door repair and installation services across the Dallas-Fort Worth area.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              className="font-product-sans font-black text-lg uppercase mb-4"
              style={{ color: colors.text.primary }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="font-product-sans text-sm transition-colors"
                    style={{ color: colors.text.secondary }}
                    onMouseEnter={(e) => e.currentTarget.style.color = colors.brand.yellowPrimary}
                    onMouseLeave={(e) => e.currentTarget.style.color = colors.text.secondary}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 
              className="font-product-sans font-black text-lg uppercase mb-4"
              style={{ color: colors.text.primary }}
            >
              Services
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((service) => (
                <li key={service.path}>
                  <Link 
                    to={service.path} 
                    className="font-product-sans text-sm transition-colors"
                    style={{ color: colors.text.secondary }}
                    onMouseEnter={(e) => e.currentTarget.style.color = colors.brand.yellowPrimary}
                    onMouseLeave={(e) => e.currentTarget.style.color = colors.text.secondary}
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 
              className="font-product-sans font-black text-lg uppercase mb-4"
              style={{ color: colors.text.primary }}
            >
              Contact Us
            </h3>
            <div className="space-y-3">
              <div>
                <p 
                  className="font-product-sans text-sm mb-1"
                  style={{ color: colors.text.secondary }}
                >
                  Phone:
                </p>
                <a 
                  href="tel:8712560122" 
                  className="font-product-sans font-black text-xl transition-colors"
                  style={{ color: colors.brand.yellowPrimary }}
                  onMouseEnter={(e) => e.currentTarget.style.color = colors.brand.yellowSecondary}
                  onMouseLeave={(e) => e.currentTarget.style.color = colors.brand.yellowPrimary}
                >
                  (871) 256-0122
                </a>
              </div>
              <div>
                <p 
                  className="font-product-sans text-sm mb-1"
                  style={{ color: colors.text.secondary }}
                >
                  Service Area:
                </p>
                <p 
                  className="font-product-sans text-sm"
                  style={{ color: colors.text.secondary }}
                >
                  Dallas-Fort Worth & Surrounding Cities
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://www.yelp.com/biz/garage-cowboy-fort-worth"
                  className="hover:opacity-80 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={imgYelp} alt="Yelp" className="w-8 h-8" />
                </a>
                <a
                  href="https://www.google.com/search?q=garage+cowboy+fort+worth&sca_esv=cea07bd29ebaa7bd&ei=giRYafyPA4eWvr0P4rHXmAk&ved=0ahUKEwj82MWY0-2RAxUHi68BHeLYFZMQ4dUDCBE&uact=5&oq=garage+cowboy+fort+worth&gs_lp=Egxnd3Mtd2l6LXNlcnAiGGdhcmFnZSBjb3dib3kgZm9ydCB3b3J0aDIFECEYoAEyBRAhGKABSMwYUOEBWKUXcAN4AZABAJgBYqAB5giqAQIxM7gBA8gBAPgBAZgCEKACkQnCAgoQABiwAxjWBBhHwgINEAAYsAMY1gQYRxjJA8ICDhAAGIAEGLADGJIDGIoFwgIKEAAYgAQYQxiKBcICBRAAGIAEwgIGEAAYFhgewgIFEAAY7wXCAggQABiABBiiBMICCxAAGIAEGIYDGIoFmAMAiAYBkAYJkgcEMTUuMaAHw0eyBwQxMi4xuAeICcIHBjIuMTMuMcgHHYAIAA&sclient=gws-wiz-serp&lqi=ChhnYXJhZ2UgY293Ym95IGZvcnQgd29ydGhIm9TVhM2zgIAIWiYQABABGAAYARgCGAMiGGdhcmFnZSBjb3dib3kgZm9ydCB3b3J0aJIBFGdhcmFnZV9kb29yX3N1cHBsaWVymgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDJ0RmVsb3dTakZSYkRsTlkwZG9XbE5YVWpKU2VsWk9UVmQ0U0dReVl4QUL6AQUIkwMQPQ"
                  className="hover:opacity-80 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={imgGoogle} alt="Google" className="w-8 h-8" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61577149727757"
                  className="hover:opacity-80 transition-opacity"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={imgFacebook} alt="Facebook" className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="border-t mt-8 pt-8 text-center"
          style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}
        >
          <p 
            className="font-product-sans text-sm"
            style={{ color: colors.text.secondary }}
          >
            © {currentYear} Garage Cowboy. All rights reserved. | Professional Garage Door Services in DFW
          </p>
        </div>
      </div>
    </footer>
  );
}

