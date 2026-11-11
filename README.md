# noClue — Reality Check

A static, dependency-free campaign site for **Reality Check**, the three-city series by
noClue. The visual system now follows the supplied pitch deck: warm paper, electric blue,
black, orange, pixel-poster typography, and the real city posters.

No framework. No build step. The HTML is the source.

---

## Preview

```bash
cd noclue-site
python serve.py
```

Open `http://localhost:8080`. `serve.py` is a development-only wrapper around Python's
stdlib server that sets the correct MIME type for WOFF2 fonts. Plain
`python -m http.server 8080` also works.

---

## Pages

| File | Purpose |
|---|---|
| `index.html` | Campaign home: pixel title, city posters, premise, format, partners, quote, FAQ, city picker |
| `programs.html` | The series in detail: Delhi / Bangalore / Pune briefs with external apply links |
| `partners.html` | Partner wall, why partner, partnership formats, contact |
| `manifesto.html` | The noClue beliefs and operating principles |
| `apply.html` | City chooser; sends each city to its real registration page |

Shared chrome (header, utility strip, mobile menu, footer) is duplicated per page on
purpose: no JS dependency for navigation, and no build step.

---

## Registration links

| City | Theme | Registration |
|---|---|---|
| Delhi | Pilot to Product | `https://www.commudle.com/communities/noclue/events/reality-check-delhi-edition` |
| Bangalore | Shipped Live | `https://share.goavo.ai/og/event?id=6acf13dc2c0656d24c945c9a&utm_source=share&utm_content=6acf13dc2c0656d24c945c9a&utm_term=copy&utm_medium=copy` |
| Pune | Breaking Point | `https://share.goavo.ai/og/event?id=6acf2b802c0656d24c945ca0&utm_source=share&utm_content=6acf2b802c0656d24c945ca0&utm_term=copy&utm_medium=copy` |

All city Apply buttons open these URLs in a new tab. There is no internal application
form; the registration page is the source of truth for date, venue, and capacity.

---

## Partners

| Partner | Role | Mark |
|---|---|---|
| TinyFish | Series partner | `assets/img/partners/tinyfish.png` |
| GoAvo | Platform partner | `assets/img/partners/goavo.svg` |
| Google for Developers | Ecosystem partner | `assets/img/partners/google-for-developers.svg` |
| Paytm AI | Ecosystem partner | `assets/img/partners/paytm.png` |
| DevRel Squad | Community partner | `assets/img/partners/devrel-squad.svg` |
| Neo4j | City partner — Delhi | `assets/img/partners/neo4j.svg` |
| Rezoomex | City partner — Pune | `assets/img/partners/rezoomex.png` |

The supplied logo files are used directly in `index.html` and `partners.html`. TinyFish,
Paytm, and Rezoomex were cropped/cleaned for the paper background. The DevRel mark is
labelled **DevRel Squad** as supplied.

---

## Assets

### Brand and campaign art

```
assets/img/brand/reality-check-title.png   pixel title cropped from the Delhi poster
assets/img/brand/noclue-black.png          trimmed noClue wordmark
assets/img/brand/noclue-white.png          trimmed white noClue wordmark
assets/img/brand/skyline.jpg               city skyline strip from the deck
assets/img/og.jpg                          1200×630 social card
favicon.svg                                 cream/blue pixel favicon
icon-192.png / icon-512.png                 PWA icons
apple-touch-icon.png                        180×180 touch icon
```

### City posters

```
assets/img/cities/delhi.jpg       1200×1200
assets/img/cities/bangalore.jpg   1200×1200
assets/img/cities/pune.jpg        1200×1200
```

These are the supplied posters, resized and exported for the web. The site uses them
directly; no HTML/CSS change is needed to swap a poster, as long as the filename stays the
same.

### Fonts

Self-hosted WOFF2 only:

- **Archivo** — display/headline and body sans
- **JetBrains Mono** — labels, metadata, buttons

The old Anton/Instrument Serif files were removed with the previous visual system.

---

## Design system

| Token | Value | Use |
|---|---|---|
| `--paper` | `#f4f1e7` | page ground |
| `--paper-2` | `#ece7da` | alternate section ground |
| `--ink` | `#0b0b0b` | type, rules, dark sections |
| `--blue` | `#0447ff` | primary accent, CTAs, poster shadows |
| `--orange` | `#ff5a1f` | small pixel accents |
| `--display` / `--sans` | Archivo | headlines, body |
| `--mono` | JetBrains Mono | utility text, buttons |

- Flat paper with a very light grain overlay.
- Pixel-cut corners on buttons, blue panels, and the band.
- Hard blue offset shadows on poster cards.
- Thin black rules and numbered section labels.
- City posters are the loudest visual element; logos sit on paper, full colour.
- The mobile menu is a full electric-blue panel.

---

## Interactions

### Core (`assets/js/site.js`)

- Custom blue pixel cursor (fine pointers only).
- Subtle hero title parallax.
- Magnetic primary buttons.
- Scroll-reveal via `IntersectionObserver`.
- Mobile menu with focus trap, Escape close, and body scroll lock.
- FAQ accordions with single-open behaviour.
- Reading progress bar.
- Print/no-JS: content is visible without reveal animations.

### Motion layer (`assets/js/motion.js` + `assets/css/motion.css`)

Everything below is optional chrome — the page is fully readable with JS off.

| Feature | What it does |
|---|---|
| Intro loader | Home page only. Inverted pixel title assembles on ink, progress bar, "Enter the series". Skips on internal navigation |
| Page wipe | Internal links trigger a 16-column pixel wipe (blue/ink) before navigating |
| Smooth scroll | Desktop fine pointers only: lerped scrolling, keyboard support, anchor easing |
| Pixel scrollbar | Custom 4px blue scrollbar on the right, draggable, replaces the native bar |
| Canvas pixel field | Sparse dot grid that reacts to the pointer in electric blue and drifts with scroll |
| Masked reveals | Headings split into words and rise out of per-word masks on scroll |
| Pinned city track | The three city posters travel horizontally while the page scrolls vertically (desktop); snap carousel on mobile |
| Velocity ticker | The marquee reacts to scroll speed |
| Cursor states | Contextual labels (`Apply`, `Partner`, `View`) on a shrinking blue pixel |
| Pixel button fill | Buttons fill with a checkerboard pixel grid on hover |
| Metro | A pixel train runs along the bridge in the hero skyline band |
| Nav hover swap | Nav labels roll up and a blue duplicate rolls in |
| Count-up | The `03` city counter counts up when it enters the viewport |
| FAQ height | Answers animate open/closed instead of snapping |
| Back to top | Pixel button that appears past the first viewport |
| Sound | Optional WebAudio blips on hover/click, off by default, toggle in the footer |

`prefers-reduced-motion` disables the intro, wipes, canvas field, smooth scroll, and all
reveals. Touch devices keep native scrolling and the native cursor.

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
├── vercel.json
├── favicon.svg
├── apple-touch-icon.png
├── icon-192.png / icon-512.png
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/
│   │   ├── campaign.css       visual system
│   │   └── motion.css         motion layer (intro, wipes, reveals, track)
│   ├── js/
│   │   ├── site.js            core interactions
│   │   └── motion.js          motion layer
│   ├── fonts/
│   └── img/
│       ├── brand/
│       ├── cities/
│       ├── partners/
│       ├── grain.png
│       └── og*.jpg           per-page social cards
└── .gitignore
```

`incoming/` is ignored. It is only used by the local upload helper when source assets are
being dropped into Termux.

Social cards are regenerated with:

```bash
python tools/gen_og.py
```

---

## Deployment

The site is static. On Vercel, use:

```json
{
  "framework": null,
  "buildCommand": "true",
  "installCommand": "true",
  "outputDirectory": "."
}
```

`vercel.json` is included. Push to `main`; no environment variables are required.

### Go-live checklist

- Vercel production was previously protected by **Vercel Authentication (SSO)**. Disable
  Deployment Protection for the production environment in Vercel → Project → Settings →
  Deployment Protection, or the public will be bounced to a Vercel login.
- `noclue.co` previously resolved to a **Squarespace “Domain Not Claimed”** page. Add
  `noclue.co` to the Vercel project and point DNS at Vercel before sharing the canonical
  URL.
- Until both are done, use a Vercel deployment URL from the dashboard for review.

---

## Content notes

Copy follows the **Reality Check Website: Content and Implementation Brief** (v1).

### Published facts (from the brief, section 2)

- Day format: check-in from 9:00 AM, opening at 10:00 AM, finish at 4:00 PM.
- About 100 curated seats per city (a target, not a guarantee).
- Devlution, July 2024 — 683 attendees.
- noClue community — 1,477 members.
- Delhi on Commudle. Bangalore and Pune on GoAvo.
- Contact: hello@noclue.co

### Held back until noClue confirms

These blocks exist in the markup as HTML comments and are **not published**, per the
brief's rule that a block containing a `[BRACKET]` stays hidden:

- Per-city date and venue lines on the series cards.
- The full Delhi and Pune agendas.
- The name of the product built in Bangalore.
- The three city talk forms (Delhi, Bangalore, Pune) and their links.
- Ticket price, food, filming policy, and ownership of what attendees build (FAQ).
- The two Hack-Nation India rows (182 and 127 attendees) and the credit wording
  “noClue ran the India hub editions”, pending confirmation with Hack-Nation.
- The after-event reporting commitment on the partners page.
- The partner brochure link.

### Other rules applied

- The three cities are **Delhi, Bangalore, and Pune** only. Mumbai appears nowhere.
- “Applications open” and “Apply” everywhere. Never “Register” or “Registration open”.
- Attendance is curated. Every seat is reviewed by the city's City Lead.
- The nav Apply button opens `apply.html` on every page.
- No invented numbers, names, quotes, dates, venues or prices.
- Partner wall order: series, city, ecosystem, platform, community.
- Delhi is positioned around enterprise/commercial adoption, not policy.
- Hacker House is not presented as live or dated.
- Solution Lab and Ventures are not presented as live offerings.

---

## Accessibility & performance

- Semantic landmarks, one `<h1>` per page, skip link, visible focus rings.
- Mobile menu traps focus and closes on Escape.
- FAQ uses native `<details>`/`<summary>` for no-JS behaviour.
- Contrast: body copy passes AA on paper; blue is reserved for large type and controls.
- Fonts are self-hosted and subset; no third-party requests or tracking.
- City posters are ~400 KB each; the page still works without JS.
- Respects `prefers-reduced-motion`.

---

## Credits

- Type: Archivo and JetBrains Mono — SIL Open Font License.
- City posters, partner logos, pitch deck: supplied by noClue.
- Title art and skyline strip: cropped from the supplied poster/deck.
- Social card and icons: generated from the supplied assets.
- Copy: adapted from the noClue content bank and the Reality Check campaign brief.
