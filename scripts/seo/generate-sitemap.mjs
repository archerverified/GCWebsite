import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..', '..');

const SITE_URL = process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://garagecowboy.com';

// Static pages with priority and change frequency
const staticPages = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/services', priority: 0.9, changefreq: 'weekly' },
  { path: '/texas', priority: 0.9, changefreq: 'weekly' },
  { path: '/blog', priority: 0.8, changefreq: 'weekly' },
  { path: '/faq', priority: 0.7, changefreq: 'weekly' },
  { path: '/reviews', priority: 0.7, changefreq: 'monthly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/residential', priority: 0.8, changefreq: 'monthly' },
  { path: '/commercial', priority: 0.8, changefreq: 'monthly' },
  { path: '/about-us', priority: 0.7, changefreq: 'monthly' },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms', priority: 0.3, changefreq: 'yearly' }
];

async function getDynamicPages() {
  const dataDir = path.join(ROOT_DIR, 'src', 'data');
  const files = await fs.readdir(dataDir);
  const dynamicPages = [];

  for (const file of files) {
    if (file.startsWith('services-') && file.endsWith('.json')) {
      const slug = file.replace('services-', '').replace('.json', '');
      dynamicPages.push({
        path: `/services/${slug}`,
        priority: 0.7,
        changefreq: 'monthly'
      });
    } else if (file.startsWith('city-') && file.endsWith('.json')) {
      const slug = file.replace('city-', '').replace('.json', '');
      dynamicPages.push({
        path: `/texas/${slug}`,
        priority: 0.7,
        changefreq: 'monthly'
      });
    }
  }

  // Add Garland city as it uses a different file name pattern
  if (files.includes('garland.json')) {
    dynamicPages.push({
      path: '/texas/garland',
      priority: 0.7,
      changefreq: 'monthly'
    });
  }

  // Add blog posts
  const blogDir = path.join(ROOT_DIR, 'src', 'data', 'blog');
  try {
    const postsFile = await fs.readFile(path.join(blogDir, 'posts.json'), 'utf-8');
    const postsData = JSON.parse(postsFile);
    if (postsData.posts && Array.isArray(postsData.posts)) {
      for (const post of postsData.posts) {
        if (post.slug) {
          dynamicPages.push({
            path: `/blog/${post.slug}`,
            priority: 0.7,
            changefreq: 'monthly'
          });
        }
      }
    }
  } catch (error) {
    // Blog posts file may not exist yet, continue without error
    console.log('   Note: No blog posts found for sitemap');
  }

  // Add buyer guides (/guides/<slug>) - single source: src/data/guides.json
  try {
    const guidesFile = await fs.readFile(path.join(dataDir, 'guides.json'), 'utf-8');
    const guidesData = JSON.parse(guidesFile);
    if (Array.isArray(guidesData.guides)) {
      for (const guide of guidesData.guides) {
        if (guide.slug) {
          dynamicPages.push({
            path: `/guides/${guide.slug}`,
            priority: 0.6,
            changefreq: 'monthly'
          });
        }
      }
    }
  } catch (error) {
    console.log('   Note: No guides found for sitemap');
  }

  // Add city + service combos (/texas/<city>/<service>) - single source:
  // src/data/combos.json
  try {
    const combosFile = await fs.readFile(path.join(dataDir, 'combos.json'), 'utf-8');
    const combosData = JSON.parse(combosFile);
    if (Array.isArray(combosData.combos)) {
      for (const combo of combosData.combos) {
        if (combo.city && combo.service) {
          dynamicPages.push({
            path: `/texas/${combo.city}/${combo.service}`,
            priority: 0.6,
            changefreq: 'monthly'
          });
        }
      }
    }
  } catch (error) {
    console.log('   Note: No combos found for sitemap');
  }

  return dynamicPages;
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

async function generateSitemap() {
  console.log('🗺️ Generating sitemap...');
  console.log(`   Using base URL: ${SITE_URL}`);
  
  try {
    const dynamicPages = await getDynamicPages();
    const allPages = [...staticPages, ...dynamicPages];
    
    const lastmod = new Date().toISOString().split('T')[0];
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${escapeXml(SITE_URL + page.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`;

    const outputPath = path.join(ROOT_DIR, 'public', 'sitemap.xml');
    await fs.writeFile(outputPath, sitemap, 'utf-8');
    
    console.log(`✅ Sitemap generated with ${allPages.length} URLs`);
    console.log(`   Static pages: ${staticPages.length}`);
    console.log(`   Dynamic pages: ${dynamicPages.length}`);
    console.log(`   Saved to: ${outputPath}`);
    
    // List generated URLs for verification
    if (process.env.VERBOSE) {
      console.log('\n📋 Generated URLs:');
      allPages.forEach(page => {
        console.log(`   ${page.priority.toFixed(1)} - ${page.path}`);
      });
    }
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    throw error;
  }
}

// Run the sitemap generation
generateSitemap().catch(error => {
  console.error('❌ Failed to generate sitemap:', error);
  process.exit(1);
});

