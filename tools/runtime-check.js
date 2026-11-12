const { JSDOM, VirtualConsole } = require("jsdom");
const fs = require("fs");
const path = require("path");

const SITE = "/data/data/com.termux/files/home/noclue-site";
const pages = ["index.html", "programs.html", "partners.html", "manifesto.html", "apply.html"];
const siteJs = fs.readFileSync(path.join(SITE, "assets/js/site.js"), "utf8");
const motionJs = fs.readFileSync(path.join(SITE, "assets/js/motion.js"), "utf8");
let failures = 0;

function fail(msg) {
  failures++;
  console.log("  FAIL: " + msg);
}

for (const page of pages) {
  console.log("== " + page);
  const html = fs.readFileSync(path.join(SITE, page), "utf8");
  const errors = [];
  const observed = new Set();
  const vc = new VirtualConsole();
  vc.on("jsdomError", (e) => errors.push(String(e)));

  const dom = new JSDOM(html, {
    url: "https://noclue.co/" + page,
    runScripts: "dangerously",
    pretendToBeVisual: true,
    virtualConsole: vc,
    beforeParse(window) {
      window.matchMedia = (q) => ({
        matches: /min-width:\s*981px/.test(q),
        media: q,
        addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {},
      });
      window.scrollTo = () => {};
      window.IntersectionObserver = class {
        constructor(cb) { this.cb = cb; }
        observe(el) { observed.add(el); }
        unobserve() {} disconnect() {}
      };
      window.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
      window.HTMLCanvasElement.prototype.getContext = () => null;
      window.AudioContext = undefined;
      window.sessionStorage.setItem("rc-intro", "1");
    },
  });

  const { window } = dom;
  const doc = window.document;

  const hadIntro = !!doc.getElementById("intro");
  const hadTicker = !!doc.querySelector(".ticker");

  try { window.eval(siteJs); } catch (e) { fail("site.js threw: " + e); }
  try { window.eval(motionJs); } catch (e) { fail("motion.js threw: " + e); }
  if (errors.length) fail("jsdomError: " + errors.join(" | "));

  // Motion layer presence
  if (page === "index.html" && !hadIntro) fail("missing intro overlay");
  if (!doc.getElementById("wipe")) fail("missing wipe overlay");
  if (!doc.getElementById("pxfield")) fail("missing canvas field");
  if (!doc.getElementById("scrollbar")) fail("missing pixel scrollbar");
  if (!doc.getElementById("toTop")) fail("missing back-to-top");
  if (!doc.getElementById("soundToggle")) fail("missing sound toggle");
  if (!doc.querySelector(".cursor .cursor__label")) fail("cursor has no label element");
  if (hadTicker && !doc.querySelector(".ticker__shift .ticker__track")) fail("ticker not wrapped in .ticker__shift");

  // Split text applied
  const splitHost = doc.querySelector("[data-split]");
  if (!splitHost) fail("no [data-split] headings");
  else if (!splitHost.querySelector(".split__word")) fail("split text not applied");

  // Nav hover text
  const navLink = doc.querySelector(".nav a");
  if (!navLink) fail("no nav links");
  else {
    if (!navLink.querySelector(".nav__stack")) fail("nav link not wrapped in .nav__stack");
    if (!navLink.querySelector(".nav__l--alt")) fail("nav link missing hover variant");
  }

  // Wipe columns
  const wipe = doc.getElementById("wipe");
  if (wipe && !wipe.children.length) fail("wipe has no columns (motion.js did not run)");

  // Reveal stagger: every tagged item must be watched by an observer, or it
  // stays at opacity 0 (the blank-section bug).
  const reveals = doc.querySelectorAll("[data-reveal]");
  if (!reveals.length) fail("no reveal items");
  reveals.forEach((el) => {
    if (!observed.has(el) && !el.classList.contains("is-in")) {
      fail("reveal item never observed: " + (el.className || el.tagName));
    }
  });

  // Click-to-play film
  if (page === "index.html") {
    const play = doc.querySelector(".film__play[data-video]");
    if (!play) fail("missing film play button");
    else {
      play.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
      const embed = doc.querySelector(".film__embed iframe");
      if (!embed) fail("film did not swap in an iframe");
      else {
        if (!/youtube-nocookie\.com\/embed\/3YC5bxybglg/.test(embed.getAttribute("src") || "")) fail("film iframe src wrong");
        if (!embed.hasAttribute("allowfullscreen")) fail("film iframe not fullscreenable");
      }
    }
  }

  // Counter
  const counter = doc.querySelector("[data-count]");
  if (counter && !counter.getAttribute("data-count")) fail("counter missing value");

  // Existing behaviours still fine
  if (!doc.querySelector(".utility")) fail("missing .utility strip");
  if (!doc.querySelector(".head .brand img")) fail("missing brand logo");
  const h1 = doc.querySelectorAll("h1");
  if (h1.length !== 1) fail("expected 1 h1, found " + h1.length);

  const burger = doc.querySelector(".burger");
  const menu = doc.getElementById("menu");
  if (burger && menu) {
    burger.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
    if (!menu.classList.contains("is-open")) fail("burger did not open menu");
    doc.dispatchEvent(new window.KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    if (menu.classList.contains("is-open")) fail("Escape did not close menu");
  }

  const faqs = Array.from(doc.querySelectorAll(".faq__item"));
  if (faqs.length > 1) {
    faqs[0].setAttribute("open", "");
    faqs[0].dispatchEvent(new window.Event("toggle"));
    faqs[1].setAttribute("open", "");
    faqs[1].dispatchEvent(new window.Event("toggle"));
    if (faqs[0].hasAttribute("open")) fail("FAQ allowed two open answers");
  }

  const links = Array.from(doc.querySelectorAll("a[href]")).map((a) => a.getAttribute("href"));
  const delhi = links.filter((h) => h && h.includes("commudle.com/communities/noclue/events/reality-check-delhi-edition"));
  const goavo = links.filter((h) => h && h.includes("share.goavo.ai"));
  if (["index.html", "programs.html", "apply.html"].includes(page)) {
    if (!delhi.length) fail("missing Delhi registration link");
    if (goavo.length < 2) fail("missing GoAvo registration links");
  }
  Array.from(doc.querySelectorAll('a[target="_blank"]')).forEach((a) => {
    if (!/noopener/.test(a.getAttribute("rel") || "")) fail("target=_blank without noopener: " + a.getAttribute("href"));
  });

  Array.from(doc.querySelectorAll("img")).forEach((img) => {
    const src = img.getAttribute("src");
    if (!src || /^https?:/.test(src)) return;
    if (!fs.existsSync(path.join(SITE, src))) fail("missing image file " + src);
    if (!img.hasAttribute("alt")) fail("img without alt attribute: " + src);
  });

  const year = doc.querySelector("[data-year]");
  if (year && !/\d{4}/.test(year.textContent)) fail("footer year not set");

  dom.window.close();
}

console.log(failures === 0 ? "\nALL RUNTIME CHECKS PASSED" : "\n" + failures + " FAILURES");
process.exit(failures === 0 ? 0 : 1);
