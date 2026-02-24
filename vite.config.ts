import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  envDir: './', 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Adding this helps if you are deploying to a sub-path, 
  // but for Render root, '/' is fine.
  base: '/', 
});