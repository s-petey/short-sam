import { customAlphabet } from 'nanoid';

// https://zelark.github.io/nano-id-cc/
// ~10 years or 8M IDs needed, in order to have a 1% probability of at least one collision.
export const shortId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export function getShortenedUrl(id: string) {
	return `https://short.sam-peterson.com/${id}`;
}
