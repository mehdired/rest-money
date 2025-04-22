import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/node';
import { Income } from '../types';
import { income } from './schema';

const client = createClient({
  url: 'file:./app/db/data/local.db',
});

export const db = drizzle({ client });

export function insertIncome(data: Income) {
  return db.insert(income).values(data).returning();
}

export function selectIncomes(): Promise<Income[]> {
  return db.select().from(income);
}
