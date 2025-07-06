const fs = require('fs');
const path = require('path');

// Configuration
const DOMAIN = 'https://wiizdev.com';
const OUTPUT_FILE = path.join(__dirname, '../wiiz/public/sitemap.xml');

// Static routes with their priorities and change frequencies
const staticRoutes = [
  {
    url: '/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: '1.0'
  },
  {
    url: '/about',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: '/projects',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.9'
  },
  {
    url: '/all-projects',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    url: '/tech-stack',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    url: '/contact',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.8'
  }
];

// Function to generate XML sitemap
function generateSitemap(routes) {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  routes.forEach(route => {
    sitemap += `  <url>
    <loc>${DOMAIN}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;
  return sitemap;
}

// Function to fetch dynamic routes (if needed in the future)
async function getDynamicRoutes() {
  // This could fetch projects from the database and create individual project pages
  // For now, we'll return an empty array
  return [];
}

// Main function
async function main() {
  try {
    console.log('🔄 Generating sitemap...');
    
    // Get dynamic routes
    const dynamicRoutes = await getDynamicRoutes();
    
    // Combine static and dynamic routes
    const allRoutes = [...staticRoutes, ...dynamicRoutes];
    
    // Generate sitemap XML
    const sitemapXML = generateSitemap(allRoutes);
    
    // Write to file
    fs.writeFileSync(OUTPUT_FILE, sitemapXML, 'utf8');
    
    console.log('✅ Sitemap generated successfully!');
    console.log(`📍 Location: ${OUTPUT_FILE}`);
    console.log(`📊 Total URLs: ${allRoutes.length}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { generateSitemap, staticRoutes };
