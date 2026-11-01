const fs = require('fs');
const path = require('path');

console.log('Generating authentic WeAreDevelopers replica populated with noClue Content Bank...');

const htmlContent = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>noClue — Where AI Gets Built for Real</title>

    <meta name="description" content="noClue is a curated network of builders, founders, engineers, and domain experts working with AI as a core capability. High-density in-person events, infrastructure, distribution, and production software." />
    <meta property="og:title" content="noClue — Where AI Gets Built for Real" />
    <meta property="og:description" content="A curated network of builders, founders, engineers, and domain experts working on one question: what actually happens when AI meets the real world?" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="noClue" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="noClue — Where AI Gets Built for Real" />
    <meta name="twitter:description" content="Less hype. More shipped. Where AI gets built for real." />

    <!-- Google Fonts for WeAreDevelopers -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Unbounded:wght@400;600;700;800&display=swap" rel="stylesheet" />

    <!-- Exact WeAreDevelopers Compiled Tailwind CSS -->
    <link rel="stylesheet" href="/src/wad-tailwind.css" />

    <!-- Clean Typography & Layout Enhancements -->
    <style>
      :root {
        --font-mono: 'IBM Plex Mono', monospace;
        --font-sans: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        --font-display: 'Unbounded', 'IBM Plex Sans', sans-serif;
      }
      body {
        font-family: var(--font-sans);
      }
      .font-display {
        font-family: var(--font-display);
      }
      .font-mono {
        font-family: var(--font-mono);
      }
      .scrollbar-none::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-none {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      [data-theme="terminal"] {
        font-family: var(--font-mono) !important;
      }
      /* Modal helpers */
      dialog.modal[open] {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>

    <!-- Theme initialization script matching WeAreDevelopers -->
    <script>
      (() => {
        try {
          const themeParam = new URLSearchParams(window.location.search).get("theme");
          const allowedThemes = ["light", "dark", "terminal", "halloween", "system"];
          if (allowedThemes.includes(themeParam)) {
            if (themeParam === "system") {
              localStorage.removeItem("theme");
            } else {
              localStorage.setItem("theme", themeParam);
            }
          }
          const savedTheme = localStorage.getItem("theme");
          const theme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
          document.documentElement.setAttribute("data-theme", theme);
        } catch (_error) {}
      })();
    </script>
  </head>

  <body class="isolate flex min-h-dvh flex-col bg-base-100 text-base-content" data-terminal-navigation-title="noClue">

    <!-- Top Announcement Bar -->
    <div class="border-b border-dashed border-base-content/15 bg-base-200/40 px-4 py-2 font-mono text-xs">
      <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="inline-flex size-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="text-base-content/70">REALITY CHECK 2026: Delhi · Bangalore · Mumbai — Applications Open</span>
        </div>
        <div class="hidden sm:flex items-center gap-4 text-base-content/60">
          <span>Bengaluru (May)</span>
          <span>•</span>
          <span>Delhi NCR (July)</span>
          <span>•</span>
          <span>Mumbai (Sept)</span>
        </div>
      </div>
    </div>

    <!-- Header Navigation -->
    <header class="sticky top-0 z-50 bg-base-100/90 backdrop-blur-md border-b border-dashed border-base-content/10">
      <div class="container mx-auto">
        <div class="navbar px-4">
          <!-- Start: Logo -->
          <div class="navbar-start gap-3">
            <a class="header-logo-link inline-flex items-center gap-2.5 normal-case text-lg font-bold" aria-label="noClue" href="/">
              <div class="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-content font-mono font-bold text-sm shadow-sm">
                nC
              </div>
              <span class="font-display tracking-tight font-bold text-xl text-base-content">noClue</span>
            </a>
          </div>

          <!-- Center: Desktop Menu -->
          <nav class="navbar-center hidden lg:flex" aria-label="Main">
            <ul class="menu menu-horizontal items-center gap-x-1 px-1 font-medium text-sm" role="list">
              <li><a href="#the-problem" class="hover:text-primary transition-colors">The Problem</a></li>
              <li><a href="#how-it-works" class="hover:text-primary transition-colors">How it Works</a></li>
              <li>
                <a href="#reality-check" class="flex items-center gap-2 hover:text-primary transition-colors">
                  <span>Reality Check</span>
                  <span class="badge badge-primary badge-sm font-mono text-[10px] uppercase tracking-wider font-semibold">2026</span>
                </a>
              </li>
              <li>
                <details class="dropdown" name="header-nav-dropdown">
                  <summary class="hover:text-primary transition-colors cursor-pointer">Programs</summary>
                  <ul class="z-50 w-64 space-y-1 rounded-2xl border border-base-300/70 bg-base-100 p-2 shadow-xl dropdown-content" role="list">
                    <li><a href="#reality-check" class="flex flex-col items-start p-2.5 rounded-xl hover:bg-base-200"><span class="font-semibold text-sm">Reality Check Summits</span><span class="text-xs text-base-content/60">3-city, 100 builders each</span></a></li>
                    <li><a href="#horizons" class="flex flex-col items-start p-2.5 rounded-xl hover:bg-base-200"><span class="font-semibold text-sm">Hacker House</span><span class="text-xs text-base-content/60">High-density residency (Horizon)</span></a></li>
                    <li><a href="#horizons" class="flex flex-col items-start p-2.5 rounded-xl hover:bg-base-200"><span class="font-semibold text-sm">Solution Lab</span><span class="text-xs text-base-content/60">Enterprise stress-testing &amp; pilots</span></a></li>
                    <li><a href="#horizons" class="flex flex-col items-start p-2.5 rounded-xl hover:bg-base-200"><span class="font-semibold text-sm">noClue Ventures</span><span class="text-xs text-base-content/60">Strategic seed &amp; compute grants</span></a></li>
                  </ul>
                </details>
              </li>
              <li>
                <details class="dropdown" name="header-nav-dropdown">
                  <summary class="hover:text-primary transition-colors cursor-pointer">Audiences</summary>
                  <ul class="z-50 w-56 space-y-1 rounded-2xl border border-base-300/70 bg-base-100 p-2 shadow-xl dropdown-content" role="list">
                    <li><a href="#for-builders" class="p-2.5 rounded-xl hover:bg-base-200 font-semibold text-sm">For Builders</a></li>
                    <li><a href="#for-partners" class="p-2.5 rounded-xl hover:bg-base-200 font-semibold text-sm">For Companies &amp; Partners</a></li>
                    <li><a href="#for-domain-experts" class="p-2.5 rounded-xl hover:bg-base-200 font-semibold text-sm">For Domain Experts</a></li>
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
            <!-- Search trigger -->
            <button
              type="button"
              id="search-trigger-btn"
              class="btn btn-circle btn-ghost"
              aria-label="Open search (⌘/Ctrl + K)"
              title="Global Search (⌘K)"
            >
              <svg class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path></svg>
            </button>

            <!-- Apply CTA -->
            <button
              type="button"
              id="header-apply-btn"
              class="btn btn-primary rounded-full px-5 text-sm font-semibold tracking-wide shadow-sm hover:shadow"
            >
              Apply to join
            </button>

            <!-- Mobile Drawer Toggle -->
            <div class="dropdown dropdown-end lg:hidden">
              <label tabindex="0" class="btn btn-circle btn-ghost" aria-label="Toggle mobile menu">
                <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
              </label>
              <ul tabindex="0" class="dropdown-content menu menu-lg p-4 shadow-2xl bg-base-100 rounded-3xl w-72 mt-3 border border-base-300/80 z-50 space-y-1">
                <li><a href="#the-problem">The Problem</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#reality-check">Reality Check 2026</a></li>
                <li><a href="#for-builders">For Builders</a></li>
                <li><a href="#for-partners">For Partners</a></li>
                <li><a href="#for-domain-experts">For Domain Experts</a></li>
                <li><a href="#manifesto">Manifesto</a></li>
                <li><a href="#roadmap">Roadmap</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <!-- 1. HERO STAGE -->
      <section id="home-stage" class="home-stage relative isolate overflow-hidden bg-base-100 text-base-content border-b border-dashed border-base-content/15">
        <div class="container mx-auto px-6 pt-12 pb-10 md:pt-16 md:pb-12">
          
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="font-mono text-xs tracking-widest text-primary uppercase font-semibold">
              FOR BUILDERS, FOUNDERS, ENGINEERS, AND DOMAIN EXPERTS
            </div>

            <!-- Headline Selector Tabs -->
            <div class="inline-flex rounded-full bg-base-200/80 p-1 border border-base-300/60 font-mono text-xs">
              <button class="headline-pill px-3 py-1 rounded-full font-semibold transition-all bg-primary text-primary-content" data-idx="0">Where AI gets built</button>
              <button class="headline-pill px-3 py-1 rounded-full font-semibold transition-all text-base-content/60 hover:text-base-content" data-idx="1">Who builds it?</button>
              <button class="headline-pill px-3 py-1 rounded-full font-semibold transition-all text-base-content/60 hover:text-base-content" data-idx="2">Scattered builders</button>
              <button class="headline-pill px-3 py-1 rounded-full font-semibold transition-all text-base-content/60 hover:text-base-content" data-idx="3">Less hype</button>
            </div>
          </div>

          <h1 id="hero-dynamic-h1" class="mt-6 font-display text-[clamp(2.4rem,5.2vw,4.5rem)] leading-[0.98] font-semibold tracking-tight text-balance lg:max-w-[85%]">
            Where AI gets built for real.
          </h1>

          <div class="mt-6 space-y-6 xl:grid xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-x-12">
            <p id="hero-dynamic-sub" class="max-w-3xl text-lg leading-snug text-balance text-base-content/70 md:text-xl xl:col-start-1">
              noClue is a curated network of builders, founders, engineers, and domain experts working with AI as a core capability. We run high-density in-person events, provide infrastructure and distribution, and turn experiments into production software.
            </p>

            <!-- Search Pill Form -->
            <div class="max-w-3xl xl:col-start-1 xl:max-w-none">
              <form class="relative group" id="hero-search-form">
                <div class="relative">
                  <input
                    id="hero-search-input"
                    maxlength="200"
                    class="w-full input input-lg bg-base-100 text-lg placeholder:text-base-content/60 border-2 border-primary focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 transition-all duration-300 rounded-full pl-6 pr-14 py-6 shadow-xl hover:shadow-2xl text-ellipsis"
                    placeholder="e.g. What breaks when scaling AI agents from 10 to 10,000 users?"
                    autocomplete="off"
                    aria-label="Ask questions about AI production architecture..."
                    type="text"
                  />
                  <button type="submit" class="absolute right-3 top-1/2 -translate-y-1/2 btn btn-circle btn-primary btn-sm" aria-label="Search">
                    <svg class="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd"></path></svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- FEATURED FLAGSHIP TALK / SESSION (Lines 408-702 of WeAreDevelopers) -->
        <section aria-labelledby="featured-talk-title" class="container mx-auto px-6 pb-14 md:pb-16">
          <div class="mb-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <div class="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-widest uppercase">
              <span class="inline-flex items-center gap-2 text-primary font-semibold">
                <span class="size-2 rounded-full bg-primary animate-ping" aria-hidden="true"></span>
                Featured Flagship Session
              </span>
              <span class="hidden text-base-content/25 md:inline" aria-hidden="true">/</span>
              <span class="hidden text-base-content/55 md:inline">Reality Check Series 2026</span>
              <span class="hidden text-base-content/25 md:inline" aria-hidden="true">/</span>
              <span class="hidden text-base-content/55 md:inline">Bengaluru · Delhi · Mumbai</span>
            </div>

            <a class="group inline-flex items-center gap-1 text-sm font-medium text-base-content/60 transition-colors hover:text-primary" href="#reality-check">
              All 3 Summits <svg class="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd"></path></svg>
            </a>
          </div>

          <div class="grid gap-8 xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-12">
            <!-- Video Player Box -->
            <div class="min-w-0 self-start overflow-hidden rounded-3xl shadow-xl ring-1 shadow-black/20 ring-base-content/10 bg-slate-950 relative aspect-video flex flex-col justify-end p-6 text-white group">
              <!-- Background Visual -->
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
                alt="Builders collaborating at Reality Check Summit"
                class="absolute inset-0 size-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

              <!-- Top video badges -->
              <div class="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span class="rounded-full bg-black/60 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md border border-white/10">
                  🔴 Live Recording
                </span>
                <span class="rounded-full bg-primary/80 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-primary-content backdrop-blur-md">
                  Keynote
                </span>
              </div>

              <!-- Central Play Button -->
              <div class="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div class="size-16 rounded-full bg-primary/90 text-primary-content flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 pointer-events-auto cursor-pointer" id="video-play-btn">
                  <svg class="size-7 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>

              <!-- Video Scrubber Overlay -->
              <div class="relative z-10 w-full">
                <div class="mb-2 flex items-center justify-between text-xs font-mono text-white/80">
                  <span id="video-time-display">13:42 / 31:00</span>
                  <span class="text-white/60">Chapter 3: Stress-Testing Agents Under Failure</span>
                </div>
                <!-- Time slider bar -->
                <div class="relative h-1.5 w-full rounded-full bg-white/20 overflow-hidden cursor-pointer">
                  <div class="h-full bg-primary rounded-full transition-all duration-300" style="width: 44%"></div>
                </div>
              </div>
            </div>

            <!-- Video Sidebar Details -->
            <div class="flex min-w-0 flex-col md:max-w-2xl xl:max-w-none">
              <div>
                <a class="group" href="#reality-check">
                  <h2 id="featured-talk-title" class="font-display text-3xl leading-[1.08] font-semibold tracking-tight text-balance transition-colors group-hover:text-primary md:text-4xl">
                    Turning AI Experiments into Production Software
                  </h2>
                </a>

                <ul class="mt-5 space-y-4" aria-label="Speakers">
                  <li>
                    <div class="group flex items-center gap-4">
                      <div class="size-16 shrink-0 rounded-2xl bg-base-300 flex items-center justify-center overflow-hidden ring-1 ring-base-content/10">
                        <img alt="Raghav & Founding Team" class="size-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80" />
                      </div>
                      <div class="min-w-0">
                        <span class="block font-display text-lg leading-snug font-semibold">Raghav &amp; Founding Builders</span>
                        <span class="mt-0.5 block text-sm leading-snug text-base-content/60">Core Engineering · noClue Network</span>
                      </div>
                    </div>
                  </li>
                </ul>

                <p class="mt-5 line-clamp-3 leading-relaxed text-pretty text-base-content/70">
                  Demos are easy. Production is hard. Distribution is harder. In 2026, autonomous systems break on latency, state drift, and edge cases. noClue runs in-person rooms where the top 1% of builders stress-test real architectures with real domain experts.
                </p>
              </div>

              <div class="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 xl:mt-auto xl:pt-6">
                <button type="button" class="btn btn-primary rounded-full px-6 open-apply-modal-btn">
                  <svg class="size-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z"></path></svg>
                  Apply for seats
                </button>
                <button type="button" class="btn btn-outline rounded-full px-6 open-partner-modal-btn">
                  Partner with us
                </button>
                <span class="text-sm text-base-content/55">
                  3 Cities · 100 Selected Practitioners Each
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- 4-COLUMN DASHED EXPLORE STRIP (Lines 705-741 of WeAreDevelopers) -->
        <nav aria-label="Explore noClue" class="border-t border-dashed border-base-content/15">
          <div class="container mx-auto grid grid-cols-1 divide-y divide-dashed divide-base-content/15 md:grid-cols-2 md:divide-y-0 lg:grid-cols-4 lg:divide-x">
            <a class="group px-6 py-6 transition-colors hover:bg-base-content/5" href="#how-it-works">
              <div class="flex items-center justify-between gap-3 font-mono text-[11px] tracking-widest text-base-content/45 uppercase">
                The Method
                <svg class="size-4 text-base-content/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd"></path></svg>
              </div>
              <div class="mt-2.5 font-semibold transition-colors group-hover:text-primary">Every step, idea to shipped</div>
              <div class="mt-1.5 text-sm text-base-content/55">From high-density summits to solution lab incubation, code reviews, and scale.</div>
            </a>

            <a class="group px-6 py-6 transition-colors hover:bg-base-content/5" href="#reality-check">
              <div class="flex items-center justify-between gap-3 font-mono text-[11px] tracking-widest text-base-content/45 uppercase">
                Reality Check
                <svg class="size-4 text-base-content/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd"></path></svg>
              </div>
              <div class="mt-2.5 font-semibold transition-colors group-hover:text-primary">Delhi · Bangalore · Mumbai</div>
              <div class="mt-1.5 text-sm text-base-content/55">Three cities, 100 hand-picked builders each. Real engineering, zero stage panels.</div>
            </a>

            <a class="group px-6 py-6 transition-colors hover:bg-base-content/5" href="#for-builders">
              <div class="flex items-center justify-between gap-3 font-mono text-[11px] tracking-widest text-base-content/45 uppercase">
                For Builders
                <svg class="size-4 text-base-content/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd"></path></svg>
              </div>
              <div class="mt-2.5 font-semibold transition-colors group-hover:text-primary">Capital, compute &amp; distribution</div>
              <div class="mt-1.5 text-sm text-base-content/55">Access private rooms, compute credits, venture backing, and global enterprise distribution.</div>
            </a>

            <a class="group px-6 py-6 transition-colors hover:bg-base-content/5" href="#for-partners">
              <div class="flex items-center justify-between gap-3 font-mono text-[11px] tracking-widest text-base-content/45 uppercase">
                For Partners
                <svg class="size-4 text-base-content/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z" clip-rule="evenodd"></path></svg>
              </div>
              <div class="mt-2.5 font-semibold transition-colors group-hover:text-primary">4 Co-builder Tiers</div>
              <div class="mt-1.5 text-sm text-base-content/55">Foundational, Ecosystem, Challenge, and Media tiers. Deploy your tools with the top 1%.</div>
            </a>
          </div>
        </nav>
      </section>

      <!-- 2. THE 3-LINE PROBLEM BANNER (Item 2 in Content Bank) -->
      <section class="border-b border-dashed border-base-content/15 bg-base-200/30 py-10 md:py-14">
        <div class="container mx-auto px-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-dashed divide-base-content/15">
            <div class="pr-4">
              <div class="font-mono text-xs text-primary font-semibold mb-2">01 / HYPER-INFLATION OF NOISE</div>
              <p class="text-lg md:text-xl font-semibold leading-snug text-base-content">
                Everyone is building with AI. Almost nobody is building anything that lasts.
              </p>
            </div>
            <div class="pt-6 md:pt-0 md:px-6">
              <div class="font-mono text-xs text-secondary font-semibold mb-2">02 / PROOF OF EXECUTION</div>
              <p class="text-lg md:text-xl font-semibold leading-snug text-base-content">
                Demos are easy. Production is hard. Distribution is harder.
              </p>
            </div>
            <div class="pt-6 md:pt-0 md:pl-6">
              <div class="font-mono text-xs text-primary font-semibold mb-2">03 / THE CRITICAL BRIDGE</div>
              <p class="text-lg md:text-xl font-semibold leading-snug text-base-content">
                The best builders are working in isolation. The best problems are trapped inside companies that don't know how to build with AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. THE 7 PROBLEMS HORIZONTAL REEL ("Moments" format - Lines 745-2881 of WeAreDevelopers) -->
      <section id="the-problem" class="py-12 md:py-16 border-b border-dashed border-base-content/15">
        <div class="container mx-auto px-6">
          <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div class="font-mono text-xs font-semibold tracking-widest text-primary uppercase mb-2">WHY NOCLUE</div>
              <h2 class="font-display text-2xl leading-tight font-bold text-base-content md:text-3xl">The 7 Core Problems</h2>
              <p class="leading-snug text-base-content/70 mt-1">Why AI needs a curated, in-person engineering network. Swipe through the industry friction points:</p>
            </div>
            <div class="flex items-center gap-2">
              <button id="reel-prev-btn" class="btn btn-circle btn-sm btn-ghost border border-base-300" aria-label="Previous problem">←</button>
              <button id="reel-next-btn" class="btn btn-circle btn-sm btn-ghost border border-base-300" aria-label="Next problem">→</button>
            </div>
          </div>

          <!-- Horizontal Snap Container -->
          <div id="moments-reel" class="-mx-6 flex min-h-[280px] snap-x snap-mandatory scroll-pl-6 scrollbar-none items-center gap-4 overflow-x-auto px-6 py-5">
            
            <!-- Card 1 -->
            <div class="group relative h-[280px] w-80 flex-none snap-start overflow-hidden rounded-3xl border border-base-300/80 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-xs font-mono text-base-content/50">
                  <span class="text-primary font-semibold">01 · Culture</span>
                  <span>2:30 min</span>
                </div>
                <h3 class="mt-4 font-display text-lg font-bold leading-snug text-base-content">
                  The ecosystem is built for talkers, not builders
                </h3>
                <p class="mt-2 text-xs leading-relaxed text-base-content/70">
                  Most AI events reward stage charisma, buzzwords, and pitch decks over deployed production code, clean benchmarks, and actual system reliability.
                </p>
              </div>
              <div class="pt-4 border-t border-dashed border-base-content/10 flex items-center justify-between text-xs text-base-content/60 font-mono">
                <span>Insight #1</span>
                <span class="text-primary font-semibold">Culture gap →</span>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="group relative h-[280px] w-80 flex-none snap-start overflow-hidden rounded-3xl border border-base-300/80 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-xs font-mono text-base-content/50">
                  <span class="text-secondary font-semibold">02 · Format</span>
                  <span>3:15 min</span>
                </div>
                <h3 class="mt-4 font-display text-lg font-bold leading-snug text-base-content">
                  90% of AI events are pitch competitions or vendor showcases
                </h3>
                <p class="mt-2 text-xs leading-relaxed text-base-content/70">
                  Hackathons with zero follow-through and sponsored keynote stages. Real builders don't want sponsors pitching SDKs; they want high-bandwidth peer rooms.
                </p>
              </div>
              <div class="pt-4 border-t border-dashed border-base-content/10 flex items-center justify-between text-xs text-base-content/60 font-mono">
                <span>Insight #2</span>
                <span class="text-secondary font-semibold">Format breakdown →</span>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="group relative h-[280px] w-80 flex-none snap-start overflow-hidden rounded-3xl border border-base-300/80 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-xs font-mono text-base-content/50">
                  <span class="text-primary font-semibold">03 · Infrastructure</span>
                  <span>4:00 min</span>
                </div>
                <h3 class="mt-4 font-display text-lg font-bold leading-snug text-base-content">
                  Early-stage AI builders lack real infrastructure and distribution
                </h3>
                <p class="mt-2 text-xs leading-relaxed text-base-content/70">
                  Getting compute credits, specialized cluster access, and distribution channels to paying users requires connections that early teams don't have.
                </p>
              </div>
              <div class="pt-4 border-t border-dashed border-base-content/10 flex items-center justify-between text-xs text-base-content/60 font-mono">
                <span>Insight #3</span>
                <span class="text-primary font-semibold">Infra inequality →</span>
              </div>
            </div>

            <!-- Card 4 -->
            <div class="group relative h-[280px] w-80 flex-none snap-start overflow-hidden rounded-3xl border border-base-300/80 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-xs font-mono text-base-content/50">
                  <span class="text-accent font-semibold">04 · Domain Experts</span>
                  <span>3:45 min</span>
                </div>
                <h3 class="mt-4 font-display text-lg font-bold leading-snug text-base-content">
                  Domain experts have problems worth solving but can't build with AI
                </h3>
                <p class="mt-2 text-xs leading-relaxed text-base-content/70">
                  Doctors, supply-chain leaders, and legal counsels know exactly where the money and bottlenecks are, but lack the technical depth to operationalize agents.
                </p>
              </div>
              <div class="pt-4 border-t border-dashed border-base-content/10 flex items-center justify-between text-xs text-base-content/60 font-mono">
                <span>Insight #4</span>
                <span class="text-accent font-semibold">Domain disconnect →</span>
              </div>
            </div>

            <!-- Card 5 -->
            <div class="group relative h-[280px] w-80 flex-none snap-start overflow-hidden rounded-3xl border border-base-300/80 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-xs font-mono text-base-content/50">
                  <span class="text-primary font-semibold">05 · Product</span>
                  <span>4:15 min</span>
                </div>
                <h3 class="mt-4 font-display text-lg font-bold leading-snug text-base-content">
                  AI engineers build technically impressive things for non-existent problems
                </h3>
                <p class="mt-2 text-xs leading-relaxed text-base-content/70">
                  Brilliant distributed systems and RAG pipelines designed in a vacuum that solve non-existent problems because no customer was ever in the room.
                </p>
              </div>
              <div class="pt-4 border-t border-dashed border-base-content/10 flex items-center justify-between text-xs text-base-content/60 font-mono">
                <span>Insight #5</span>
                <span class="text-primary font-semibold">Solution looking for problem →</span>
              </div>
            </div>

            <!-- Card 6 -->
            <div class="group relative h-[280px] w-80 flex-none snap-start overflow-hidden rounded-3xl border border-base-300/80 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-xs font-mono text-base-content/50">
                  <span class="text-secondary font-semibold">06 · Enterprise</span>
                  <span>3:30 min</span>
                </div>
                <h3 class="mt-4 font-display text-lg font-bold leading-snug text-base-content">
                  Enterprises want AI solutions but won't bet on unverified builders
                </h3>
                <p class="mt-2 text-xs leading-relaxed text-base-content/70">
                  Large organizations have real budgets and urgent needs, but security compliance and lack of trust prevent them from engaging with solo innovators.
                </p>
              </div>
              <div class="pt-4 border-t border-dashed border-base-content/10 flex items-center justify-between text-xs text-base-content/60 font-mono">
                <span>Insight #6</span>
                <span class="text-secondary font-semibold">Trust gap →</span>
              </div>
            </div>

            <!-- Card 7 -->
            <div class="group relative h-[280px] w-80 flex-none snap-start overflow-hidden rounded-3xl border border-base-300/80 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-xs font-mono text-base-content/50">
                  <span class="text-primary font-semibold">07 · Community</span>
                  <span>2:45 min</span>
                </div>
                <h3 class="mt-4 font-display text-lg font-bold leading-snug text-base-content">
                  Most 'communities' are broadcast channels disguised as networks
                </h3>
                <p class="mt-2 text-xs leading-relaxed text-base-content/70">
                  Slack channels with 5,000 members where nobody talks, newsletters with open rates that drop every week, and conferences with 80% spectators.
                </p>
              </div>
              <div class="pt-4 border-t border-dashed border-base-content/10 flex items-center justify-between text-xs text-base-content/60 font-mono">
                <span>Insight #7</span>
                <span class="text-primary font-semibold">Passive audience trap →</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- 4. HOW IT WORKS: THE 7 PILLARS & THE 6-STEP PIPELINE (Item 4 in Content Bank) -->
      <section id="how-it-works" class="py-16 md:py-20 border-b border-dashed border-base-content/15">
        <div class="container mx-auto px-6">
          <div class="max-w-3xl mb-12">
            <div class="font-mono text-xs font-semibold tracking-widest text-primary uppercase mb-2">THE ARCHITECTURE</div>
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tight text-base-content">
              How It Works: The 7 Pillars &amp; The 6-Step Pipeline
            </h2>
            <p class="mt-3 text-base-content/70 text-lg">
              A disciplined engineering engine designed to convert scattered experiments into durable, production-grade AI companies.
            </p>
          </div>

          <!-- 7 Pillars Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div class="rounded-3xl border border-base-300/70 bg-base-100 p-6 hover:border-primary/40 transition-colors">
              <span class="font-mono text-xs text-primary font-semibold">PILLAR 01</span>
              <h3 class="mt-2 font-display text-lg font-bold">Curated Density</h3>
              <p class="mt-2 text-sm text-base-content/70">Every attendee is hand-selected. No spectator tickets, no recruiters wandering hallways, no sales pitches disguised as lightning talks.</p>
            </div>
            <div class="rounded-3xl border border-base-300/70 bg-base-100 p-6 hover:border-primary/40 transition-colors">
              <span class="font-mono text-xs text-secondary font-semibold">PILLAR 02</span>
              <h3 class="mt-2 font-display text-lg font-bold">In-Person First</h3>
              <p class="mt-2 text-sm text-base-content/70">High-bandwidth trust, spontaneous architectural debates, and real-time pair debugging happen in physical rooms, not asynchronous Discord threads.</p>
            </div>
            <div class="rounded-3xl border border-base-300/70 bg-base-100 p-6 hover:border-primary/40 transition-colors">
              <span class="font-mono text-xs text-accent font-semibold">PILLAR 03</span>
              <h3 class="mt-2 font-display text-lg font-bold">Problem-Backwards, Not Tech-Forward</h3>
              <p class="mt-2 text-sm text-base-content/70">We don't ask "what can we build with this new API?" We ask "what breaks in an enterprise logistics pipeline and will someone pay $50k to fix it?"</p>
            </div>
            <div class="rounded-3xl border border-base-300/70 bg-base-100 p-6 hover:border-primary/40 transition-colors">
              <span class="font-mono text-xs text-primary font-semibold">PILLAR 04</span>
              <h3 class="mt-2 font-display text-lg font-bold">Production Over Prototypes</h3>
              <p class="mt-2 text-sm text-base-content/70">A Jupyter notebook demo is not a milestone. Latency under load, evaluation accuracy, token cost bounds, and security guardrails are milestones.</p>
            </div>
            <div class="rounded-3xl border border-base-300/70 bg-base-100 p-6 hover:border-primary/40 transition-colors">
              <span class="font-mono text-xs text-secondary font-semibold">PILLAR 05</span>
              <h3 class="mt-2 font-display text-lg font-bold">The Cross-Discipline Bridge</h3>
              <p class="mt-2 text-sm text-base-content/70">Engineering excellence paired directly with seasoned domain experts who bring real-world proprietary datasets and operational friction.</p>
            </div>
            <div class="rounded-3xl border border-base-300/70 bg-base-100 p-6 hover:border-primary/40 transition-colors">
              <span class="font-mono text-xs text-accent font-semibold">PILLAR 06</span>
              <h3 class="mt-2 font-display text-lg font-bold">Skin in the Game</h3>
              <p class="mt-2 text-sm text-base-content/70">Builders retain 100% of their IP and agency. When noClue backs a project through compute or capital, we align directly with builder equity.</p>
            </div>
            <div class="rounded-3xl border border-base-300/70 bg-base-100 p-6 hover:border-primary/40 transition-colors md:col-span-2 lg:col-span-3">
              <span class="font-mono text-xs text-primary font-semibold">PILLAR 07</span>
              <h3 class="mt-2 font-display text-lg font-bold">Capital and Distribution Follow Proof</h3>
              <p class="mt-2 text-sm text-base-content/70">We don't raise funds on speculative slide decks. Capital, compute clusters, and enterprise customer intros are unlocked only when benchmarks and traction are verified.</p>
            </div>
          </div>

          <!-- The 6-Step Pipeline Section -->
          <div class="rounded-3xl border border-dashed border-base-content/20 bg-base-200/40 p-8 md:p-12">
            <div class="font-mono text-xs text-primary font-semibold tracking-wider uppercase mb-2">SYSTEM PIPELINE</div>
            <h3 class="font-display text-2xl font-bold mb-8">The 6 Steps: From Application to Venture Distribution</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="relative pl-6 border-l-2 border-primary">
                <div class="font-mono text-xs text-primary font-bold">STEP 01</div>
                <h4 class="font-semibold text-base mt-1">Application &amp; Vetting</h4>
                <p class="text-xs text-base-content/70 mt-2">Open applications reviewed on what you've actually shipped, your GitHub repos, and architectural depth. 100 builders per city.</p>
              </div>
              <div class="relative pl-6 border-l-2 border-secondary">
                <div class="font-mono text-xs text-secondary font-bold">STEP 02</div>
                <h4 class="font-semibold text-base mt-1">Reality Check Summit</h4>
                <p class="text-xs text-base-content/70 mt-2">Intense 1-2 day in-person summits. Unfiltered teardowns, live code review, zero stage keynotes, real domain friction.</p>
              </div>
              <div class="relative pl-6 border-l-2 border-accent">
                <div class="font-mono text-xs text-accent font-bold">STEP 03</div>
                <h4 class="font-semibold text-base mt-1">Solution Lab &amp; Cohort</h4>
                <p class="text-xs text-base-content/70 mt-2">Top performers enter the incubation loop. Cross-discipline teams paired directly with corporate problem holders.</p>
              </div>
              <div class="relative pl-6 border-l-2 border-primary">
                <div class="font-mono text-xs text-primary font-bold">STEP 04</div>
                <h4 class="font-semibold text-base mt-1">Infra &amp; Compute Grants</h4>
                <p class="text-xs text-base-content/70 mt-2">Direct access to partner cloud credits, specialized GPU clusters, benchmark test suites, and evaluation harnesses.</p>
              </div>
              <div class="relative pl-6 border-l-2 border-secondary">
                <div class="font-mono text-xs text-secondary font-bold">STEP 05</div>
                <h4 class="font-semibold text-base mt-1">Enterprise Validation</h4>
                <p class="text-xs text-base-content/70 mt-2">Live proof-of-concept deployments inside partner corporate environments with real enterprise data and SLAs.</p>
              </div>
              <div class="relative pl-6 border-l-2 border-accent">
                <div class="font-mono text-xs text-accent font-bold">STEP 06</div>
                <h4 class="font-semibold text-base mt-1">Venture Backing &amp; Scale</h4>
                <p class="text-xs text-base-content/70 mt-2">Direct introduction to top-tier institutional seed funds across India, US, and Europe. Bridge to global markets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. REALITY CHECK 2026 MULTI-CITY SUMMITS (Lines 3205-3442 of WeAreDevelopers) -->
      <section id="reality-check" class="py-16 md:py-24 border-b border-dashed border-base-content/15">
        <div class="container mx-auto px-6">
          <div class="mx-auto mb-14 max-w-3xl text-center">
            <div class="font-mono text-xs tracking-widest text-primary uppercase font-semibold mb-2">FLAGSHIP EVENTS</div>
            <h2 class="font-display text-4xl tracking-tight text-balance md:text-5xl font-bold">
              Reality Check 2026
            </h2>
            <p class="mt-3 text-base leading-relaxed text-base-content/70 md:text-lg">
              Bengaluru. Delhi NCR. Mumbai. 100 Hand-Picked Builders Per City. Zero Fluff.
            </p>
          </div>

          <!-- 3 City Cards (Exact WeAreDevelopers Event Cards Structure) -->
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            
            <!-- Bengaluru Card -->
            <div class="group card relative h-full rounded-3xl border border-base-300/70 bg-base-100 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
              <div class="card-body gap-0 p-6 flex flex-col justify-between">
                <div>
                  <div class="mb-4 flex items-center justify-between gap-3">
                    <span class="rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">India · South</span>
                    <span class="font-mono text-xs text-base-content/50">May 2026</span>
                  </div>

                  <h3 class="mb-2 card-title items-start font-display text-xl leading-7 font-semibold text-balance text-base-content group-hover:text-primary">
                    Reality Check Bengaluru
                  </h3>

                  <div class="mb-4 flex items-start gap-2 text-base-content/60">
                    <svg class="mt-0.5 size-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>
                    <div class="text-sm">
                      <div class="font-medium text-base-content">Bengaluru, Karnataka</div>
                      <div class="mt-0.5 text-xs text-base-content/60">AI in Code, Autonomous Agents, Developer Tools &amp; Infra</div>
                    </div>
                  </div>

                  <!-- Speaker Avatar Overlap -->
                  <div class="mb-6">
                    <div class="flex items-center gap-2">
                      <div class="flex -space-x-2.5 overflow-hidden">
                        <img class="inline-block size-8 rounded-full ring-2 ring-base-100 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Avatar" />
                        <img class="inline-block size-8 rounded-full ring-2 ring-base-100 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Avatar" />
                        <img class="inline-block size-8 rounded-full ring-2 ring-base-100 object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80" alt="Avatar" />
                        <img class="inline-block size-8 rounded-full ring-2 ring-base-100 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" alt="Avatar" />
                      </div>
                      <span class="text-xs text-base-content/60 font-mono">100 Hand-Picked Builders</span>
                    </div>
                  </div>
                </div>

                <div class="card-actions flex items-center justify-between pt-4 border-t border-dashed border-base-content/10">
                  <button type="button" class="btn btn-primary btn-sm rounded-full px-4 open-apply-modal-btn">
                    Apply for seats
                  </button>
                  <button type="button" class="btn btn-ghost btn-sm rounded-full open-cfp-modal-btn" data-city="Bengaluru">
                    Propose talk →
                  </button>
                </div>
              </div>
            </div>

            <!-- Delhi NCR Card -->
            <div class="group card relative h-full rounded-3xl border border-base-300/70 bg-base-100 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
              <div class="card-body gap-0 p-6 flex flex-col justify-between">
                <div>
                  <div class="mb-4 flex items-center justify-between gap-3">
                    <span class="rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20">India · North</span>
                    <span class="font-mono text-xs text-base-content/50">July 2026</span>
                  </div>

                  <h3 class="mb-2 card-title items-start font-display text-xl leading-7 font-semibold text-balance text-base-content group-hover:text-primary">
                    Reality Check Delhi NCR
                  </h3>

                  <div class="mb-4 flex items-start gap-2 text-base-content/60">
                    <svg class="mt-0.5 size-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>
                    <div class="text-sm">
                      <div class="font-medium text-base-content">Delhi NCR, India</div>
                      <div class="mt-0.5 text-xs text-base-content/60">Enterprise AI, GovTech, FinTech &amp; Supply Chain Automation</div>
                    </div>
                  </div>

                  <!-- Speaker Avatar Overlap -->
                  <div class="mb-6">
                    <div class="flex items-center gap-2">
                      <div class="flex -space-x-2.5 overflow-hidden">
                        <img class="inline-block size-8 rounded-full ring-2 ring-base-100 object-cover" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=80&q=80" alt="Avatar" />
                        <img class="inline-block size-8 rounded-full ring-2 ring-base-100 object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80" alt="Avatar" />
                        <img class="inline-block size-8 rounded-full ring-2 ring-base-100 object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80" alt="Avatar" />
                        <img class="inline-block size-8 rounded-full ring-2 ring-base-100 object-cover" src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=80" alt="Avatar" />
                      </div>
                      <span class="text-xs text-base-content/60 font-mono">100 Hand-Picked Builders</span>
                    </div>
                  </div>
                </div>

                <div class="card-actions flex items-center justify-between pt-4 border-t border-dashed border-base-content/10">
                  <button type="button" class="btn btn-primary btn-sm rounded-full px-4 open-apply-modal-btn">
                    Apply for seats
                  </button>
                  <button type="button" class="btn btn-ghost btn-sm rounded-full open-cfp-modal-btn" data-city="Delhi NCR">
                    Propose talk →
                  </button>
                </div>
              </div>
            </div>

            <!-- Mumbai Card -->
            <div class="group card relative h-full rounded-3xl border border-base-300/70 bg-base-100 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
              <div class="card-body gap-0 p-6 flex flex-col justify-between">
                <div>
                  <div class="mb-4 flex items-center justify-between gap-3">
                    <span class="rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-purple-500/10 text-purple-500 border border-purple-500/20">India · West</span>
                    <span class="font-mono text-xs text-base-content/50">September 2026</span>
                  </div>

                  <h3 class="mb-2 card-title items-start font-display text-xl leading-7 font-semibold text-balance text-base-content group-hover:text-primary">
                    Reality Check Mumbai
                  </h3>

                  <div class="mb-4 flex items-start gap-2 text-base-content/60">
                    <svg class="mt-0.5 size-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>
                    <div class="text-sm">
                      <div class="font-medium text-base-content">Mumbai, Maharashtra</div>
                      <div class="mt-0.5 text-xs text-base-content/60">Generative Media, Creative Tech, Consumer AI &amp; Entertainment</div>
                    </div>
                  </div>

                  <!-- Speaker Avatar Overlap -->
                  <div class="mb-6">
                    <div class="flex items-center gap-2">
                      <div class="flex -space-x-2.5 overflow-hidden">
                        <img class="inline-block size-8 rounded-full ring-2 ring-base-100 object-cover" src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=80&q=80" alt="Avatar" />
                        <img class="inline-block size-8 rounded-full ring-2 ring-base-100 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Avatar" />
                        <img class="inline-block size-8 rounded-full ring-2 ring-base-100 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Avatar" />
                        <img class="inline-block size-8 rounded-full ring-2 ring-base-100 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Avatar" />
                      </div>
                      <span class="text-xs text-base-content/60 font-mono">100 Hand-Picked Builders</span>
                    </div>
                  </div>
                </div>

                <div class="card-actions flex items-center justify-between pt-4 border-t border-dashed border-base-content/10">
                  <button type="button" class="btn btn-primary btn-sm rounded-full px-4 open-apply-modal-btn">
                    Apply for seats
                  </button>
                  <button type="button" class="btn btn-ghost btn-sm rounded-full open-cfp-modal-btn" data-city="Mumbai">
                    Propose talk →
                  </button>
                </div>
              </div>
            </div>

          </div>

          <!-- BIG VIDEO TEASER + HALL OF FAME (Lines 3443-3603 of WeAreDevelopers) -->
          <div class="mt-12 overflow-hidden rounded-4xl border border-base-300/70 bg-base-100 shadow-sm md:mt-16">
            <div class="grid lg:grid-cols-[1.1fr_0.9fr]">
              <!-- Left video teaser -->
              <div class="relative min-h-[300px] overflow-hidden border-b border-base-300/70 bg-neutral lg:min-h-full lg:border-r lg:border-b-0 p-8 flex flex-col justify-between">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                  alt="In-person rooms"
                  class="absolute inset-0 size-full object-cover opacity-35"
                />
                <div class="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/50 to-primary/20"></div>

                <div class="relative z-10 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-white/90 backdrop-blur-sm">
                  REALITY CHECK STANDARD
                </div>

                <div class="relative z-10 mt-16">
                  <p class="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
                    100+ Builders. Zero panels. The talks and architectures your team debates for years.
                  </p>
                  <p class="mt-3 text-sm text-white/80 leading-relaxed max-w-md">
                    No slides pitched by PR managers. Only deep architectural teardowns, production war stories, and code reviews in high-density rooms.
                  </p>
                </div>
              </div>

              <!-- Right Hall of Fame / Advisors -->
              <div class="p-6 md:p-8">
                <p class="font-mono text-xs font-semibold tracking-widest text-base-content/45 uppercase">Contributors &amp; Advisory</p>
                <h3 class="mt-2 font-display text-2xl font-bold tracking-tight text-base-content">
                  Advisory &amp; Core Network
                </h3>
                <p class="mt-2 text-sm text-base-content/60">
                  Engineers and executives shipping AI at scale across leading tech companies and startups.
                </p>

                <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div class="flex items-center gap-3 rounded-2xl border border-base-300/70 bg-base-100 p-3 hover:border-primary/40 transition-colors">
                    <img class="size-11 rounded-xl object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Raghav" />
                    <div class="min-w-0">
                      <div class="font-semibold text-sm truncate">Raghav</div>
                      <div class="text-xs text-base-content/60 truncate">Founder, noClue Network</div>
                    </div>
                  </div>

                  <div class="flex items-center gap-3 rounded-2xl border border-base-300/70 bg-base-100 p-3 hover:border-primary/40 transition-colors">
                    <img class="size-11 rounded-xl object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Advisor" />
                    <div class="min-w-0">
                      <div class="font-semibold text-sm truncate">Senior Staff AI Lead</div>
                      <div class="text-xs text-base-content/60 truncate">Autonomous Agent Systems</div>
                    </div>
                  </div>

                  <div class="flex items-center gap-3 rounded-2xl border border-base-300/70 bg-base-100 p-3 hover:border-primary/40 transition-colors">
                    <img class="size-11 rounded-xl object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80" alt="Advisor" />
                    <div class="min-w-0">
                      <div class="font-semibold text-sm truncate">Healthcare ML Director</div>
                      <div class="text-xs text-base-content/60 truncate">Clinical Diagnostics &amp; Imaging</div>
                    </div>
                  </div>

                  <div class="flex items-center gap-3 rounded-2xl border border-base-300/70 bg-base-100 p-3 hover:border-primary/40 transition-colors">
                    <img class="size-11 rounded-xl object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" alt="Advisor" />
                    <div class="min-w-0">
                      <div class="font-semibold text-sm truncate">FinTech Infra Lead</div>
                      <div class="text-xs text-base-content/60 truncate">Low-Latency Vector &amp; RAG</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. HORIZON PROGRAMS: HACKER HOUSE, SOLUTION LAB, VENTURES (Item 5 in Content Bank) -->
      <section id="horizons" class="py-16 md:py-20 border-b border-dashed border-base-content/15 bg-base-200/20">
        <div class="container mx-auto px-6">
          <div class="max-w-3xl mb-12">
            <div class="font-mono text-xs font-semibold tracking-widest text-primary uppercase mb-2">DIRECTIONAL HORIZONS</div>
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tight text-base-content">
              Programs &amp; Horizons
            </h2>
            <p class="mt-3 text-base-content/70 text-lg">
              Reality Check is our entry summit. What follows is focused incubation, compute allocation, and institutional scale.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Hacker House -->
            <div class="rounded-3xl border border-base-300/80 bg-base-100 p-6 flex flex-col justify-between hover:border-primary/40 transition-all">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="badge badge-outline font-mono text-xs">Residency</span>
                  <span class="text-xs font-mono text-base-content/50">Invite-Only</span>
                </div>
                <h3 class="font-display text-xl font-bold">Hacker House</h3>
                <p class="mt-2 text-sm text-base-content/70 leading-relaxed">
                  High-density physical co-living and building residency. 20 hand-selected founders and senior engineers building in isolation with dedicated cluster compute.
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-dashed border-base-content/10 flex items-center justify-between text-xs font-mono text-base-content/60">
                <span>Status: Directional Horizon</span>
                <span class="text-primary font-semibold">Private Access →</span>
              </div>
            </div>

            <!-- Solution Lab -->
            <div class="rounded-3xl border border-base-300/80 bg-base-100 p-6 flex flex-col justify-between hover:border-primary/40 transition-all">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="badge badge-primary font-mono text-xs">Incubation</span>
                  <span class="text-xs font-mono text-base-content/50">Post-Summit</span>
                </div>
                <h3 class="font-display text-xl font-bold">Solution Lab</h3>
                <p class="mt-2 text-sm text-base-content/70 leading-relaxed">
                  Structured sprint pairs between vetted builders and enterprise challenge holders. Transforming operational bottleneck specs into viable production pilots.
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-dashed border-base-content/10 flex items-center justify-between text-xs font-mono text-base-content/60">
                <span>Status: Active Pipeline</span>
                <span class="text-primary font-semibold">Learn More →</span>
              </div>
            </div>

            <!-- Ventures -->
            <div class="rounded-3xl border border-base-300/80 bg-base-100 p-6 flex flex-col justify-between hover:border-primary/40 transition-all">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <span class="badge badge-secondary font-mono text-xs">Capital</span>
                  <span class="text-xs font-mono text-base-content/50">Seed &amp; Scale</span>
                </div>
                <h3 class="font-display text-xl font-bold">noClue Ventures</h3>
                <p class="mt-2 text-sm text-base-content/70 leading-relaxed">
                  Co-investment vehicle backing the standout teams emerging from noClue summits. Fast-track introductions to top-tier institutional funds across India, US, and EU.
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-dashed border-base-content/10 flex items-center justify-between text-xs font-mono text-base-content/60">
                <span>Status: Horizon Fund</span>
                <span class="text-secondary font-semibold">Investor Deck →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. SPONSORED / PARTNERS STRIP (Lines 2991-3086 of WeAreDevelopers) -->
      <section id="for-partners" class="border-b border-dashed border-base-300 bg-base-200/40 py-12 md:py-16">
        <div class="container mx-auto px-6">
          <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div class="font-mono text-[11px] tracking-[0.22em] text-primary uppercase font-semibold">ECOSYSTEM &amp; PARTNERS</div>
              <h2 class="font-display text-2xl md:text-3xl font-bold mt-1">4 Co-Builder Partner Tiers</h2>
              <p class="text-sm text-base-content/70 mt-1">Deploy your models, compute, and platforms directly into production workflows with the top 1% of AI engineers.</p>
            </div>
            <button type="button" class="btn btn-outline btn-sm rounded-full open-partner-modal-btn">
              Download Partner Deck →
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Tier 1 -->
            <div class="flex flex-col rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm hover:border-primary/40 transition-all">
              <span class="font-mono text-xs text-primary font-bold">TIER 01</span>
              <h3 class="font-bold text-base mt-1">Foundational Partners</h3>
              <p class="text-xs text-base-content/70 mt-2">Cloud hyperscalers, foundation model providers, and GPU cluster providers powering builder compute grants.</p>
              <div class="mt-auto pt-4 text-xs font-mono text-base-content/50">
                1 Per City Max
              </div>
            </div>

            <!-- Tier 2 -->
            <div class="flex flex-col rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm hover:border-primary/40 transition-all">
              <span class="font-mono text-xs text-secondary font-bold">TIER 02</span>
              <h3 class="font-bold text-base mt-1">Ecosystem &amp; Tools</h3>
              <p class="text-xs text-base-content/70 mt-2">Vector databases, evaluation platforms, observability tools, and API infrastructure teams seeking real adoption.</p>
              <div class="mt-auto pt-4 text-xs font-mono text-base-content/50">
                Tool Integration Sprints
              </div>
            </div>

            <!-- Tier 3 -->
            <div class="flex flex-col rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm hover:border-primary/40 transition-all">
              <span class="font-mono text-xs text-accent font-bold">TIER 03</span>
              <h3 class="font-bold text-base mt-1">Challenge Partners</h3>
              <p class="text-xs text-base-content/70 mt-2">Enterprises with real datasets and commercial problem statements looking for production prototypes.</p>
              <div class="mt-auto pt-4 text-xs font-mono text-base-content/50">
                Direct Pilot Pipelines
              </div>
            </div>

            <!-- Tier 4 -->
            <div class="flex flex-col rounded-2xl border border-base-300/70 bg-base-100 p-5 shadow-sm hover:border-primary/40 transition-all">
              <span class="font-mono text-xs text-primary font-bold">TIER 04</span>
              <h3 class="font-bold text-base mt-1">Community &amp; Media</h3>
              <p class="text-xs text-base-content/70 mt-2">Technical publications, developer podcasts, and grassroots builder collectives amplifying real findings.</p>
              <div class="mt-auto pt-4 text-xs font-mono text-base-content/50">
                Co-Distribution &amp; CFP
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. THE 3 AUDIENCES: FOR BUILDERS, COMPANIES, DOMAIN EXPERTS (Items 6, 7, 8 in Content Bank) -->
      <section class="py-16 md:py-20 border-b border-dashed border-base-content/15">
        <div class="container mx-auto px-6">
          <div class="max-w-3xl mb-12">
            <div class="font-mono text-xs font-semibold tracking-widest text-primary uppercase mb-2">NETWORK VALUE</div>
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tight text-base-content">
              Built for Three Distinct Groups
            </h2>
            <p class="mt-3 text-base-content/70 text-lg">
              noClue works because it bridges the builders who write the systems, the domain experts who own the problems, and the companies that need to deploy them.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- For Builders -->
            <div id="for-builders" class="flex flex-col rounded-3xl border border-base-300/80 bg-base-100 p-8 shadow-sm">
              <div class="font-mono text-xs font-bold text-primary mb-2 uppercase">01 / Builders &amp; Founders</div>
              <h3 class="font-display text-2xl font-bold mb-4">For Builders</h3>
              <ul class="space-y-3 text-sm text-base-content/80 flex-1">
                <li class="flex items-start gap-2">
                  <span class="text-primary font-bold">✓</span>
                  <span><strong>Unfiltered Peer Review:</strong> Brutally honest technical feedback from founders who've faced the exact same latency and context bottlenecks.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary font-bold">✓</span>
                  <span><strong>Compute &amp; Cloud Credits:</strong> Direct grants from foundational partners so your burn rate doesn't stall your model evaluations.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary font-bold">✓</span>
                  <span><strong>Enterprise Intros:</strong> Direct pipelines to corporate decision-makers ready to pilot real solutions without corporate red tape.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-primary font-bold">✓</span>
                  <span><strong>100% IP Ownership:</strong> You retain complete equity and control over everything you architect.</span>
                </li>
              </ul>
              <div class="mt-8 pt-6 border-t border-dashed border-base-content/10">
                <button type="button" class="btn btn-primary btn-block rounded-full open-apply-modal-btn">Apply as Builder</button>
              </div>
            </div>

            <!-- For Companies -->
            <div class="flex flex-col rounded-3xl border border-base-300/80 bg-base-100 p-8 shadow-sm">
              <div class="font-mono text-xs font-bold text-secondary mb-2 uppercase">02 / Enterprises &amp; Sponsors</div>
              <h3 class="font-display text-2xl font-bold mb-4">For Companies</h3>
              <ul class="space-y-3 text-sm text-base-content/80 flex-1">
                <li class="flex items-start gap-2">
                  <span class="text-secondary font-bold">✓</span>
                  <span><strong>Zero-Fluff Access:</strong> Connect directly with verified engineers actually building production agents, not spectators.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-secondary font-bold">✓</span>
                  <span><strong>Challenge Sponsorship:</strong> Put your company's operational bottlenecks directly in front of 100 top practitioners.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-secondary font-bold">✓</span>
                  <span><strong>Verified Talent:</strong> Discover senior engineers and technical co-founders through shipped systems rather than CV keywords.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-secondary font-bold">✓</span>
                  <span><strong>Commercial Pilots:</strong> Fast-track early proof-of-concept deployments with validated security bounds.</span>
                </li>
              </ul>
              <div class="mt-8 pt-6 border-t border-dashed border-base-content/10">
                <button type="button" class="btn btn-secondary btn-block rounded-full open-partner-modal-btn">Partner with noClue</button>
              </div>
            </div>

            <!-- For Domain Experts -->
            <div id="for-domain-experts" class="flex flex-col rounded-3xl border border-base-300/80 bg-base-100 p-8 shadow-sm">
              <div class="font-mono text-xs font-bold text-accent mb-2 uppercase">03 / Industry Specialists</div>
              <h3 class="font-display text-2xl font-bold mb-4">For Domain Experts</h3>
              <ul class="space-y-3 text-sm text-base-content/80 flex-1">
                <li class="flex items-start gap-2">
                  <span class="text-accent font-bold">✓</span>
                  <span><strong>Your Problem is the Product:</strong> Medical, legal, supply chain, and finance leaders who have real pain points worth solving.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-accent font-bold">✓</span>
                  <span><strong>Match with Engineers:</strong> Team up with elite technical builders who can turn your domain insight into scalable software.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-accent font-bold">✓</span>
                  <span><strong>Equity &amp; Skin in the Game:</strong> Become domain co-founders or design partners with verified upside.</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="text-accent font-bold">✓</span>
                  <span><strong>Reality Check Rooms:</strong> Participate in closed-door sessions where your domain dataset stress-tests new agent architectures.</span>
                </li>
              </ul>
              <div class="mt-8 pt-6 border-t border-dashed border-base-content/10">
                <button type="button" class="btn btn-outline btn-block rounded-full open-apply-modal-btn">Join as Domain Expert</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 9. MANIFESTO (Item 9 in Content Bank - 8 Beliefs) -->
      <section id="manifesto" class="py-16 md:py-24 border-b border-dashed border-base-content/15 bg-base-200/30">
        <div class="container mx-auto px-6">
          <div class="max-w-3xl mx-auto text-center mb-16">
            <div class="font-mono text-xs font-semibold tracking-widest text-primary uppercase mb-2">THE NOISELESS PRINCIPLES</div>
            <h2 class="font-display text-4xl md:text-5xl font-bold tracking-tight">The noClue Manifesto</h2>
            <p class="mt-3 text-base-content/70 text-lg">Eight beliefs that define how we build, who we invite, and why we refuse the hype cycle.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div class="border-l-2 border-primary pl-6">
              <span class="font-mono text-xs text-primary font-bold">BELIEF 01</span>
              <h3 class="font-display text-xl font-bold mt-1">Demos are easy. Production is hard.</h3>
              <p class="text-sm text-base-content/70 mt-2 leading-relaxed">Anyone can write a prompt that looks magical in a five-minute screen recording. What happens at 3 AM when an upstream model hallucinates JSON schema in production is all that matters.</p>
            </div>
            <div class="border-l-2 border-secondary pl-6">
              <span class="font-mono text-xs text-secondary font-bold">BELIEF 02</span>
              <h3 class="font-display text-xl font-bold mt-1">Talkers multiply. Builders build in quiet.</h3>
              <p class="text-sm text-base-content/70 mt-2 leading-relaxed">The louder someone is about AI on social media, the less likely they are running production inference clusters. We build high-bandwidth rooms exclusively for the quiet practitioners.</p>
            </div>
            <div class="border-l-2 border-accent pl-6">
              <span class="font-mono text-xs text-accent font-bold">BELIEF 03</span>
              <h3 class="font-display text-xl font-bold mt-1">In-person bandwidth cannot be synthesized.</h3>
              <p class="text-sm text-base-content/70 mt-2 leading-relaxed">Trust, genuine disagreement, and spontaneous breakthroughs require physical rooms. Virtual webinars and Discord channels produce broadcast noise; physical proximity builds companies.</p>
            </div>
            <div class="border-l-2 border-primary pl-6">
              <span class="font-mono text-xs text-primary font-bold">BELIEF 04</span>
              <h3 class="font-display text-xl font-bold mt-1">Technology without domain depth is amusement.</h3>
              <p class="text-sm text-base-content/70 mt-2 leading-relaxed">An autonomous agent that cannot survive the regulatory and operational realities of a hospital, a container port, or a bank is just a parlor trick. Domain experts are mandatory partners.</p>
            </div>
            <div class="border-l-2 border-secondary pl-6">
              <span class="font-mono text-xs text-secondary font-bold">BELIEF 05</span>
              <h3 class="font-display text-xl font-bold mt-1">Curated density beats sheer volume every time.</h3>
              <p class="text-sm text-base-content/70 mt-2 leading-relaxed">We will never sell 5,000 spectator tickets. A room of 100 deeply verified builders produces more lasting value than a convention center filled with swag collectors.</p>
            </div>
            <div class="border-l-2 border-accent pl-6">
              <span class="font-mono text-xs text-accent font-bold">BELIEF 06</span>
              <h3 class="font-display text-xl font-bold mt-1">Skin in the game over advisory lip-service.</h3>
              <p class="text-sm text-base-content/70 mt-2 leading-relaxed">We back teams with compute, infrastructure, and direct capital alignment. We do not take equity without giving builders asymmetric upside and complete agency.</p>
            </div>
            <div class="border-l-2 border-primary pl-6">
              <span class="font-mono text-xs text-primary font-bold">BELIEF 07</span>
              <h3 class="font-display text-xl font-bold mt-1">India is the engineering crucible of the next decade.</h3>
              <p class="text-sm text-base-content/70 mt-2 leading-relaxed">India has the density, hunger, and engineering talent to lead the world in operational AI. We are building the connective tissue that links India's best to global distribution.</p>
            </div>
            <div class="border-l-2 border-secondary pl-6">
              <span class="font-mono text-xs text-secondary font-bold">BELIEF 08</span>
              <h3 class="font-display text-xl font-bold mt-1">Less hype. More shipped.</h3>
              <p class="text-sm text-base-content/70 mt-2 leading-relaxed">If it cannot be benchmarked, measured, and verified by customers, it does not count. Everything we do serves one objective: turning experiments into production software.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 10. ROADMAP (Item 10 in Content Bank - 7 Horizon Layers) -->
      <section id="roadmap" class="py-16 md:py-20 border-b border-dashed border-base-content/15">
        <div class="container mx-auto px-6">
          <div class="max-w-3xl mb-12">
            <div class="font-mono text-xs font-semibold tracking-widest text-primary uppercase mb-2">SYSTEM TRAJECTORY</div>
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tight text-base-content">
              Evolutionary Roadmap
            </h2>
            <p class="mt-3 text-base-content/70 text-lg">Seven systematic horizons from national summits to an autonomous venture and distribution engine.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="rounded-2xl border border-base-300/70 bg-base-100 p-5">
              <div class="font-mono text-xs text-primary font-bold">LAYER 01 · ACTIVE</div>
              <h3 class="font-bold text-base mt-1">Reality Check Summits</h3>
              <p class="text-xs text-base-content/70 mt-2">Flagship physical gatherings across Bengaluru, Delhi, and Mumbai. Establishing the 100-builder core density in each city.</p>
            </div>
            <div class="rounded-2xl border border-base-300/70 bg-base-100 p-5">
              <div class="font-mono text-xs text-secondary font-bold">LAYER 02 · Q3 2026</div>
              <h3 class="font-bold text-base mt-1">Solution Lab Pilots</h3>
              <p class="text-xs text-base-content/70 mt-2">Connecting top summit teams with enterprise challenge sponsors to run real proof-of-concept tests inside commercial infrastructure.</p>
            </div>
            <div class="rounded-2xl border border-base-300/70 bg-base-100 p-5">
              <div class="font-mono text-xs text-accent font-bold">LAYER 03 · Q4 2026</div>
              <h3 class="font-bold text-base mt-1">Compute Grant Network</h3>
              <p class="text-xs text-base-content/70 mt-2">Consortium of cloud and GPU partners pooling compute credits and cluster hours exclusively for noClue validated teams.</p>
            </div>
            <div class="rounded-2xl border border-base-300/70 bg-base-100 p-5">
              <div class="font-mono text-xs text-primary font-bold">LAYER 04 · HORIZON</div>
              <h3 class="font-bold text-base mt-1">Hacker House Residency</h3>
              <p class="text-xs text-base-content/70 mt-2">High-density in-person building residency for 20 founders and engineers working on breakout agent architectures.</p>
            </div>
            <div class="rounded-2xl border border-base-300/70 bg-base-100 p-5">
              <div class="font-mono text-xs text-secondary font-bold">LAYER 05 · HORIZON</div>
              <h3 class="font-bold text-base mt-1">Enterprise Advisory Consortium</h3>
              <p class="text-xs text-base-content/70 mt-2">Council of forward-looking enterprise CTOs and CIOs providing direct problem specifications and validation pipelines.</p>
            </div>
            <div class="rounded-2xl border border-base-300/70 bg-base-100 p-5">
              <div class="font-mono text-xs text-accent font-bold">LAYER 06 · HORIZON</div>
              <h3 class="font-bold text-base mt-1">noClue Seed Fund</h3>
              <p class="text-xs text-base-content/70 mt-2">Institutional investment vehicle providing initial checks and cap table support to projects graduating from Solution Lab.</p>
            </div>
            <div class="rounded-2xl border border-base-300/70 bg-base-100 p-5 md:col-span-2">
              <div class="font-mono text-xs text-primary font-bold">LAYER 07 · HORIZON</div>
              <h3 class="font-bold text-base mt-1">Cross-Border Bridge (US &amp; Europe)</h3>
              <p class="text-xs text-base-content/70 mt-2">Direct co-development and customer channels connecting Indian builder teams with enterprise buyers and investors across North America and Europe.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 11. FAQ ACCORDION (Item 11 in Content Bank - 9 Questions) -->
      <section id="faq" class="py-16 md:py-24 border-b border-dashed border-base-content/15">
        <div class="container mx-auto px-6 max-w-4xl">
          <div class="text-center mb-12">
            <div class="font-mono text-xs font-semibold tracking-widest text-primary uppercase mb-2">CLARITY</div>
            <h2 class="font-display text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <p class="mt-2 text-base-content/70">Everything you need to know about noClue, vetting criteria, and participation.</p>
          </div>

          <div class="space-y-4">
            <!-- Q1 -->
            <div class="collapse collapse-plus border border-base-300/80 bg-base-100 rounded-2xl">
              <input type="radio" name="faq-accordion" checked="checked" />
              <div class="collapse-title text-base font-semibold">What exactly is noClue?</div>
              <div class="collapse-content text-sm text-base-content/70 leading-relaxed">
                noClue is a curated network of AI builders, founders, engineers, and domain experts. We organize high-density, in-person summits (Reality Check), provide compute and infrastructure, connect builders with domain experts and enterprises, and help turn AI experiments into production software.
              </div>
            </div>

            <!-- Q2 -->
            <div class="collapse collapse-plus border border-base-300/80 bg-base-100 rounded-2xl">
              <input type="radio" name="faq-accordion" />
              <div class="collapse-title text-base font-semibold">Who is noClue for?</div>
              <div class="collapse-content text-sm text-base-content/70 leading-relaxed">
                Three groups: (1) Builders, engineers, and founders actively shipping with AI as a core capability; (2) Domain experts (doctors, lawyers, supply chain operators) with real-world problems who need technical partners; (3) Companies and partners looking to deploy AI tools, sponsor challenges, and recruit top engineers.
              </div>
            </div>

            <!-- Q3 -->
            <div class="collapse collapse-plus border border-base-300/80 bg-base-100 rounded-2xl">
              <input type="radio" name="faq-accordion" />
              <div class="collapse-title text-base font-semibold">How is noClue different from other AI conferences or communities?</div>
              <div class="collapse-content text-sm text-base-content/70 leading-relaxed">
                Most AI events are vendor showcases or pitch competitions with thousands of spectators. noClue is strictly in-person, curated to 100 hand-selected practitioners per event, with zero sales pitches or generic panels. We focus exclusively on what breaks in production and what works under real load.
              </div>
            </div>

            <!-- Q4 -->
            <div class="collapse collapse-plus border border-base-300/80 bg-base-100 rounded-2xl">
              <input type="radio" name="faq-accordion" />
              <div class="collapse-title text-base font-semibold">What is Reality Check 2026?</div>
              <div class="collapse-content text-sm text-base-content/70 leading-relaxed">
                Reality Check is our flagship summit series running in 2026 across Bengaluru (May), Delhi NCR (July), and Mumbai (September). Each summit convenes 100 curated builders for intensive architectural teardowns, peer review, and closed-door problem sessions.
              </div>
            </div>

            <!-- Q5 -->
            <div class="collapse collapse-plus border border-base-300/80 bg-base-100 rounded-2xl">
              <input type="radio" name="faq-accordion" />
              <div class="collapse-title text-base font-semibold">How do I get an invite or ticket?</div>
              <div class="collapse-content text-sm text-base-content/70 leading-relaxed">
                You apply through our online form. We review every application based on what you have actually built, shipped, or researched, not your social follower count or buzzwords. If selected, you receive an invitation to purchase your seat or attend on scholarship.
              </div>
            </div>

            <!-- Q6 -->
            <div class="collapse collapse-plus border border-base-300/80 bg-base-100 rounded-2xl">
              <input type="radio" name="faq-accordion" />
              <div class="collapse-title text-base font-semibold">Do you take equity in projects built at noClue?</div>
              <div class="collapse-content text-sm text-base-content/70 leading-relaxed">
                No. Attending Reality Check or participating in noClue events gives us zero claim on your IP or equity. If a team later enters the Solution Lab and receives direct seed capital or specialized compute investment from noClue Ventures, that happens under standard, founder-friendly venture terms negotiated separately.
              </div>
            </div>

            <!-- Q7 -->
            <div class="collapse collapse-plus border border-base-300/80 bg-base-100 rounded-2xl">
              <input type="radio" name="faq-accordion" />
              <div class="collapse-title text-base font-semibold">What is the Solution Lab?</div>
              <div class="collapse-content text-sm text-base-content/70 leading-relaxed">
                The Solution Lab is our incubation loop where standout builders collaborate directly with corporate and domain partners on live production challenges, backed by compute credits and technical mentors.
              </div>
            </div>

            <!-- Q8 -->
            <div class="collapse collapse-plus border border-base-300/80 bg-base-100 rounded-2xl">
              <input type="radio" name="faq-accordion" />
              <div class="collapse-title text-base font-semibold">How can my company partner with or sponsor noClue?</div>
              <div class="collapse-content text-sm text-base-content/70 leading-relaxed">
                We offer four partner tiers: Foundational, Ecosystem & Tools, Challenge, and Community/Media. Reach out via our partner form or email raghav@noclue.network to receive our partner deck and discuss integration.
              </div>
            </div>

            <!-- Q9 -->
            <div class="collapse collapse-plus border border-base-300/80 bg-base-100 rounded-2xl">
              <input type="radio" name="faq-accordion" />
              <div class="collapse-title text-base font-semibold">Where can I see past events and metrics?</div>
              <div class="collapse-content text-sm text-base-content/70 leading-relaxed">
                As per our community policy, past events and historical metrics will be published on a dedicated archive page at a later stage. We focus our active site entirely on upcoming programs and current builder cohorts.
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 12. BOTTOM CTA BANNER -->
      <section class="py-16 md:py-20 bg-primary text-primary-content">
        <div class="container mx-auto px-6 text-center max-w-3xl">
          <h2 class="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Ready to build with the top 1%?
          </h2>
          <p class="mt-4 text-base md:text-lg opacity-90 leading-relaxed">
            Applications for Reality Check Bengaluru, Delhi NCR, and Mumbai are currently open. 100 seats per city. No spectator tickets.
          </p>
          <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button type="button" class="btn btn-neutral rounded-full px-8 text-base font-semibold open-apply-modal-btn">
              Apply to join noClue
            </button>
            <button type="button" class="btn btn-outline rounded-full px-8 text-base font-semibold text-primary-content border-primary-content hover:bg-primary-content hover:text-primary open-partner-modal-btn">
              Partner with us
            </button>
          </div>
        </div>
      </section>
    </main>

    <!-- 13. MEGA FOOTER (Exact lines 3706-4079 of WeAreDevelopers) -->
    <footer class="footer text-base-content border-t border-dashed border-base-content/15 bg-base-200/40">
      <div class="container mx-auto px-6 py-16">
        
        <!-- World Clocks Strip -->
        <div class="mb-10 pb-6 border-b border-dashed border-base-content/15 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div class="flex items-center gap-2">
            <span class="size-2 rounded-full bg-emerald-500"></span>
            <span class="font-bold uppercase tracking-wider">noClue Network Times</span>
          </div>
          <div class="flex flex-wrap items-center gap-6 text-base-content/70">
            <div>Bengaluru: <span id="clock-blr" class="font-semibold text-base-content">--:--:--</span></div>
            <div>Delhi: <span id="clock-del" class="font-semibold text-base-content">--:--:--</span></div>
            <div>Mumbai: <span id="clock-bom" class="font-semibold text-base-content">--:--:--</span></div>
            <div>San Francisco: <span id="clock-sfo" class="font-semibold text-base-content">--:--:--</span></div>
            <div>Berlin: <span id="clock-ber" class="font-semibold text-base-content">--:--:--</span></div>
          </div>
        </div>

        <div class="mb-8 grid w-full grid-cols-1 gap-x-4 gap-y-8 min-[360px]:grid-cols-2 sm:gap-8 md:grid-cols-3 xl:grid-cols-[1.2fr_1fr_1.3fr_1fr_1fr] xl:gap-6">
          <!-- Col 1: About us -->
          <div class="min-w-0">
            <h4 class="mb-4 text-sm font-semibold text-base-content uppercase font-mono tracking-wider">About noClue</h4>
            <div class="flex flex-col gap-2.5 text-sm">
              <a href="#home-stage" class="text-base-content/70 hover:text-primary transition-colors">Our Mission</a>
              <a href="#the-problem" class="text-base-content/70 hover:text-primary transition-colors">The 7 Problems</a>
              <a href="#manifesto" class="text-base-content/70 hover:text-primary transition-colors">Manifesto</a>
              <a href="#roadmap" class="text-base-content/70 hover:text-primary transition-colors">Roadmap</a>
              <a href="#faq" class="text-base-content/70 hover:text-primary transition-colors">FAQ</a>
            </div>
          </div>

          <!-- Col 2: The Method -->
          <div class="min-w-0">
            <h4 class="mb-4 text-sm font-semibold text-base-content uppercase font-mono tracking-wider">The Method</h4>
            <div class="flex flex-col gap-2.5 text-sm">
              <a href="#how-it-works" class="text-base-content/70 hover:text-primary transition-colors">The 7 System Pillars</a>
              <a href="#how-it-works" class="text-base-content/70 hover:text-primary transition-colors">The 6-Step Pipeline</a>
              <a href="#horizons" class="text-base-content/70 hover:text-primary transition-colors">Hacker House</a>
              <a href="#horizons" class="text-base-content/70 hover:text-primary transition-colors">Solution Lab</a>
              <a href="#horizons" class="text-base-content/70 hover:text-primary transition-colors">noClue Ventures</a>
            </div>
          </div>

          <!-- Col 3: Reality Check 2026 -->
          <div class="min-w-0">
            <h4 class="mb-4 text-sm font-semibold text-base-content uppercase font-mono tracking-wider">Reality Check 2026</h4>
            <div class="flex flex-col gap-2.5 text-sm">
              <a href="#reality-check" class="text-base-content/70 hover:text-primary transition-colors">Bengaluru Summit (May 2026)</a>
              <a href="#reality-check" class="text-base-content/70 hover:text-primary transition-colors">Delhi NCR Summit (July 2026)</a>
              <a href="#reality-check" class="text-base-content/70 hover:text-primary transition-colors">Mumbai Summit (Sept 2026)</a>
              <a href="#" class="open-cfp-modal-btn text-base-content/70 hover:text-primary transition-colors">Call for Presentations (CFP)</a>
              <a href="#" class="open-apply-modal-btn text-base-content/70 hover:text-primary transition-colors">Seat Applications</a>
            </div>
          </div>

          <!-- Col 4: Audiences -->
          <div class="min-w-0">
            <h4 class="mb-4 text-sm font-semibold text-base-content uppercase font-mono tracking-wider">Audiences</h4>
            <div class="flex flex-col gap-2.5 text-sm">
              <a href="#for-builders" class="text-base-content/70 hover:text-primary transition-colors">For AI Builders</a>
              <a href="#for-partners" class="text-base-content/70 hover:text-primary transition-colors">For Enterprise Partners</a>
              <a href="#for-domain-experts" class="text-base-content/70 hover:text-primary transition-colors">For Domain Experts</a>
              <a href="#for-partners" class="text-base-content/70 hover:text-primary transition-colors">Compute Grants</a>
            </div>
          </div>

          <!-- Col 5: Partnerships -->
          <div class="min-w-0">
            <h4 class="mb-4 text-sm font-semibold text-base-content uppercase font-mono tracking-wider">Partnerships</h4>
            <div class="flex flex-col gap-2.5 text-sm">
              <a href="#for-partners" class="text-base-content/70 hover:text-primary transition-colors">Foundational Tier</a>
              <a href="#for-partners" class="text-base-content/70 hover:text-primary transition-colors">Ecosystem Tier</a>
              <a href="#for-partners" class="text-base-content/70 hover:text-primary transition-colors">Challenge Tier</a>
              <a href="#" class="open-partner-modal-btn text-base-content/70 hover:text-primary transition-colors">Partner Deck</a>
              <a href="mailto:raghav@noclue.network" class="text-base-content/70 hover:text-primary transition-colors">Direct Contact</a>
            </div>
          </div>
        </div>

        <!-- Lower Strip: Copyright, Legal, Theme Switcher -->
        <div class="w-full pt-6 border-t border-dashed border-base-content/15">
          <div class="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div class="text-center lg:text-left space-y-1">
              <p class="text-sm text-base-content/60">
                &copy; 2026 noClue Network. All rights reserved. Where AI gets built for real.
              </p>
              <div class="flex flex-wrap justify-center lg:justify-start gap-4 text-xs text-base-content/50">
                <a href="#faq" class="hover:text-base-content transition-colors">Privacy &amp; Terms</a>
                <span>•</span>
                <a href="#manifesto" class="hover:text-base-content transition-colors">Code of Conduct</a>
                <span>•</span>
                <a href="/home.md" class="hover:text-base-content transition-colors font-mono">View as Markdown (/home.md)</a>
              </div>
            </div>

            <!-- Theme Switcher Controls matching WeAreDevelopers lines 4007-4073 -->
            <div class="flex items-center gap-1 rounded-xl bg-base-200 p-1 border border-base-300">
              <button type="button" class="theme-btn px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-base-100 transition-colors" data-theme-val="light" title="Light theme">☀️ Light</button>
              <button type="button" class="theme-btn px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-base-100 transition-colors" data-theme-val="dark" title="Dark theme">🌙 Dark</button>
              <button type="button" class="theme-btn px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-base-100 transition-colors font-mono" data-theme-val="terminal" title="Terminal theme">&gt;_ Terminal</button>
              <button type="button" class="theme-btn px-2.5 py-1 rounded-lg text-xs font-semibold hover:bg-base-100 transition-colors" data-theme-val="halloween" title="Halloween theme">🎃</button>
            </div>
          </div>
        </div>

      </div>
    </footer>

    <!-- INTERACTIVE MODAL: APPLICATION (With Content Bank Item 13 Validation) -->
    <dialog id="apply-modal" class="modal">
      <div class="modal-box max-w-xl rounded-3xl p-6 sm:p-8 bg-base-100 border border-base-300 shadow-2xl">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4" aria-label="Close">✕</button>
        </form>

        <div class="font-mono text-xs text-primary font-semibold uppercase mb-1">REALITY CHECK 2026</div>
        <h3 class="font-display text-2xl font-bold">Apply for Curated Seats</h3>
        <p class="text-sm text-base-content/70 mt-1 mb-6">
          100 builders per city. No spectator tickets. Reviewed purely on what you have shipped.
        </p>

        <form id="apply-form" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="label text-xs font-semibold uppercase font-mono">Full Name *</label>
              <input type="text" required class="input input-bordered w-full rounded-xl text-sm" placeholder="e.g. Alex Chen" />
            </div>
            <div>
              <label class="label text-xs font-semibold uppercase font-mono">Email Address *</label>
              <input type="email" required class="input input-bordered w-full rounded-xl text-sm" placeholder="alex@company.com" />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="label text-xs font-semibold uppercase font-mono">City / Summit *</label>
              <select required class="select select-bordered w-full rounded-xl text-sm">
                <option value="Bengaluru">Bengaluru (May 2026)</option>
                <option value="Delhi NCR">Delhi NCR (July 2026)</option>
                <option value="Mumbai">Mumbai (September 2026)</option>
                <option value="All">All Cities (Founding Fellowship)</option>
              </select>
            </div>
            <div>
              <label class="label text-xs font-semibold uppercase font-mono">Primary Role *</label>
              <select required class="select select-bordered w-full rounded-xl text-sm">
                <option value="Builder/Engineer">AI Engineer / Architect</option>
                <option value="Founder">Founder / Technical Lead</option>
                <option value="Domain Expert">Domain Expert (Health/Law/Supply)</option>
                <option value="Enterprise Lead">Enterprise Partner / Sponsor</option>
              </select>
            </div>
          </div>

          <div>
            <label class="label text-xs font-semibold uppercase font-mono">GitHub / Portfolio / Project URL *</label>
            <input type="url" required class="input input-bordered w-full rounded-xl text-sm font-mono" placeholder="https://github.com/your-username" />
          </div>

          <div>
            <label class="label text-xs font-semibold uppercase font-mono">What is the hardest thing you've shipped in AI? *</label>
            <textarea required rows="3" class="textarea textarea-bordered w-full rounded-xl text-sm" placeholder="Mention production models, latency bottlenecks, token budgets, or evaluation harnesses. Zero buzzwords."></textarea>
          </div>

          <div class="pt-4 flex items-center justify-end gap-3">
            <button type="button" class="btn btn-ghost rounded-full" onclick="document.getElementById('apply-modal').close()">Cancel</button>
            <button type="submit" class="btn btn-primary rounded-full px-6">Submit Application</button>
          </div>
        </form>
      </div>
    </dialog>

    <!-- INTERACTIVE MODAL: CFP PROPOSAL -->
    <dialog id="cfp-modal" class="modal">
      <div class="modal-box max-w-xl rounded-3xl p-6 sm:p-8 bg-base-100 border border-base-300 shadow-2xl">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4" aria-label="Close">✕</button>
        </form>

        <div class="font-mono text-xs text-secondary font-semibold uppercase mb-1">CALL FOR PRESENTATIONS</div>
        <h3 class="font-display text-2xl font-bold">Propose a Teardown / Session</h3>
        <p class="text-sm text-base-content/70 mt-1 mb-6">
          Zero marketing keynotes. We only accept sessions showing live code, architectural trade-offs, and failure post-mortems.
        </p>

        <form id="cfp-form" class="space-y-4">
          <div>
            <label class="label text-xs font-semibold uppercase font-mono">Session Title *</label>
            <input type="text" required class="input input-bordered w-full rounded-xl text-sm" placeholder="e.g. Breaking Context Windows: Why Our Multi-Agent Stack Failed in Production" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="label text-xs font-semibold uppercase font-mono">Summit *</label>
              <select id="cfp-city-select" required class="select select-bordered w-full rounded-xl text-sm">
                <option value="Bengaluru">Bengaluru (May 2026)</option>
                <option value="Delhi NCR">Delhi NCR (July 2026)</option>
                <option value="Mumbai">Mumbai (September 2026)</option>
              </select>
            </div>
            <div>
              <label class="label text-xs font-semibold uppercase font-mono">Format *</label>
              <select required class="select select-bordered w-full rounded-xl text-sm">
                <option value="Architecture Teardown">Architectural Teardown (25 min)</option>
                <option value="Live Code Debugging">Live Code Debugging (30 min)</option>
                <option value="Post-Mortem">Production Failure Post-Mortem (20 min)</option>
              </select>
            </div>
          </div>

          <div>
            <label class="label text-xs font-semibold uppercase font-mono">Technical Abstract &amp; Proof of Work *</label>
            <textarea required rows="3" class="textarea textarea-bordered w-full rounded-xl text-sm" placeholder="Describe the architectural failure mode or breakthrough you will demonstrate on screen."></textarea>
          </div>

          <div class="pt-4 flex items-center justify-end gap-3">
            <button type="button" class="btn btn-ghost rounded-full" onclick="document.getElementById('cfp-modal').close()">Cancel</button>
            <button type="submit" class="btn btn-secondary rounded-full px-6">Submit CFP Proposal</button>
          </div>
        </form>
      </div>
    </dialog>

    <!-- INTERACTIVE MODAL: PARTNERSHIP DECK -->
    <dialog id="partner-modal" class="modal">
      <div class="modal-box max-w-lg rounded-3xl p-6 sm:p-8 bg-base-100 border border-base-300 shadow-2xl">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-4 top-4" aria-label="Close">✕</button>
        </form>

        <div class="font-mono text-xs text-primary font-semibold uppercase mb-1">ENTERPRISE &amp; COMPUTE</div>
        <h3 class="font-display text-2xl font-bold">Partner With noClue</h3>
        <p class="text-sm text-base-content/70 mt-1 mb-6">
          Access the top 1% of AI builders across India. Co-sponsor challenges, provide compute, or run enterprise pilots.
        </p>

        <form id="partner-form" class="space-y-4">
          <div>
            <label class="label text-xs font-semibold uppercase font-mono">Company / Organization *</label>
            <input type="text" required class="input input-bordered w-full rounded-xl text-sm" placeholder="e.g. Anthropic, Google Cloud, Stripe" />
          </div>
          <div>
            <label class="label text-xs font-semibold uppercase font-mono">Contact Work Email *</label>
            <input type="email" required class="input input-bordered w-full rounded-xl text-sm" placeholder="partner@company.com" />
          </div>
          <div>
            <label class="label text-xs font-semibold uppercase font-mono">Interested Tier *</label>
            <select required class="select select-bordered w-full rounded-xl text-sm">
              <option value="Foundational">Foundational Partner (Compute &amp; Cloud)</option>
              <option value="Ecosystem">Ecosystem &amp; Tools Partner (Developer Adoption)</option>
              <option value="Challenge">Challenge Partner (Enterprise Commercial Pilot)</option>
              <option value="Community">Community / Media Partner</option>
            </select>
          </div>

          <div class="pt-4 flex items-center justify-end gap-3">
            <button type="button" class="btn btn-ghost rounded-full" onclick="document.getElementById('partner-modal').close()">Cancel</button>
            <button type="submit" class="btn btn-primary rounded-full px-6">Request Partner Deck</button>
          </div>
        </form>
      </div>
    </dialog>

    <!-- INTERACTIVE MODAL: GLOBAL SEARCH (⌘K) -->
    <dialog id="search-modal" class="modal">
      <div class="modal-box max-w-2xl rounded-3xl p-6 bg-base-100 border border-base-300 shadow-2xl">
        <div class="relative">
          <input
            id="modal-search-input"
            type="text"
            class="input input-lg w-full rounded-2xl border-2 border-primary pl-12 pr-4 text-base focus:outline-none"
            placeholder="Search summits, problems, pillars, manifesto..."
          />
          <svg class="size-5 absolute left-4 top-1/2 -translate-y-1/2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>

        <div class="mt-4 max-h-72 overflow-y-auto space-y-2 font-sans" id="search-results-list">
          <div class="p-3 rounded-xl hover:bg-base-200 cursor-pointer flex items-center justify-between" onclick="location.hash='#reality-check'; document.getElementById('search-modal').close()">
            <div>
              <div class="font-semibold text-sm">Reality Check 2026 Summits</div>
              <div class="text-xs text-base-content/60">Bengaluru (May), Delhi NCR (July), Mumbai (Sept)</div>
            </div>
            <span class="badge badge-sm badge-primary font-mono text-[10px]">SUMMITS</span>
          </div>

          <div class="p-3 rounded-xl hover:bg-base-200 cursor-pointer flex items-center justify-between" onclick="location.hash='#the-problem'; document.getElementById('search-modal').close()">
            <div>
              <div class="font-semibold text-sm">The 7 Core Problems</div>
              <div class="text-xs text-base-content/60">Culture, format, infrastructure, domain experts, product, enterprise trust, community traps</div>
            </div>
            <span class="badge badge-sm badge-secondary font-mono text-[10px]">ANALYSIS</span>
          </div>

          <div class="p-3 rounded-xl hover:bg-base-200 cursor-pointer flex items-center justify-between" onclick="location.hash='#how-it-works'; document.getElementById('search-modal').close()">
            <div>
              <div class="font-semibold text-sm">How It Works: 7 Pillars &amp; 6 Steps</div>
              <div class="text-xs text-base-content/60">Curated density, in-person first, problem-backwards, production over prototypes</div>
            </div>
            <span class="badge badge-sm badge-accent font-mono text-[10px]">METHOD</span>
          </div>

          <div class="p-3 rounded-xl hover:bg-base-200 cursor-pointer flex items-center justify-between" onclick="location.hash='#manifesto'; document.getElementById('search-modal').close()">
            <div>
              <div class="font-semibold text-sm">The noClue Manifesto</div>
              <div class="text-xs text-base-content/60">8 core beliefs: Demos are easy, production is hard. Less hype. More shipped.</div>
            </div>
            <span class="badge badge-sm font-mono text-[10px]">MANIFESTO</span>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-dashed border-base-content/15 flex items-center justify-between text-xs text-base-content/50 font-mono">
          <span>Navigate with mouse or enter</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </dialog>

    <!-- Client Script for Interactive Behaviors -->
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), htmlContent, 'utf8');
console.log('Successfully written pristine WeAreDevelopers replica to index.html!');
