#!/usr/bin/env python3
"""Regenerate the transparent logo master and the multi-size favicon.ico.

This is the one canonical path for the icon set:

    src/assets/gc-logo-source.png
        -> src/assets/gc-logo-transparent.png   (the master, this script)
        -> public/favicon.ico                    (16/32/48, this script)

    src/assets/gc-logo-transparent.png
        -> public/favicon-16/32/48.png + apple-touch-icon.png
           (generated at build time by scripts/seo/generate-icons.mjs via sharp)

sharp has no .ico encoder, so the master and the .ico are produced here with
Pillow and committed as artifacts. Run this only when the source logo changes,
then run `node scripts/seo/generate-icons.mjs` (or `npm run build`) to refresh
the PNG sizes from the new master.

Requires Pillow:  python3 -m pip install Pillow
Usage:            python3 scripts/seo/build-favicon-master.py
"""
import os
from PIL import Image
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SOURCE = os.path.join(ROOT, "src", "assets", "gc-logo-source.png")
MASTER = os.path.join(ROOT, "src", "assets", "gc-logo-transparent.png")
ICO = os.path.join(ROOT, "public", "favicon.ico")

WHITE_KEY = 240   # remove pixels at or above this on all RGB channels
MASTER_PAD = 0.03  # symmetric transparent margin around the trimmed art
ICON_PAD = 0.10    # interior padding for the small favicon sizes


def build_master():
    im = Image.open(SOURCE).convert("RGBA")
    a = np.array(im).astype(np.int16)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]

    # White-key: drop near-white pixels to transparent so only the black line
    # art (and its anti-aliased dark edges) remains.
    near_white = (r > WHITE_KEY) & (g > WHITE_KEY) & (b > WHITE_KEY)
    a[near_white, 3] = 0
    out = a.astype(np.uint8)
    out[out[..., 3] == 0] = [0, 0, 0, 0]

    # Trim to the tight bounding box of the remaining art.
    ys, xs = np.where(out[..., 3] > 0)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    crop = out[y0:y1, x0:x1]
    ch, cw = crop.shape[0], crop.shape[1]

    # Re-pad symmetrically so the art is centered and not edge-to-edge.
    m = round(MASTER_PAD * max(cw, ch))
    padded = np.zeros((ch + 2 * m, cw + 2 * m, 4), dtype=np.uint8)
    padded[m:m + ch, m:m + cw] = crop

    Image.fromarray(padded).save(MASTER)
    print(f"master: {SOURCE} -> {MASTER} ({cw + 2 * m}x{ch + 2 * m})")
    return Image.fromarray(padded)


def build_ico(master):
    # High-res padded base, then a multi-size .ico (16/32/48), all transparent.
    n = 256
    margin = round(n * ICON_PAD)
    inner = n - 2 * margin
    logo = master.copy()
    logo.thumbnail((inner, inner), Image.LANCZOS)
    base = Image.new("RGBA", (n, n), (0, 0, 0, 0))
    base.alpha_composite(logo, ((n - logo.width) // 2, (n - logo.height) // 2))
    base.save(ICO, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"favicon.ico: {ICO} (16/32/48)")


if __name__ == "__main__":
    master = build_master()
    build_ico(master)
    print("done")
