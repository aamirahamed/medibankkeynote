import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Allow serving files from the parent directory (workspace root)
      allow: ['..'],
    },
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, '../src'),
      '@admin': path.resolve(__dirname, '../admin-engine/src'),
    },
    dedupe: ['react', 'react-dom', 'lucide-react', 'react-router-dom']
  }
});
