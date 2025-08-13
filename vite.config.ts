import { defineConfig } from 'vite';
import path from 'path';
import tsConfigPaths from 'vite-tsconfig-paths';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart({
      target: 'node-server',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(path.dirname('./'), './src'),
    },
  },
});
