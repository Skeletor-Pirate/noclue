#!/usr/bin/env python3
"""Local verification gate for the noClue site.

Nothing gets pushed until this passes. It checks the things that have
actually broken before: dead links, missing assets, banned words, stray
brackets, wrong canonicals, broken JS.

    python3 tools/verify.py            # verify the site next to this script
    python3 tools/verify.py --dir DIR  # verify some other directory
    python3 tools/verify.py --shots    # also grab local screenshots (slow)

Exit code is non-zero when anything fails, so a git pre-push hook can
refuse the push.
"""

import argparse
import http.server
import json
import os
import re
import socketserver
import subprocess
import sys
import threading
import time
import urllib.request
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

CANONICAL = "https://buildwithnoclue.dev/"
PAGES = ["index.html", "programs.html", "partners.html", "apply.html"]

# Words that must never show up in the published copy.
BANNED_TEXT = [
    "commudle",
    "goavo",
    "hack-nation",
    "hack nation",
    "mumbai",
    "register",
    "registration",
    "hello@noclue.co",
    "manifesto",
    "choose your city",
    "1,477",
]
# Placeholders that mean "not ready to publish".
BRACKET = re.compile(r"\[[A-Z][A-Z /&.]{2,}\]")


class Collector(HTMLParser):
    """Visible text plus every href/src the page references."""

    def __init__(self):
        super().__init__()
        self.text = []
        self.hrefs = []
        self.srcs = []
        self.imgs = []
        self.h1 = 0
        self.canonical = None
        self.og_url = None
        self._skip = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("script", "style"):
            self._skip += 1
        if tag == "a" and a.get("href"):
            self.hrefs.append(a["href"])
        if tag in ("img", "script", "link", "source", "iframe") and a.get("src"):
            self.srcs.append(a["src"])
        if tag == "link" and a.get("href") and "stylesheet" in (a.get("rel") or ""):
            self.srcs.append(a["href"])
        if tag == "link" and a.get("rel") == "canonical":
            self.canonical = a.get("href")
        if tag == "meta" and a.get("property") == "og:url":
            self.og_url = a.get("content")
        if tag == "img":
            self.imgs.append(a)
        if tag == "h1":
            self.h1 += 1

    def handle_endtag(self, tag):
        if tag in ("script", "style") and self._skip:
            self._skip -= 1

    def handle_data(self, data):
        if not self._skip:
            self.text.append(data)

    def visible(self):
        return " ".join(" ".join(self.text).split())


class Quiet(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".woff2": "font/woff2",
        ".webmanifest": "application/manifest+json",
    }

    def log_message(self, *args):
        pass

    def handle_one_request(self):
        try:
            super().handle_one_request()
        except (ConnectionResetError, BrokenPipeError):
            self.close_connection = True


class Server(socketserver.TCPServer):
    allow_reuse_address = True


def serve(directory, port=0):
    handler = lambda *a, **k: Quiet(*a, directory=str(directory), **k)  # noqa: E731
    httpd = Server(("127.0.0.1", port), handler)
    thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    thread.start()
    return httpd


def check(root, page, failures):
    path = root / page
    if not path.exists():
        failures.append(f"{page}: file missing")
        return None
    html = path.read_text(encoding="utf-8", errors="replace")
    c = Collector()
    c.feed(html)
    text = c.visible()
    low = text.lower()

    for word in BANNED_TEXT:
        if word in low:
            failures.append(f"{page}: banned word in visible copy: {word!r}")
    for hit in BRACKET.findall(text):
        failures.append(f"{page}: unfilled bracket published: {hit}")

    if c.h1 != 1:
        failures.append(f"{page}: expected 1 h1, found {c.h1}")
    if not c.canonical or not c.canonical.startswith(CANONICAL):
        failures.append(f"{page}: canonical is {c.canonical!r}, expected {CANONICAL}*")
    if not c.og_url or not c.og_url.startswith(CANONICAL):
        failures.append(f"{page}: og:url is {c.og_url!r}, expected {CANONICAL}*")

    for href in c.hrefs:
        if href.startswith(("http://", "https://", "mailto:", "tel:", "#", "data:")):
            continue
        target = (root / href.split("#")[0].split("?")[0]).resolve()
        if not target.exists():
            failures.append(f"{page}: dead internal link -> {href}")
        if "#" in href:
            frag = href.split("#", 1)[1]
            if frag and root.joinpath(href.split("#")[0]).exists():
                body = root.joinpath(href.split("#")[0]).read_text(errors="replace")
                if f'id="{frag}"' not in body:
                    failures.append(f"{page}: link to missing anchor -> {href}")

    for src in c.srcs:
        if src.startswith(("http://", "https://", "data:", "//")):
            continue
        target = (root / src.split("?")[0]).resolve()
        if not target.exists():
            failures.append(f"{page}: missing asset -> {src}")

    for img in c.imgs:
        if "alt" not in img:
            failures.append(f"{page}: <img> without alt attribute -> {img.get('src')}")

    for m in re.finditer(r'<a[^>]+target="_blank"[^>]*>', html):
        if "noopener" not in m.group(0):
            failures.append(f"{page}: target=_blank without rel=noopener")

    return c


def http_smoke(root, port, failures):
    httpd = serve(root, port)
    base = f"http://127.0.0.1:{httpd.server_address[1]}"
    try:
        for page in PAGES:
            try:
                with urllib.request.urlopen(f"{base}/{page}", timeout=10) as r:
                    body = r.read().decode("utf-8", "replace")
                if r.status != 200:
                    failures.append(f"{page}: local server returned {r.status}")
                if "<html" not in body.lower():
                    failures.append(f"{page}: local server returned no HTML")
            except Exception as e:  # noqa: BLE001
                failures.append(f"{page}: local fetch failed ({e})")
        for asset in ("assets/css/campaign.css", "assets/css/motion.css",
                      "assets/js/site.js", "assets/js/motion.js",
                      "assets/img/brand/skyline.jpg", "assets/img/brand/noclue-black.png"):
            try:
                with urllib.request.urlopen(f"{base}/{asset}", timeout=10) as r:
                    if r.status != 200 or not r.read(64):
                        failures.append(f"{asset}: local server returned {r.status}")
            except Exception as e:  # noqa: BLE001
                failures.append(f"{asset}: local fetch failed ({e})")
    finally:
        httpd.shutdown()


def runtime_qa(root, failures):
    script = root / "tools" / "runtime-check.js"
    if not script.exists():
        failures.append("tools/runtime-check.js is missing")
        return
    if not shutil_which("node"):
        print("  ! node not found, skipping the runtime QA suite")
        return
    env = dict(os.environ)
    paths = [str(root / "node_modules"), str(root / "tools" / "node_modules")]
    for extra in (Path.home() / "node_modules", Path("/data/data/com.termux/files/usr/tmp/qa/node_modules")):
        paths.append(str(extra))
    found = [p for p in paths if (Path(p) / "jsdom").exists()]
    if found:
        env["NODE_PATH"] = os.pathsep.join(found + [env.get("NODE_PATH", "")])
    proc = subprocess.run(["node", str(script)], cwd=str(root),
                          capture_output=True, text=True, env=env)
    out = (proc.stdout + proc.stderr).strip()
    for line in out.splitlines():
        if "FAIL" in line:
            failures.append("runtime QA: " + line.strip())
    if proc.returncode != 0:
        failures.append(f"runtime QA exited {proc.returncode}")
    print("  runtime QA:", "passed" if proc.returncode == 0 else "FAILED")


def shutil_which(name):
    from shutil import which
    return which(name)


def screenshots(root, tunnel, port):
    if not tunnel:
        print("  ! no tunnel URL, skipping screenshots")
        return
    out = root / "tools" / "shots"
    out.mkdir(exist_ok=True)
    for page in PAGES:
        url = f"https://image.thum.io/get/fullpage/width/1280/viewportWidth/1280/noanimate/wait/10/{tunnel}/{page}"
        target = out / page.replace(".html", ".png")
        try:
            with urllib.request.urlopen(url, timeout=280) as r:
                target.write_bytes(r.read())
            print(f"  shot: {target.name}")
        except Exception as e:  # noqa: BLE001
            print(f"  ! screenshot failed for {page}: {e}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dir", default=str(Path(__file__).resolve().parent.parent))
    ap.add_argument("--port", type=int, default=8099)
    ap.add_argument("--shots", action="store_true")
    ap.add_argument("--tunnel", default=os.environ.get("SITE_TUNNEL", ""))
    args = ap.parse_args()

    root = Path(args.dir).resolve()
    failures = []

    print(f"Verifying {root}")
    print("  pages:")
    for page in PAGES:
        before = len(failures)
        check(root, page, failures)
        print(f"    {page}: {'ok' if len(failures) == before else 'FAILED'}")

    print("  local server:")
    http_smoke(root, args.port, failures)
    print("    assets and pages served locally")

    print("  runtime:")
    runtime_qa(root, failures)

    if args.shots:
        print("  screenshots:")
        screenshots(root, args.tunnel, args.port)

    print()
    if failures:
        print(f"{len(failures)} PROBLEM(S):")
        for f in failures:
            print(f"  - {f}")
        return 1
    print("ALL LOCAL CHECKS PASSED")
    return 0


if __name__ == "__main__":
    sys.exit(main())
