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
assets/img/brand/skyline.jpg               city skyline strip from the deck (train lifted out)
assets/img/brand/metro.png                 the deck's metro train, lifted out as a sprite
assets/img/brand/film-poster.jpg           1280x720 poster for the 22-second film
assets/img/og.jpg                          1200×630 social card
favicon.svg                                 cream/blue pixel favicon
icon-192.png / icon-512.png                 PWA icons
apple-touch-icon.png                        180×180 touch icon
```

### The hero band

The strip is the deck's own cityscape, cut straight from the artwork embedded in
the PDF (a 1672x941 JPEG) instead of being re-rendered at 200 dpi and upscaled
2.8x. That upscale was the source of the softness; the shipped file is now a 2x
crop of the native pixels with the deck's leftover copy and the baked-in train
painted out.

- **Desktop / tablet**: the band is scaled (120–130%) and centred, so Delhi,
  Bangalore and Pune are all in frame at once.
- **≤980px**: the band holds on one city at a time, with the India Gate, Vidhana
  Soudha and the Pune arch each dead centre, easing between shots on a 38 s loop.
- The metro sprite is measured against the artwork (28.2% of the band, 61.3% from
  the top) so it sits exactly on the rail, and it runs on the same 38 s clock as
  the scene change, so it drifts through each city as that city holds.

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
- Click-to-play film: the YouTube player is only loaded after the play button is pressed.
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
| Metro | The real metro train from the deck artwork runs the length of the hero band |
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

- **Live domain: `buildwithnoclue.dev`** (DNS at name.com). Both `buildwithnoclue.dev`
  and `www.buildwithnoclue.dev` are attached to the Vercel project `noclue`.
- Add these records at name.com:

  | Type | Host | Answer | TTL |
  |---|---|---|---|
  | A | *(blank = apex)* | `76.76.21.21` | 300 |
  | CNAME | `www` | `cname.vercel-dns.com` | 300 |

- `.dev` is on the HSTS preload list, so the domain only serves over https.
- Vercel Authentication (SSO) protection is set to *all except custom domains*, so
  `buildwithnoclue.dev` is public while the auto-generated `*.vercel.app` alias still
  asks for a login. `https://noclue-five.vercel.app` is also public and safe to share.
- The project auto-deploys `main` of `Skeletor-Pirate/noclue`; the same history is
  mirrored to `abhinav-nautiyal/noClue-Reality-Check`.

---

## Content notes

Copy follows the **Reality Check Website: Content and Implementation Brief** (v2),
with the owner's later instructions applied on top (contact email, speaker mailto).

### Published facts (from the brief, section 2)

- Delhi — **Sunday 29 November 2026**, Paytm office.
- Bangalore — **Sunday 6 December 2026**, Paytm office.
- Pune — **Friday 4 December 2026**, venue to be revealed.
- Free to attend. Lunch and refreshments are provided by the noClue team.
- Day format: check-in from 9:00 AM, opening at 10:00 AM, finish at 4:00 PM.
- About 100 curated seats per city (a target, not a guarantee).
- Devlution, July 2024 — 683 attendees.
- Two AI hackathon editions, April and July 2026 — 309 attendees in total (182 and 127).
- noClue network — 1,600+ members. noClue is a network, never a “community”.
- Contact: build.noclue@gmail.com
- Film: [RealityCheck: The AI event for people who've actually shipped](https://www.youtube.com/watch?v=3YC5bxybglg),
  22 seconds, click-to-play on the home page (no third-party request until played).

### Held back until noClue confirms

These blocks exist in the markup as HTML comments and are **not published**, per the
brief's rule that a block containing a `[BRACKET]` stays hidden:

- The full Delhi and Pune agendas.
- The name of the product built in Bangalore.
- Ownership of what attendees build, and the filming policy (FAQ).
- The partner brochure link.

City talk submissions and speaker pitches are handled by a prefilled mailto to
`build.noclue@gmail.com`, so no unpublished bracket form is linked.

### Deliberately absent

- The registration platform names are never written in copy; Apply buttons link
  straight to the application pages and differ per city.
- No Mumbai, no invented stats, no unnamed “past partners”.
- The hackathon name is not written; the track record only states the two editions
  and their combined attendance.

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
