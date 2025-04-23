import { integer, text, sqliteTable, real } from 'drizzle-orm/sqlite-core';

export const income = sqliteTable('income', {
  id: text().primaryKey(),
  from: text().notNull(),
  date: integer({ mode: 'timestamp' }).notNull(),
  amount: real().notNull(),
});
