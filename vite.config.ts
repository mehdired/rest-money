import { defineConfig } from 'vite';
import path from 'path';
import tsConfigPaths from 'vite-tsconfig-paths';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';

export default defineConfig({
  plugins: [
    tsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tanstackStart(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(path.dirname('./'), './src'),
    },
  },
});
