// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import path from 'path';


export default defineConfig({

  server: {
    proxy: {
      '/api': 'https://hacathone-backend.vercel.app/',
      // '/api': 'https://vercel-project-backend.vercel.app',
    },
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
});
