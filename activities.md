# Activities

## 2026-06-21 - Transparent black-outline logo in nav/footer + new favicon set

Replaced the nav/footer logo and the full favicon set with a transparent,
black-line-art version of the Garage Cowboy mark, all derived from one master.

- Built the transparent master `src/assets/gc-logo-transparent.png` from
  `src/assets/gc-logo-source.png` (chosen over the .svg, which was just a
  wrapped lower-res raster): white-key removed near-white pixels to alpha 0,
  trimmed to a tight bbox, re-padded symmetrically, native resolution kept.
- Overwrote the shared Figma asset `src/assets/0c2b872f...png` with the master,
  which updates both `Header.tsx` and `Footer.tsx` (object-contain, no crop or
  distortion at h-14/16/20).
- Generated `public/favicon-16/32/48.png` (transparent, padded), multi-size
  `public/favicon.ico` (16/32/48), and `public/apple-touch-icon.png`
  (180x180, black mark on brand #FEC300, opaque).
- Removed `public/favicon.svg` and its `index.html` link; updated `index.html`
  and `public/site.webmanifest` to the new canonical icon set.
- Repointed `scripts/seo/generate-icons.mjs` to generate the PNG sizes from the
  master at build time, and added `scripts/seo/build-favicon-master.py` (Pillow)
  to regenerate the master and favicon.ico from the source logo.
- Verified: production build (vite build + prerender, 53/53 routes), Playwright
  header/footer screenshots (clean black logo on white), all favicons resolve
  200 with no favicon.svg request, and a code review of the diff.
