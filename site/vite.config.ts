import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    emptyOutDir: true,
    chunkSizeWarningLimit: 750,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          if (id.includes('node_modules/jspdf') || id.includes('node_modules/html2canvas') || id.includes('node_modules/dompurify')) {
            return 'vendor-pdf';
          }
          if (id.includes('src/content/career')) {
            return 'content-career';
          }
          if (id.includes('src/content/lessons')) {
            return 'content-lessons';
          }
        },
      },
    },
  },
  server: {
    port: 3000,
  }
});
