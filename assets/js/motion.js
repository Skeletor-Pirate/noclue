/* ==========================================================================
   noClue — Reality Check
   Motion layer: intro, page wipes, smooth scroll, pixel scrollbar, canvas
   field, masked reveals, pinned horizontal track, velocity ticker, sound.
   ========================================================================== */

(() => {
  "use strict";

  const doc = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const wide = window.matchMedia("(min-width: 981px)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  const head = document.getElementById("head");
  const headOffset = () => (head ? head.offsetHeight : 76);

  /* ---------------------------------------------------------------- intro */
  function initIntro() {
    const intro = document.getElementById("intro");
    if (!intro) return;

    // Internal navigation (page wipe) skips the intro once.
    if (sessionStorage.getItem("rc-skip-intro")) {
      sessionStorage.removeItem("rc-skip-intro");
      intro.remove();
      return;
    }

    const bar = intro.querySelector(".intro__bar i");
    const enter = intro.querySelector(".intro__enter");
    document.body.classList.add("is-locked");

    let progress = 0;
    const timer = window.setInterval(() => {
      progress = Math.min(100, progress + 9 + Math.random() * 14);
      if (bar) bar.style.width = progress + "%";
    }, 90);

    // Reveal from the clipped state. Uses a timer (not rAF) so it never
    // depends on the renderer producing frames.
    intro.classList.add("intro--start");
    window.setTimeout(() => {
      intro.classList.remove("intro--start");
      intro.classList.add("is-ready");
    }, 90);

    let done = false;
    const dismiss = () => {
      if (done) return;
      done = true;
      window.clearInterval(timer);
      intro.classList.add("is-done");
      document.body.classList.remove("is-locked");
      window.setTimeout(() => intro.remove(), 600);
      window.setTimeout(() => revealPage(), 120);
    };

    if (enter) enter.addEventListener("click", dismiss);
    intro.addEventListener("click", (event) => {
      if (event.target === intro) dismiss();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") dismiss();
    });
    window.setTimeout(dismiss, 2600);
  }

  /* ------------------------------------------------------- page wipe nav */
  function initWipe() {
    const wipe = document.getElementById("wipe");
    if (!wipe || reduce) return;

    const cols = 16;
    wipe.innerHTML = "";
    for (let i = 0; i < cols; i++) {
      const col = document.createElement("span");
      col.className = "wipe__col";
      wipe.appendChild(col);
    }

    const revealPage = () => {
      wipe.classList.remove("is-covering");
      wipe.classList.add("is-revealing");
      window.setTimeout(() => wipe.classList.remove("is-revealing"), 700);
    };

    document.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      if (link.target === "_blank" || link.hasAttribute("download")) return;
      const href = link.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(href)) return;
      if (/^https?:\/\//i.test(href)) return;

      event.preventDefault();
      wipe.classList.remove("is-revealing");
      wipe.classList.add("is-covering");
      try {
        sessionStorage.setItem("rc-skip-intro", "1");
      } catch (error) {
        /* storage unavailable */
      }
      window.setTimeout(() => {
        window.location.href = link.href;
      }, 460);
    });

    window.addEventListener("pageshow", revealPage);
    window.__rcReveal = revealPage;
  }

  function revealPage() {
    if (typeof window.__rcReveal === "function") window.__rcReveal();
  }

  /* --------------------------------------------------- smooth scroll + bar */
  const smooth = {
    enabled: false,
    target: 0,
    current: 0,
    running: false,
    init() {
      if (!fine || reduce) return;
      this.enabled = true;
      this.current = this.target = window.scrollY;
      doc.classList.add("smooth-on");

      window.addEventListener(
        "wheel",
        (event) => {
          if (event.ctrlKey) return;
          event.preventDefault();
          const unit = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? window.innerHeight : 1;
          this.scrollTo(this.target + event.deltaY * unit);
        },
        { passive: false }
      );

      window.addEventListener(
        "scroll",
        () => {
          if (!this.running) this.target = window.scrollY;
        },
        { passive: true }
      );

      const onKey = (event) => {
        const step = window.innerHeight * 0.85;
        const map = { ArrowDown: 120, ArrowUp: -120, PageDown: step, PageUp: -step, " ": step };
        if (event.key in map) {
          event.preventDefault();
          this.scrollTo(this.target + map[event.key]);
        } else if (event.key === "Home") {
          event.preventDefault();
          this.scrollTo(0);
        } else if (event.key === "End") {
          event.preventDefault();
          this.scrollTo(this.max());
        }
      };
      window.addEventListener("keydown", onKey);

      const tick = () => {
        this.current = lerp(this.current, this.target, 0.1);
        if (Math.abs(this.target - this.current) < 0.4) {
          this.current = this.target;
          this.running = false;
          window.scrollTo(0, this.current);
          return;
        }
        window.scrollTo(0, this.current);
        this.running = true;
        requestAnimationFrame(tick);
      };

      this.scrollTo = (y) => {
        this.target = clamp(y, 0, this.max());
        if (!this.running) requestAnimationFrame(tick);
      };

      // Anchor links
      document.addEventListener("click", (event) => {
        const link = event.target.closest('a[href^="#"]');
        if (!link) return;
        const id = link.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;
        event.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - headOffset() - 8;
        if (this.enabled) this.scrollTo(y);
        else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      });
    },
    max() {
      return Math.max(0, doc.scrollHeight - window.innerHeight);
    },
  };

  function initScrollbar() {
    const bar = document.getElementById("scrollbar");
    if (!bar || !fine || reduce) return;
    const handle = bar.querySelector("span");
    let dragging = false;

    const paint = () => {
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const ratio = window.innerHeight / doc.scrollHeight;
      const h = Math.max(40, window.innerHeight * ratio);
      const top = (window.scrollY / max) * (window.innerHeight - h);
      handle.style.height = h + "px";
      handle.style.top = top + "px";
      bar.classList.add("is-on");
    };

    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);
    paint();

    const onDown = (event) => {
      dragging = true;
      bar.setPointerCapture && bar.setPointerCapture(event.pointerId);
      move(event);
    };
    const move = (event) => {
      if (!dragging) return;
      const rect = bar.getBoundingClientRect();
      const ratio = clamp((event.clientY - rect.top) / rect.height, 0, 1);
      smooth.scrollTo(ratio * smooth.max());
    };
    bar.addEventListener("pointerdown", onDown);
    bar.addEventListener("pointermove", move);
    window.addEventListener("pointerup", () => (dragging = false));
  }

  /* --------------------------------------------------------- cursor label */
  function initCursor() {
    const cursor = document.getElementById("cursor");
    if (!cursor) return;
    const label = cursor.querySelector(".cursor__label");
    if (!label) return;

    if (fine && !reduce) {
      doc.classList.add("cursor-on");
    }

    document.addEventListener("pointerover", (event) => {
      const node = event.target.closest("[data-cursor]");
      if (!node) return;
      const value = node.getAttribute("data-cursor");
      if (value === "hide") {
        cursor.classList.add("is-hide");
        return;
      }
      cursor.classList.remove("is-hide");
      cursor.classList.add("is-label");
      label.textContent = value || "";
    });

    document.addEventListener("pointerout", (event) => {
      const node = event.target.closest("[data-cursor]");
      if (!node) return;
      if (event.relatedTarget && node.contains(event.relatedTarget)) return;
      cursor.classList.remove("is-label", "is-hide");
    });
  }

  /* --------------------------------------------------------- canvas field */
  function initField() {
    const wrap = document.getElementById("pxfield");
    const canvas = wrap && wrap.querySelector("canvas");
    if (!canvas || !fine || reduce) return;

    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cell = 26;
    let w = 0;
    let h = 0;
    let dots = [];
    const pointer = { x: -9999, y: -9999, active: false };
    let scrollY = window.scrollY;
    let raf = 0;
    let idle = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = cell / 2; y < h; y += cell) {
        for (let x = cell / 2; x < w; x += cell) dots.push({ x, y, s: 1 });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const off = (scrollY * 0.035) % cell;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        let alpha = 0.055;
        let size = 1.4;
        let color = "11,11,11";
        if (pointer.active) {
          const dx = d.x - pointer.x;
          const dy = d.y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const t = 1 - dist / 150;
            alpha = 0.06 + t * 0.5;
            size = 1.4 + t * 4.2;
            color = "4,71,255";
          }
        }
        ctx.fillStyle = "rgba(" + color + "," + alpha + ")";
        ctx.fillRect(d.x - size / 2, d.y - off - size / 2, size, size);
      }
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop);
      wrap.classList.add("is-on");
    };

    window.addEventListener("pointermove", (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      start();
    });

    window.addEventListener(
      "scroll",
      () => {
        scrollY = window.scrollY;
        start();
      },
      { passive: true }
    );

    window.addEventListener("resize", () => {
      resize();
      draw();
    });

    resize();
    draw();
  }

  /* ------------------------------------------------------- masked reveals */
  function splitNode(node, counter) {
    const children = Array.from(node.childNodes);
    children.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = child.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
          if (!part) return;
          if (!part.trim()) {
            frag.appendChild(document.createTextNode(" "));
            return;
          }
          const outer = document.createElement("span");
          outer.className = "split__word";
          const inner = document.createElement("span");
          inner.className = "split__inner";
          inner.textContent = part;
          inner.style.setProperty("--sd", (counter.n * 0.035).toFixed(3) + "s");
          counter.n++;
          outer.appendChild(inner);
          frag.appendChild(outer);
        });
        node.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE && !child.classList.contains("split__word")) {
        splitNode(child, counter);
      }
    });
  }

  function initSplits() {
    const items = Array.from(doc.querySelectorAll("[data-split]"));
    if (!items.length) return;

    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-split"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-split");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );

    items.forEach((el) => {
      const counter = { n: 0 };
      splitNode(el, counter);
      el.classList.add("is-split-host");
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------ stagger reveals */
  function initStagger() {
    const groups = [
      ".poster-grid, .cities__track-inner",
      ".format__grid",
      ".principles",
      ".finale__cities",
      ".tier-list",
      ".apply-list",
    ].join(", ");

    const added = [];

    doc.querySelectorAll(groups).forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        if (!child.hasAttribute("data-reveal")) {
          child.setAttribute("data-reveal", "");
          added.push(child);
        }
        if (!child.style.getPropertyValue("--d")) {
          child.style.setProperty("--d", (index * 0.07).toFixed(2) + "s");
        }
      });
    });

    if (!added.length) return;

    // site.js snapshots [data-reveal] before this runs, so items tagged here
    // would never be observed and would sit at opacity 0. Watch them here.
    if (reduce || !("IntersectionObserver" in window)) {
      added.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    added.forEach((el) => observer.observe(el));
  }

  /* --------------------------------------------------- pinned city track */
  function initCityTrack() {
    const section = document.getElementById("cities");
    if (!section) return;
    const track = section.querySelector(".cities__track-inner");
    if (!track) return;
    const mq = window.matchMedia("(min-width: 981px)");

    const setup = () => section.classList.toggle("is-pinned", mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", setup);
    setup();

    const paint = () => {
      if (!section.classList.contains("is-pinned")) {
        track.style.transform = "";
        return;
      }
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const p = clamp(-rect.top / Math.max(1, total), 0, 1);
      const dist = Math.max(0, track.scrollWidth - window.innerWidth + 96);
      track.style.transform = "translate3d(" + -(p * dist) + "px,0,0)";
    };

    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);
    paint();
  }

  /* ------------------------------------------------------ velocity ticker */
  function initTicker() {
    const shift = document.querySelector(".ticker__shift");
    if (!shift) return;
    let last = window.scrollY;
    let velocity = 0;
    let offset = 0;

    const onScroll = () => {
      const y = window.scrollY;
      velocity = velocity * 0.75 + (y - last) * 0.25;
      last = y;
    };

    const tick = () => {
      const target = clamp(-velocity * 0.55, -70, 70);
      offset = lerp(offset, target, 0.12);
      shift.style.transform = "translate3d(" + offset.toFixed(2) + "px,0,0)";
      requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(tick);
  }

  /* ---------------------------------------------------------- count up */
  function initCounters() {
    const items = Array.from(doc.querySelectorAll("[data-count]"));
    if (!items.length) return;

    const run = (el) => {
      const target = parseFloat(el.getAttribute("data-count"));
      const pad = parseInt(el.getAttribute("data-pad") || "0", 10);
      if (reduce) {
        el.textContent = String(target).padStart(pad, "0");
        return;
      }
      const start = performance.now();
      const duration = 1200;
      const step = (now) => {
        const p = clamp((now - start) / duration, 0, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased)).padStart(pad, "0");
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      items.forEach(run);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          run(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    items.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------ nav swap */
  function initNav() {
    doc.querySelectorAll(".nav a").forEach((link) => {
      if (link.querySelector(".nav__stack")) return;
      const label = link.textContent.trim();
      if (!label) return;
      link.innerHTML =
        '<span class="nav__stack">' +
        '<span class="nav__l">' + label + "</span>" +
        '<span class="nav__l nav__l--alt" aria-hidden="true">' + label + "</span>" +
        "</span>";
    });
  }

  /* --------------------------------------------------------- back to top */
  function initToTop() {
    const button = document.getElementById("toTop");
    if (!button) return;
    const paint = () => button.classList.toggle("is-on", window.scrollY > window.innerHeight * 0.9);
    window.addEventListener("scroll", paint, { passive: true });
    paint();
    button.addEventListener("click", () => {
      if (smooth.enabled) smooth.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  }

  /* -------------------------------------------------------------- sound */
  function initSound() {
    const toggle = document.getElementById("soundToggle");
    if (!toggle) return;
    const label = toggle.querySelector("span");
    let ctx = null;
    let on = localStorage.getItem("rc-sound") === "on";

    const paint = () => {
      toggle.classList.toggle("is-on", on);
      toggle.setAttribute("aria-pressed", String(on));
      if (label) label.textContent = on ? "Sound on" : "Sound off";
    };

    const blip = (freq, duration, gain) => {
      if (!on) return;
      try {
        ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const amp = ctx.createGain();
        osc.type = "square";
        osc.frequency.value = freq;
        amp.gain.setValueAtTime(gain, ctx.currentTime);
        amp.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(amp).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (error) {
        /* audio unavailable */
      }
    };

    toggle.addEventListener("click", () => {
      on = !on;
      localStorage.setItem("rc-sound", on ? "on" : "off");
      paint();
      if (on) blip(880, 0.08, 0.05);
    });

    document.addEventListener("pointerover", (event) => {
      if (!on) return;
      if (event.target.closest(".btn, .poster, .partner-logo, .nav a, .apply-row")) blip(920, 0.035, 0.02);
    });

    document.addEventListener("click", (event) => {
      if (!on) return;
      if (event.target.closest(".btn, .poster, .apply-row, .finale__city")) blip(520, 0.06, 0.035);
    });

    paint();
  }

  /* -------------------------------------------------------- hero glitch */
  function initHero() {
    const title = doc.querySelector(".hero__title");
    if (!title || reduce) return;
    title.addEventListener("pointerenter", () => {
      title.classList.add("is-glitch");
      window.setTimeout(() => title.classList.remove("is-glitch"), 760);
    });
  }

  /* --------------------------------------------------------------- boot */
  function boot() {
    initNav();
    initSplits();
    initStagger();
    initCursor();
    initCounters();
    initHero();
    initToTop();
    initSound();
    initWipe();
    initIntro();
    smooth.init();
    initScrollbar();
    initField();
    initCityTrack();
    initTicker();
    window.setTimeout(() => revealPage(), 60);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
