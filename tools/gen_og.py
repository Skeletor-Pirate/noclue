#!/usr/bin/env python3
"""Generate the 1200x630 Open Graph image for the Reality Check campaign."""
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT.parent / "realitycheck" / "fonts"
W, H = 1200, 630
INK = (10, 10, 9)
BONE = (242, 238, 228)
VERM = (227, 58, 27)
LIME = (217, 255, 67)
MID = (142, 136, 122)


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


def bg():
    rng = np.random.default_rng(404)
    base = np.zeros((H, W, 3), np.float32)
    base[..., 0] = INK[0]; base[..., 1] = INK[1]; base[..., 2] = INK[2]
    base += rng.normal(0, 5, (H, W, 1))
    yy, xx = np.mgrid[0:H, 0:W]
    d = np.sqrt(((xx - W * .7) / W) ** 2 + ((yy - H * .3) / H) ** 2)
    base *= np.clip(1.2 - d * .7, .6, 1.18)[..., None]
    img = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8), "RGB")
    # fine scratches
    sc = Image.new("RGB", (W, H), (0, 0, 0))
    sd = ImageDraw.Draw(sc)
    for _ in range(24):
        x = int(rng.integers(0, W)); y0 = int(rng.integers(0, H)); ln = int(rng.integers(20, 120))
        sd.line([(x, y0), (x, y0 + ln)], fill=(28, 26, 22), width=1)
    sc = sc.filter(ImageFilter.GaussianBlur(.5))
    return Image.blend(img, sc, .13)


def build():
    img = bg()
    d = ImageDraw.Draw(img)

    # ghost numeral
    ghost = font("Anton-Regular.ttf", 520)
    gw = d.textlength("03", font=ghost)
    d.text((W - gw + 30, -20), "03", font=ghost, fill=(21, 21, 18))

    # rules
    d.line([(56, 56), (W - 56, 56)], fill=(47, 45, 39), width=1)
    d.line([(56, H - 56), (W - 56, H - 56)], fill=(47, 45, 39), width=1)

    mono = font("JetBrainsMono[wght].ttf", 15, 500)
    tracked(d, (56, 28), "NO. 002 / THE SERIES", mono, MID, 3.2)
    tw = tracked_width(d, "REALITY CHECK / 03 CITIES", mono, 3.2)
    tracked(d, (W - 56 - tw, 28), "REALITY CHECK / 03 CITIES", mono, MID, 3.2)

    # title
    title = font("Anton-Regular.ttf", 170)
    d.text((50, 92), "REALITY", font=title, fill=BONE)
    d.text((50, 246), "CHECK", font=title, fill=BONE)
    # red mark
    d.rectangle([50 + d.textlength("CHECK", font=title) + 14, 246 + 74, 50 + d.textlength("CHECK", font=title) + 38, 246 + 98], fill=VERM)

    serif = font("InstrumentSerif-Italic.ttf", 52)
    d.text((56, 430), "A three-city series by noClue.", font=serif, fill=BONE)

    body = font("Archivo[wdth,wght].ttf", 19, 500)
    d.text((56, 500), "Delhi  ·  Bangalore  ·  Pune", font=body, fill=MID)

    # city chips
    chip = font("JetBrainsMono[wght].ttf", 14, 600)
    x = 56
    for label in ["PILOT TO PRODUCT", "SHIPPED LIVE", "BREAKING POINT"]:
        w = tracked_width(d, label, chip, 2.4)
        d.rectangle([x, 544, x + w + 22, 578], outline=(55, 52, 45), width=1)
        tracked(d, (x + 11, 553), label, chip, BONE, 2.4)
        x += w + 34

    # footer mark
    d.rectangle([W - 84, H - 88, W - 64, H - 68], fill=LIME)

    # grain
    rng = np.random.default_rng(9)
    arr = np.asarray(img).astype(np.int16)
    arr += rng.normal(0, 6, (H, W, 1)).astype(np.int16)
    img = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")
    out = ROOT / "assets" / "img" / "og.jpg"
    img.save(out, quality=92, optimize=True)
    print(out, out.stat().st_size)


if __name__ == "__main__":
    build()
