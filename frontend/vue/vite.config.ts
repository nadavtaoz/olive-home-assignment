import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/policies': 'http://localhost:3001',
      '/health': 'http://localhost:3001',
    },
  },
});
