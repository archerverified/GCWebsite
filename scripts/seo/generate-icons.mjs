import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..', '..');

// Source: existing favicon.png
const SOURCE = path.join(ROOT_DIR, 'src', 'imports', 'favicon.png');
const OUTPUT_DIR = path.join(ROOT_DIR, 'public');

async function generateIcons() {
  console.log('🎨 Generating favicon icons...');
  console.log(`   Source: ${SOURCE}`);
  
  try {
    // Generate 48x48 for Google Search requirements
    await sharp(SOURCE)
      .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(OUTPUT_DIR, 'favicon-48.png'));
    console.log('   ✅ favicon-48.png (48x48)');
    
    // Generate 180x180 for Apple Touch Icon
    await sharp(SOURCE)
      .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(OUTPUT_DIR, 'apple-touch-icon.png'));
    console.log('   ✅ apple-touch-icon.png (180x180)');
    
    // Also generate a 32x32 for legacy browser support
    await sharp(SOURCE)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(OUTPUT_DIR, 'favicon-32.png'));
    console.log('   ✅ favicon-32.png (32x32)');
    
    console.log('✅ All favicon icons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating icons:', error);
    throw error;
  }
}

// Run the generator
generateIcons().catch(error => {
  console.error('❌ Failed to generate icons:', error);
  process.exit(1);
});


