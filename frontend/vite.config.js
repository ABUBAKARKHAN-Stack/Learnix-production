import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for React
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure the output is directed to `dist/`
    rollupOptions: {
      // Make sure your app uses hash-based filenames for caching
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  }
});
