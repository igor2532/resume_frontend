import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  server: {
    port: 3306,
    //host: '26.83.222.115',
    host: '127.0.0.1',
    // open: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    testMatch: ['./tests/**/*.test.tsx'],
    globals: true,
  },
});
