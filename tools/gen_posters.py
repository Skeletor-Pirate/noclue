#!/usr/bin/env python3
"""Generate city poster art for Reality Check in the campaign's paper/ink language.

These are production placeholders: replace assets/img/cities/*.jpg with the
official city posters (same aspect ratio) without touching the HTML.
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "img" / "cities"
FONTS = ROOT.parent / "realitycheck" / "fonts"
W, H = 1400, 1750

INK = (10, 10, 9)
BONE = (242, 238, 228)
VERM = (227, 58, 27)
LIME = (217, 255, 67)
DIM = (28, 28, 25)
MID = (128, 122, 108)

CITIES = [
    {
        "slug": "delhi",
        "no": "01",
        "name": "DELHI",
        "theme": "Pilot to Product",
        "line": "The pilot is not the product.",
        "motif": "pipeline",
    },
    {
        "slug": "bangalore",
        "no": "02",
        "name": "BANGALORE",
        "theme": "Shipped Live",
        "line": "Ship it in the room.",
        "motif": "terminal",
    },
    {
        "slug": "pune",
        "no": "03",
        "name": "PUNE",
        "theme": "Breaking Point",
        "line": "Find what breaks first.",
        "motif": "spike",
    },
]


def font(name, size, wght=None):
    f = ImageFont.truetype(str(FONTS / name), size)
    if wght is not None:
        try:
            f.set_variation_by_axes([wght])
        except Exception:
            pass
    return f


def tracked(draw, xy, text, f, fill, tracking=0.0):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=f, fill=fill)
        x += draw.textlength(ch, font=f) + tracking


def tracked_width(draw, text, f, tracking=0.0):
    return sum(draw.textlength(ch, font=f) for ch in text) + tracking * max(0, len(text) - 1)


def paper_bg():
    rng = np.random.default_rng(202611)
    base = np.zeros((H, W, 3), dtype=np.float32)
    base[..., 0] = 10
    base[..., 1] = 10
    base[..., 2] = 9

    # soft fibrous noise
    noise = rng.normal(0, 5.5, (H, W, 1))
    fibre = rng.normal(0, 2.2, (H, W, 3))
    base = base + noise + fibre

    # vignette / light falloff
    yy, xx = np.mgrid[0:H, 0:W]
    d = np.sqrt(((xx - W * 0.52) / W) ** 2 + ((yy - H * 0.42) / H) ** 2)
    vig = np.clip(1.08 - d * 0.55, 0.7, 1.06)[..., None]
    base = base * vig

    # a few warm scratches
    img = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8), "RGB")
    scratches = Image.new("RGB", (W, H), (0, 0, 0))
    sd = ImageDraw.Draw(scratches)
    for _ in range(26):
        x = int(rng.integers(0, W))
        y0 = int(rng.integers(0, H))
        ln = int(rng.integers(30, 190))
        sd.line([(x, y0), (x + int(rng.integers(-8, 8)), y0 + ln)], fill=(26, 24, 21), width=1)
    scratches = scratches.filter(ImageFilter.GaussianBlur(0.6))
    img = Image.blend(img, scratches, 0.18)
    return img


def motif(draw, kind):
    if kind == "pipeline":
        cx, cy = W - 250, 610
        for r in (66, 112, 158, 204):
            draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(34, 33, 29), width=2)
        draw.line([(80, cy), (cx - 204, cy)], fill=(34, 33, 29), width=2)
        draw.rectangle([cx - 8, cy - 8, cx + 8, cy + 8], fill=VERM)
    elif kind == "terminal":
        x0, y0 = 760, 470
        for i in range(9):
            y = y0 + i * 32
            wdt = 120 + (i * 47) % 260
            draw.rectangle([x0, y, x0 + wdt, y + 8], fill=(30, 29, 26))
        draw.rectangle([x0, y0 - 24, x0 + 560, y0 - 12], fill=(38, 37, 32))
        draw.rectangle([x0 + 560 - 8, y0 + 8 * 32 + 8, x0 + 574, y0 + 8 * 32 + 22], fill=VERM)
    else:
        pts = []
        for i in range(46):
            x = 720 + i * 13
            y = 760 - int((2.718 ** (i / 9.2)) * 2.4)
            pts.append((x, max(430, y)))
        draw.line(pts, fill=(38, 37, 32), width=4)
        draw.line([(720, 760), (W - 80, 760)], fill=(30, 29, 26), width=2)
        draw.rectangle([W - 96, 430, W - 80, 446], fill=VERM)


def build(city):
    img = paper_bg()
    d = ImageDraw.Draw(img)

    # ghost numeral
    ghost = font("Anton-Regular.ttf", 980)
    gw = d.textlength(city["no"], font=ghost)
    d.text((W - gw - 40, 40), city["no"], font=ghost, fill=DIM)

    motif(d, city["motif"])

    # header
    mono = font("JetBrainsMono[wght].ttf", 21, 500)
    tracked(d, (78, 86), "NO. 002 / THE SERIES", mono, MID, 4.2)
    tw = tracked_width(d, "REALITY CHECK", mono, 4.2)
    tracked(d, (W - 78 - tw, 86), "REALITY CHECK", mono, MID, 4.2)
    d.line([(78, 130), (W - 78, 130)], fill=(42, 40, 35), width=1)

    # city index
    tracked(d, (78, 178), f"CITY {city['no']} / 03", mono, VERM, 4.2)

    # city name, shrunk to fit width
    name = city["name"]
    size = 300
    while True:
        big = font("Anton-Regular.ttf", size)
        if d.textlength(name, font=big) <= W - 156 or size <= 120:
            break
        size -= 4
    d.text((72, 224), name, font=big, fill=BONE)

    # theme
    serif = font("InstrumentSerif-Italic.ttf", 108)
    d.text((78, 224 + size + 44), city["theme"], font=serif, fill=VERM)

    # line
    body = font("Archivo[wdth,wght].ttf", 30, 500)
    d.text((78, 224 + size + 180), city["line"], font=body, fill=(190, 183, 169))

    # lower block
    y = 1360
    d.line([(78, y), (W - 78, y)], fill=(44, 42, 37), width=1)
    tracked(d, (78, y + 34), "REALITY CHECK / THE SERIES", mono, MID, 4.2)
    tracked(d, (78, y + 78), "THREE CITIES", mono, BONE, 4.2)
    tracked(d, (78, y + 114), "DATES ANNOUNCED SOON", mono, VERM, 4.2)

    cta = font("JetBrainsMono[wght].ttf", 22, 700)
    tracked(d, (78, y + 198), "APPLY  →", cta, LIME, 5.0)
    d.rectangle([W - 100, y + 194, W - 82, y + 212], fill=LIME)

    # footer strip
    d.line([(78, H - 92), (W - 78, H - 92)], fill=(44, 42, 37), width=1)
    tracked(d, (78, H - 62), "DELHI · BANGALORE · PUNE", mono, MID, 4.2)

    # grain
    rng = np.random.default_rng(11 + int(city["no"]))
    arr = np.asarray(img).astype(np.int16)
    arr += rng.normal(0, 7.5, (H, W, 1)).astype(np.int16)
    img = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")

    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / f"{city['slug']}.jpg"
    img.save(path, quality=90, optimize=True)
    print(path, path.stat().st_size)


if __name__ == "__main__":
    for c in CITIES:
        build(c)
