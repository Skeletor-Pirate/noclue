#!/usr/bin/env python3
"""Generate the noClue site textures, social card and favicon."""
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "assets" / "img"
FONTS = ROOT.parent / "realitycheck" / "fonts"
OUT_FONTS = ROOT / "assets" / "fonts"
IMG.mkdir(parents=True, exist_ok=True)

INK = (10, 10, 9)
PAPER = (242, 238, 228)
VERM = (227, 58, 27)
MUTED = (142, 139, 128)


def seamless_noise(size=1000, seed=7):
    rng = np.random.default_rng(seed)
    # low-frequency mottling, mirrored into a seamless tile
    small = rng.normal(0, 1, (size // 8, size // 8))
    mott = Image.fromarray(((small - small.min()) / np.ptp(small) * 255).astype(np.uint8))
    mott = mott.resize((size, size), Image.BICUBIC).filter(ImageFilter.GaussianBlur(6))
    m = np.asarray(mott, dtype=np.float32)
    m = (m - m.mean()) * 2.4

    fine = rng.normal(0, 1.0, (size, size)).astype(np.float32)
    fine_img = Image.fromarray(np.clip(fine * 12 + 128, 0, 255).astype(np.uint8))
    fine_img = fine_img.filter(ImageFilter.GaussianBlur(0.6))
    f = np.asarray(fine_img, dtype=np.float32) - 128

    # sparse paper fibres
    fib = Image.new("L", (size, size), 128)
    d = ImageDraw.Draw(fib)
    for _ in range(size // 3):
        x, y = rng.integers(0, size, 2)
        ln = rng.integers(8, 40)
        a = rng.normal(0, 0.5)
        dx, dy = int(np.cos(a) * ln), int(np.sin(a) * ln)
        v = int(128 + rng.normal(0, 20))
        d.line((x, y, x + dx, y + dy), fill=v, width=1)
    fib = np.asarray(fib.filter(ImageFilter.GaussianBlur(0.4)), dtype=np.float32) - 128

    base = np.zeros((size, size, 3), dtype=np.float32)
    base[:] = PAPER
    delta = m * 0.55 + f * 0.55 + fib * 0.5
    base += delta[..., None]
    paper = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8))

    # mirror into a 2x2 tile -> no visible seams
    full = Image.new("RGB", (size * 2, size * 2))
    full.paste(paper, (0, 0))
    full.paste(paper.transpose(Image.FLIP_LEFT_RIGHT), (size, 0))
    full.paste(paper.transpose(Image.FLIP_TOP_BOTTOM), (0, size))
    full.paste(paper.transpose(Image.ROTATE_180), (size, size))
    return full.filter(ImageFilter.GaussianBlur(0.2))


def grain(size=160, seed=11):
    rng = np.random.default_rng(seed)
    v = rng.integers(0, 256, (size, size), dtype=np.uint8)
    rgb = np.dstack([v, v, v])
    alpha = rng.integers(0, 46, (size, size), dtype=np.uint8)
    out = np.dstack([rgb, alpha])
    Image.fromarray(out, "RGBA").save(IMG / "grain.png", optimize=True)


def font(name, size):
    return ImageFont.truetype(str(FONTS / name), size)


def og_card():
    W, H = 1200, 630
    card = Image.new("RGB", (W, H), INK)
    paper = seamless_noise(800).resize((W, H)).convert("RGB")
    p = np.asarray(paper, dtype=np.float32)
    dark = (p * 0.055).astype(np.uint8)
    card.paste(Image.fromarray(dark), (0, 0))

    d = ImageDraw.Draw(card)
    d.line((64, 94, W - 64, 94), fill=(44, 44, 40), width=1)
    d.line((64, H - 72, W - 64, H - 72), fill=(44, 44, 40), width=1)

    d.text((64, 46), "noClue", font=font("Archivo[wdth,wght].ttf", 34), fill=PAPER)
    d.rectangle((166, 58, 178, 70), fill=VERM)
    mono = font("JetBrainsMono[wght].ttf", 14)
    mono_b = font("JetBrainsMono[wght].ttf", 15)
    d.text((W - 64, 52), "NO. 001 / A NETWORK FOR PEOPLE WHO SHIP", font=mono, fill=MUTED, anchor="ra")

    anton = font("Anton-Regular.ttf", 126)
    serif = font("InstrumentSerif-Italic.ttf", 148)

    def bb(text, f):
        b = d.textbbox((0, 0), text, font=f)
        return b[2] - b[0], b[3] - b[1], b[1], b[3]

    def draw_line(parts, baseline):
        x = 62
        for text, f, colour in parts:
            w, h, top, bottom = bb(text, f)
            d.text((x, baseline - bottom), text, font=f, fill=colour)
            x += w

    lines = [
        [("WHERE AI", anton, PAPER)],
        [("GETS ", anton, PAPER), ("built", serif, VERM)],
        [("FOR REAL", anton, PAPER)],
    ]
    baseline = 128
    for i, parts in enumerate(lines):
        heights = [bb(t, f)[1] for t, f, _ in parts]
        baseline += max(heights)
        draw_line(parts, baseline)
        if i < 2:
            baseline += 12
    # square full stop after the last line
    w, h, _, _ = bb("FOR REAL", anton)
    d.rectangle((62 + w + 14, baseline - 26, 62 + w + 40, baseline), fill=VERM)

    d.text((64, H - 54), "DELHI  ·  BANGALORE  ·  MUMBAI   —   REALITY CHECK 2026", font=mono_b, fill=PAPER)
    d.text((W - 64, H - 54), "noclue.co", font=mono_b, fill=MUTED, anchor="ra")
    card.save(IMG / "og.jpg", quality=88, optimize=True, progressive=True)


def favicon():
    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" fill="#0A0A09"/>
<g stroke="#F2EEE4" stroke-width="5.5" stroke-linecap="square">
<path d="M32 11v42"/><path d="M13.8 21.5l36.4 21"/><path d="M13.8 42.5l36.4-21"/>
</g>
<rect x="43" y="43" width="9" height="9" fill="#E33A1B"/>
</svg>
"""
    (ROOT / "favicon.svg").write_text(svg)


if __name__ == "__main__":
    paper = seamless_noise()
    paper.save(IMG / "paper.jpg", quality=83, optimize=True, progressive=True)
    grain()
    og_card()
    favicon()
    for p in [IMG / "paper.jpg", IMG / "grain.png", IMG / "og.jpg"]:
        print(p.name, f"{p.stat().st_size/1024:.0f} KB")
