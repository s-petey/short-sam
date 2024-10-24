import * as themes from '@skeletonlabs/skeleton/themes';

import { skeleton } from '@skeletonlabs/skeleton/plugin';
import forms from '@tailwindcss/forms';
import { join } from 'node:path';
import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton-svelte'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [
		forms,
		skeleton({
			themes: [themes.vintage]
		})
	]
} satisfies Config;
