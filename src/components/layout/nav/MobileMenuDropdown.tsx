import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { NAV_LINKS, SERVICES_ITEMS, TEXAS_ITEMS } from "./navConfig";

/**
 * Mobile Menu Dropdown
 * Centered mobile navigation with Menu/Close toggle
 * Uses shadcn DropdownMenu for consistent styling and accessibility
 */
export function MobileMenuDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/home";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className={`
          flex min-h-11 items-center gap-2 px-4 py-2 rounded-lg
          font-product-sans font-bold text-sm uppercase
          transition-all duration-200 outline-none
          focus-visible:ring-2 focus-visible:ring-gc-yellow focus-visible:ring-offset-2
          ${isOpen 
            ? "bg-gc-gray-100 text-gc-yellow" 
            : "bg-transparent text-white hover:bg-gc-gray-100 hover:text-gc-yellow"
          }
        `}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? (
          <X className="w-5 h-5" aria-hidden="true" />
        ) : (
          <Menu className="w-5 h-5" aria-hidden="true" />
        )}
        <span>{isOpen ? "Close" : "Menu"}</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 bg-white border border-gc-gray-200 shadow-lg rounded-lg p-1 z-50"
        align="center"
        sideOffset={8}
      >
        {/* Main Navigation Links */}
        {NAV_LINKS.map((item) => (
          <DropdownMenuItem key={item.to} asChild>
            <Link
              to={item.to}
              className={`
                flex min-h-11 w-full items-center px-4 py-2.5 rounded-md
                font-product-sans font-medium text-sm
                transition-colors cursor-pointer
                ${isActive(item.to)
                  ? "bg-gc-yellow text-gc-ink"
                  : "text-gc-ink hover:bg-gc-gray-100 hover:text-gc-yellow"
                }
              `}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="my-1 bg-gc-gray-200" />

        {/* Services Section */}
        <DropdownMenuLabel className="px-4 py-2 font-product-sans font-black text-xs uppercase text-gc-ink tracking-wide">
          Services
        </DropdownMenuLabel>
        {SERVICES_ITEMS.map((item) => (
          <DropdownMenuItem key={item.to} asChild>
            <Link
              to={item.to}
              className={`
                flex min-h-11 w-full items-center px-4 py-2 rounded-md
                font-product-sans text-sm
                transition-colors cursor-pointer
                ${isActive(item.to)
                  ? "bg-gc-yellow text-gc-ink"
                  : "text-gc-ink hover:bg-gc-gray-100 hover:text-gc-yellow"
                }
              `}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="my-1 bg-gc-gray-200" />

        {/* Texas Section */}
        <DropdownMenuLabel className="px-4 py-2 font-product-sans font-black text-xs uppercase text-gc-ink tracking-wide">
          Texas Service Areas
        </DropdownMenuLabel>
        <div className="max-h-48 overflow-y-auto">
          {TEXAS_ITEMS.map((item) => (
            <DropdownMenuItem key={item.to} asChild>
              <Link
                to={item.to}
                className={`
                  block w-full px-4 py-2 rounded-md
                  font-product-sans text-sm
                  transition-colors cursor-pointer
                  ${isActive(item.to)
                    ? "bg-gc-yellow text-gc-ink"
                    : "text-gc-ink hover:bg-gc-gray-100 hover:text-gc-yellow"
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
