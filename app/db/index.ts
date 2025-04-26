import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/node';
import { Income } from '../types';
import { income } from './schema';
import { eq } from 'drizzle-orm';
import { createServerFn } from '@tanstack/react-start';

const client = createClient({
  url: 'file:./app/db/data/local.db',
});

const db = drizzle({ client });

async function dbInsertIncome(data: Income) {
  return await db.insert(income).values(data).returning();
}

async function dbSelectAllIncomes() {
  return db.select().from(income);
}

async function dbRemoveIncome(id: Income['id']) {
  return await db.delete(income).where(eq(income.id, id)).returning();
}

export const addIncome = createServerFn({ method: 'POST', response: 'data' })
  .validator((d: Income) => d)
  .handler(async ({ data }) => {
    await dbInsertIncome(data);
  });

export const getAllIncomes = createServerFn({ method: 'GET' }).handler(async () => {
  return await dbSelectAllIncomes();
});

export const removeIncome = createServerFn({ method: 'POST', response: 'data' })
  .validator((d: Income['id']) => d)
  .handler(async ({ data }) => {
    return await dbRemoveIncome(data);
  });
