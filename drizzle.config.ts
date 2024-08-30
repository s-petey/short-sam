import { defineConfig } from 'drizzle-kit';

console.log('process.env.PUBLIC_SUPABASE_URL: ', process.env.PUBLIC_SUPABASE_URL);

export default defineConfig({
	schema: './src/lib/db/schema.ts',
	out: './supabase/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.PUBLIC_SUPABASE_URL!
	}
});
