// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const apiUrl = process.env.REACT_APP_API_URL;


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `${apiUrl}`, // Your backend server
        changeOrigin: true,
        secure: false,
        // Uncomment and modify if your backend API has a different base path
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
