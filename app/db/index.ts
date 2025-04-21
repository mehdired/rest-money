import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { Income } from '../types';
import { income } from './schema';

const client = createClient({
  url: 'file:./data/local.db',
});

export const db = drizzle({ client });

export function insertIncome(data: Income) {
  db.insert(income).values(data).returning();
}
