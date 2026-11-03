/* ==========================================================================
   noClue — site.js
   Vanilla, no dependencies. Progressive enhancement only.
   ========================================================================== */

(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------------
     Header state + reading progress
     ------------------------------------------------------------------------ */

  var head = $(".head");
  var progress = $("#progressBar");
  var queued = false;

  function onScroll() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(function () {
      var y = window.scrollY || window.pageYOffset;
      if (head) head.classList.toggle("is-scrolled", y > 8);
      if (progress) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + "%";
      }
      queued = false;
      updateStep();
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ------------------------------------------------------------------------
     Mobile menu
     ------------------------------------------------------------------------ */

  var burger = $(".burger");
  var menu = $("#menu");
  var lastFocus = null;

  function menuOpen() {
    return menu && menu.classList.contains("is-open");
  }

  function setMenu(open) {
    if (!menu || !burger) return;
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("is-locked", open);
    if (head) head.classList.toggle("is-menu", open);

    if (open) {
      lastFocus = document.activeElement;
      var first = $("a, button", menu);
      if (first) window.setTimeout(function () { first.focus(); }, 80);
    } else if (lastFocus) {
      lastFocus.focus();
    }
  }

  if (burger) {
    burger.addEventListener("click", function () { setMenu(!menuOpen()); });
  }
  if (menu) {
    $$("a", menu).forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menuOpen()) setMenu(false);
  });

  /* keep keyboard focus inside the fullscreen menu while it is open */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Tab" || !menuOpen()) return;
    var focusables = $$('a[href], button:not([disabled])', menu);
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (!menu.contains(document.activeElement)) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
  var wide = window.matchMedia("(min-width: 981px)");
  var onWide = function (e) { if (e.matches) setMenu(false); };
  if (wide.addEventListener) wide.addEventListener("change", onWide);
  else if (wide.addListener) wide.addListener(onWide);

  /* ------------------------------------------------------------------------
     Accordions
     ------------------------------------------------------------------------ */

  $$(".acc").forEach(function (acc) {
    var items = $$(".acc__item", acc);
    var single = acc.hasAttribute("data-single");

    items.forEach(function (item) {
      var btn = $("[data-acc]", item);
      if (!btn) return;
      btn.setAttribute("aria-expanded", String(item.classList.contains("is-open")));
      btn.addEventListener("click", function () {
        var nextOpen = !item.classList.contains("is-open");
        if (single && nextOpen) {
          items.forEach(function (other) {
            if (other === item) return;
            other.classList.remove("is-open");
            var b = $("[data-acc]", other);
            if (b) b.setAttribute("aria-expanded", "false");
          });
        }
        item.classList.toggle("is-open", nextOpen);
        btn.setAttribute("aria-expanded", String(nextOpen));
      });
    });
  });

  /* ------------------------------------------------------------------------
     Tabs (city switcher)
     ------------------------------------------------------------------------ */

  $$("[role=tablist]").forEach(function (list) {
    var tabs = $$("[role=tab]", list);
    if (!tabs.length) return;
    var panels = tabs.map(function (tab) {
      return document.getElementById(tab.getAttribute("aria-controls"));
    });

    function select(index, moveFocus) {
      tabs.forEach(function (tab, i) {
        var active = i === index;
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
        if (panels[i]) panels[i].hidden = !active;
      });
      if (moveFocus) tabs[index].focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(i, false); });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % tabs.length;
        else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = tabs.length - 1;
        if (next !== null) {
          e.preventDefault();
          select(next, true);
        }
      });
    });

    var initial = Math.max(0, tabs.map(function (t) { return t.getAttribute("aria-selected"); }).indexOf("true"));
    select(initial, false);
  });

  /* ------------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------------ */

  var revealItems = $$("[data-reveal]");
  if (!reduceMotion && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealItems.forEach(function (el) { io.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ------------------------------------------------------------------------
     Steps scroll-spy
     ------------------------------------------------------------------------ */

  var steps = $$("[data-step]");
  var stepLabel = $("[data-step-label]");

  function updateStep() {
    if (!steps || !steps.length) return;
    var marker = window.innerHeight * 0.44;
    var current = steps[0];
    steps.forEach(function (step) {
      if (step.getBoundingClientRect().top <= marker) current = step;
    });
    steps.forEach(function (step) {
      step.classList.toggle("is-active", step === current);
    });
    if (stepLabel) stepLabel.textContent = current.getAttribute("data-index") || "01";
  }

  /* ------------------------------------------------------------------------
     Clock — the room runs on IST
     ------------------------------------------------------------------------ */

  var clocks = $$("[data-clock]");
  if (clocks.length) {
    var clockFmt;
    try {
      clockFmt = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
    } catch (err) {
      clockFmt = null;
    }
    var tickClock = function () {
      var value = clockFmt ? clockFmt.format(new Date()) : "--:--";
      clocks.forEach(function (el) { el.textContent = value; });
    };
    tickClock();
    window.setInterval(tickClock, 30000);
  }

  /* ------------------------------------------------------------------------
     Application form
     ------------------------------------------------------------------------ */

  var form = $("#applyForm");
  if (form) {
    var success = $("#applySuccess");
    var required = $$("[data-required]", form);

    function fieldOf(input) { return input.closest(".field"); }

    function clearField(input) {
      var field = fieldOf(input);
      if (!field) return;
      field.classList.remove("has-error");
      input.removeAttribute("aria-invalid");
      var err = $(".field__error", field);
      if (err) err.textContent = "";
    }

    function markField(input, message) {
      var field = fieldOf(input);
      if (!field) return;
      field.classList.add("has-error");
      input.setAttribute("aria-invalid", "true");
      var err = $(".field__error", field);
      if (err) err.textContent = message;
    }

    required.forEach(function (input) {
      input.addEventListener("input", function () { clearField(input); });
      input.addEventListener("change", function () { clearField(input); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstInvalid = null;

      required.forEach(function (input) {
        clearField(input);
        var value = (input.value || "").trim();

        if (!value) {
          if (!firstInvalid) firstInvalid = input;
          markField(input, "This one is needed.");
          return;
        }

        if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
          if (!firstInvalid) firstInvalid = input;
          markField(input, "That email doesn't look right.");
        }
      });

      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
        return;
      }

      form.classList.add("is-sent");
      if (success) {
        success.classList.add("is-visible");
        success.setAttribute("tabindex", "-1");
        success.focus({ preventScroll: true });
        success.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      }
    });
  }

  /* ------------------------------------------------------------------------
     Prefill city / role from a program link (?city=delhi, ?role=expert)
     ------------------------------------------------------------------------ */

  if (form) {
    var params = new URLSearchParams(window.location.search);
    var cityWanted = params.get("city");
    var roleWanted = params.get("role");
    var preselect = function (id, wanted) {
      if (!wanted) return;
      var select = document.getElementById(id);
      if (!select) return;
      var options = select.options;
      for (var i = 0; i < options.length; i += 1) {
        if (options[i].value.toLowerCase() === wanted.toLowerCase()) {
          select.value = options[i].value;
          break;
        }
      }
    };
    preselect("city", cityWanted);
    preselect("role", roleWanted);
  }

  /* ------------------------------------------------------------------------
     Nice-to-have: external links open in a new tab
     ------------------------------------------------------------------------ */

  $$('a[href^="http"]').forEach(function (a) {
    if (a.hostname && a.hostname !== window.location.hostname) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    }
  });
})();
