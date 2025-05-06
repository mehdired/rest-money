import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/node';
import { Income, Settings } from '@/types';
import { income, settings } from './schema';
import { eq } from 'drizzle-orm';
import { createServerFn } from '@tanstack/react-start';
import { queryOptions } from '@tanstack/react-query';

const client = createClient({
  url: 'file:./app/db/data/local.db',
});

const db = drizzle({
  connection: {
    url: 'file:./app/db/data/local.db',
  },
});

async function dbInsertIncome(data: Income) {
  return await db.insert(income).values(data).returning();
}

async function dbSelectAllIncomes() {
  return await db.select().from(income);
}

async function dbRemoveIncome(id: Income['id']) {
  return await db.delete(income).where(eq(income.id, id)).returning();
}

export async function dbSaveSettings(data: Settings[]) {
  return await db.insert(settings).values(data);
}

export const addIncome = createServerFn({ method: 'POST', response: 'data' })
  .validator((d: Income) => d)
  .handler(async ({ data }) => {
    await dbInsertIncome(data);
  });

export const getAllIncomes = createServerFn({ method: 'GET' }).handler(async () => {
  return await dbSelectAllIncomes();
});

export const allIncomesQueryOptions = queryOptions({
  queryKey: ['incomes'],
  queryFn: getAllIncomes,
});

export const removeIncome = createServerFn({ method: 'POST', response: 'data' })
  .validator((d: Income['id']) => d)
  .handler(async ({ data }) => {
    return await dbRemoveIncome(data);
  });
