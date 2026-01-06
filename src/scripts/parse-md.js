/**
 * parse-md.js
 * Parses markdown files from Webzite Copy folder into JSON for the website.
 * 
 * Structure: { title, intro, sections[], faqs[] }
 */

const fs = require('fs');
const path = require('path');

// Source folder with .md files
const MD_FOLDER = path.join(__dirname, '../../../GarageCowboyPages-main/GarageCowboyPages-main/pages/Webzite Copy');

// Output folder for JSON
const OUTPUT_FOLDER = path.join(__dirname, '../data');

// Explicit filename → JSON key mapping
const FILE_TO_KEY = {
  // Main pages
  'All Services.md': 'services',
  'Residential.md': 'residential',
  'Commercial.md': 'commercial',
  'All Areas.md': 'texas',
  'About Us.md': 'about-us',
  
  // Service details (prefixed with services-)
  'Broken Spring Repair.md': 'services-broken-spring-repair',
  'Opener Repair & Installation.md': 'services-opener-repair-installation',
  'Garage Door Off-Track.md': 'services-garage-door-off-track',
  'Broken Cable Repair.md': 'services-broken-cable-repair',
  'New Door Installation.md': 'services-new-door-installation',
  'Remote Repair & Programming.md': 'services-remote-repair-programming',
  'Garage Door Roller Repair.md': 'services-garage-door-roller-repair',
  'Door Service & Maintenance.md': 'services-door-service-maintenance',
  
  // Cities (prefixed with city-)
  'Dallas.md': 'city-dallas',
  'Fort Worth.md': 'city-fort-worth',
  'Arlington.md': 'city-arlington',
  'Plano.md': 'city-plano',
  'Irving.md': 'city-irving',
  'Garland.md': 'city-garland',
  'Frisco.md': 'city-frisco',
  'McKinney.md': 'city-mckinney',
  'Grand Prairie.md': 'city-grand-prairie',
  'Keller.md': 'city-keller',
  'Mansfield.md': 'city-mansfield',
  'Denton.md': 'city-denton',
  'Southlake.md': 'city-southlake',
  'Burleson.md': 'city-burleson',
  'Cleburne.md': 'city-cleburne',
  'Weatherton.md': 'city-weatherford', // Note: Weatherton.md maps to weatherford
};

/**
 * Parse a markdown file into structured JSON
 */
function parseMdFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  const result = {
    title: '',
    intro: '',
    sections: [],
    faqs: []
  };
  
  let mode = 'intro'; // 'intro', 'section', 'faqs'
  let currentSection = null;
  let currentFaq = null;
  let introLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Skip horizontal rules
    if (trimmedLine === '---') {
      continue;
    }
    
    // H1 heading = title (strip ** if present)
    if (trimmedLine.startsWith('# ')) {
      result.title = trimmedLine
        .replace(/^#\s*/, '')
        .replace(/\*\*/g, '')
        .trim();
      continue;
    }
    
    // H2 heading = new section or FAQs
    if (trimmedLine.startsWith('## ')) {
      // Save previous section if exists
      if (currentSection) {
        result.sections.push(currentSection);
        currentSection = null;
      }
      
      // Save previous FAQ if exists
      if (currentFaq) {
        result.faqs.push(currentFaq);
        currentFaq = null;
      }
      
      const sectionTitle = trimmedLine
        .replace(/^##\s*/, '')
        .replace(/\*\*/g, '')
        .trim();
      
      // Check if this is the FAQs section
      if (sectionTitle.toLowerCase().includes('faq')) {
        mode = 'faqs';
        continue;
      }
      
      // Check if this is a CTA section (skip it)
      if (sectionTitle.toLowerCase().includes('schedule') || 
          sectionTitle.toLowerCase().includes('contact') ||
          sectionTitle.toLowerCase().includes('call now') ||
          sectionTitle.toLowerCase().includes('need ')) {
        mode = 'skip';
        continue;
      }
      
      // Regular section
      mode = 'section';
      currentSection = {
        title: sectionTitle,
        content: ''
      };
      continue;
    }
    
    // H3 heading in FAQs mode = question
    if (trimmedLine.startsWith('### ') && mode === 'faqs') {
      if (currentFaq) {
        result.faqs.push(currentFaq);
      }
      currentFaq = {
        question: trimmedLine.replace(/^###\s*/, '').replace(/\*\*/g, '').trim(),
        answer: ''
      };
      continue;
    }
    
    // Bold line in FAQs mode that ends with ? = question (fallback heuristic)
    if (mode === 'faqs' && trimmedLine.startsWith('**') && trimmedLine.includes('?')) {
      if (currentFaq) {
        result.faqs.push(currentFaq);
      }
      currentFaq = {
        question: trimmedLine.replace(/\*\*/g, '').trim(),
        answer: ''
      };
      continue;
    }
    
    // Skip mode - ignore content
    if (mode === 'skip') {
      continue;
    }
    
    // Handle content based on mode
    if (mode === 'intro') {
      introLines.push(line);
    } else if (mode === 'section' && currentSection) {
      currentSection.content += line + '\n';
    } else if (mode === 'faqs' && currentFaq) {
      if (trimmedLine) {
        currentFaq.answer += trimmedLine + ' ';
      }
    }
  }
  
  // Save final section/FAQ
  if (currentSection) {
    result.sections.push(currentSection);
  }
  if (currentFaq) {
    result.faqs.push(currentFaq);
  }
  
  // Process intro - join and clean up
  result.intro = introLines.join('\n').trim();
  
  // Clean up section content
  result.sections = result.sections.map(sec => ({
    title: sec.title,
    content: sec.content.trim()
  }));
  
  // Clean up FAQ answers
  result.faqs = result.faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer.trim()
  }));
  
  return result;
}

// Main execution
console.log('=== MD Parser ===');
console.log(`Source folder: ${MD_FOLDER}`);
console.log(`Output folder: ${OUTPUT_FOLDER}`);
console.log('');

// Ensure output folder exists
if (!fs.existsSync(OUTPUT_FOLDER)) {
  fs.mkdirSync(OUTPUT_FOLDER, { recursive: true });
}

// Get list of .md files
const mdFiles = fs.readdirSync(MD_FOLDER).filter(f => f.endsWith('.md'));
console.log(`Found ${mdFiles.length} .md files\n`);

let processed = 0;
let skipped = 0;

mdFiles.forEach(file => {
  const key = FILE_TO_KEY[file];
  
  if (!key) {
    console.log(`⚠️  Skipping ${file} (no mapping defined)`);
    skipped++;
    return;
  }
  
  try {
    const filePath = path.join(MD_FOLDER, file);
    const parsed = parseMdFile(filePath);
    
    const outputPath = path.join(OUTPUT_FOLDER, `${key}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(parsed, null, 2));
    
    console.log(`✓ ${file} → ${key}.json`);
    console.log(`   Title: "${parsed.title.substring(0, 50)}${parsed.title.length > 50 ? '...' : ''}"`);
    console.log(`   Sections: ${parsed.sections.length}, FAQs: ${parsed.faqs.length}`);
    
    processed++;
  } catch (err) {
    console.error(`✗ Error processing ${file}:`, err.message);
    skipped++;
  }
});

console.log('\n=== Summary ===');
console.log(`Processed: ${processed} files`);
console.log(`Skipped: ${skipped} files`);

