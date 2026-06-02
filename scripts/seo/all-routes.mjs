/**
 * Single source of truth for the full set of crawlable routes.
 *
 * Static routes are listed explicitly; dynamic routes (city, service and blog
 * pages) are enumerated from `src/data/` using the SAME conventions as
 * `generate-sitemap.mjs`, so the sitemap and the prerenderer never drift apart.
 *
 * Redirect-only paths (`/home`, `/contac`) and the catch-all 404 (`*`) are
 * intentionally excluded — they should not be prerendered.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..', '..');
const DATA_DIR = path.join(ROOT_DIR, 'src', 'data');

// Static, always-present routes (mirrors generate-sitemap.mjs staticPages).
const STATIC_ROUTES = [
  '/',
  '/services',
  '/texas',
  '/blog',
  '/contact',
  '/residential',
  '/commercial',
  '/about-us',
  '/privacy',
  '/terms',
];

/**
 * Enumerate every route that should be prerendered.
 * @returns {Promise<string[]>} de-duplicated list of route paths
 */
export async function getAllRoutes() {
  const routes = new Set(STATIC_ROUTES);

  let files = [];
  try {
    files = await fs.readdir(DATA_DIR);
  } catch (error) {
    console.warn(`⚠️  Could not read data dir ${DATA_DIR}: ${error.message}`);
  }

  for (const file of files) {
    if (file.startsWith('services-') && file.endsWith('.json')) {
      routes.add(`/services/${file.replace('services-', '').replace('.json', '')}`);
    } else if (file.startsWith('city-') && file.endsWith('.json')) {
      routes.add(`/texas/${file.replace('city-', '').replace('.json', '')}`);
    }
  }

  // Garland uses a different file-name pattern (mirrors generate-sitemap.mjs).
  if (files.includes('garland.json')) {
    routes.add('/texas/garland');
  }

  // Blog posts.
  try {
    const postsRaw = await fs.readFile(path.join(DATA_DIR, 'blog', 'posts.json'), 'utf-8');
    const postsData = JSON.parse(postsRaw);
    if (Array.isArray(postsData.posts)) {
      for (const post of postsData.posts) {
        if (post.slug) routes.add(`/blog/${post.slug}`);
      }
    }
  } catch {
    // No blog posts file yet — continue without error.
  }

  return [...routes];
}

export default getAllRoutes;
