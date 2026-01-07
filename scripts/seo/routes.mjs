/**
 * Routes configuration for SEO audit
 * Defines all pages to be audited by Lighthouse
 */

const BASE_URL = process.env.SITE_URL || 'http://localhost:5173';

export const routes = [
  { path: '/', name: 'home' },
  { path: '/services', name: 'services' },
  { path: '/services/broken-spring-repair', name: 'service-broken-spring' },
  { path: '/texas', name: 'texas' },
  { path: '/texas/dallas', name: 'city-dallas' },
  { path: '/residential', name: 'residential' },
  { path: '/commercial', name: 'commercial' },
  { path: '/about-us', name: 'about-us' }
];

export const getFullUrl = (path) => `${BASE_URL}${path}`;

export default routes;

