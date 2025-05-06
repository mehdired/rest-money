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
  client,
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

async function dbSaveSettings(data: Settings) {
  return await db
    .update(settings)
    .set({ value: data.value })
    .where(eq(settings.name, data.name))
    .returning();
}

async function dbGetSettings() {
  return await db.select().from(settings);
}

export const srFnGetSettings = createServerFn({ method: 'POST', response: 'data' }).handler(
  async () => dbGetSettings()
);

export const getSettingsQueryOptions = queryOptions({
  queryKey: ['settings'],
  queryFn: srFnGetSettings,
});

export const insertSettings = createServerFn({ method: 'POST', response: 'data' })
  .validator((d: Settings) => d)
  .handler(async ({ data }) => {
    await dbSaveSettings(data);
  });

export const addIncome = createServerFn({ method: 'POST', response: 'data' })
  .validator((d: Income) => d)
  .handler(async ({ data }) => {
    await dbInsertIncome(data);
  });

const getAllIncomes = createServerFn({ method: 'GET' }).handler(
  async () => await dbSelectAllIncomes()
);

export const allIncomesQueryOptions = queryOptions({
  queryKey: ['incomes'],
  queryFn: getAllIncomes,
});

export const removeIncome = createServerFn({ method: 'POST', response: 'data' })
  .validator((d: Income['id']) => d)
  .handler(async ({ data }) => {
    return await dbRemoveIncome(data);
  });
