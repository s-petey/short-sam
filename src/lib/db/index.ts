import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { LinksTable } from './schema';

const client = postgres(PUBLIC_SUPABASE_URL);

export const db = drizzle(client, {
	schema: { LinksTable }
});
