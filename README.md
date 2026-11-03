# noClue — website

A static, dependency-free site for **noClue**: a curated network of people building with AI.
Editorial black-and-paper art direction, oversized type, rotating stamps, a city switcher,
and a working application form UI.

Built from the supplied *Website Content Bank* — no invented member counts, past-event
names, Hacker House dates, or live "Solution Lab / Ventures" claims. Anything not yet real
is labelled as direction or "in development."

---

## Preview

```bash
cd noclue-site
python serve.py
```

Open `http://localhost:8080`. `serve.py` is a development-only wrapper around Python's
stdlib server that sets the right MIME type for WOFF2 fonts. Plain
`python -m http.server 8080` also works (browsers generally accept the fallback MIME,
but may log a console warning).

No build step, no framework, no package manager.

---

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home: hero, the seven problems, the method, how it works, Reality Check, proof of work, manifesto quote, FAQ, CTA |
| `programs.html` | Reality Check 2026: premise, Delhi / Bangalore / Mumbai, call for papers, what comes next |
| `manifesto.html` | The beliefs, in long form (~350 words) |
| `partners.html` | Company pitch, partnership formats and tiers, domain experts, contact |
| `apply.html` | Application form with validation, city/role prefill from links, success state |

Shared chrome (header, mobile menu, footer) is duplicated per page on purpose: no JS
dependency for navigation, and no build step.

### Nice details

- `programs.html?…` links to `apply.html?city=delhi` / `?role=expert`; the form preselects.
- The city switcher is keyboard accessible (arrow keys, Home, End).
- The process section updates its step counter as you scroll.
- Live IST clock in the footer.
- Everything respects `prefers-reduced-motion`.
- Print / no-JS still reads: reveal animations only apply once `html.js` is set.

---

## What to change before going live

These are the only deliberate placeholders:

1. **Domain** — `https://noclue.co` appears in canonical tags, Open Graph URLs, `robots.txt`
   and `sitemap.xml`. Replace with the real domain.
2. **Email** — `hello@noclue.co` appears across all pages, mailto links and the form's
   fallback copy. Replace with the real inbox.
3. **Social links** — the footer's LinkedIn / Instagram / X links are `href="#"`. Point them
   at real profiles (or remove the column).
4. **Partner deck** — "Request the deck" opens a mailto with a subject line, because no PDF
   was supplied. Swap it for the real deck URL when it exists.
5. **Application form** — the form is front-end only. It validates and shows the confirmation
   state, but does not send anywhere. Wire it to Formspree, Netlify Forms, a serverless
   endpoint, or your ATS. See below.
6. **Dates** — the site says "November 2026" and "Reality Check 2026". The content bank did
   not give exact dates; the prior film did. Confirm before publishing.

### Wiring the form

In `apply.html`, change:

```html
<form class="form" id="applyForm" novalidate>
```

to a real action and let `site.js` skip its demo success state, or keep the current
validation and POST the values in the submit handler. The simplest options:

- **Netlify**: add `data-netlify="true"` and a hidden `form-name` input.
- **Formspree**: `action="https://formspree.io/f/XXXX" method="POST"`.
- **Custom**: `fetch(endpoint, { method: "POST", body: new FormData(form) })` and only then
  show `#applySuccess`.

The current success copy is a demo of the confirmation state. Adapt it once the form is
wired to a real inbox and response process.

---

## Structure

```
noclue-site/
├── index.html
├── programs.html
├── manifesto.html
├── partners.html
├── apply.html
├── serve.py                  (local preview only — correct font MIME types)
├── 404.html                  (optional — add on the host)
├── favicon.svg
├── apple-touch-icon.png
├── icon-192.png / icon-512.png
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/
│   │   ├── base.css          tokens, type, header, hero, footer
│   │   ├── sections.css      section system, home components
│   │   └── pages.css         subpage components + all responsive rules
│   ├── js/site.js            vanilla JS, ~250 lines
│   ├── fonts/                subset WOFF2 (Anton, Archivo, Instrument Serif, JetBrains Mono)
│   └── img/
│       ├── paper.jpg         generated paper texture (seamless mirror tile)
│       ├── grain.png         generated film grain
│       └── og.jpg            1200×630 social card
└── tools/gen_assets.py       regenerates textures, social card and favicon
```

### Design system

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0a0a09` | base / dark sections |
| `--paper` | `#f2eee4` | paper sections, primary buttons |
| `--verm` | `#e33a1b` (`#c22f13` on paper) | accent, rules, stamps |
| `--lime` | `#d9ff43` | live status only |
| `--display` | Anton | headlines, city names, numbers |
| `--serif` | Instrument Serif Italic | tension words, quotes, receipts |
| `--sans` | Archivo | body |
| `--mono` | JetBrains Mono | labels, metadata, buttons |

Grain sits above the whole page (`body::after`, soft-light). Paper sections use a generated
seamless texture. Keep both subtle; they're what stop the black from feeling like a template.

### Regenerating assets

Fonts are subset from the OFL originals in `../realitycheck/fonts`:

```bash
pyftsubset ../../../realitycheck/fonts/Anton-Regular.ttf \
  --output-file=../fonts/anton.woff2 --flavor=woff2 \
  --unicodes="U+0000-00FF,U+0100-024F,U+2000-206F,..." --layout-features='*' --no-hinting
```

Textures / OG / favicon:

```bash
cd tools
python gen_assets.py
```

Requires Pillow + numpy. The script renders the social card from the same typefaces as the
site, so it stays on-brand.

---

## Accessibility & performance

- Semantic landmarks, one `<h1>` per page, skip link, visible focus rings.
- Accordions use `aria-expanded` + `aria-controls`; tabs use the ARIA tabs pattern with
  keyboard support; the mobile menu traps attention and closes on Escape.
- Contrast: body copy and mono labels pass AA on both ink and paper. Accent red is used for
  small labels at `#c22f13` on paper and `#e33a1b` on ink.
- Fonts are self-hosted and subset: ~230 KB total. No third-party requests, no tracking.
- Images: ~460 KB paper texture, ~100 KB grain, ~55 KB OG card. All local and cacheable.
- The page works without JS; only reveal animations and interactive states need it.

---

## Content notes

- **Reality Check** uses the three-city structure from the brief: Delhi (*Pilot to Product*),
  Bangalore (*Shipped Live*), Mumbai (*Breaking Point*). Delhi is positioned around
  enterprise adoption — not policy.
- **What comes next** (showcases, Domain × AI, cross-border, Hacker House) is presented as
  direction. Hacker House has no date and says "in development."
- **Solution Lab / Ventures** are intentionally not presented as live offerings. The
  manifesto and FAQ only mention paid work as the long-term direction.
- **Past events, member counts, stats** are omitted, as requested. They belong on a separate
  page once the numbers and names are cleared for publication.
- The application form's "what can you offer" field is optional; everything else matches the
  content bank.

---

## Credits

- Type: Anton, Archivo, Instrument Serif, JetBrains Mono — SIL Open Font License.
- Textures, social card, and icons: generated in `tools/gen_assets.py`.
- Copy: adapted from the noClue content bank; manifesto expanded from the supplied belief
  statements.
