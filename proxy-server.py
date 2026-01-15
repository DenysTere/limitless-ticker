#!/usr/bin/env python3
"""
Simple proxy server to bypass CORS restrictions for Limitless API
Run: python3 proxy-server.py
Then open: http://localhost:8080/limitless-ticker.html
"""

from http.server import HTTPServer, SimpleHTTPRequestHandler
import urllib.request
import json

class ProxyHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path.startswith('/api/'):
            self.proxy_api_request()
        else:
            super().do_GET()

    def proxy_api_request(self):
        api_path = self.path[4:]  # Remove '/api'
        url = f'https://api.limitless.exchange{api_path}'
        print(f"🔄 Proxying: {url}")

        try:
            req = urllib.request.Request(url, headers={
                'User-Agent': 'Limitless-Ticker/1.0',
                'Accept': 'application/json'
            })

            with urllib.request.urlopen(req, timeout=10) as response:
                data = response.read()
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(data)
                print(f"✅ Success: {len(data)} bytes")

        except Exception as e:
            print(f"❌ Error: {e}")
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())

    def log_message(self, format, *args):
        # Simplified logging
        try:
            msg = str(args[0]) if args else ''
            if '/api/' in msg:
                pass  # Already logged in proxy_api_request
            elif '.html' in msg or '.js' in msg or '.css' in msg:
                print(f"📄 {msg}")
        except:
            pass

if __name__ == '__main__':
    port = 8080
    server = HTTPServer(('localhost', port), ProxyHandler)
    print(f"""
╔══════════════════════════════════════════════════════════════╗
║           Limitless Ticker Proxy Server                      ║
╠══════════════════════════════════════════════════════════════╣
║  Open: http://localhost:{port}/limitless-ticker.html          ║
║  Press Ctrl+C to stop                                        ║
╚══════════════════════════════════════════════════════════════╝
""")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Server stopped")
