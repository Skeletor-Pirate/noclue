/* ==========================================================================
   noClue — Reality Check interactions
   ========================================================================== */

(() => {
  "use strict";

  const doc = document.documentElement;
  const head = document.getElementById("head");
  const progress = document.getElementById("progressBar");
  const menu = document.getElementById("menu");
  const burger = document.querySelector(".burger");
  const cursor = document.getElementById("cursor");
  const preview = document.getElementById("cityPreview");
  const previewTag = document.getElementById("cityPreviewTag");
  const rows = Array.from(document.querySelectorAll(".city-row"));
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lastFocus = null;
  let frame = 0;

  // Let the hero reveal itself after first paint.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => doc.classList.add("is-ready"));
  });

  // Header + reading progress.
  const onScroll = () => {
    const y = window.scrollY || 0;
    if (head) head.classList.toggle("is-scrolled", y > 24);

    if (progress) {
      const max = doc.scrollHeight - window.innerHeight;
      progress.style.width = max > 0 ? `${Math.min(100, (y / max) * 100)}%` : "0%";
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu.
  const setMenu = (open) => {
    if (!menu || !burger) return;
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("is-locked", open);

    if (open) {
      lastFocus = document.activeElement;
      const first = menu.querySelector("a, button");
      if (first) first.focus();
    } else if (lastFocus) {
      lastFocus.focus();
    }
  };

  if (burger) {
    burger.addEventListener("click", () => {
      setMenu(burger.getAttribute("aria-expanded") !== "true");
    });
  }

  if (menu) {
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("keydown", (event) => {
      if (!menu.classList.contains("is-open")) return;

      if (event.key === "Escape") {
        event.preventDefault();
        setMenu(false);
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(
        menu.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      ).filter((el) => el.offsetParent !== null);

      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  // Custom cursor.
  if (cursor && finePointer) {
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = cx;
    let ty = cy;

    const drawCursor = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(drawCursor);
    };

    window.addEventListener(
      "pointermove",
      (event) => {
        tx = event.clientX;
        ty = event.clientY;
        cursor.classList.add("is-on");
        if (!frame) frame = requestAnimationFrame(drawCursor);
      },
      { passive: true }
    );

    document.addEventListener("pointerover", (event) => {
      const target = event.target instanceof Element ? event.target.closest("a, button, summary, .poster, .city-row") : null;
      cursor.classList.toggle("is-hover", Boolean(target));
    });

    document.addEventListener("pointerleave", () => cursor.classList.remove("is-on"));
  }

  // City preview follows the pointer while a city row is hovered.
  if (preview && finePointer && !reduceMotion) {
    let px = 0;
    let py = 0;
    let current = null;
    let previewFrame = 0;

    const movePreview = () => {
      preview.style.left = `${px}px`;
      preview.style.top = `${py}px`;
      previewFrame = 0;
    };

    const showPreview = (row, event) => {
      const city = row.dataset.city;
      if (!city) return;
      current = city;
      px = event.clientX;
      py = event.clientY;
      if (!previewFrame) previewFrame = requestAnimationFrame(movePreview);

      preview.querySelectorAll("img").forEach((img) => {
        img.classList.toggle("is-on", img.dataset.preview === city);
      });
      if (previewTag) {
        const names = { delhi: "Delhi / 01", bangalore: "Bangalore / 02", pune: "Pune / 03" };
        previewTag.textContent = names[city] || city;
      }
      preview.classList.add("is-on");
    };

    rows.forEach((row) => {
      row.addEventListener("pointerenter", (event) => showPreview(row, event));
      row.addEventListener("pointermove", (event) => {
        if (current !== row.dataset.city) return;
        px = event.clientX;
        py = event.clientY;
        if (!previewFrame) previewFrame = requestAnimationFrame(movePreview);
      });
      row.addEventListener("pointerleave", () => {
        current = null;
        preview.classList.remove("is-on");
      });
    });
  }

  // Subtle hero parallax.
  const hero = document.querySelector(".hero");
  const ghost = document.querySelector(".hero__ghost");
  const heroTitle = document.querySelector(".hero__title");

  if (hero && finePointer && !reduceMotion) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let heroFrame = 0;

    const animateHero = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (ghost) ghost.style.transform = `translate3d(${currentX * 10}px, calc(-51% + ${currentY * 8}px), 0)`;
      if (heroTitle) heroTitle.style.transform = `translate3d(${currentX * 3}px, ${currentY * 3}px, 0)`;
      heroFrame = requestAnimationFrame(animateHero);
    };

    hero.addEventListener(
      "pointermove",
      (event) => {
        const rect = hero.getBoundingClientRect();
        targetX = (event.clientX - rect.left) / rect.width - 0.5;
        targetY = (event.clientY - rect.top) / rect.height - 0.5;
        if (!heroFrame) heroFrame = requestAnimationFrame(animateHero);
      },
      { passive: true }
    );

    hero.addEventListener("pointerleave", () => {
      targetX = 0;
      targetY = 0;
    });
  }

  // Magnetic primary buttons.
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".btn").forEach((button) => {
      button.addEventListener("pointermove", (event) => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
      });
      button.addEventListener("pointerleave", () => {
        button.style.transform = "";
      });
    });
  }

  // Reveal on scroll.
  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion) {
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
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-in"));
  }

  // Keep only one FAQ answer open at a time for a cleaner read.
  const faqItems = Array.from(document.querySelectorAll(".faq__item"));
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  // Quietly keep the footer year current.
  const year = new Date().getFullYear();
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(year);
  });
})();
