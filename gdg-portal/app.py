#!/usr/bin/env python3
"""
Local dev server for the GDG VIT Chennai recruitment portal (static site).

No dependencies beyond the Python standard library — nothing to `pip install`.

Usage:
    python3 app.py            # serves on http://localhost:3000
    python3 app.py 8080       # or pick your own port
"""

import http.server
import mimetypes
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3000

# Make sure fonts/svgs are served with correct MIME types regardless of
# what's registered on the host OS (some systems don't know .ttf/.svg).
mimetypes.add_type("font/ttf", ".ttf")
mimetypes.add_type("image/svg+xml", ".svg")

ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        # Dev-friendly: don't let the browser cache while you're iterating.
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        # Slightly quieter/cleaner console output than the default.
        print(f"  {self.address_string()} - {fmt % args}")


def main():
    with http.server.ThreadingHTTPServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"\n  GDG VIT Chennai portal running:")
        print(f"  → http://localhost:{PORT}\n")
        print("  Ctrl+C to stop.\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  Stopped.")


if __name__ == "__main__":
    main()
