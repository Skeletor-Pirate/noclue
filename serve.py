#!/usr/bin/env python3
"""Local preview server for noClue.

Python's stdlib server can serve .woff2 as application/octet-stream on systems
without a mime.types file. This wrapper fixes font/manifest MIME types so the
local preview matches a normal static host. Not needed in production.
"""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class Handler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".woff2": "font/woff2",
        ".woff": "font/woff",
        ".webmanifest": "application/manifest+json",
        ".svg": "image/svg+xml",
    }

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    port = 8080
    with ThreadingHTTPServer(("", port), Handler) as httpd:
        print(f"noClue preview → http://localhost:{port}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
