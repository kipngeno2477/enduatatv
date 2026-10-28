import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  publicDir: 'assets',
  resolve: {
    alias: {
      '/images': path.resolve(__dirname, './assets'),
      '/assets': path.resolve(__dirname, './assets'),
    },
  },
  server: {
    port: 5173,
    open: true,
    fs: {
      allow: ['.', './assets'],
    },
  },
});
