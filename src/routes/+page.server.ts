import { db } from '$lib/db';
import { insertLinksSchema, LinksTable } from '$lib/db/schema';
import { getShortenedUrl, shortId } from '$lib/shortener';
import { fail, type Actions } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const extendedLinksSchema = insertLinksSchema
	.omit({
		shortUrl: true
	})
	.extend({
		url: z.string().url().trim()
	});

export const load = async () => {
	const form = await superValidate(zod(extendedLinksSchema));

	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(extendedLinksSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const existing = await db.query.LinksTable.findFirst({
			where: eq(LinksTable.url, form.data.url)
		});

		if (existing) {
			return setError(form, 'url', getShortenedUrl(existing.shortUrl));
		}

		const nanoid = shortId();

		await db.insert(LinksTable).values({
			shortUrl: nanoid,
			url: form.data.url
		});

		const formedUrl = getShortenedUrl(nanoid);
		return message(form, formedUrl);
	}
};
