import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function imageProxyPlugin(): Plugin {
  return {
    name: 'image-proxy-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/image')) {
          return next();
        }

        try {
          const parsedUrl = new URL(req.url, 'http://localhost');
          const targetUrl = parsedUrl.searchParams.get('url');

          if (!targetUrl) {
            res.statusCode = 400;
            res.end('Missing url parameter');
            return;
          }

          const referer = targetUrl.includes('mangafire') || targetUrl.includes('mfcdn')
            ? 'https://mangafire.to/'
            : targetUrl.includes('mangadex')
            ? 'https://mangadex.org/'
            : 'https://google.com/';

          const response = await fetch(targetUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Referer': referer,
              'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
            }
          });

          if (!response.ok) {
            res.statusCode = response.status;
            res.end(`Upstream failed: ${response.statusText}`);
            return;
          }

          const contentType = response.headers.get('content-type') || 'image/jpeg';
          res.setHeader('Content-Type', contentType);
          res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
          res.setHeader('Access-Control-Allow-Origin', '*');

          const buffer = await response.arrayBuffer();
          res.end(Buffer.from(buffer));
        } catch (err: any) {
          console.error('[ImageProxy Error]:', err.message);
          res.statusCode = 500;
          res.end(err.message);
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), imageProxyPlugin()],
  server: {
    proxy: {
      '/api/mangadex': {
        target: 'https://api.mangadex.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/mangadex/, '')
      }
    }
  }
})

