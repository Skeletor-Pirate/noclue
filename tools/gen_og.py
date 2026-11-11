#!/usr/bin/env python3
"""Generate the per-page social cards (1200x630) for the Reality Check site.

Run from the site root:  python tools/gen_og.py
Uses the supplied brand art: assets/img/brand/reality-check-title.png (pixel title),
assets/img/brand/noclue-black.png (wordmark) and assets/img/brand/skyline.jpg (deck band).
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "assets" / "img"
OUT = ROOT / "assets" / "img"

PAPER = (244, 241, 231)
BLUE = (4, 71, 255)
INK = (11, 11, 11)
ORANGE = (255, 90, 31)

BOLD = "/data/data/com.termux/files/usr/share/fonts/TTF/DejaVuSans-Bold.ttf"
REG = "/data/data/com.termux/files/usr/share/fonts/TTF/DejaVuSans.ttf"

W, H = 1200, 630


def font(size, bold=True):
    return ImageFont.truetype(BOLD if bold else REG, size)


def build(page, headline, kicker, rows, filename):
    canvas = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(canvas)

    logo = Image.open(IMG / "brand" / "noclue-black.png").convert("RGBA")
    lh = 38
    logo = logo.resize((int(logo.width * lh / logo.height), lh), Image.LANCZOS)
    canvas.paste(logo, (56, 38), logo)
    d.text((W - 56, 48), "LESS TALK. MORE BUILD.", font=font(13), fill=INK, anchor="ra")

    title = Image.open(IMG / "brand" / "reality-check-title.png").convert("RGBA")
    tw = 600
    title = title.resize((tw, int(title.height * tw / title.width)), Image.LANCZOS)
    canvas.paste(title, (52, 105), title)

    d.rectangle((748, 105, 1144, 466), fill=BLUE)
    for i in range(3):
        d.rectangle((1114 - i * 12, 116, 1124 - i * 12, 126), fill=PAPER)
    d.text((772, 132), kicker, font=font(11), fill=(226, 234, 255))
    d.text((772, 168), headline, font=font(30), fill=PAPER)
    y = 250
    for label, value in rows:
        d.text((772, y), label, font=font(9), fill=(210, 220, 255))
        d.text((772, y + 16), value, font=font(15), fill=PAPER)
        y += 58
    d.rectangle((772, 430, 1144, 431), fill=(226, 234, 255))

    sky = Image.open(IMG / "brand" / "skyline.jpg").convert("RGB")
    scaled_h = max(150, int(sky.height * W / sky.width))
    sky = sky.resize((W, scaled_h), Image.LANCZOS)
    top = max(0, scaled_h - 195)
    sky = sky.crop((0, top, W, top + 150))
    canvas.paste(sky, (0, H - 150))
    d.rectangle((0, H - 150, W, H - 149), fill=INK)
    d.rectangle((W - 72, H - 202, W - 56, H - 186), fill=ORANGE)

    path = OUT / filename
    canvas.save(path, quality=91, optimize=True, progressive=True)
    print("wrote", path.relative_to(ROOT))


CITIES = [
    ("01", "DELHI", "PILOT TO PRODUCT"),
    ("02", "BANGALORE", "SHIPPED LIVE"),
    ("03", "PUNE", "BREAKING POINT"),
]

build(
    "index",
    "Reality Check",
    "THE SERIES / 2026",
    [(n, c) for n, c, _ in CITIES],
    "og.jpg",
)
build(
    "programs",
    "The series",
    "THREE ROOMS / ONE STANDARD",
    [(n, c) for n, c, _ in CITIES],
    "og-programs.jpg",
)
build(
    "partners",
    "Partners",
    "IN THE ROOM / NOT ON THE BANNER",
    [("SERIES", "Series partner"), ("CITY", "City partner"), ("ECOSYSTEM", "Ecosystem partner")],
    "og-partners.jpg",
)
build(
    "manifesto",
    "Manifesto",
    "NO INVENTED PROOF",
    [("BELIEF", "Real problems, real rooms"), ("METHOD", "Show the work")],
    "og-manifesto.jpg",
)
build(
    "apply",
    "Apply",
    "APPLICATIONS OPEN",
    [(n, c) for n, c, _ in CITIES],
    "og-apply.jpg",
)
