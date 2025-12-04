import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      "/api": {
        target: "https://gagan-backend-k9x1.onrender.com",
        changeOrigin: true,
        secure: false,
      }
    }
  },
})