import { defineConfig } from '@tanstack/react-start/config';
import path from 'path';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(path.dirname('./'), './app'),
      },
    },
  },
});
