import { pgTableCreator, serial, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import type { z } from 'zod';

const pgTable = pgTableCreator((name) => `short_${name}`);

export const LinksTable = pgTable('links', {
	id: serial('link_id').notNull().primaryKey(),
	url: text('url').notNull(),
	shortUrl: text('short_url').notNull()
	// TODO: Add tags?
});

export const insertLinksSchema = createInsertSchema(LinksTable);

export type InsertLinks = z.infer<typeof insertLinksSchema>;
export type SelectLinks = typeof LinksTable.$inferSelect;
