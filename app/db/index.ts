import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/node';
import { Income } from '../types';
import { income } from './schema';
import { eq } from 'drizzle-orm';

const client = createClient({
  url: 'file:./app/db/data/local.db',
});

export const db = drizzle({ client });

export async function dbInsertIncome(data: Income) {
  return await db.insert(income).values(data).returning();
}

export async function dbSelectAllIncomes() {
  return db.select().from(income);
}

export async function dbRemoveIncome(id: Income['id']) {
  return await db.delete(income).where(eq(income.id, id)).returning();
}
