import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..', '..');

// Single canonical source: the transparent black-line-art master.
// Every favicon size is derived from this one file (one canonical path).
const SOURCE = path.join(ROOT_DIR, 'src', 'assets', 'gc-logo-transparent.png');
const OUTPUT_DIR = path.join(ROOT_DIR, 'public');

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
const BRAND = { r: 254, g: 195, b: 0 }; // #FEC300

// Transparent N x N icon with symmetric interior padding so the detailed
// line art is never edge-to-edge.
async function makeTransparent(size, padFraction) {
  const margin = Math.round(size * padFraction);
  const inner = size - margin * 2;
  return sharp(SOURCE)
    .resize(inner, inner, { fit: 'contain', background: TRANSPARENT })
    .extend({ top: margin, bottom: margin, left: margin, right: margin, background: TRANSPARENT })
    .png();
}

// Opaque N x N icon: the black mark composited onto a solid brand canvas
// with symmetric interior padding. Compositing (rather than extend+flatten)
// guarantees the logo's interior transparency is filled with the brand
// color and the result is fully opaque.
async function makeOnBrand(size, padFraction, bg) {
  const margin = Math.round(size * padFraction);
  const inner = size - margin * 2;
  const mark = await sharp(SOURCE)
    .resize(inner, inner, { fit: 'contain', background: TRANSPARENT })
    .png()
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: { ...bg, alpha: 1 } } })
    .composite([{ input: mark, top: margin, left: margin }])
    .flatten({ background: bg })
    .png();
}

async function generateIcons() {
  console.log('🎨 Generating favicon icons from transparent master...');
  console.log(`   Source: ${SOURCE}`);

  try {
    // Small icons: transparent, ~10% interior padding for legibility at 16-48px.
    for (const size of [16, 32, 48]) {
      await (await makeTransparent(size, 0.10)).toFile(
        path.join(OUTPUT_DIR, `favicon-${size}.png`)
      );
      console.log(`   ✅ favicon-${size}.png (${size}x${size})`);
    }

    // Apple touch icon: Apple ignores transparency, so the black mark sits on
    // the brand background (#FEC300) with ~12% padding.
    await (await makeOnBrand(180, 0.12, BRAND)).toFile(
      path.join(OUTPUT_DIR, 'apple-touch-icon.png')
    );
    console.log('   ✅ apple-touch-icon.png (180x180, #FEC300)');

    // NOTE: public/favicon.ico (multi-size 16/32/48) is a committed artifact
    // also derived from this same master. sharp has no .ico encoder, so it is
    // not regenerated here. The master itself and the .ico are produced by
    // scripts/seo/build-favicon-master.py (Pillow); rerun that script when the
    // source logo changes, then this script refreshes the PNG sizes.
    console.log('   ℹ️  favicon.ico + master come from scripts/seo/build-favicon-master.py');

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
