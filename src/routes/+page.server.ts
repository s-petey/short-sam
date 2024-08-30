import { insertLinksSchema } from '$lib/db/schema';
import { fail, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const extendedLinksSchema = insertLinksSchema
	.omit({
		id: true,
		shortUrl: true
	})
	.extend({
		url: z.string().url()
	});

export const load = async () => {
	const form = await superValidate(zod(extendedLinksSchema));

	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(extendedLinksSchema));

		console.log('form: ', form);

		if (!form.valid) {
			return fail(400, { form });
		}

		return message(form, 'Link created!');
	}
};
