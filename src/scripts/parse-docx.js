/**
 * Parse .docx files from GarageCowboyPages and convert to JSON
 * Run with: node src/scripts/parse-docx.js
 */

const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

// Source folder with .docx files
const DOC_FOLDER = 'C:\\Users\\OxGh0\\OneDrive\\Desktop\\GarageCowboyPages-main\\GarageCowboyPages-main\\pages\\Webzite Copy';
// Output folder for JSON files
const DATA_FOLDER = path.join(__dirname, '../data');

// Mapping of docx filenames to their categories
const FILE_CATEGORIES = {
  // Main pages - extend existing JSON
  'About Us.docx': { type: 'extend', target: 'about-us.json' },
  'Services.docx': { type: 'extend', target: 'services.json' },
  'Residential.docx': { type: 'extend', target: 'residential.json' },
  'Commercial.docx': { type: 'extend', target: 'commercial.json' },
  'All Areas.docx': { type: 'extend', target: 'texas.json' },
  
  // Service detail pages - new JSON files for /services/:slug
  'Broken Spring Repair.docx': { type: 'service', target: 'services-broken-spring-repair.json' },
  'Broken Cable Repair.docx': { type: 'service', target: 'services-broken-cable-repair.json' },
  'Door Off Track.docx': { type: 'service', target: 'services-door-off-track.json' },
  'Door Service & Maintenance.docx': { type: 'service', target: 'services-door-service-maintenance.json' },
  'Garage Door Roller Repair.docx': { type: 'service', target: 'services-garage-door-roller-repair.json' },
  'New Door Installation.docx': { type: 'service', target: 'services-new-door-installation.json' },
  'Opener Repair & Installation.docx': { type: 'service', target: 'services-opener-repair-installation.json' },
  'Remote Repair & Programming.docx': { type: 'service', target: 'services-remote-repair-programming.json' },
  
  // Texas city pages - new JSON files
  'Dallas.docx': { type: 'city', target: 'city-dallas.json' },
  'Fort Worth.docx': { type: 'city', target: 'city-fort-worth.json' },
  'Arlington.docx': { type: 'city', target: 'city-arlington.json' },
  'Plano.docx': { type: 'city', target: 'city-plano.json' },
  'Irving.docx': { type: 'city', target: 'city-irving.json' },
  'Garland.docx': { type: 'city', target: 'city-garland.json' },
  'Frisco.docx': { type: 'city', target: 'city-frisco.json' },
  'Grand Prairie.docx': { type: 'city', target: 'city-grand-prairie.json' },
  'Keller.docx': { type: 'city', target: 'city-keller.json' },
  'Mansfield.docx': { type: 'city', target: 'city-mansfield.json' },
  'Weatherford.docx': { type: 'city', target: 'city-weatherford.json' },
  'Denton.docx': { type: 'city', target: 'city-denton.json' },
  'Southlake.docx': { type: 'city', target: 'city-southlake.json' },
  'Burleson.docx': { type: 'city', target: 'city-burleson.json' },
  'Cleburne.docx': { type: 'city', target: 'city-cleburne.json' },
  'McKinney.docx': { type: 'city', target: 'city-mckinney.json' },
};

/**
 * Parse HTML content from mammoth into structured JSON
 */
function parseHtmlContent(html) {
  // Clean up HTML and split into paragraphs
  const cleanHtml = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>\s*<p>/gi, '\n\n');
  
  // Extract text content from HTML tags
  const textContent = cleanHtml
    .replace(/<[^>]+>/g, '')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
  
  if (textContent.length === 0) {
    return { title: '', intro: '', sections: [], faqs: [] };
  }
  
  const result = {
    title: textContent[0],
    intro: '',
    sections: [],
    faqs: []
  };
  
  let mode = 'intro';
  let currentSection = null;
  let currentFaq = null;
  
  for (let i = 1; i < textContent.length; i++) {
    const line = textContent[i];
    
    // Check for FAQ section header
    if (line.toLowerCase().includes('faq') || line.toLowerCase() === 'frequently asked questions') {
      mode = 'faqs';
      if (currentSection) {
        result.sections.push(currentSection);
        currentSection = null;
      }
      continue;
    }
    
    // Check for section headers (lines ending with colon or all caps with significant length)
    const isHeader = (
      (line.endsWith(':') && line.length > 3 && line.length < 100) ||
      (line === line.toUpperCase() && line.length > 5 && line.length < 80 && !line.endsWith('?'))
    );
    
    if (mode === 'faqs') {
      // In FAQ mode, questions end with ?
      if (line.endsWith('?')) {
        if (currentFaq) {
          result.faqs.push(currentFaq);
        }
        currentFaq = { question: line, answer: '' };
      } else if (currentFaq) {
        currentFaq.answer += (currentFaq.answer ? '\n' : '') + line;
      }
    } else if (isHeader && mode !== 'faqs') {
      // New section header
      if (currentSection) {
        result.sections.push(currentSection);
      }
      currentSection = { title: line.replace(/:$/, ''), content: '' };
      mode = 'section';
    } else if (mode === 'intro') {
      result.intro += (result.intro ? '\n' : '') + line;
    } else if (mode === 'section' && currentSection) {
      currentSection.content += (currentSection.content ? '\n' : '') + line;
    }
  }
  
  // Push final items
  if (currentSection) {
    result.sections.push(currentSection);
  }
  if (currentFaq) {
    result.faqs.push(currentFaq);
  }
  
  return result;
}

/**
 * Parse a single .docx file
 */
async function parseDocx(filePath) {
  try {
    const result = await mammoth.convertToHtml({ path: filePath });
    return parseHtmlContent(result.value);
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error.message);
    return null;
  }
}

/**
 * Merge parsed content with existing JSON file
 */
function mergeWithExisting(targetPath, parsedContent) {
  let existing = {};
  
  if (fs.existsSync(targetPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
    } catch (e) {
      console.warn(`Could not parse existing ${targetPath}, creating new`);
    }
  }
  
  // Add parsed content as new fields, preserving existing structure
  return {
    ...existing,
    docxContent: {
      title: parsedContent.title,
      intro: parsedContent.intro,
    },
    sections: parsedContent.sections,
    faqs: parsedContent.faqs
  };
}

/**
 * Create a new service detail JSON structure
 */
function createServiceDetailJson(parsedContent, filename) {
  const slug = filename
    .replace('.docx', '')
    .toLowerCase()
    .replace(/[&]/g, 'and')
    .replace(/\s+/g, '-');
  
  return {
    slug,
    title: parsedContent.title,
    intro: parsedContent.intro,
    hero: {
      headline: parsedContent.title,
      subheadline: parsedContent.intro.split('\n')[0] || '',
      ctaText: 'Get Free Quote',
      ctaLink: 'tel:8172560122'
    },
    sections: parsedContent.sections,
    faqs: parsedContent.faqs,
    cta: {
      title: `Need ${parsedContent.title}?`,
      subtitle: 'Our expert technicians are ready to help',
      buttonText: 'Call Now',
      phone: '(817) 256-0122'
    }
  };
}

/**
 * Create a new city JSON structure
 */
function createCityJson(parsedContent, filename) {
  const cityName = filename.replace('.docx', '');
  const slug = cityName.toLowerCase().replace(/\s+/g, '-');
  
  return {
    slug,
    name: cityName,
    title: parsedContent.title,
    intro: parsedContent.intro,
    sections: parsedContent.sections,
    faqs: parsedContent.faqs,
    services: [
      'Spring Repair',
      'Opener Installation', 
      'Cable Repair',
      'Door Off Track',
      'Roller Repair'
    ],
    phone: '(817) 256-0122'
  };
}

/**
 * Main execution
 */
async function main() {
  console.log('Starting docx parsing...\n');
  console.log(`Source folder: ${DOC_FOLDER}`);
  console.log(`Output folder: ${DATA_FOLDER}\n`);
  
  // Ensure data folder exists
  if (!fs.existsSync(DATA_FOLDER)) {
    fs.mkdirSync(DATA_FOLDER, { recursive: true });
  }
  
  // Get all .docx files
  let files;
  try {
    files = fs.readdirSync(DOC_FOLDER).filter(f => f.endsWith('.docx'));
  } catch (error) {
    console.error(`Cannot read folder ${DOC_FOLDER}:`, error.message);
    return;
  }
  
  console.log(`Found ${files.length} .docx files\n`);
  
  const results = {
    extended: [],
    created: [],
    skipped: []
  };
  
  for (const file of files) {
    const filePath = path.join(DOC_FOLDER, file);
    const category = FILE_CATEGORIES[file];
    
    if (!category) {
      console.log(`⚠ Skipping unknown file: ${file}`);
      results.skipped.push(file);
      continue;
    }
    
    console.log(`Processing: ${file}`);
    
    const parsed = await parseDocx(filePath);
    if (!parsed) {
      results.skipped.push(file);
      continue;
    }
    
    const targetPath = path.join(DATA_FOLDER, category.target);
    let outputData;
    
    switch (category.type) {
      case 'extend':
        outputData = mergeWithExisting(targetPath, parsed);
        results.extended.push(category.target);
        break;
      case 'service':
        outputData = createServiceDetailJson(parsed, file);
        results.created.push(category.target);
        break;
      case 'city':
        outputData = createCityJson(parsed, file);
        results.created.push(category.target);
        break;
    }
    
    fs.writeFileSync(targetPath, JSON.stringify(outputData, null, 2));
    console.log(`  ✓ Saved to ${category.target}`);
  }
  
  console.log('\n--- Summary ---');
  console.log(`Extended: ${results.extended.length} files`);
  console.log(`Created: ${results.created.length} files`);
  console.log(`Skipped: ${results.skipped.length} files`);
  
  if (results.skipped.length > 0) {
    console.log('\nSkipped files:', results.skipped.join(', '));
  }
}

main().catch(console.error);

