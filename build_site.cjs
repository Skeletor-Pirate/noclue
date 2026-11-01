const fs = require('fs');
const path = require('path');

const mainJsContent = `/**
 * noClue — Where AI Gets Built for Real
 * Exact WeAreDevelopers Architecture & Component Structure
 * Fully populated with noClue: Website Content Bank
 */

// Sound FX Synthesizer for tactile feedback
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }
  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(580, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }
  playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const now = this.ctx.currentTime;
    [440, 554, 659, 880].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
      gain.gain.setValueAtTime(0.04, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.1);
    });
  }
}

const sfx = new SoundFX();

// 4 Hero Headlines from noClue Content Bank
const heroHeadlines = [
  "Where AI gets built for real.",
  "AI changed what’s possible. Nobody agreed on who builds it.",
  "The people building with AI are scattered. We’re fixing that.",
  "Less hype. More shipped."
];

function renderApp() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = \`
    <!-- Top Announcement Bar (WeAreDevelopers Style) -->
    <aside class="border-b border-base-300/80 bg-base-200/90 py-2.5 px-4 font-mono text-xs tracking-wider">
      <div class="container mx-auto flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2.5 text-base-content/85">
          <span class="relative flex size-2" aria-hidden="true">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
          </span>
          <span class="font-bold text-primary">REALITY CHECK 2026</span>
          <span class="hidden text-base-content/30 sm:inline">/</span>
          <span class="hidden sm:inline">Delhi • Bangalore • Mumbai</span>
          <span class="text-base-content/60">— 100 Curated Builders per City</span>
        </div>
        <button class="inline-flex items-center gap-1 font-bold text-primary hover:underline cursor-pointer" id="btn-top-apply">
          Apply for seats &rarr;
        </button>
      </div>
    </aside>

    <!-- Header Navigation (WeAreDevelopers Exact Structure) -->
    <header class="sticky top-0 z-50 bg-base-100/80 backdrop-blur-sm border-b border-base-300/50">
      <div class="container mx-auto">
        <div class="navbar min-h-16 px-4 sm:px-6">
          <!-- Start: Logo + Mobile Menu Trigger -->
          <div class="navbar-start gap-2">
            <a class="header-logo-link inline-flex items-center gap-2 normal-case text-lg font-bold" aria-label="noClue" href="#">
              <span class="terminal-logo-mark relative inline-flex shrink-0">
                <svg class="h-6 w-auto" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="8" fill="currentColor" class="text-primary/20"/>
                  <path d="M8 10h4v12H8zm12 0h4v12h-4z" fill="currentColor" class="text-primary"/>
                  <circle cx="16" cy="16" r="3" fill="#06b6d4"/>
                </svg>
              </span>
              <span class="header-wordmark font-display font-black tracking-tight text-xl">noClue</span>
            </a>
          </div>

          <!-- Center: Desktop Menu -->
          <nav class="navbar-center hidden lg:flex" aria-label="Main">
            <ul class="menu menu-horizontal items-center gap-x-1 px-1 font-medium text-sm" role="list">
              <li><a href="#why-noclue" class="hover:text-primary transition-colors">The Problem</a></li>
              <li><a href="#how-it-works" class="hover:text-primary transition-colors">How it Works</a></li>
              <li><a href="#reality-check" class="hover:text-primary transition-colors flex items-center gap-1.5">
                Reality Check
                <span class="badge badge-primary badge-xs font-mono font-bold">2026</span>
              </a></li>
              
              <!-- Programs Dropdown -->
              <li>
                <details name="header-nav-dropdown" class="dropdown">
                  <summary class="hover:text-primary transition-colors">Programs</summary>
                  <ul class="z-[1] w-64 space-y-1 rounded-box border border-base-300/70 bg-base-100 p-2 shadow-xl" role="list">
                    <li><a href="#reality-check" class="font-semibold text-base-content">Reality Check Summits</a></li>
                    <li><a href="#what-next" class="text-base-content/80">Hacker House (Residency)</a></li>
                    <li><a href="#what-next" class="text-base-content/80">Solution Lab (Enterprise)</a></li>
                    <li><a href="#what-next" class="text-base-content/80">noClue Ventures</a></li>
                  </ul>
                </details>
              </li>

              <!-- Audiences Dropdown -->
              <li>
                <details name="header-nav-dropdown" class="dropdown">
                  <summary class="hover:text-primary transition-colors">Audiences</summary>
                  <ul class="z-[1] w-64 space-y-1 rounded-box border border-base-300/70 bg-base-100 p-2 shadow-xl" role="list">
                    <li><a href="#for-builders" class="font-semibold">For Builders</a></li>
                    <li><a href="#for-companies" class="font-semibold">For Companies & Partners</a></li>
                    <li><a href="#for-experts" class="font-semibold">For Domain Experts</a></li>
                  </ul>
                </details>
              </li>

              <li><a href="#manifesto" class="hover:text-primary transition-colors">Manifesto</a></li>
              <li><a href="#roadmap" class="hover:text-primary transition-colors">Roadmap</a></li>
              <li><a href="#faq" class="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </nav>

          <!-- End: Utilities & CTA -->
          <div class="navbar-end items-center gap-2">
            <!-- Search Button (Desktop) -->
            <button
              type="button"
              class="btn btn-circle btn-ghost"
              id="btn-open-search"
              aria-label="Open search (⌘/Ctrl + K)"
              title="Search (⌘/Ctrl + K)"
            >
              <svg class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path>
              </svg>
            </button>

            <!-- Sound Toggle -->
            <button
              type="button"
              class="btn btn-circle btn-ghost text-base-content/70 hover:text-base-content"
              id="btn-toggle-sound"
              aria-label="Toggle sound feedback"
              title="Toggle tactile sound feedback"
            >
              <svg class="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            </button>

            <!-- Primary Action -->
            <button class="btn btn-primary rounded-full px-5 shadow-sm font-semibold text-sm" id="btn-nav-apply">
              Apply to join
            </button>

            <!-- Mobile Hamburger Menu -->
            <details class="mobile-nav relative lg:hidden dropdown dropdown-end" id="mobile-nav-details">
              <summary class="btn btn-circle btn-ghost" aria-label="Open navigation">
                <svg class="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                </svg>
              </summary>

              <div class="dropdown-content z-[1] mt-3 w-80 rounded-box border border-base-300/70 bg-base-100 p-4 shadow-2xl">
                <div class="relative mb-3">
                  <input
                    id="mobile-search-input"
                    type="search"
                    placeholder="Search noClue..."
                    class="input w-full rounded-full border-2 border-primary/50 bg-base-100 pl-4 pr-10 text-sm input-md"
                  />
                </div>
                <ul class="menu menu-sm w-full gap-1">
                  <li><a href="#why-noclue" class="mobile-nav-link">The 7 Problems</a></li>
                  <li><a href="#how-it-works" class="mobile-nav-link">How it Works (System)</a></li>
                  <li><a href="#reality-check" class="mobile-nav-link font-semibold text-primary">Reality Check Summits</a></li>
                  <li><a href="#for-builders" class="mobile-nav-link">For Builders</a></li>
                  <li><a href="#for-companies" class="mobile-nav-link">For Companies & Partners</a></li>
                  <li><a href="#for-experts" class="mobile-nav-link">For Domain Experts</a></li>
                  <li><a href="#manifesto" class="mobile-nav-link">Manifesto</a></li>
                  <li><a href="#roadmap" class="mobile-nav-link">Roadmap</a></li>
                  <li><a href="#faq" class="mobile-nav-link">FAQ</a></li>
                  <li class="mt-2"><button class="btn btn-primary btn-sm rounded-full w-full" id="btn-mobile-apply">Apply to Join</button></li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <div class="min-h-dvh">
        <!-- ==========================================
             HOME STAGE (WeAreDevelopers Exact Hero Format)
             ========================================== -->
        <div id="home-stage" class="home-stage relative isolate overflow-hidden bg-base-100 text-base-content">
          <div class="container mx-auto px-6 pt-12 pb-10 md:pt-16 md:pb-12">
            <!-- Eyebrow text -->
            <div class="font-mono text-xs tracking-widest text-pretty text-primary uppercase">
              For builders, founders, engineers, and domain experts
            </div>

            <!-- Headline Selector Pills -->
            <div class="mt-4 flex flex-wrap items-center gap-2">
              <span class="font-mono text-[11px] text-base-content/50 uppercase tracking-widest mr-1">Headline Options:</span>
              ${heroHeadlines.map((h, i) => `
                <button
                  type="button"
                  class="headline-pill-tab cursor-pointer rounded-full px-3 py-1 font-mono text-xs transition-all border ${i === 0 ? 'bg-primary text-primary-content border-primary font-semibold' : 'border-base-300 text-base-content/70 hover:border-primary/50'}"
                  data-headline-index="${i}"
                >
                  Option ${i + 1}
                </button>
              `).join('')}
            </div>

            <!-- Main Dynamic Headline -->
            <h1 id="hero-dynamic-headline" class="mt-5 font-display text-[clamp(2.4rem,5.2vw,4.5rem)] leading-[0.98] font-bold tracking-tight text-balance lg:max-w-[85%]">
              ${heroHeadlines[0]}
            </h1>

            <div class="mt-6 space-y-6 xl:grid xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-x-12">
              <p class="max-w-3xl text-lg leading-snug text-balance text-base-content/70 md:text-xl xl:col-start-1">
                noClue is a curated network of builders, founders, engineers, and domain experts working with AI as a core capability. We run high-density in-person events, provide infrastructure and distribution, and turn experiments into production software.
              </p>

              <!-- Hero Search Pill Bar (WeAreDevelopers Exact Style) -->
              <div class="max-w-3xl xl:col-start-1 xl:max-w-none">
                <form class="relative group" id="hero-search-form" onsubmit="event.preventDefault(); document.getElementById('btn-open-search').click();">
                  <div class="relative">
                    <input
                      maxlength="200"
                      class="w-full input input-lg bg-base-100 text-base md:text-lg placeholder:text-base-content/60 border-2 border-primary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-all duration-300 rounded-full pl-6 pr-14 py-6 shadow-xl hover:shadow-2xl text-ellipsis"
                      placeholder="e.g. What breaks when scaling AI from 10 to 10,000 users?"
                      autocomplete="off"
                      aria-label="Search noClue system, summits, problems, or manifesto"
                      type="text"
                      id="hero-input-search"
                    />
                    <button type="submit" class="absolute right-3.5 top-1/2 -translate-y-1/2 btn btn-circle btn-primary btn-sm" aria-label="Search">
                      <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path>
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Featured Talk / Flagship Session (WeAreDevelopers Exact Component) -->
          <section aria-labelledby="featured-talk-title" class="container mx-auto px-6 pb-14 md:pb-16">
            <div class="mb-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
              <div class="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-widest uppercase">
                <span class="inline-flex items-center gap-2 text-primary font-bold">
                  <span class="size-1.5 rounded-full bg-primary" aria-hidden="true"></span>
                  Featured Flagship Session
                </span>
                <span class="hidden text-base-content/25 md:inline" aria-hidden="true">/</span>
                <span class="hidden text-base-content/60 md:inline">Reality Check Series 2026</span>
                <span class="hidden text-base-content/25 md:inline" aria-hidden="true">/</span>
                <span class="hidden text-base-content/60 md:inline">Delhi • Bangalore • Mumbai</span>
              </div>

              <a class="group inline-flex items-center gap-1 text-sm font-medium text-base-content/70 transition-colors hover:text-primary" href="#reality-check">
                All Summits & Cities <svg class="size-4 transition-transform group-hover:translate-x-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd"></path></svg>
              </a>
            </div>

            <div class="grid gap-8 xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-12">
              <!-- Left: Video Card with Authentic Controls -->
              <div class="min-w-0 self-start overflow-hidden rounded-3xl shadow-2xl ring-1 shadow-black/30 ring-base-content/10 relative group bg-neutral">
                <div class="aspect-video relative overflow-hidden bg-slate-950">
                  <img
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
                    alt="noClue Flagship Session"
                    class="size-full object-cover opacity-85 transition-transform duration-500 group-hover:scale-105"
                  />
                  <!-- Gradient overlay -->
                  <div class="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[60%] bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>

                  <!-- Badge top left -->
                  <div class="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 font-mono text-xs text-white backdrop-blur-md">
                    <span class="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>LIVE RECORDING</span>
                  </div>

                  <!-- Floating Play Button -->
                  <div class="absolute inset-0 z-10 flex items-center justify-center">
                    <button class="btn btn-circle btn-primary size-16 shadow-2xl shadow-primary/40 hover:scale-110 transition-transform cursor-pointer" id="btn-hero-play-preview" aria-label="Play preview video">
                      <svg class="size-7 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z"></path>
                      </svg>
                    </button>
                  </div>

                  <!-- Seeker Bar & Bottom Control Strip -->
                  <div class="absolute inset-x-0 bottom-0 z-20 p-4">
                    <div class="w-full bg-white/20 h-1.5 rounded-full overflow-hidden mb-2">
                      <div class="bg-primary h-full w-[42%] rounded-full"></div>
                    </div>
                    <div class="flex items-center justify-between text-xs text-white/80 font-mono">
                      <span>13:42 / 31:00</span>
                      <span class="text-white/60">Chapter 3: Stress-Testing Agents Under Failure</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right: Talk Details -->
              <div class="flex min-w-0 flex-col md:max-w-2xl xl:max-w-none">
                <div>
                  <h2 id="featured-talk-title" class="font-display text-3xl leading-[1.08] font-bold tracking-tight text-balance text-base-content md:text-4xl">
                    Turning AI Experiments into Production Software
                  </h2>

                  <!-- Speakers list -->
                  <ul class="mt-5 space-y-4" aria-label="Speakers">
                    <li>
                      <div class="flex items-center gap-4">
                        <img
                          alt="Raghav"
                          width="64"
                          height="64"
                          class="size-16 shrink-0 rounded-2xl object-cover ring-2 ring-primary/30"
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
                        />
                        <span class="min-w-0">
                          <span class="block font-display text-lg leading-snug font-bold text-base-content">Raghav & Founding Builders</span>
                          <span class="mt-0.5 block text-sm leading-snug text-base-content/60">Core Engineering · noClue Network</span>
                        </span>
                      </div>
                    </li>
                  </ul>

                  <p class="mt-5 line-clamp-4 leading-relaxed text-pretty text-base-content/70">
                    Demos are easy. Production is hard. Distribution is harder. In 2026, autonomous systems break on latency, state drift, and edge cases. noClue runs in-person rooms where the top 1% of builders stress-test real systems with real enterprise data.
                  </p>
                </div>

                <div class="mt-8 flex flex-wrap items-center gap-4 xl:mt-auto xl:pt-6">
                  <button class="btn btn-primary rounded-full px-6 gap-2" id="btn-hero-apply">
                    <svg class="size-4" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z"></path></svg>
                    Apply for seats
                  </button>
                  <button class="btn btn-outline rounded-full px-5" id="btn-hero-partner">
                    Partner with us
                  </button>
                  <span class="text-xs text-base-content/55 font-mono">
                    3 Cities · 100 Selected Practitioners Each
                  </span>
                </div>
              </div>
            </div>
          </section>

          <!-- ==========================================
               EXPLORE STRIP (4 Dashed Columns)
               ========================================== -->
          <nav aria-label="Explore noClue" class="border-t border-dashed border-base-content/15">
            <div class="container mx-auto grid grid-cols-1 divide-y divide-dashed divide-base-content/15 md:grid-cols-2 md:divide-y-0 lg:grid-cols-4 lg:divide-x">
              <a class="group px-6 py-6 transition-colors hover:bg-base-content/5 block" href="#how-it-works">
                <div class="flex items-center justify-between gap-3 font-mono text-[11px] tracking-widest text-base-content/45 uppercase">
                  The Method
                  <svg class="size-4 text-base-content/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd"></path></svg>
                </div>
                <div class="mt-2.5 font-bold transition-colors group-hover:text-primary text-base">Every step, idea to shipped</div>
                <div class="mt-1.5 text-sm text-base-content/60">From high-density summits to solution lab incubation, code reviews, and scale.</div>
              </a>

              <a class="group px-6 py-6 transition-colors hover:bg-base-content/5 block" href="#reality-check">
                <div class="flex items-center justify-between gap-3 font-mono text-[11px] tracking-widest text-base-content/45 uppercase">
                  Reality Check
                  <svg class="size-4 text-base-content/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd"></path></svg>
                </div>
                <div class="mt-2.5 font-bold transition-colors group-hover:text-primary text-base">Delhi · Bangalore · Mumbai</div>
                <div class="mt-1.5 text-sm text-base-content/60">Three cities, 100 hand-picked builders each. Real engineering, zero stage panels.</div>
              </a>

              <a class="group px-6 py-6 transition-colors hover:bg-base-content/5 block" href="#for-builders">
                <div class="flex items-center justify-between gap-3 font-mono text-[11px] tracking-widest text-base-content/45 uppercase">
                  For Builders
                  <svg class="size-4 text-base-content/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd"></path></svg>
                </div>
                <div class="mt-2.5 font-bold transition-colors group-hover:text-primary text-base">Capital, compute & distribution</div>
                <div class="mt-1.5 text-sm text-base-content/60">Access private rooms, compute credits, venture backing, and global enterprise distribution.</div>
              </a>

              <a class="group px-6 py-6 transition-colors hover:bg-base-content/5 block" href="#partnerships">
                <div class="flex items-center justify-between gap-3 font-mono text-[11px] tracking-widest text-base-content/45 uppercase">
                  For Partners
                  <svg class="size-4 text-base-content/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd"></path></svg>
                </div>
                <div class="mt-2.5 font-bold transition-colors group-hover:text-primary text-base">4 Co-builder Tiers</div>
                <div class="mt-1.5 text-sm text-base-content/60">Foundational, Ecosystem, Challenge, and Media tiers. Deploy your tools with the top 1%.</div>
              </a>
            </div>
          </nav>
        </div>

        <!-- ==========================================
             THREE-LINE PROBLEM STRIP & SUMMARY
             ========================================== -->
        <section class="border-b border-dashed border-base-content/15 bg-base-200/40 py-10 md:py-12">
          <div class="container mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-base-content">
              <div class="p-5 rounded-2xl border border-base-300/70 bg-base-100 shadow-sm">
                <span class="font-mono text-xs text-primary font-bold">01 / HYPER-INFLATION OF NOISE</span>
                <p class="mt-2 text-base font-semibold leading-snug">
                  Everyone is building with AI. Almost nobody is building anything that lasts.
                </p>
              </div>
              <div class="p-5 rounded-2xl border border-base-300/70 bg-base-100 shadow-sm">
                <span class="font-mono text-xs text-primary font-bold">02 / PROOF OF EXECUTION</span>
                <p class="mt-2 text-base font-semibold leading-snug">
                  Demos are easy. Production is hard. Distribution is harder.
                </p>
              </div>
              <div class="p-5 rounded-2xl border border-base-300/70 bg-base-100 shadow-sm">
                <span class="font-mono text-xs text-primary font-bold">03 / THE CRITICAL BRIDGE</span>
                <p class="mt-2 text-base font-semibold leading-snug">
                  The best builders are working in isolation. The best problems are trapped inside companies that don't know how to build with AI.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- ==========================================
             THE 7 CORE PROBLEMS (WeAreDevelopers "Moments" Reel)
             ========================================== -->
        <section id="why-noclue" class="py-12 md:py-16">
          <div class="container mx-auto px-6">
            <div class="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <div class="font-mono text-xs tracking-widest text-primary uppercase font-bold">Why noClue</div>
                <h2 class="mt-1 font-display text-2xl leading-tight font-bold text-base-content md:text-3xl">
                  The 7 Core Problems
                </h2>
                <p class="mt-1 leading-snug text-base-content/70">
                  Why AI needs a curated, in-person engineering network. Swipe through the industry friction points:
                </p>
              </div>
              <div class="flex items-center gap-2">
                <button class="btn btn-circle btn-ghost btn-sm border border-base-300" id="btn-reel-left" aria-label="Scroll left">&larr;</button>
                <button class="btn btn-circle btn-ghost btn-sm border border-base-300" id="btn-reel-right" aria-label="Scroll right">&rarr;</button>
              </div>
            </div>

            <!-- Horizontal Scroll Reel (WeAreDevelopers Exact Markup) -->
            <div
              id="moments-reel"
              class="-mx-6 flex min-h-[280px] snap-x snap-mandatory scroll-pl-6 scrollbar-none items-center gap-4 overflow-x-auto px-6 py-5 lg:min-h-[310px]"
            >
              <!-- Card 1 -->
              <div class="group relative h-[280px] w-80 flex-none snap-center overflow-hidden rounded-3xl bg-base-100 ring-1 ring-base-300/70 p-6 flex flex-col justify-between hover:ring-primary/50 transition-all hover:-translate-y-1 shadow-sm">
                <div>
                  <div class="flex items-center justify-between text-xs font-mono text-base-content/50">
                    <span class="text-primary font-bold">01 · Culture</span>
                    <span>2:30 min</span>
                  </div>
                  <h3 class="mt-4 font-display text-lg font-bold leading-snug text-base-content group-hover:text-primary transition-colors">
                    The ecosystem is built for talkers, not builders
                  </h3>
                  <p class="mt-2 text-sm text-base-content/65 line-clamp-3">
                    Most AI events reward stage charisma, buzzwords, and pitch decks over deployed production code, clean benchmarks, and resilience.
                  </p>
                </div>
                <div class="flex items-center justify-between text-xs text-base-content/50 border-t border-base-300/60 pt-3">
                  <span>Insight #1</span>
                  <span class="text-primary font-semibold">Culture gap &rarr;</span>
                </div>
              </div>

              <!-- Card 2 -->
              <div class="group relative h-[280px] w-80 flex-none snap-center overflow-hidden rounded-3xl bg-base-100 ring-1 ring-base-300/70 p-6 flex flex-col justify-between hover:ring-primary/50 transition-all hover:-translate-y-1 shadow-sm">
                <div>
                  <div class="flex items-center justify-between text-xs font-mono text-base-content/50">
                    <span class="text-primary font-bold">02 · Format</span>
                    <span>3:15 min</span>
                  </div>
                  <h3 class="mt-4 font-display text-lg font-bold leading-snug text-base-content group-hover:text-primary transition-colors">
                    90% of AI events are pitch competitions or vendor showcases
                  </h3>
                  <p class="mt-2 text-sm text-base-content/65 line-clamp-3">
                    Hackathons with zero follow-through and sponsored keynote stages. Real builders don't want sponsors pitching SDKs; they want code reviews and real stress tests.
                  </p>
                </div>
                <div class="flex items-center justify-between text-xs text-base-content/50 border-t border-base-300/60 pt-3">
                  <span>Insight #2</span>
                  <span class="text-primary font-semibold">Format breakdown &rarr;</span>
                </div>
              </div>

              <!-- Card 3 -->
              <div class="group relative h-[280px] w-80 flex-none snap-center overflow-hidden rounded-3xl bg-base-100 ring-1 ring-base-300/70 p-6 flex flex-col justify-between hover:ring-primary/50 transition-all hover:-translate-y-1 shadow-sm">
                <div>
                  <div class="flex items-center justify-between text-xs font-mono text-base-content/50">
                    <span class="text-primary font-bold">03 · Infrastructure</span>
                    <span>4:00 min</span>
                  </div>
                  <h3 class="mt-4 font-display text-lg font-bold leading-snug text-base-content group-hover:text-primary transition-colors">
                    Early-stage AI builders lack real infrastructure and distribution
                  </h3>
                  <p class="mt-2 text-sm text-base-content/65 line-clamp-3">
                    Getting compute credits, specialized cluster access, and distribution channels to paying users requires connections that early builders simply don't have.
                  </p>
                </div>
                <div class="flex items-center justify-between text-xs text-base-content/50 border-t border-base-300/60 pt-3">
                  <span>Insight #3</span>
                  <span class="text-primary font-semibold">Infra inequality &rarr;</span>
                </div>
              </div>

              <!-- Card 4 -->
              <div class="group relative h-[280px] w-80 flex-none snap-center overflow-hidden rounded-3xl bg-base-100 ring-1 ring-base-300/70 p-6 flex flex-col justify-between hover:ring-primary/50 transition-all hover:-translate-y-1 shadow-sm">
                <div>
                  <div class="flex items-center justify-between text-xs font-mono text-base-content/50">
                    <span class="text-primary font-bold">04 · Domain Experts</span>
                    <span>3:45 min</span>
                  </div>
                  <h3 class="mt-4 font-display text-lg font-bold leading-snug text-base-content group-hover:text-primary transition-colors">
                    Domain experts have problems worth solving but can't build with AI
                  </h3>
                  <p class="mt-2 text-sm text-base-content/65 line-clamp-3">
                    Doctors, supply-chain leaders, and legal counsels know exactly where the money and bottlenecks are, but lack the technical fluency to architect agentic workflows.
                  </p>
                </div>
                <div class="flex items-center justify-between text-xs text-base-content/50 border-t border-base-300/60 pt-3">
                  <span>Insight #4</span>
                  <span class="text-primary font-semibold">Domain disconnect &rarr;</span>
                </div>
              </div>

              <!-- Card 5 -->
              <div class="group relative h-[280px] w-80 flex-none snap-center overflow-hidden rounded-3xl bg-base-100 ring-1 ring-base-300/70 p-6 flex flex-col justify-between hover:ring-primary/50 transition-all hover:-translate-y-1 shadow-sm">
                <div>
                  <div class="flex items-center justify-between text-xs font-mono text-base-content/50">
                    <span class="text-primary font-bold">05 · Product</span>
                    <span>2:15 min</span>
                  </div>
                  <h3 class="mt-4 font-display text-lg font-bold leading-snug text-base-content group-hover:text-primary transition-colors">
                    AI engineers build technically impressive things nobody needs
                  </h3>
                  <p class="mt-2 text-sm text-base-content/65 line-clamp-3">
                    Brilliant distributed systems and RAG pipelines designed in a vacuum that solve non-existent problems because they never spoke to the end operational user.
                  </p>
                </div>
                <div class="flex items-center justify-between text-xs text-base-content/50 border-t border-base-300/60 pt-3">
                  <span>Insight #5</span>
                  <span class="text-primary font-semibold">Vacuum engineering &rarr;</span>
                </div>
              </div>

              <!-- Card 6 -->
              <div class="group relative h-[280px] w-80 flex-none snap-center overflow-hidden rounded-3xl bg-base-100 ring-1 ring-base-300/70 p-6 flex flex-col justify-between hover:ring-primary/50 transition-all hover:-translate-y-1 shadow-sm">
                <div>
                  <div class="flex items-center justify-between text-xs font-mono text-base-content/50">
                    <span class="text-primary font-bold">06 · Engineering</span>
                    <span>4:30 min</span>
                  </div>
                  <h3 class="mt-4 font-display text-lg font-bold leading-snug text-base-content group-hover:text-primary transition-colors">
                    The real work isn't prompt engineering — it's systems, evals, pipelines
                  </h3>
                  <p class="mt-2 text-sm text-base-content/65 line-clamp-3">
                    Prompting is trivial. The grueling work is latency optimization, eval frameworks, ground-truth benchmarking, structured outputs, and fault-tolerant fallbacks.
                  </p>
                </div>
                <div class="flex items-center justify-between text-xs text-base-content/50 border-t border-base-300/60 pt-3">
                  <span>Insight #6</span>
                  <span class="text-primary font-semibold">Real AI plumbing &rarr;</span>
                </div>
              </div>

              <!-- Card 7 -->
              <div class="group relative h-[280px] w-80 flex-none snap-center overflow-hidden rounded-3xl bg-base-100 ring-1 ring-base-300/70 p-6 flex flex-col justify-between hover:ring-primary/50 transition-all hover:-translate-y-1 shadow-sm">
                <div>
                  <div class="flex items-center justify-between text-xs font-mono text-base-content/50">
                    <span class="text-primary font-bold">07 · Geography</span>
                    <span>5:00 min</span>
                  </div>
                  <h3 class="mt-4 font-display text-lg font-bold leading-snug text-base-content group-hover:text-primary transition-colors">
                    The talent is in India. The infrastructure, capital, and narrative aren't.
                  </h3>
                  <p class="mt-2 text-sm text-base-content/65 line-clamp-3">
                    India builds the backbone of global enterprise software. But the capital, compute allocation, and foundational narrative remain heavily centralized in SF.
                  </p>
                </div>
                <div class="flex items-center justify-between text-xs text-base-content/50 border-t border-base-300/60 pt-3">
                  <span>Insight #7</span>
                  <span class="text-primary font-semibold">Geographic shift &rarr;</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ==========================================
             HOW IT WORKS: THE SYSTEM & 6-STEP PIPELINE (WeAreDevelopers "Latest Reads" Grid)
             ========================================== -->
        <section id="how-it-works" class="py-12 md:py-16 border-t border-dashed border-base-content/15">
          <div class="container mx-auto px-6">
            <div class="mb-10 max-w-3xl">
              <div class="font-mono text-xs tracking-widest text-primary uppercase font-bold">The Architecture</div>
              <h2 class="mt-1 font-display text-2xl md:text-3xl font-bold text-base-content">
                How It Works: The 7 Pillars & The 6-Step Pipeline
              </h2>
              <p class="mt-2 text-base-content/70">
                A disciplined engineering engine designed to convert scattered experiments into durable, production-grade AI companies.
              </p>
            </div>

            <!-- 7 System Pillars Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div class="p-6 rounded-3xl border border-base-300/70 bg-base-100 shadow-sm hover:border-primary/40 transition-colors">
                <span class="font-mono text-xs text-primary font-bold">PILLAR 01</span>
                <h3 class="mt-2 text-lg font-bold text-base-content font-display">Curated Density</h3>
                <p class="mt-2 text-sm text-base-content/70">
                  Every attendee is hand-selected. No spectator tickets, no recruiters wandering hallways, no sales pitches disguised as lightning talks.
                </p>
              </div>

              <div class="p-6 rounded-3xl border border-base-300/70 bg-base-100 shadow-sm hover:border-primary/40 transition-colors">
                <span class="font-mono text-xs text-primary font-bold">PILLAR 02</span>
                <h3 class="mt-2 text-lg font-bold text-base-content font-display">In-Person First</h3>
                <p class="mt-2 text-sm text-base-content/70">
                  High-bandwidth trust, spontaneous architectural debates, and real-time pair debugging happen in physical rooms, not asynchronous Discord threads.
                </p>
              </div>

              <div class="p-6 rounded-3xl border border-base-300/70 bg-base-100 shadow-sm hover:border-primary/40 transition-colors">
                <span class="font-mono text-xs text-primary font-bold">PILLAR 03</span>
                <h3 class="mt-2 text-lg font-bold text-base-content font-display">Problem-Backwards, Not Tech-Forward</h3>
                <p class="mt-2 text-sm text-base-content/70">
                  We don't ask "what can we build with this new API?" We ask "what breaks in an enterprise logistics pipeline and will someone pay $50k to fix it?"
                </p>
              </div>

              <div class="p-6 rounded-3xl border border-base-300/70 bg-base-100 shadow-sm hover:border-primary/40 transition-colors">
                <span class="font-mono text-xs text-primary font-bold">PILLAR 04</span>
                <h3 class="mt-2 text-lg font-bold text-base-content font-display">Production Over Prototypes</h3>
                <p class="mt-2 text-sm text-base-content/70">
                  A Jupyter notebook demo is not a milestone. Latency under load, evaluation accuracy, token cost bounds, and security guardrails are milestones.
                </p>
              </div>

              <div class="p-6 rounded-3xl border border-base-300/70 bg-base-100 shadow-sm hover:border-primary/40 transition-colors">
                <span class="font-mono text-xs text-primary font-bold">PILLAR 05</span>
                <h3 class="mt-2 text-lg font-bold text-base-content font-display">The Cross-Discipline Bridge</h3>
                <p class="mt-2 text-sm text-base-content/70">
                  Engineering excellence paired directly with seasoned domain experts who bring real-world proprietary datasets and operational friction.
                </p>
              </div>

              <div class="p-6 rounded-3xl border border-base-300/70 bg-base-100 shadow-sm hover:border-primary/40 transition-colors">
                <span class="font-mono text-xs text-primary font-bold">PILLAR 06</span>
                <h3 class="mt-2 text-lg font-bold text-base-content font-display">Skin in the Game</h3>
                <p class="mt-2 text-sm text-base-content/70">
                  Builders retain 100% of their IP and agency. When noClue backs a project through compute or capital, we align directly with builder equity.
                </p>
              </div>

              <div class="p-6 rounded-3xl border border-base-300/70 bg-base-100 shadow-sm hover:border-primary/40 transition-colors md:col-span-2 lg:col-span-3">
                <span class="font-mono text-xs text-primary font-bold">PILLAR 07</span>
                <h3 class="mt-2 text-lg font-bold text-base-content font-display">Capital and Distribution Follow Proof</h3>
                <p class="mt-2 text-sm text-base-content/70">
                  We don't raise funds on speculative slide decks. Capital, compute clusters, and enterprise customer intros are unlocked only when benchmarks and traction are verified.
                </p>
              </div>
            </div>

            <!-- The 6-Step Pipeline Strip -->
            <div class="border border-dashed border-base-300 rounded-3xl bg-base-200/40 p-6 md:p-8">
              <h3 class="font-display text-xl font-bold text-base-content mb-6">The 6-Step Pipeline</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                <div class="bg-base-100 p-4 rounded-2xl border border-base-300/60">
                  <div class="font-mono text-xs text-primary font-bold mb-1">STEP 01</div>
                  <div class="font-semibold text-sm text-base-content">Sourcing & Curation</div>
                  <div class="text-xs text-base-content/60 mt-1">Reviewing GitHub commits, deployed models, and domain credentials.</div>
                </div>
                <div class="bg-base-100 p-4 rounded-2xl border border-base-300/60">
                  <div class="font-mono text-xs text-primary font-bold mb-1">STEP 02</div>
                  <div class="font-semibold text-sm text-base-content">Reality Check</div>
                  <div class="text-xs text-base-content/60 mt-1">100 hand-picked builders in physical room. 1 day of intense technical collision.</div>
                </div>
                <div class="bg-base-100 p-4 rounded-2xl border border-base-300/60">
                  <div class="font-mono text-xs text-primary font-bold mb-1">STEP 03</div>
                  <div class="font-semibold text-sm text-base-content">Solution Lab</div>
                  <div class="text-xs text-base-content/60 mt-1">Pairing verified engineers with enterprise challenge datasets.</div>
                </div>
                <div class="bg-base-100 p-4 rounded-2xl border border-base-300/60">
                  <div class="font-mono text-xs text-primary font-bold mb-1">STEP 04</div>
                  <div class="font-semibold text-sm text-base-content">Hacker House</div>
                  <div class="text-xs text-base-content/60 mt-1">Private residency for high-conviction teams (kept private, strict build sprint).</div>
                </div>
                <div class="bg-base-100 p-4 rounded-2xl border border-base-300/60">
                  <div class="font-mono text-xs text-primary font-bold mb-1">STEP 05</div>
                  <div class="font-semibold text-sm text-base-content">Launch & Distribution</div>
                  <div class="text-xs text-base-content/60 mt-1">Enterprise pilots, early adopters, and technical showcase distribution.</div>
                </div>
                <div class="bg-base-100 p-4 rounded-2xl border border-base-300/60">
                  <div class="font-mono text-xs text-primary font-bold mb-1">STEP 06</div>
                  <div class="font-semibold text-sm text-base-content">Scale & Capital</div>
                  <div class="text-xs text-base-content/60 mt-1">noClue Ventures check deployment, US/Europe bridges, Series A readiness.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ==========================================
             PROGRAMS: REALITY CHECK MULTI-CITY SUMMITS (WeAreDevelopers "Events" 3-Card Format)
             ========================================== -->
        <section id="reality-check" class="py-16">
          <div class="container mx-auto px-6">
            <div class="mx-auto mb-14 max-w-3xl text-center">
              <div class="font-mono text-xs tracking-widest text-primary uppercase font-bold mb-2">Flagship Programs</div>
              <h2 class="font-display text-4xl tracking-tight text-balance md:text-5xl font-bold text-base-content">
                Reality Check Series 2026
              </h2>
              <p class="mt-3 text-base leading-relaxed text-base-content/70 md:text-lg">
                Bengaluru. Delhi NCR. Mumbai.
              </p>
            </div>

            <!-- 3 City Cards (Exact WeAreDevelopers Event Cards) -->
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <!-- Card 1: Bengaluru -->
              <div class="group card relative h-full rounded-3xl border border-base-300/60 bg-base-100/90 shadow-sm transition-colors hover:border-primary/50">
                <div class="card-body gap-0 p-6">
                  <div class="mb-4 flex items-center justify-between gap-3">
                    <span class="event-card-region-pill shrink-0 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-emerald-600 text-white">
                      CORE ENGINEERING
                    </span>
                    <span class="font-mono text-xs text-base-content/50">100 BUILDERS</span>
                  </div>

                  <h3 class="mb-2 card-title items-start font-display text-xl leading-7 font-bold text-base-content group-hover:text-primary">
                    <a href="#reality-check" class="after:absolute after:inset-0 after:rounded-3xl">Reality Check Bengaluru</a>
                  </h3>

                  <div class="mb-4 flex items-start gap-2 text-base-content/60">
                    <svg class="mt-0.5 size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <div class="text-sm">
                      <div class="font-medium text-base-content">Bengaluru, India</div>
                      <div class="mt-1 text-xs text-base-content/60">May 2026 · Full-Day Technical Summit</div>
                    </div>
                  </div>

                  <p class="text-sm text-base-content/75 mb-4 line-clamp-3">
                    The Builders' Edition. Autonomous systems, models, evals, state management, latency reduction, and GPU orchestration. Zero generic panels.
                  </p>

                  <div class="mb-6">
                    <div class="flex items-center gap-2">
                      <div class="flex -space-x-2.5">
                        <img class="size-7 rounded-full object-cover ring-2 ring-base-100" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80" alt="Builder" />
                        <img class="size-7 rounded-full object-cover ring-2 ring-base-100" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" alt="Builder" />
                        <img class="size-7 rounded-full object-cover ring-2 ring-base-100" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&q=80" alt="Builder" />
                        <img class="size-7 rounded-full object-cover ring-2 ring-base-100" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80" alt="Builder" />
                      </div>
                      <span class="text-xs text-base-content/60">44 builders confirmed</span>
                    </div>
                  </div>

                  <div class="relative z-10 mt-auto card-actions items-center justify-between">
                    <button class="btn btn-primary rounded-full px-5 text-sm btn-sm" onclick="window.openApplyModal('Bengaluru (Core Engineering)')">
                      Apply for seats
                    </button>
                    <button class="btn btn-ghost rounded-full text-xs font-mono" onclick="window.openCfpModal('Bengaluru')">
                      Submit Talk (CFP)
                    </button>
                  </div>
                </div>
              </div>

              <!-- Card 2: Delhi NCR -->
              <div class="group card relative h-full rounded-3xl border border-base-300/60 bg-base-100/90 shadow-sm transition-colors hover:border-primary/50">
                <div class="card-body gap-0 p-6">
                  <div class="mb-4 flex items-center justify-between gap-3">
                    <span class="event-card-region-pill shrink-0 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-violet-600 text-white">
                      COMMERCIAL & ENTERPRISE
                    </span>
                    <span class="font-mono text-xs text-base-content/50">100 BUILDERS</span>
                  </div>

                  <h3 class="mb-2 card-title items-start font-display text-xl leading-7 font-bold text-base-content group-hover:text-primary">
                    <a href="#reality-check" class="after:absolute after:inset-0 after:rounded-3xl">Reality Check Delhi NCR</a>
                  </h3>

                  <div class="mb-4 flex items-start gap-2 text-base-content/60">
                    <svg class="mt-0.5 size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <div class="text-sm">
                      <div class="font-medium text-base-content">Delhi NCR, India</div>
                      <div class="mt-1 text-xs text-base-content/60">July 2026 · Full-Day Technical Summit</div>
                    </div>
                  </div>

                  <p class="text-sm text-base-content/75 mb-4 line-clamp-3">
                    The Enterprise & Commercial Edition. Operational AI in production: logistics, fintech, supply chain, B2B SaaS, and operational automation.
                  </p>

                  <div class="mb-6">
                    <div class="flex items-center gap-2">
                      <div class="flex -space-x-2.5">
                        <img class="size-7 rounded-full object-cover ring-2 ring-base-100" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80" alt="Builder" />
                        <img class="size-7 rounded-full object-cover ring-2 ring-base-100" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" alt="Builder" />
                        <img class="size-7 rounded-full object-cover ring-2 ring-base-100" src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&q=80" alt="Builder" />
                        <img class="size-7 rounded-full object-cover ring-2 ring-base-100" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80" alt="Builder" />
                      </div>
                      <span class="text-xs text-base-content/60">38 builders confirmed</span>
                    </div>
                  </div>

                  <div class="relative z-10 mt-auto card-actions items-center justify-between">
                    <button class="btn btn-primary rounded-full px-5 text-sm btn-sm" onclick="window.openApplyModal('Delhi NCR (Enterprise AI)')">
                      Apply for seats
                    </button>
                    <button class="btn btn-ghost rounded-full text-xs font-mono" onclick="window.openCfpModal('Delhi NCR')">
                      Submit Talk (CFP)
                    </button>
                  </div>
                </div>
              </div>

              <!-- Card 3: Mumbai -->
              <div class="group card relative h-full rounded-3xl border border-base-300/60 bg-base-100/90 shadow-sm transition-colors hover:border-primary/50">
                <div class="card-body gap-0 p-6">
                  <div class="mb-4 flex items-center justify-between gap-3">
                    <span class="event-card-region-pill shrink-0 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-blue-600 text-white">
                      SCALE & CAPITAL
                    </span>
                    <span class="font-mono text-xs text-base-content/50">100 BUILDERS</span>
                  </div>

                  <h3 class="mb-2 card-title items-start font-display text-xl leading-7 font-bold text-base-content group-hover:text-primary">
                    <a href="#reality-check" class="after:absolute after:inset-0 after:rounded-3xl">Reality Check Mumbai</a>
                  </h3>

                  <div class="mb-4 flex items-start gap-2 text-base-content/60">
                    <svg class="mt-0.5 size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <div class="text-sm">
                      <div class="font-medium text-base-content">Mumbai, India</div>
                      <div class="mt-1 text-xs text-base-content/60">September 2026 · Full-Day Technical Summit</div>
                    </div>
                  </div>

                  <p class="text-sm text-base-content/75 mb-4 line-clamp-3">
                    The Scale & Capital Edition. Scaling to millions of inference calls, global distribution, institutional funding, and media/entertainment AI.
                  </p>

                  <div class="mb-6">
                    <div class="flex items-center gap-2">
                      <div class="flex -space-x-2.5">
                        <img class="size-7 rounded-full object-cover ring-2 ring-base-100" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80" alt="Builder" />
                        <img class="size-7 rounded-full object-cover ring-2 ring-base-100" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80" alt="Builder" />
                        <img class="size-7 rounded-full object-cover ring-2 ring-base-100" src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&q=80" alt="Builder" />
                        <img class="size-7 rounded-full object-cover ring-2 ring-base-100" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80" alt="Builder" />
                      </div>
                      <span class="text-xs text-base-content/60">32 builders confirmed</span>
                    </div>
                  </div>

                  <div class="relative z-10 mt-auto card-actions items-center justify-between">
                    <button class="btn btn-primary rounded-full px-5 text-sm btn-sm" onclick="window.openApplyModal('Mumbai (Scale & Capital)')">
                      Apply for seats
                    </button>
                    <button class="btn btn-ghost rounded-full text-xs font-mono" onclick="window.openCfpModal('Mumbai')">
                      Submit Talk (CFP)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Big Video Teaser & Hall of Fame Grid (WeAreDevelopers Exact Component) -->
            <div class="mt-8 overflow-hidden rounded-4xl border border-base-300/70 bg-base-100 shadow-sm md:mt-10">
              <div class="grid lg:grid-cols-[1.08fr_0.92fr]">
                <!-- Left video / showcase -->
                <div class="relative min-h-[300px] overflow-hidden border-b border-base-300/70 bg-neutral lg:min-h-full lg:border-r lg:border-b-0">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                    alt="Reality Check Summit In-Person Collision"
                    class="absolute inset-0 size-full object-cover opacity-80"
                  />
                  <div class="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/45 to-primary/20"></div>

                  <div class="absolute top-5 left-5 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-mono tracking-widest text-white/90 uppercase backdrop-blur-sm">
                    Reality Check Series
                  </div>

                  <div class="absolute inset-x-6 bottom-6 max-w-md">
                    <p class="font-display text-2xl leading-tight font-bold text-white md:text-3xl">
                      300 builders. Zero stage fluff. The systems your team ships for real.
                    </p>
                    <p class="mt-2 text-sm leading-relaxed text-white/80 md:text-base">
                      Three cities. Curated rooms. High-bandwidth engineering.
                    </p>
                  </div>
                </div>

                <!-- Right: Core Advisory & Contributor Network ("Hall of Fame") -->
                <div class="p-6 md:p-8">
                  <p class="text-xs font-mono font-bold tracking-widest text-primary uppercase">Advisory & Core Network</p>
                  <h3 class="mt-2 font-display text-2xl font-bold tracking-tight text-base-content md:text-3xl">
                    Engineers Shaping Production AI
                  </h3>
                  <p class="mt-2 text-sm leading-relaxed text-base-content/70">
                    Practitioners leading model development, distributed inference, agent evals, and enterprise workflows.
                  </p>

                  <div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div class="flex items-center gap-3 rounded-2xl border border-base-300/70 bg-base-100 p-2.5">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80" class="size-11 rounded-xl object-cover" alt="Raghav" />
                      <div class="min-w-0">
                        <div class="line-clamp-1 font-bold text-sm text-base-content">Raghav</div>
                        <div class="line-clamp-1 text-xs text-base-content/60">Core Architecture · noClue</div>
                      </div>
                    </div>

                    <div class="flex items-center gap-3 rounded-2xl border border-base-300/70 bg-base-100 p-2.5">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80" class="size-11 rounded-xl object-cover" alt="Aditya" />
                      <div class="min-w-0">
                        <div class="line-clamp-1 font-bold text-sm text-base-content">Aditya N.</div>
                        <div class="line-clamp-1 text-xs text-base-content/60">Agent Infrastructure</div>
                      </div>
                    </div>

                    <div class="flex items-center gap-3 rounded-2xl border border-base-300/70 bg-base-100 p-2.5">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" class="size-11 rounded-xl object-cover" alt="Priya" />
                      <div class="min-w-0">
                        <div class="line-clamp-1 font-bold text-sm text-base-content">Priya S.</div>
                        <div class="line-clamp-1 text-xs text-base-content/60">Evals & Benchmark Lead</div>
                      </div>
                    </div>

                    <div class="flex items-center gap-3 rounded-2xl border border-base-300/70 bg-base-100 p-2.5">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80" class="size-11 rounded-xl object-cover" alt="Karthik" />
                      <div class="min-w-0">
                        <div class="line-clamp-1 font-bold text-sm text-base-content">Karthik R.</div>
                        <div class="line-clamp-1 text-xs text-base-content/60">Enterprise LLM Systems</div>
                      </div>
                    </div>

                    <div class="flex items-center gap-3 rounded-2xl border border-base-300/70 bg-base-100 p-2.5">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80" class="size-11 rounded-xl object-cover" alt="Dr. Meera" />
                      <div class="min-w-0">
                        <div class="line-clamp-1 font-bold text-sm text-base-content">Dr. Meera K.</div>
                        <div class="line-clamp-1 text-xs text-base-content/60">Healthcare AI Domain Lead</div>
                      </div>
                    </div>

                    <div class="flex items-center gap-3 rounded-2xl border border-base-300/70 bg-base-100 p-2.5">
                      <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&q=80" class="size-11 rounded-xl object-cover" alt="Vikram" />
                      <div class="min-w-0">
                        <div class="line-clamp-1 font-bold text-sm text-base-content">Vikram D.</div>
                        <div class="line-clamp-1 text-xs text-base-content/60">Fintech Inference Systems</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- What Comes Next: Horizon Programs -->
            <div id="what-next" class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="p-6 rounded-3xl border border-dashed border-base-300 bg-base-100">
                <span class="font-mono text-xs text-primary font-bold">HORIZON 01</span>
                <h4 class="font-display font-bold text-lg mt-1">Hacker House (Residency)</h4>
                <p class="text-sm text-base-content/70 mt-2">
                  A high-intensity, fully sponsored physical residency for 20 high-conviction builders. Strict shipping milestones, zero press distractions.
                </p>
                <div class="mt-4 text-xs font-mono text-base-content/50">Private cohorts · By invitation</div>
              </div>

              <div class="p-6 rounded-3xl border border-dashed border-base-300 bg-base-100">
                <span class="font-mono text-xs text-primary font-bold">HORIZON 02</span>
                <h4 class="font-display font-bold text-lg mt-1">Solution Lab</h4>
                <p class="text-sm text-base-content/70 mt-2">
                  Matching vetted AI engineers with forward-leaning enterprise teams. Turn proprietary friction into production-deployed software.
                </p>
                <div class="mt-4 text-xs font-mono text-base-content/50">Directional Program · Challenge matching</div>
              </div>

              <div class="p-6 rounded-3xl border border-dashed border-base-300 bg-base-100">
                <span class="font-mono text-xs text-primary font-bold">HORIZON 03</span>
                <h4 class="font-display font-bold text-lg mt-1">noClue Ventures</h4>
                <p class="text-sm text-base-content/70 mt-2">
                  Deploying high-conviction pre-seed checks into standout systems emerging from our summits and residency rooms.
                </p>
                <div class="mt-4 text-xs font-mono text-base-content/50">Directional Horizon · Builder equity</div>
              </div>
            </div>
          </div>
        </section>

        <!-- ==========================================
             PARTNERSHIPS: 4 PARTNER TIERS (WeAreDevelopers "Sponsored" Strip)
             ========================================== -->
        <section id="partnerships" class="border-y border-dashed border-base-300 bg-base-200/45 py-12 md:py-16">
          <div class="container mx-auto px-6">
            <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div class="font-mono text-xs tracking-widest text-primary uppercase font-bold">Partnerships</div>
                <h2 class="font-display text-2xl md:text-3xl font-bold text-base-content mt-1">
                  The 4 Co-Builder Partner Tiers
                </h2>
                <p class="text-base-content/70 mt-1">
                  We don't take passive logo sponsors. Every partner brings real infrastructure, datasets, or compute.
                </p>
              </div>
              <button class="btn btn-outline rounded-full btn-sm font-mono text-xs" id="btn-partner-deck">
                Download Partner Deck &rarr;
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <!-- Tier 1 -->
              <div class="flex flex-col rounded-3xl border border-base-300/70 bg-base-100 p-5 shadow-sm hover:border-primary/40 transition-all">
                <div class="flex h-28 items-center justify-center rounded-2xl bg-base-200/70 mb-4">
                  <div class="size-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono font-bold text-lg">
                    [T1]
                  </div>
                </div>
                <span class="font-mono text-xs text-primary font-bold">FOUNDATIONAL</span>
                <h3 class="font-display text-base font-bold text-base-content mt-1">Compute & Model Infrastructure</h3>
                <p class="text-xs text-base-content/70 mt-2 flex-1">
                  Cloud providers and frontier AI labs providing direct GPU credits, dedicated inference endpoints, and early API access.
                </p>
                <div class="mt-4 pt-3 border-t border-base-300/50 flex items-center justify-between text-xs font-mono text-base-content/60">
                  <span>Capacity</span>
                  <span class="text-primary font-bold">Limited (3)</span>
                </div>
              </div>

              <!-- Tier 2 -->
              <div class="flex flex-col rounded-3xl border border-base-300/70 bg-base-100 p-5 shadow-sm hover:border-primary/40 transition-all">
                <div class="flex h-28 items-center justify-center rounded-2xl bg-base-200/70 mb-4">
                  <div class="size-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-mono font-bold text-lg">
                    [T2]
                  </div>
                </div>
                <span class="font-mono text-xs text-cyan-400 font-bold">ECOSYSTEM</span>
                <h3 class="font-display text-base font-bold text-base-content mt-1">Tooling & Frameworks</h3>
                <p class="text-xs text-base-content/70 mt-2 flex-1">
                  Vector databases, eval suites, observability platforms, agent orchestrators. Embedded directly in live hacker sessions.
                </p>
                <div class="mt-4 pt-3 border-t border-base-300/50 flex items-center justify-between text-xs font-mono text-base-content/60">
                  <span>Capacity</span>
                  <span class="text-cyan-400 font-bold">6 Partners</span>
                </div>
              </div>

              <!-- Tier 3 -->
              <div class="flex flex-col rounded-3xl border border-base-300/70 bg-base-100 p-5 shadow-sm hover:border-primary/40 transition-all">
                <div class="flex h-28 items-center justify-center rounded-2xl bg-base-200/70 mb-4">
                  <div class="size-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 font-mono font-bold text-lg">
                    [T3]
                  </div>
                </div>
                <span class="font-mono text-xs text-violet-400 font-bold">CHALLENGE</span>
                <h3 class="font-display text-base font-bold text-base-content mt-1">Enterprise Datasets & Friction</h3>
                <p class="text-xs text-base-content/70 mt-2 flex-1">
                  Enterprises bringing high-value operational bottlenecks. Vetted builders compete to solve real enterprise use cases.
                </p>
                <div class="mt-4 pt-3 border-t border-base-300/50 flex items-center justify-between text-xs font-mono text-base-content/60">
                  <span>Capacity</span>
                  <span class="text-violet-400 font-bold">Per City Track</span>
                </div>
              </div>

              <!-- Tier 4 -->
              <div class="flex flex-col rounded-3xl border border-base-300/70 bg-base-100 p-5 shadow-sm hover:border-primary/40 transition-all">
                <div class="flex h-28 items-center justify-center rounded-2xl bg-base-200/70 mb-4">
                  <div class="size-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono font-bold text-lg">
                    [T4]
                  </div>
                </div>
                <span class="font-mono text-xs text-emerald-400 font-bold">COMMUNITY & MEDIA</span>
                <h3 class="font-display text-base font-bold text-base-content mt-1">Reach & Global Distribution</h3>
                <p class="text-xs text-base-content/70 mt-2 flex-1">
                  Developer communities, technical publications, and podcasts covering verified benchmarks and builder stories.
                </p>
                <div class="mt-4 pt-3 border-t border-base-300/50 flex items-center justify-between text-xs font-mono text-base-content/60">
                  <span>Distribution</span>
                  <span class="text-emerald-400 font-bold">Global Reach</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ==========================================
             THE THREE AUDIENCES (WeAreDevelopers "Who's Hiring" 3-Column Dashed Format)
             ========================================== -->
        <section class="py-16">
          <div class="container mx-auto px-6">
            <div class="mb-10 text-center max-w-2xl mx-auto">
              <div class="font-mono text-xs tracking-widest text-primary uppercase font-bold">Stakeholders</div>
              <h2 class="font-display text-3xl md:text-4xl font-bold text-base-content mt-1">
                Who noClue is Built For
              </h2>
              <p class="text-base-content/70 mt-2">
                Three specialized communities intersecting in high-density physical rooms.
              </p>
            </div>

            <div class="grid gap-6 lg:grid-cols-3">
              <!-- Column 1: For Builders -->
              <section id="for-builders" class="flex flex-col border border-dashed border-base-300 rounded-3xl p-6 bg-base-100">
                <div class="border-b border-dashed border-base-300 pb-4 mb-4">
                  <span class="font-mono text-xs text-primary font-bold">AUDIENCE 01</span>
                  <h3 class="text-xl font-bold font-display text-base-content mt-1">For Builders & Engineers</h3>
                  <p class="text-sm text-base-content/60 mt-1">Engineers building real models, agents, and systems.</p>
                </div>
                <ul class="space-y-3 flex-1 text-sm text-base-content/80">
                  <li class="flex items-start gap-2.5">
                    <span class="text-primary font-bold">&check;</span>
                    <span><strong>Curated Rooms:</strong> Zero networking tourists. Only builders who ship code.</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="text-primary font-bold">&check;</span>
                    <span><strong>Compute Grants:</strong> Direct GPU access, frontier API credits, and fine-tuning infra.</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="text-primary font-bold">&check;</span>
                    <span><strong>Enterprise Friction:</strong> Work on high-value problems that enterprises will actually pay for.</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="text-primary font-bold">&check;</span>
                    <span><strong>Distribution & Capital:</strong> Direct bridge to early customers and noClue Ventures funding.</span>
                  </li>
                </ul>
                <div class="pt-6 border-t border-dashed border-base-300 mt-6">
                  <button class="btn btn-primary rounded-full w-full" onclick="window.openApplyModal('Builder')">
                    Apply as a Builder &rarr;
                  </button>
                </div>
              </section>

              <!-- Column 2: For Companies & Partners -->
              <section id="for-companies" class="flex flex-col border border-dashed border-base-300 rounded-3xl p-6 bg-base-100">
                <div class="border-b border-dashed border-base-300 pb-4 mb-4">
                  <span class="font-mono text-xs text-cyan-400 font-bold">AUDIENCE 02</span>
                  <h3 class="text-xl font-bold font-display text-base-content mt-1">For Companies & Partners</h3>
                  <p class="text-sm text-base-content/60 mt-1">Enterprises and tech providers deploying AI.</p>
                </div>
                <ul class="space-y-3 flex-1 text-sm text-base-content/80">
                  <li class="flex items-start gap-2.5">
                    <span class="text-cyan-400 font-bold">&check;</span>
                    <span><strong>Top 1% Talent Access:</strong> Access engineers who know how to solve real latency & state challenges.</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="text-cyan-400 font-bold">&check;</span>
                    <span><strong>Solution Lab Co-Building:</strong> Bring messy enterprise datasets; watch prototype solutions deploy.</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="text-cyan-400 font-bold">&check;</span>
                    <span><strong>Tooling Adoption:</strong> Developers stress-test your SDKs, vector databases, and APIs in production.</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="text-cyan-400 font-bold">&check;</span>
                    <span><strong>High-Signal Recruitment:</strong> Hire engineers based on deployed code, not resume bullet points.</span>
                  </li>
                </ul>
                <div class="pt-6 border-t border-dashed border-base-300 mt-6">
                  <button class="btn btn-outline rounded-full w-full" onclick="window.openPartnerModal()">
                    Partner With noClue &rarr;
                  </button>
                </div>
              </section>

              <!-- Column 3: For Domain Experts -->
              <section id="for-experts" class="flex flex-col border border-dashed border-base-300 rounded-3xl p-6 bg-base-100">
                <div class="border-b border-dashed border-base-300 pb-4 mb-4">
                  <span class="font-mono text-xs text-violet-400 font-bold">AUDIENCE 03</span>
                  <h3 class="text-xl font-bold font-display text-base-content mt-1">For Domain Experts</h3>
                  <p class="text-sm text-base-content/60 mt-1">Operators in healthcare, logistics, legal, and finance.</p>
                </div>
                <ul class="space-y-3 flex-1 text-sm text-base-content/80">
                  <li class="flex items-start gap-2.5">
                    <span class="text-violet-400 font-bold">&check;</span>
                    <span><strong>Bring The Real Problem:</strong> You understand the workflow bottlenecks; engineers understand the models.</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="text-violet-400 font-bold">&check;</span>
                    <span><strong>No Technical Barrier:</strong> You don't need to write CUDA or PyTorch. We pair you with elite builders.</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="text-violet-400 font-bold">&check;</span>
                    <span><strong>Monetize Expertise:</strong> Co-found AI-native ventures or advise enterprise tracks with real equity.</span>
                  </li>
                  <li class="flex items-start gap-2.5">
                    <span class="text-violet-400 font-bold">&check;</span>
                    <span><strong>Private In-Person Sessions:</strong> Closed-door roundtables focused strictly on domain feasibility.</span>
                  </li>
                </ul>
                <div class="pt-6 border-t border-dashed border-base-300 mt-6">
                  <button class="btn btn-outline rounded-full w-full" onclick="window.openApplyModal('Domain Expert')">
                    Apply as Domain Expert &rarr;
                  </button>
                </div>
              </section>
            </div>
          </div>
        </section>

        <!-- ==========================================
             MANIFESTO: 8 CORE BELIEFS
             ========================================== -->
        <section id="manifesto" class="py-16 border-t border-dashed border-base-content/15 bg-base-200/30">
          <div class="container mx-auto px-6">
            <div class="max-w-3xl mb-12">
              <div class="font-mono text-xs tracking-widest text-primary uppercase font-bold">Manifesto</div>
              <h2 class="font-display text-3xl md:text-4xl font-bold text-base-content mt-1">
                The 8 Core Beliefs of noClue
              </h2>
              <p class="text-base-content/70 mt-2">
                Written to show the method, not to sound like a community brochure.
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="p-6 rounded-3xl border border-base-300/70 bg-base-100 shadow-sm">
                <span class="font-mono text-xs text-primary font-bold">BELIEF 01</span>
                <h3 class="font-display text-lg font-bold text-base-content mt-1">Demos are easy. Production is hard.</h3>
                <p class="text-sm text-base-content/70 mt-2">
                  Anyone can connect an LLM API and generate impressive samples. Building systems that handle edge cases, latency spikes, and schema drift is where real value is created.
                </p>
              </div>

              <div class="p-6 rounded-3xl border border-base-300/70 bg-base-100 shadow-sm">
                <span class="font-mono text-xs text-primary font-bold">BELIEF 02</span>
                <h3 class="font-display text-lg font-bold text-base-content mt-1">In-person density compounds faster than Discord.</h3>
                <p class="text-sm text-base-content/70 mt-2">
                  Digital groups suffer from signal dilution and passive lurking. When 100 serious builders sit in one physical space, architectural breakthroughs happen in hours.
                </p>
              </div>

              <div class="p-6 rounded-3xl border border-base-300/70 bg-base-100 shadow-sm">
                <span class="font-mono text-xs text-primary font-bold">BELIEF 03</span>
                <h3 class="font-display text-lg font-bold text-base-content mt-1">Technology without domain pain is a toy.</h3>
                <p class="text-sm text-base-content/70 mt-2">
                  We don't celebrate tech demos looking for a problem. We start with the operational bottleneck inside a real enterprise and build backward to the model.
                </p>
              </div>

              <div class="p-6 rounded-3xl border border-base-300/70 bg-base-100 shadow-sm">
                <span class="font-mono text-xs text-primary font-bold">BELIEF 04</span>
                <h3 class="font-display text-lg font-bold text-base-content mt-1">India is the factory of global AI logic.</h3>
                <p class="text-sm text-base-content/70 mt-2">
                  India’s engineers already power global tech stacks. noClue provides the infrastructure, network density, and narrative to own the global frontier.
                </p>
              </div>

              <div class="p-6 rounded-3xl border border-base-300/70 bg-base-100 shadow-sm">
                <span class="font-mono text-xs text-primary font-bold">BELIEF 05</span>
                <h3 class="font-display text-lg font-bold text-base-content mt-1">Curation is our only non-negotiable metric.</h3>
                <p class="text-sm text-base-content/70 mt-2">
                  We will never sell general admission tickets. Every seat is earned through technical review, deployed proof-of-work, or domain operational leadership.
                </p>
              </div>

              <div class="p-6 rounded-3xl border border-base-300/70 bg-base-100 shadow-sm">
                <span class="font-mono text-xs text-primary font-bold">BELIEF 06</span>
                <h3 class="font-display text-lg font-bold text-base-content mt-1">Builders own their upside completely.</h3>
                <p class="text-sm text-base-content/70 mt-2">
                  We are not an incubator taking 10% for a handshake. Builders keep 100% of what they create. When we invest, we invest on fair commercial terms.
                </p>
              </div>

              <div class="p-6 rounded-3xl border border-base-300/70 bg-base-100 shadow-sm">
                <span class="font-mono text-xs text-primary font-bold">BELIEF 07</span>
                <h3 class="font-display text-lg font-bold text-base-content mt-1">Evals, data pipelines, and telemetry matter most.</h3>
                <p class="text-sm text-base-content/70 mt-2">
                  The glamour of generative AI is in the generation; the longevity is in regression testing, continuous evals, data pipelines, and defensive system design.
                </p>
              </div>

              <div class="p-6 rounded-3xl border border-base-300/70 bg-base-100 shadow-sm">
                <span class="font-mono text-xs text-primary font-bold">BELIEF 08</span>
                <h3 class="font-display text-lg font-bold text-base-content mt-1">Proof precedes capital.</h3>
                <p class="text-sm text-base-content/70 mt-2">
                  Pitch decks are easy to generate. Working software deployed to production users is the only currency that unlocks our capital and global bridges.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- ==========================================
             ROADMAP: 7 EVOLUTIONARY LAYERS
             ========================================== -->
        <section id="roadmap" class="py-16">
          <div class="container mx-auto px-6">
            <div class="max-w-3xl mb-12">
              <div class="font-mono text-xs tracking-widest text-primary uppercase font-bold">Evolution</div>
              <h2 class="font-display text-3xl md:text-4xl font-bold text-base-content mt-1">
                Roadmap: Where This is Going
              </h2>
              <p class="text-base-content/70 mt-2">
                The 7 systemic layers of noClue's multi-year compounding engine.
              </p>
            </div>

            <div class="space-y-4">
              <div class="p-5 rounded-2xl border border-base-300/70 bg-base-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <span class="font-mono font-bold text-sm text-primary px-3 py-1 rounded-full bg-primary/10">LAYER 01</span>
                  <div>
                    <h4 class="font-display font-bold text-base text-base-content">In-Person Summits & Density</h4>
                    <p class="text-sm text-base-content/65">Reality Check Delhi, Bangalore, Mumbai. Proof of curation.</p>
                  </div>
                </div>
                <span class="badge badge-success badge-sm font-mono font-bold">ACTIVE (2026)</span>
              </div>

              <div class="p-5 rounded-2xl border border-base-300/70 bg-base-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <span class="font-mono font-bold text-sm text-cyan-400 px-3 py-1 rounded-full bg-cyan-400/10">LAYER 02</span>
                  <div>
                    <h4 class="font-display font-bold text-base text-base-content">Private Peer Network & Knowledge Engine</h4>
                    <p class="text-sm text-base-content/65">Ongoing technical collaboration, code reviews, and shared benchmark data.</p>
                  </div>
                </div>
                <span class="badge badge-outline badge-sm font-mono">SCALING</span>
              </div>

              <div class="p-5 rounded-2xl border border-base-300/70 bg-base-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <span class="font-mono font-bold text-sm text-violet-400 px-3 py-1 rounded-full bg-violet-400/10">LAYER 03</span>
                  <div>
                    <h4 class="font-display font-bold text-base text-base-content">Media & Narrative Engine</h4>
                    <p class="text-sm text-base-content/65">Technical deep dives, verified case studies, and engineering podcasts.</p>
                  </div>
                </div>
                <span class="badge badge-outline badge-sm font-mono">EXPANDING</span>
              </div>

              <div class="p-5 rounded-2xl border border-base-300/70 bg-base-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <span class="font-mono font-bold text-sm text-emerald-400 px-3 py-1 rounded-full bg-emerald-400/10">LAYER 04</span>
                  <div>
                    <h4 class="font-display font-bold text-base text-base-content">Hacker House & Deep-Work Residency</h4>
                    <p class="text-sm text-base-content/65">Private high-focus residency for top builders (dates kept private per guidelines).</p>
                  </div>
                </div>
                <span class="badge badge-outline badge-sm font-mono">HORIZON</span>
              </div>

              <div class="p-5 rounded-2xl border border-base-300/70 bg-base-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <span class="font-mono font-bold text-sm text-amber-400 px-3 py-1 rounded-full bg-amber-400/10">LAYER 05</span>
                  <div>
                    <h4 class="font-display font-bold text-base text-base-content">Solution Lab (Enterprise Co-Innovation)</h4>
                    <p class="text-sm text-base-content/65">Matching enterprise challenge budgets with vetted builder squads.</p>
                  </div>
                </div>
                <span class="badge badge-outline badge-sm font-mono">HORIZON</span>
              </div>

              <div class="p-5 rounded-2xl border border-base-300/70 bg-base-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <span class="font-mono font-bold text-sm text-fuchsia-400 px-3 py-1 rounded-full bg-fuchsia-400/10">LAYER 06</span>
                  <div>
                    <h4 class="font-display font-bold text-base text-base-content">noClue Ventures Micro-Fund</h4>
                    <p class="text-sm text-base-content/65">Pre-seed direct checks into standout production architectures.</p>
                  </div>
                </div>
                <span class="badge badge-outline badge-sm font-mono">HORIZON</span>
              </div>

              <div class="p-5 rounded-2xl border border-base-300/70 bg-base-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                  <span class="font-mono font-bold text-sm text-rose-400 px-3 py-1 rounded-full bg-rose-400/10">LAYER 07</span>
                  <div>
                    <h4 class="font-display font-bold text-base text-base-content">Global Distribution Bridges</h4>
                    <p class="text-sm text-base-content/65">Direct bilateral pipelines to US, Europe, and MENA enterprise buyers.</p>
                  </div>
                </div>
                <span class="badge badge-outline badge-sm font-mono">GLOBAL</span>
              </div>
            </div>
          </div>
        </section>

        <!-- ==========================================
             FAQ SECTION (Native DaisyUI Collapse Accordion)
             ========================================== -->
        <section id="faq" class="py-16 border-t border-dashed border-base-content/15 bg-base-200/40">
          <div class="container mx-auto px-6 max-w-4xl">
            <div class="mb-10 text-center">
              <div class="font-mono text-xs tracking-widest text-primary uppercase font-bold">Frequently Asked Questions</div>
              <h2 class="font-display text-3xl md:text-4xl font-bold text-base-content mt-1">
                Everything You Need to Know
              </h2>
            </div>

            <div class="space-y-3" id="faq-accordion-container">
              <!-- Q1 -->
              <div class="collapse collapse-plus rounded-2xl border border-base-300 bg-base-100 shadow-sm">
                <input type="radio" name="faq-accordion" checked="checked" />
                <div class="collapse-title text-base font-bold text-base-content">
                  What is noClue?
                </div>
                <div class="collapse-content text-sm text-base-content/75 leading-relaxed">
                  noClue is a curated network of builders, founders, engineers, and domain experts working with AI as a core capability. We run high-density in-person events, provide infrastructure and distribution, and turn experiments into production software.
                </div>
              </div>

              <!-- Q2 -->
              <div class="collapse collapse-plus rounded-2xl border border-base-300 bg-base-100 shadow-sm">
                <input type="radio" name="faq-accordion" />
                <div class="collapse-title text-base font-bold text-base-content">
                  Who is it for?
                </div>
                <div class="collapse-content text-sm text-base-content/75 leading-relaxed">
                  Engineers building with AI, founders shipping AI products, domain experts with deep problem knowledge, and companies looking to deploy AI that works.
                </div>
              </div>

              <!-- Q3 -->
              <div class="collapse collapse-plus rounded-2xl border border-base-300 bg-base-100 shadow-sm">
                <input type="radio" name="faq-accordion" />
                <div class="collapse-title text-base font-bold text-base-content">
                  How is it different from other AI communities?
                </div>
                <div class="collapse-content text-sm text-base-content/75 leading-relaxed">
                  We don't do pitch competitions, panels of talkers, or sponsor-driven demos. We curate for ability, build in person, and focus on production use cases over prototypes.
                </div>
              </div>

              <!-- Q4 -->
              <div class="collapse collapse-plus rounded-2xl border border-base-300 bg-base-100 shadow-sm">
                <input type="radio" name="faq-accordion" />
                <div class="collapse-title text-base font-bold text-base-content">
                  Why in-person?
                </div>
                <div class="collapse-content text-sm text-base-content/75 leading-relaxed">
                  The best work happens when people who know what they're doing are in the same room. High-bandwidth conversations, real trust, and serendipity don't happen on Discord.
                </div>
              </div>

              <!-- Q5 -->
              <div class="collapse collapse-plus rounded-2xl border border-base-300 bg-base-100 shadow-sm">
                <input type="radio" name="faq-accordion" />
                <div class="collapse-title text-base font-bold text-base-content">
                  How do I attend a Reality Check event?
                </div>
                <div class="collapse-content text-sm text-base-content/75 leading-relaxed">
                  Apply through the site. Every attendee is curated. We review applications on a rolling basis. If accepted, you will receive an invitation to join the summit.
                </div>
              </div>

              <!-- Q6 -->
              <div class="collapse collapse-plus rounded-2xl border border-base-300 bg-base-100 shadow-sm">
                <input type="radio" name="faq-accordion" />
                <div class="collapse-title text-base font-bold text-base-content">
                  Does it cost anything?
                </div>
                <div class="collapse-content text-sm text-base-content/75 leading-relaxed">
                  Attending Reality Check is free for selected builders. Partner and company passes are available through our partnership tracks.
                </div>
              </div>

              <!-- Q7 -->
              <div class="collapse collapse-plus rounded-2xl border border-base-300 bg-base-100 shadow-sm">
                <input type="radio" name="faq-accordion" />
                <div class="collapse-title text-base font-bold text-base-content">
                  What is the selection process?
                </div>
                <div class="collapse-content text-sm text-base-content/75 leading-relaxed">
                  We look at what you've built, your GitHub or public work, the depth of your domain expertise, and why you want to be in the room. No vanity credentials.
                </div>
              </div>

              <!-- Q8 -->
              <div class="collapse collapse-plus rounded-2xl border border-base-300 bg-base-100 shadow-sm">
                <input type="radio" name="faq-accordion" />
                <div class="collapse-title text-base font-bold text-base-content">
                  What is Solution Lab?
                </div>
                <div class="collapse-content text-sm text-base-content/75 leading-relaxed">
                  A program that pairs vetted builders with companies facing real AI implementation problems. We build the solution together and bring it to production.
                </div>
              </div>

              <!-- Q9 -->
              <div class="collapse collapse-plus rounded-2xl border border-base-300 bg-base-100 shadow-sm">
                <input type="radio" name="faq-accordion" />
                <div class="collapse-title text-base font-bold text-base-content">
                  How can my company partner with noClue?
                </div>
                <div class="collapse-content text-sm text-base-content/75 leading-relaxed">
                  We offer Foundational, Ecosystem, Challenge, and Media partnership tiers. Reach out via the Partner form or email us at partners@noclue.ai.
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ==========================================
             BOTTOM CTA BANNER
             ========================================== -->
        <section class="py-16 bg-base-100 text-center border-t border-dashed border-base-content/15">
          <div class="container mx-auto px-6 max-w-3xl">
            <h2 class="font-display text-3xl md:text-5xl font-bold tracking-tight text-base-content">
              Less hype. More shipped.
            </h2>
            <p class="mt-4 text-base md:text-lg text-base-content/70">
              Apply to join the next Reality Check summit in Bengaluru, Delhi NCR, or Mumbai.
            </p>
            <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button class="btn btn-primary rounded-full px-8 btn-lg" onclick="window.openApplyModal()">
                Apply for seats
              </button>
              <button class="btn btn-outline rounded-full px-8 btn-lg" onclick="window.openPartnerModal()">
                Partner with us
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- ==========================================
         MEGA FOOTER (WeAreDevelopers Exact 5-Column Format)
         ========================================== -->
    <footer class="footer text-base-content border-t border-base-300/80 bg-base-100">
      <div class="container mx-auto px-6 py-16">
        <!-- 5 Columns Grid -->
        <div class="mb-12 grid w-full grid-cols-1 gap-x-4 gap-y-8 min-[360px]:grid-cols-2 sm:gap-8 md:grid-cols-3 xl:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] xl:gap-6">
          <!-- Col 1: About noClue -->
          <div class="min-w-0">
            <div class="flex items-center gap-2 mb-4 font-display font-black text-xl">
              <span class="text-primary font-mono">[</span>noClue<span class="text-primary font-mono">]</span>
            </div>
            <p class="text-sm text-base-content/70 leading-relaxed mb-4 max-w-xs">
              Where AI gets built for real. Curated network of builders, founders, engineers, and domain experts turning experiments into production software.
            </p>
            <!-- World Clocks -->
            <div class="font-mono text-xs text-base-content/60 space-y-1 border-t border-base-300/50 pt-3">
              <div class="flex justify-between max-w-[220px]">
                <span>Bengaluru</span>
                <span id="clock-blr" class="text-primary font-bold">--:-- IST</span>
              </div>
              <div class="flex justify-between max-w-[220px]">
                <span>Delhi NCR</span>
                <span id="clock-del" class="text-primary font-bold">--:-- IST</span>
              </div>
              <div class="flex justify-between max-w-[220px]">
                <span>Mumbai</span>
                <span id="clock-bom" class="text-primary font-bold">--:-- IST</span>
              </div>
              <div class="flex justify-between max-w-[220px]">
                <span>San Francisco</span>
                <span id="clock-sfo" class="text-base-content/70">--:-- PDT</span>
              </div>
              <div class="flex justify-between max-w-[220px]">
                <span>Berlin</span>
                <span id="clock-ber" class="text-base-content/70">--:-- CEST</span>
              </div>
            </div>
          </div>

          <!-- Col 2: Programs & Summits -->
          <div class="min-w-0">
            <h4 class="mb-4 text-sm font-semibold text-base-content">Programs & Summits</h4>
            <div class="flex flex-col gap-2.5 text-sm">
              <a href="#reality-check" class="text-base-content/70 hover:text-primary transition-colors">Reality Check Bengaluru</a>
              <a href="#reality-check" class="text-base-content/70 hover:text-primary transition-colors">Reality Check Delhi NCR</a>
              <a href="#reality-check" class="text-base-content/70 hover:text-primary transition-colors">Reality Check Mumbai</a>
              <a href="#what-next" class="text-base-content/70 hover:text-primary transition-colors">Hacker House Residency</a>
              <a href="#what-next" class="text-base-content/70 hover:text-primary transition-colors">Solution Lab</a>
              <a href="#what-next" class="text-base-content/70 hover:text-primary transition-colors">noClue Ventures</a>
            </div>
          </div>

          <!-- Col 3: For Builders -->
          <div class="min-w-0">
            <h4 class="mb-4 text-sm font-semibold text-base-content">For Builders</h4>
            <div class="flex flex-col gap-2.5 text-sm">
              <button onclick="window.openApplyModal('Builder')" class="text-left text-base-content/70 hover:text-primary transition-colors">Apply for Seats</button>
              <button onclick="window.openCfpModal('General')" class="text-left text-base-content/70 hover:text-primary transition-colors">Submit Talk (CFP)</button>
              <a href="#for-builders" class="text-base-content/70 hover:text-primary transition-colors">Compute Credits</a>
              <a href="#for-builders" class="text-base-content/70 hover:text-primary transition-colors">Private Rooms</a>
              <a href="#manifesto" class="text-base-content/70 hover:text-primary transition-colors">Our Manifesto</a>
            </div>
          </div>

          <!-- Col 4: For Partners -->
          <div class="min-w-0">
            <h4 class="mb-4 text-sm font-semibold text-base-content">For Partners</h4>
            <div class="flex flex-col gap-2.5 text-sm">
              <button onclick="window.openPartnerModal()" class="text-left text-base-content/70 hover:text-primary transition-colors">Partner With Us</button>
              <button onclick="window.openPartnerModal()" class="text-left text-base-content/70 hover:text-primary transition-colors">Download Deck</button>
              <a href="#partnerships" class="text-base-content/70 hover:text-primary transition-colors">Foundational Tier</a>
              <a href="#partnerships" class="text-base-content/70 hover:text-primary transition-colors">Ecosystem Tier</a>
              <a href="#partnerships" class="text-base-content/70 hover:text-primary transition-colors">Challenge Tier</a>
              <a href="#for-companies" class="text-base-content/70 hover:text-primary transition-colors">Enterprise Solution Lab</a>
            </div>
          </div>

          <!-- Col 5: Legal & System -->
          <div class="min-w-0">
            <h4 class="mb-4 text-sm font-semibold text-base-content">Network & Legal</h4>
            <div class="flex flex-col gap-2.5 text-sm">
              <a href="#manifesto" class="text-base-content/70 hover:text-primary transition-colors">Manifesto</a>
              <a href="#roadmap" class="text-base-content/70 hover:text-primary transition-colors">Roadmap</a>
              <a href="#faq" class="text-base-content/70 hover:text-primary transition-colors">FAQ</a>
              <a href="mailto:contact@noclue.ai" class="text-base-content/70 hover:text-primary transition-colors">Contact</a>
              <a href="/home.md" class="text-base-content/70 hover:text-primary transition-colors font-mono text-xs">View as Markdown</a>
            </div>
          </div>
        </div>

        <!-- Footer Bottom Bar with Theme Switcher -->
        <div class="border-t border-base-300/70 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="text-xs text-base-content/60 text-center md:text-left">
            &copy; 2026 noClue Network. All rights reserved. Curated across India, US, and Europe.
          </div>

          <!-- Theme Switcher Pills (Light, System, Dark, Terminal, Halloween) -->
          <div class="flex items-center gap-1 bg-base-200 p-1 rounded-xl" id="footer-theme-switcher">
            <button class="theme-btn btn btn-ghost btn-xs rounded-lg px-2" data-theme-val="light" title="Light Theme">
              <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
            <button class="theme-btn btn btn-ghost btn-xs rounded-lg px-2" data-theme-val="dark" title="Dark Theme">
              <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
            <button class="theme-btn btn btn-ghost btn-xs rounded-lg px-2 font-mono font-bold" data-theme-val="terminal" title="Terminal Theme">
              &gt;_
            </button>
            <button class="theme-btn btn btn-ghost btn-xs rounded-lg px-2 text-xs" data-theme-val="halloween" title="Halloween Theme">
              🎃
            </button>
          </div>
        </div>
      </div>
    </footer>

    <!-- ==========================================
         INTERACTIVE MODALS
         ========================================== -->

    <!-- Modal 1: Application Form (Item 13 in Content Bank) -->
    <div id="modal-apply" class="wad-modal-overlay">
      <div class="wad-modal-content w-full max-w-lg rounded-3xl bg-base-100 p-6 md:p-8 border border-base-300 shadow-2xl relative">
        <button class="btn btn-circle btn-ghost btn-sm absolute right-4 top-4" id="btn-close-apply-modal" aria-label="Close dialog">&times;</button>
        <div class="font-mono text-xs text-primary font-bold uppercase">Membership / Seats</div>
        <h3 class="font-display text-2xl font-bold text-base-content mt-1" id="apply-modal-title">
          Apply for noClue
        </h3>
        <p class="text-sm text-base-content/70 mt-1">
          Every applicant is curated by our core technical team. No vanity credentials.
        </p>

        <form class="mt-6 space-y-4" id="form-apply">
          <div>
            <label class="block text-xs font-mono uppercase text-base-content/60 mb-1" for="apply-name">Your Full Name *</label>
            <input type="text" id="apply-name" required placeholder="Raghav Sharma" class="input input-bordered w-full rounded-xl text-sm" />
          </div>

          <div>
            <label class="block text-xs font-mono uppercase text-base-content/60 mb-1" for="apply-email">Email Address *</label>
            <input type="email" id="apply-email" required placeholder="raghav@company.ai" class="input input-bordered w-full rounded-xl text-sm" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-mono uppercase text-base-content/60 mb-1" for="apply-github">GitHub / X / Portfolio *</label>
              <input type="text" id="apply-github" required placeholder="github.com/username" class="input input-bordered w-full rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-xs font-mono uppercase text-base-content/60 mb-1" for="apply-role">Primary Role *</label>
              <select id="apply-role" class="select select-bordered w-full rounded-xl text-sm">
                <option value="AI Engineer">AI / ML Engineer</option>
                <option value="Founder">Founder / Technical Lead</option>
                <option value="Domain Expert">Domain Expert / Operator</option>
                <option value="Enterprise Lead">Enterprise Innovation Lead</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-mono uppercase text-base-content/60 mb-1" for="apply-built">What have you built with AI? (Links or commits) *</label>
            <textarea id="apply-built" required rows="2" placeholder="e.g. Deployed an autonomous agent system for legal contracts with 98% eval accuracy..." class="textarea textarea-bordered w-full rounded-xl text-sm"></textarea>
          </div>

          <div>
            <label class="block text-xs font-mono uppercase text-base-content/60 mb-1" for="apply-city">Target Reality Check City *</label>
            <select id="apply-city" class="select select-bordered w-full rounded-xl text-sm">
              <option value="Bengaluru">Bengaluru (May 2026 · Core Engineering)</option>
              <option value="Delhi NCR">Delhi NCR (July 2026 · Enterprise & Commercial)</option>
              <option value="Mumbai">Mumbai (September 2026 · Scale & Capital)</option>
              <option value="Any">Any City / Residency</option>
            </select>
          </div>

          <div class="pt-2">
            <button type="submit" class="btn btn-primary rounded-full w-full font-semibold" id="btn-submit-apply">
              Submit Application &rarr;
            </button>
          </div>
        </form>

        <div id="apply-success-box" class="hidden mt-4 p-4 rounded-2xl bg-success/15 border border-success/30 text-success text-center text-sm">
          <strong>Application Received!</strong><br />
          Our technical review team evaluates submissions on a rolling basis. Watch your email.
        </div>
      </div>
    </div>

    <!-- Modal 2: Partner Drawer / Deck -->
    <div id="modal-partner" class="wad-modal-overlay">
      <div class="wad-modal-content w-full max-w-lg rounded-3xl bg-base-100 p-6 md:p-8 border border-base-300 shadow-2xl relative">
        <button class="btn btn-circle btn-ghost btn-sm absolute right-4 top-4" id="btn-close-partner-modal" aria-label="Close dialog">&times;</button>
        <div class="font-mono text-xs text-cyan-400 font-bold uppercase">Partnership Inquiry</div>
        <h3 class="font-display text-2xl font-bold text-base-content mt-1">
          Co-Build with noClue
        </h3>
        <p class="text-sm text-base-content/70 mt-1">
          Explore Foundational, Ecosystem, Challenge, and Media partnership tracks across Delhi, Bangalore, and Mumbai.
        </p>

        <form class="mt-6 space-y-4" id="form-partner">
          <div>
            <label class="block text-xs font-mono uppercase text-base-content/60 mb-1" for="partner-company">Company / Organization *</label>
            <input type="text" id="partner-company" required placeholder="e.g. Anthropic, Pinecone, or Enterprise Corp" class="input input-bordered w-full rounded-xl text-sm" />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-mono uppercase text-base-content/60 mb-1" for="partner-name">Contact Name *</label>
              <input type="text" id="partner-name" required placeholder="Your Name" class="input input-bordered w-full rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-xs font-mono uppercase text-base-content/60 mb-1" for="partner-email">Work Email *</label>
              <input type="email" id="partner-email" required placeholder="name@company.com" class="input input-bordered w-full rounded-xl text-sm" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-mono uppercase text-base-content/60 mb-1" for="partner-tier">Interested Tier</label>
            <select id="partner-tier" class="select select-bordered w-full rounded-xl text-sm">
              <option value="Foundational">Tier 1: Foundational (Compute & Models)</option>
              <option value="Ecosystem">Tier 2: Ecosystem (Tooling & Infra)</option>
              <option value="Challenge">Tier 3: Challenge (Enterprise Datasets)</option>
              <option value="Media">Tier 4: Community & Media Partner</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-mono uppercase text-base-content/60 mb-1" for="partner-notes">Collaboration Goals</label>
            <textarea id="partner-notes" rows="2" placeholder="Tell us how you would like to collaborate..." class="textarea textarea-bordered w-full rounded-xl text-sm"></textarea>
          </div>
          <button type="submit" class="btn btn-primary rounded-full w-full font-semibold">
            Send Inquiry & Request Deck &rarr;
          </button>
        </form>

        <div id="partner-success-box" class="hidden mt-4 p-4 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-center text-sm">
          <strong>Thank you!</strong> Our partnership director will send the 2026 Partner Deck within 24 hours.
        </div>
      </div>
    </div>

    <!-- Modal 3: Call for Papers (CFP) -->
    <div id="modal-cfp" class="wad-modal-overlay">
      <div class="wad-modal-content w-full max-w-lg rounded-3xl bg-base-100 p-6 md:p-8 border border-base-300 shadow-2xl relative">
        <button class="btn btn-circle btn-ghost btn-sm absolute right-4 top-4" id="btn-close-cfp-modal" aria-label="Close dialog">&times;</button>
        <div class="font-mono text-xs text-violet-400 font-bold uppercase">Call for Papers (CFP)</div>
        <h3 class="font-display text-2xl font-bold text-base-content mt-1">
          Propose a Technical Session
        </h3>
        <p class="text-sm text-base-content/70 mt-1">
          Reality Check sessions are 20-30 minutes of hardcore engineering, latency debugging, and post-mortems. Zero product pitches.
        </p>

        <form class="mt-6 space-y-4" id="form-cfp">
          <div>
            <label class="block text-xs font-mono uppercase text-base-content/60 mb-1" for="cfp-title">Talk / Post-Mortem Title *</label>
            <input type="text" id="cfp-title" required placeholder="e.g. What Broke When We Hit 5,000 Concurrent Tool Calls" class="input input-bordered w-full rounded-xl text-sm" />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-mono uppercase text-base-content/60 mb-1" for="cfp-speaker">Speaker Name *</label>
              <input type="text" id="cfp-speaker" required placeholder="Your Name" class="input input-bordered w-full rounded-xl text-sm" />
            </div>
            <div>
              <label class="block text-xs font-mono uppercase text-base-content/60 mb-1" for="cfp-email">Email *</label>
              <input type="email" id="cfp-email" required placeholder="your@email.com" class="input input-bordered w-full rounded-xl text-sm" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-mono uppercase text-base-content/60 mb-1" for="cfp-city">Preferred City *</label>
            <select id="cfp-city" class="select select-bordered w-full rounded-xl text-sm">
              <option value="Bengaluru">Bengaluru (May 2026 · Core Engineering)</option>
              <option value="Delhi NCR">Delhi NCR (July 2026 · Enterprise & Commercial)</option>
              <option value="Mumbai">Mumbai (September 2026 · Scale & Capital)</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-mono uppercase text-base-content/60 mb-1" for="cfp-abstract">Technical Abstract & Key Takeaways *</label>
            <textarea id="cfp-abstract" required rows="3" placeholder="Explain the technical problem, code architecture, failure mode, and solution..." class="textarea textarea-bordered w-full rounded-xl text-sm"></textarea>
          </div>
          <button type="submit" class="btn btn-primary rounded-full w-full font-semibold">
            Submit CFP Proposal &rarr;
          </button>
        </form>

        <div id="cfp-success-box" class="hidden mt-4 p-4 rounded-2xl bg-violet-500/15 border border-violet-500/30 text-violet-400 text-center text-sm">
          <strong>Proposal Submitted!</strong> Our technical review board evaluates talk proposals every two weeks.
        </div>
      </div>
    </div>

    <!-- Modal 4: Floating Search (⌘K / Ctrl+K) (WeAreDevelopers Style) -->
    <div id="modal-search" class="wad-modal-overlay">
      <div class="wad-modal-content w-full max-w-2xl rounded-3xl bg-base-100 p-6 border border-base-300 shadow-2xl relative">
        <div class="flex items-center justify-between pb-3 border-b border-base-300">
          <div class="flex items-center gap-2 text-base-content/60 text-xs font-mono">
            <span>QUICK SEARCH</span>
            <span>•</span>
            <kbd class="kbd kbd-sm font-mono">ESC</kbd>
            <span>to close</span>
          </div>
          <button class="btn btn-circle btn-ghost btn-sm" id="btn-close-search-modal" aria-label="Close search">&times;</button>
        </div>

        <div class="mt-4 relative">
          <input
            id="floating-search-input"
            type="search"
            class="input input-lg w-full rounded-2xl border-2 border-primary bg-base-200/50 pl-11 text-base focus:outline-none"
            placeholder="Search problems, summits, system pillars, manifesto..."
            autocomplete="off"
          />
          <svg class="size-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path>
          </svg>
        </div>

        <div class="mt-4 max-h-72 overflow-y-auto space-y-2" id="search-results-list">
          <a href="#reality-check" class="search-result-item flex items-center justify-between p-3 rounded-xl hover:bg-base-200 transition-colors">
            <div>
              <div class="font-bold text-sm text-base-content">Reality Check Series 2026</div>
              <div class="text-xs text-base-content/60">Delhi NCR, Bengaluru, Mumbai — 100 builders each</div>
            </div>
            <span class="badge badge-primary badge-sm font-mono font-bold">Summits</span>
          </a>
          <a href="#why-noclue" class="search-result-item flex items-center justify-between p-3 rounded-xl hover:bg-base-200 transition-colors">
            <div>
              <div class="font-bold text-sm text-base-content">The 7 Core Problems</div>
              <div class="text-xs text-base-content/60">Why the AI ecosystem is built for talkers, not builders</div>
            </div>
            <span class="badge badge-outline badge-sm font-mono">Problems</span>
          </a>
          <a href="#how-it-works" class="search-result-item flex items-center justify-between p-3 rounded-xl hover:bg-base-200 transition-colors">
            <div>
              <div class="font-bold text-sm text-base-content">The 7 Pillars & 6-Step Pipeline</div>
              <div class="text-xs text-base-content/60">From Sourcing to Reality Check, Solution Lab, Hacker House & Scale</div>
            </div>
            <span class="badge badge-outline badge-sm font-mono">System</span>
          </a>
          <a href="#manifesto" class="search-result-item flex items-center justify-between p-3 rounded-xl hover:bg-base-200 transition-colors">
            <div>
              <div class="font-bold text-sm text-base-content">Manifesto & Core Beliefs</div>
              <div class="text-xs text-base-content/60">Production over prototypes, In-person first, India at the center</div>
            </div>
            <span class="badge badge-outline badge-sm font-mono">Manifesto</span>
          </a>
          <a href="#roadmap" class="search-result-item flex items-center justify-between p-3 rounded-xl hover:bg-base-200 transition-colors">
            <div>
              <div class="font-bold text-sm text-base-content">Evolutionary Roadmap</div>
              <div class="text-xs text-base-content/60">7 systemic layers of noClue's multi-year compounding engine</div>
            </div>
            <span class="badge badge-outline badge-sm font-mono">Roadmap</span>
          </a>
        </div>
      </div>
    </div>
  \`;

  // Attach All Event Handlers
  setupInteractivity();
}

function setupInteractivity() {
  // Global modal helpers
  window.openApplyModal = (prefillTarget = '') => {
    sfx.playClick();
    const modal = document.getElementById('modal-apply');
    if (!modal) return;
    modal.classList.add('open');
    if (prefillTarget) {
      const citySelect = document.getElementById('apply-city');
      if (citySelect) {
        Array.from(citySelect.options).forEach(opt => {
          if (opt.text.toLowerCase().includes(prefillTarget.toLowerCase()) || opt.value.toLowerCase().includes(prefillTarget.toLowerCase())) {
            citySelect.value = opt.value;
          }
        });
      }
    }
  };

  window.openPartnerModal = () => {
    sfx.playClick();
    const modal = document.getElementById('modal-partner');
    if (modal) modal.classList.add('open');
  };

  window.openCfpModal = (city = '') => {
    sfx.playClick();
    const modal = document.getElementById('modal-cfp');
    if (modal) {
      modal.classList.add('open');
      const citySelect = document.getElementById('cfp-city');
      if (citySelect && city) {
        Array.from(citySelect.options).forEach(opt => {
          if (opt.value.toLowerCase().includes(city.toLowerCase())) {
            citySelect.value = opt.value;
          }
        });
      }
    }
  };

  window.openSearchModal = () => {
    sfx.playClick();
    const modal = document.getElementById('modal-search');
    if (modal) {
      modal.classList.add('open');
      setTimeout(() => {
        const inp = document.getElementById('floating-search-input');
        if (inp) inp.focus();
      }, 50);
    }
  };

  // Close modals
  const closeAllModals = () => {
    document.querySelectorAll('.wad-modal-overlay').forEach(m => m.classList.remove('open'));
  };

  document.querySelectorAll('.wad-modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeAllModals();
    });
  });

  document.getElementById('btn-close-apply-modal')?.addEventListener('click', closeAllModals);
  document.getElementById('btn-close-partner-modal')?.addEventListener('click', closeAllModals);
  document.getElementById('btn-close-cfp-modal')?.addEventListener('click', closeAllModals);
  document.getElementById('btn-close-search-modal')?.addEventListener('click', closeAllModals);

  // Top and Nav button triggers
  document.getElementById('btn-top-apply')?.addEventListener('click', () => window.openApplyModal());
  document.getElementById('btn-nav-apply')?.addEventListener('click', () => window.openApplyModal());
  document.getElementById('btn-mobile-apply')?.addEventListener('click', () => {
    document.getElementById('mobile-nav-details')?.removeAttribute('open');
    window.openApplyModal();
  });
  document.getElementById('btn-hero-apply')?.addEventListener('click', () => window.openApplyModal());
  document.getElementById('btn-hero-partner')?.addEventListener('click', () => window.openPartnerModal());
  document.getElementById('btn-partner-deck')?.addEventListener('click', () => window.openPartnerModal());
  document.getElementById('btn-open-search')?.addEventListener('click', window.openSearchModal);

  // Close mobile nav on link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('mobile-nav-details')?.removeAttribute('open');
    });
  });

  // Sound toggle button
  const soundBtn = document.getElementById('btn-toggle-sound');
  soundBtn?.addEventListener('click', () => {
    sfx.enabled = !sfx.enabled;
    soundBtn.classList.toggle('text-primary', sfx.enabled);
    soundBtn.classList.toggle('opacity-50', !sfx.enabled);
    if (sfx.enabled) sfx.playClick();
  });

  // Hero Play Preview Toast
  document.getElementById('btn-hero-play-preview')?.addEventListener('click', () => {
    sfx.playClick();
    alert("Streaming Reality Check 2026 Session: 'Turning AI Experiments into Production Software' (Raghav & Core Builders)");
  });

  // Headline Switcher Pills
  const headlinePills = document.querySelectorAll('.headline-pill-tab');
  const dynamicH1 = document.getElementById('hero-dynamic-headline');
  headlinePills.forEach(pill => {
    pill.addEventListener('click', () => {
      sfx.playClick();
      const idx = parseInt(pill.getAttribute('data-headline-index') || '0', 10);
      headlinePills.forEach(p => {
        p.classList.remove('bg-primary', 'text-primary-content', 'border-primary', 'font-semibold');
        p.classList.add('border-base-300', 'text-base-content/70');
      });
      pill.classList.add('bg-primary', 'text-primary-content', 'border-primary', 'font-semibold');
      pill.classList.remove('border-base-300', 'text-base-content/70');
      if (dynamicH1 && heroHeadlines[idx]) {
        dynamicH1.style.opacity = '0';
        dynamicH1.style.transform = 'translateY(6px)';
        setTimeout(() => {
          dynamicH1.textContent = heroHeadlines[idx];
          dynamicH1.style.opacity = '1';
          dynamicH1.style.transform = 'translateY(0)';
        }, 150);
      }
    });
  });

  // Moments reel scrolling buttons
  const reel = document.getElementById('moments-reel');
  document.getElementById('btn-reel-left')?.addEventListener('click', () => {
    sfx.playClick();
    reel?.scrollBy({ left: -340, behavior: 'smooth' });
  });
  document.getElementById('btn-reel-right')?.addEventListener('click', () => {
    sfx.playClick();
    reel?.scrollBy({ left: 340, behavior: 'smooth' });
  });

  // Keyboard shortcut: ⌘K or Ctrl+K to open search, Esc to close
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      window.openSearchModal();
    }
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Floating search live filter
  const searchInput = document.getElementById('floating-search-input');
  searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const items = document.querySelectorAll('.search-result-item');
    items.forEach(item => {
      const txt = item.textContent?.toLowerCase() || '';
      item.style.display = txt.includes(query) ? 'flex' : 'none';
    });
  });

  // Application form submission simulation
  document.getElementById('form-apply')?.addEventListener('submit', (e) => {
    e.preventDefault();
    sfx.playSuccess();
    const submitBtn = document.getElementById('btn-submit-apply');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
    }
    setTimeout(() => {
      document.getElementById('apply-success-box')?.classList.remove('hidden');
      if (submitBtn) submitBtn.textContent = 'Application Submitted';
    }, 600);
  });

  // Partner form submission simulation
  document.getElementById('form-partner')?.addEventListener('submit', (e) => {
    e.preventDefault();
    sfx.playSuccess();
    document.getElementById('partner-success-box')?.classList.remove('hidden');
  });

  // CFP form submission simulation
  document.getElementById('form-cfp')?.addEventListener('submit', (e) => {
    e.preventDefault();
    sfx.playSuccess();
    document.getElementById('cfp-success-box')?.classList.remove('hidden');
  });

  // Theme Switcher Buttons (Footer)
  const themeButtons = document.querySelectorAll('.theme-btn');
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.playClick();
      const theme = btn.getAttribute('data-theme-val') || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      themeButtons.forEach(b => b.classList.remove('btn-active', 'bg-primary/20'));
      btn.classList.add('btn-active', 'bg-primary/20');
    });
  });

  // Sync saved theme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const activeBtn = document.querySelector(\`.theme-btn[data-theme-val="\${savedTheme}"]\`);
  if (activeBtn) activeBtn.classList.add('btn-active', 'bg-primary/20');

  // Live World Clocks
  function updateWorldClocks() {
    const now = new Date();
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };

    const blr = new Intl.DateTimeFormat('en-GB', { ...timeOptions, timeZone: 'Asia/Kolkata' }).format(now);
    const sfo = new Intl.DateTimeFormat('en-GB', { ...timeOptions, timeZone: 'America/Los_Angeles' }).format(now);
    const ber = new Intl.DateTimeFormat('en-GB', { ...timeOptions, timeZone: 'Europe/Berlin' }).format(now);

    const elBlr = document.getElementById('clock-blr');
    const elDel = document.getElementById('clock-del');
    const elBom = document.getElementById('clock-bom');
    const elSfo = document.getElementById('clock-sfo');
    const elBer = document.getElementById('clock-ber');

    if (elBlr) elBlr.textContent = \`\${blr} IST\`;
    if (elDel) elDel.textContent = \`\${blr} IST\`;
    if (elBom) elBom.textContent = \`\${blr} IST\`;
    if (elSfo) elSfo.textContent = \`\${sfo} PDT\`;
    if (elBer) elBer.textContent = \`\${ber} CEST\`;
  }
  updateWorldClocks();
  setInterval(updateWorldClocks, 10000);
}

// Initial bootstrap
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
`;

fs.writeFileSync(path.join(__dirname, 'src', 'main.js'), mainJsContent, 'utf8');
console.log('Successfully wrote src/main.js!');
