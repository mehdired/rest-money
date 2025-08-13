import { integer, text, sqliteTable, real } from 'drizzle-orm/sqlite-core';
import { user } from './auth-schema';

export const income = sqliteTable('income', {
  id: text().primaryKey().unique(),
  from: text().notNull(),
  date: integer({ mode: 'timestamp' }).notNull(),
  amount: real().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  isTva: integer({ mode: 'boolean' }).notNull().default(true),
});

export const settings = sqliteTable('settings', {
  name: text().primaryKey().unique(),
  value: text(),
});
