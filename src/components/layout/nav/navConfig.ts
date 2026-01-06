/**
 * Shared Navigation Configuration
 * Single source of truth for all nav items used by desktop and mobile menus
 */

export type NavItem = {
  label: string;
  to: string;
};

/**
 * Top-level navigation links (excluding Services and Texas dropdowns)
 */
export const NAV_LINKS: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about-us" },
  { label: "Residential", to: "/residential" },
  { label: "Commercial", to: "/commercial" },
];

/**
 * Services dropdown items
 */
export const SERVICES_ITEMS: NavItem[] = [
  { label: "All Services", to: "/services" },
  { label: "Broken Spring Repair", to: "/services/broken-spring-repair" },
  { label: "Opener Repair & Installation", to: "/services/opener-repair-installation" },
  { label: "Garage Door Off-Track", to: "/services/garage-door-off-track" },
  { label: "Broken Cable Repair", to: "/services/broken-cable-repair" },
  { label: "New Door Installation", to: "/services/new-door-installation" },
  { label: "Remote Repair & Programming", to: "/services/remote-repair-programming" },
  { label: "Garage Door Roller Repair", to: "/services/garage-door-roller-repair" },
  { label: "Door Service & Maintenance", to: "/services/door-service-maintenance" },
];

/**
 * Texas service areas dropdown items
 */
export const TEXAS_ITEMS: NavItem[] = [
  { label: "All Areas", to: "/texas" },
  { label: "Dallas", to: "/texas/dallas" },
  { label: "Fort Worth", to: "/texas/fort-worth" },
  { label: "Arlington", to: "/texas/arlington" },
  { label: "Plano", to: "/texas/plano" },
  { label: "Irving", to: "/texas/irving" },
  { label: "Garland", to: "/texas/garland" },
  { label: "Frisco", to: "/texas/frisco" },
  { label: "McKinney", to: "/texas/mckinney" },
  { label: "Grand Prairie", to: "/texas/grand-prairie" },
  { label: "Keller", to: "/texas/keller" },
  { label: "Mansfield", to: "/texas/mansfield" },
  { label: "Weatherford", to: "/texas/weatherford" },
  { label: "Denton", to: "/texas/denton" },
  { label: "Southlake", to: "/texas/southlake" },
  { label: "Burleson", to: "/texas/burleson" },
  { label: "Cleburne", to: "/texas/cleburne" },
];
