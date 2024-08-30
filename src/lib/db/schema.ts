import { pgTableCreator, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import type { z } from 'zod';

const pgTable = pgTableCreator((name) => `short_${name}`);

export const LinksTable = pgTable('links', {
	shortUrl: text('short_url').notNull().primaryKey(),
	url: text('url').notNull().unique()
	// TODO: Add tags?
});

export const insertLinksSchema = createInsertSchema(LinksTable);

export type InsertLinks = z.infer<typeof insertLinksSchema>;
export type SelectLinks = typeof LinksTable.$inferSelect;
