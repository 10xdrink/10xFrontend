// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use Vite's environment variable prefix (`VITE_`) and provide a default value if undefined
const apiUrl = process.env.VITE_API_URL || 'http://localhost:5000';

// Custom plugin to add CSP headers
const cspPlugin = () => ({
  name: 'csp-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // Set Content Security Policy headers to allow BillDesk integration
      res.setHeader(
        'Content-Security-Policy',
        [
          "default-src 'self'",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.billdesk.com https://cdnjs.cloudflare.com",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.billdesk.com https://accounts.google.com https://cdnjs.cloudflare.com",
          "img-src 'self' data: https: https://res.cloudinary.com https://*.billdesk.com https://*.googleusercontent.com",
          "connect-src 'self' https://*.billdesk.com https://accounts.google.com https://*.googleapis.com http://localhost:5000",
          "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
          "object-src 'none'",
          "media-src 'self'",
          "frame-src 'self' https://*.billdesk.com https://uat1.billdesk.com https://accounts.google.com",
          "child-src 'self' https://*.billdesk.com https://uat1.billdesk.com https://accounts.google.com",
          "form-action 'self' https://*.billdesk.com https://uat1.billdesk.com"
        ].join('; ')
      );
      next();
    });
  }
});

export default defineConfig({
  plugins: [
    react(),
    cspPlugin()
  ],
  server: {
    proxy: {
      '/api': {
        port: 5173,
        target: apiUrl,
        changeOrigin: true,
        secure: false,
        // Uncomment and modify if your backend API has a different base path
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
