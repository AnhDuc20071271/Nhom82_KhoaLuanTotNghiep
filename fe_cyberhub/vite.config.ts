import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
   define: {
    'process.env': process.env,
  },
  plugins: [react()],
  server: {
    port: 3000,
    https: false,
  },
  build: {
    rollupOptions: {
      input: {
        main: './src/index.js',
      },
    },
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@auth': path.resolve(__dirname, './src/auth'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@util': path.resolve(__dirname, './src/util'),
      '@api': path.resolve(__dirname, './src/api'),
    },
  },
});
