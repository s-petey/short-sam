import { db } from '$lib/db';
import { LinksTable } from '$lib/db/schema';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const pathId = url.pathname.slice(1);

	if (pathId.length !== 10) {
		throw error(400, 'Invalid URL');
	}

	const link = await db.query.LinksTable.findFirst({
		where: eq(LinksTable.shortUrl, pathId)
	});

	if (!link) {
		error(404, 'Not found');
	}

	redirect(301, link.url);
};

export const trailingSlash = 'ignore';
