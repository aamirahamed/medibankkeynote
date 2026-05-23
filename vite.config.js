import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src/shared/src'),
      '@admin': path.resolve(__dirname, 'src/shared/admin-engine/src'),
    },
    dedupe: ['react', 'react-dom', 'lucide-react', 'react-router-dom']
  }
});

