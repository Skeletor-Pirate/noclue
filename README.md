# noClue — Reality Check

A static, dependency-free campaign site for **Reality Check**, a three-city series by
noClue. The design follows the supplied campaign poster/deck language: near-black paper,
bone display type, vermilion accents, lime utility marks, oversized numerals, and
city-poster cards.

The site is deliberately built without a framework or build step. Open the HTML, edit,
deploy.

---

## Preview

```bash
cd noclue-site
python serve.py
```

Open `http://localhost:8080`. `serve.py` is a development-only wrapper around Python's
stdlib server that sets the right MIME type for WOFF2 fonts. Plain
`python -m http.server 8080` also works.

---

## Pages

| File | Purpose |
|---|---|
| `index.html` | Campaign home: hero, premise, three city posters, format, partners, manifesto quote, FAQ, city picker |
| `programs.html` | The series in detail: Delhi / Bangalore / Pune briefs with external apply links |
| `partners.html` | Partner wall, why partner, partnership formats, contact |
| `manifesto.html` | The noClue beliefs and operating principles |
| `apply.html` | City chooser; sends each city to its real registration page |

Shared chrome (header, mobile menu, footer) is duplicated per page on purpose: no JS
dependency for navigation, and no build step.

---

## Registration links

| City | Theme | Registration |
|---|---|---|
| Delhi | Pilot to Product | `https://www.commudle.com/communities/noclue/events/reality-check-delhi-edition` |
| Bangalore | Shipped Live | `https://share.goavo.ai/og/event?id=6acf13dc2c0656d24c945c9a&utm_source=share&utm_content=6acf13dc2c0656d24c945c9a&utm_term=copy&utm_medium=copy` |
| Pune | Breaking Point | `https://share.goavo.ai/og/event?id=6acf2b802c0656d24c945ca0&utm_source=share&utm_content=6acf2b802c0656d24c945ca0&utm_term=copy&utm_medium=copy` |

All city Apply buttons open these URLs in a new tab. There is no internal application
form anymore; the registration page is the source of truth for date, venue, and capacity.

---

## Partners

Mapping used in the partner wall:

| Partner | Role |
|---|---|
| TinyFish | Series partner |
| GoAvo | Platform partner |
| Google for Developers | Ecosystem partner |
| Paytm | Ecosystem partner |
| DevRel | Community partner |
| Neo4j | City partner — Delhi |
| Rezoomex | City partner — Pune |

The current partner marks are typographic, so the site is complete without logo files.
They can be replaced with official SVGs without changing the layout. See
**Replacing assets** below.

> Note: the brief supplied “devrel” in lowercase. It is rendered as **DevRel** here.
> Correct the name if the intended partner is DevRev or another community.

---

## Replacing assets

### City posters

The three poster images are **production placeholders** generated in the campaign's visual
language:

```
assets/img/cities/delhi.png       (4:5, 900×1125)
assets/img/cities/bangalore.png   (4:5, 900×1125)
assets/img/cities/pune.png        (4:5, 900×1125)
```

Replace any file with the official city poster, keeping the same filename and a 4:5 crop.
The site uses the `.png` files directly, so the supplied posters can drop in without
changing HTML.
No HTML or CSS changes are needed. Regenerate the placeholders with:

```bash
python tools/gen_posters.py
```

### Partner logos

The partner wall currently uses `.partner-logo` text marks. To use the supplied SVGs:

1. Put the files in `assets/img/partners/` using clear names, e.g.
   `tinyfish.svg`, `goavo.svg`, `google-for-developers.svg`, `paytm.svg`,
   `devrel.svg`, `neo4j.svg`, `rezoomex.svg`.
2. In `index.html` and `partners.html`, replace each `<span class="partner-logo …">…</span>`
   with:

   ```html
   <img class="partner-logo-img" src="assets/img/partners/tinyfish.svg"
        alt="TinyFish" loading="lazy">
   ```

3. Add this to `campaign.css` if needed:

   ```css
   .partner-logo-img{height:clamp(26px,3.2vw,44px);width:auto;max-width:220px;object-fit:contain}
   ```

Use monochrome or dark logo variants on the paper partner section. If the supplied files
are white-only, either invert them for the paper section or move the partner wall back to a
dark section.

### Social card

`assets/img/og.jpg` is the 1200×630 campaign card. Regenerate it with:

```bash
python tools/gen_og.py
```

---

## Design system

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0a0a09` | base / dark sections |
| `--paper` | `#f2eee4` | paper sections, primary buttons |
| `--verm` | `#e33a1b` | accent, rules, city themes |
| `--lime` | `#d9ff43` | primary CTA, live/utility marks |
| `--display` | Anton | headlines, city names, numerals |
| `--serif` | Instrument Serif Italic | tension words, city themes |
| `--sans` | Archivo | body |
| `--mono` | JetBrains Mono | labels, metadata, buttons |

- Grain sits above the whole page (`body::after`, soft-light) but below the menu/header.
- The paper sections use the generated `paper.jpg` texture.
- Poster cards use a 4:5 crop and a subtle scale on hover.
- City rows in the hero drive a cursor-following poster preview on fine pointers.
- The site respects `prefers-reduced-motion`.

---

## Interactions

- Custom cursor + magnetic buttons (fine pointers only).
- Hero ghost numeral and title parallax.
- Cursor-following city poster preview on the hero city index.
- Scroll-reveal on sections/cards via `IntersectionObserver`.
- Mobile menu with focus trap, Escape close, and body scroll lock.
- FAQ accordions with single-open behaviour.
- Reading progress bar and scrolled-header state.
- Print/no-JS: the page still reads; reveal states fall back to visible.

There is no live clock, form, tab switcher, or step scrollspy anymore.

---

## Structure

```
noclue-site/
├── index.html
├── programs.html
├── manifesto.html
├── partners.html
├── apply.html
├── serve.py
├── favicon.svg
├── apple-touch-icon.png
├── icon-192.png / icon-512.png
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/
│   │   └── campaign.css       one stylesheet for the whole site
│   ├── js/
│   │   └── site.js            vanilla interactions
│   ├── fonts/                 self-hosted WOFF2
│   └── img/
│       ├── cities/            three 4:5 city poster images (placeholders)
│       ├── paper.jpg          paper texture
│       ├── grain.png          film grain
│       └── og.jpg             1200×630 social card
└── tools/
    ├── gen_posters.py         regenerate city posters
    └── gen_og.py              regenerate the social card
```

---

## Deployment

The repo includes a `vercel.json` that disables the framework build and serves the static
files from the repo root:

```json
{
  "framework": null,
  "buildCommand": "true",
  "installCommand": "true",
  "outputDirectory": "."
}
```

Push to `main`; Vercel serves the static site. No environment variables are required.

---

## Content notes

- The three cities are **Delhi, Bangalore, and Pune** only. Mumbai is not part of this
  series.
- Delhi is positioned around enterprise/commercial adoption, not policy.
- Hacker House is not presented as live or dated.
- Solution Lab and Ventures are not presented as live offerings.
- No member counts, past-event names, or invented proof are used.
- Dates are not asserted on the site. City registration pages carry the latest details.
- “~100 seats” and “full day 9–4” were removed because they were not re-confirmed for this
  edition.

---

## Accessibility & performance

- Semantic landmarks, one `<h1>` per page, skip link, visible focus rings.
- Mobile menu traps focus and closes on Escape.
- FAQ uses native `<details>`/`<summary>` for no-JS behaviour.
- Contrast: body copy passes AA on ink; paper sections use dark ink. Accent red is reserved
  for labels/large type; lime is used on dark only.
- Fonts are self-hosted and subset; no third-party requests, no tracking.
- City poster placeholders are ~775 KB each. Replace with optimised files if the official
  posters are much larger.
- The page works without JS; only reveal animations and pointer effects need it.

---

## Credits

- Type: Anton, Archivo, Instrument Serif, JetBrains Mono — SIL Open Font License.
- Textures, city posters, social card, and icons: generated in `tools/`.
- Copy: adapted from the noClue content bank and the Reality Check campaign brief.
