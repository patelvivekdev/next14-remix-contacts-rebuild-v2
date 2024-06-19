import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const contactsTable = sqliteTable('contacts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text('updated_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  first: text('first').notNull(),
  last: text('last').notNull(),
  avatar: text('avatar'),
  email: text('email'),
  twitter: text('twitter'),
  favorite: integer('favorite', { mode: 'boolean' }).default(false).notNull(),
  notes: text('notes'),
});

export type InsertContact = typeof contactsTable.$inferInsert;
export type SelectContact = typeof contactsTable.$inferSelect;
