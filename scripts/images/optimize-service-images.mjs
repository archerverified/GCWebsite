/**
 * Optimize service card images to WebP format.
 * 
 * Usage:
 *   1. Place source images in scripts/images/input/
 *   2. Run: npm run images:services
 *   3. Optimized WebP files will be output to src/assets/services/
 */

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..', '..');

// Support both locations - check src/scripts/images/input first, then scripts/images/input
const INPUT_DIR_PRIMARY = path.join(ROOT_DIR, 'src', 'scripts', 'images', 'input');
const INPUT_DIR_FALLBACK = path.join(__dirname, 'input');
let INPUT_DIR = INPUT_DIR_PRIMARY;

const OUTPUT_DIR = path.join(ROOT_DIR, 'src', 'assets', 'services');

// Explicit mapping from input filenames to output filenames
// Case-insensitive matching is done in findInputFile()
const IMAGE_MAP = {
  // Actual filenames from user's input folder (with correct extensions/casing)
  "broken-cable-repair.JPG": "broken-cable-repair.webp",
  "broken-spring-repair.jpg": "broken-spring-repair.webp",
  "door-service-maintenance.jpg": "door-service-maintenance.webp",
  "fixing-door-off-track.JPG": "fixing-door-off-track.webp",
  "garage-door-remotes.jpg": "garage-door-remotes.webp",
  "garage-door-roller-repair.jpeg": "garage-door-roller-repair.webp",
  "garage-opener-repair-install.jpg": "garage-opener-repair-install.webp",
  "new-garage-door-installs.JPG": "new-garage-door-installs.webp"
};

const FULL_MAP = { ...IMAGE_MAP };

// Processing settings
const WEBP_OPTIONS = {
  quality: 78,
  effort: 5
};

const TARGET_WIDTH = 900;

async function ensureOutputDir() {
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  } catch (err) {
    // Directory already exists
  }
}

async function findInputFile(baseName) {
  // Try to find the file with case-insensitive matching
  const files = await fs.readdir(INPUT_DIR);
  const lowerBaseName = baseName.toLowerCase();
  
  for (const file of files) {
    if (file.toLowerCase() === lowerBaseName) {
      return file;
    }
  }
  
  return null;
}

async function processImage(inputName, outputName) {
  const actualInputName = await findInputFile(inputName);
  
  if (!actualInputName) {
    console.error(`❌ Missing input file: ${inputName}`);
    console.error(`   Expected location: ${path.join(INPUT_DIR, inputName)}`);
    return false;
  }

  const inputPath = path.join(INPUT_DIR, actualInputName);
  const outputPath = path.join(OUTPUT_DIR, outputName);

  try {
    // Get image metadata to check dimensions
    const metadata = await sharp(inputPath).metadata();
    
    // Only resize if image is wider than target (no upscaling)
    let pipeline = sharp(inputPath);
    
    if (metadata.width && metadata.width > TARGET_WIDTH) {
      pipeline = pipeline.resize(TARGET_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    // Convert to WebP with quality settings
    await pipeline
      .webp(WEBP_OPTIONS)
      .toFile(outputPath);

    const outputStats = await fs.stat(outputPath);
    const inputStats = await fs.stat(inputPath);
    const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

    console.log(`✅ ${inputName} -> ${outputName}`);
    console.log(`   ${(inputStats.size / 1024).toFixed(1)}KB -> ${(outputStats.size / 1024).toFixed(1)}KB (${savings}% savings)`);
    
    return true;
  } catch (err) {
    console.error(`❌ Failed to process ${inputName}:`, err.message);
    return false;
  }
}

async function main() {
  console.log('🖼️  Optimizing service card images...');
  console.log(`   Input:  ${INPUT_DIR}`);
  console.log(`   Output: ${OUTPUT_DIR}`);
  console.log('');

  await ensureOutputDir();

  // Check if input directory exists - try primary location first, then fallback
  try {
    await fs.access(INPUT_DIR_PRIMARY);
    INPUT_DIR = INPUT_DIR_PRIMARY;
  } catch {
    try {
      await fs.access(INPUT_DIR_FALLBACK);
      INPUT_DIR = INPUT_DIR_FALLBACK;
    } catch {
      console.error(`❌ Input directory not found in either location:`);
      console.error(`   - ${INPUT_DIR_PRIMARY}`);
      console.error(`   - ${INPUT_DIR_FALLBACK}`);
      console.error('   Please create the directory and add source images.');
      process.exit(1);
    }
  }

  // Get unique output names and their corresponding input names
  const processed = new Set();
  const tasks = [];

  for (const [inputName, outputName] of Object.entries(FULL_MAP)) {
    // Skip if we've already processed this output file
    if (processed.has(outputName)) continue;
    processed.add(outputName);
    
    tasks.push({ inputName, outputName });
  }

  let successCount = 0;
  let failCount = 0;

  for (const { inputName, outputName } of tasks) {
    const success = await processImage(inputName, outputName);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('');
  console.log(`📊 Results: ${successCount} succeeded, ${failCount} failed`);

  if (failCount > 0) {
    console.error('');
    console.error('⚠️  Some images could not be processed.');
    console.error('   Please ensure all source images are in scripts/images/input/');
    console.error('');
    console.error('   Expected files:');
    for (const inputName of Object.keys(IMAGE_MAP)) {
      console.error(`   - ${inputName}`);
    }
    process.exit(1);
  }

  console.log('');
  console.log('✅ All images optimized successfully!');
}

main().catch(err => {
  console.error('❌ Script failed:', err);
  process.exit(1);
});

