import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/node';
import { Income, Settings } from 'src/types';
import { income, settings } from './schema/schema';
import { eq } from 'drizzle-orm';

let dbInstance: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (!dbInstance) {
    const client = createClient({
      url: process.env.DATABASE_URL!,
      authToken: process.env.DATABASE_AUTH_TOKEN!,
    });

    dbInstance = drizzle({
      client,
    });
  }
  return dbInstance;
}

export async function dbInsertIncome(data: Income & { userId: string }) {
  const db = getDb();
  return await db.insert(income).values(data).returning();
}

export async function dbSelectAllIncomes(userId: string) {
  const db = getDb();
  return await db.select().from(income).where(eq(income.userId, userId));
}

export async function dbRemoveIncome(id: Income['id']) {
  const db = getDb();
  return await db.delete(income).where(eq(income.id, id)).returning();
}

export async function dbSaveSettings(data: Settings) {
  const db = getDb();
  return await db
    .update(settings)
    .set({ value: data.value })
    .where(eq(settings.name, data.name))
    .returning();
}

export async function dbGetSettings() {
  const db = getDb();
  return await db.select().from(settings);
}
