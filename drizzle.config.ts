import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'turso',
  schema: './app/db/schema.ts',
  out: './app/db/migrations',
  dbCredentials: {
    url: 'file:./app/db/data/local.db',
  },
});
