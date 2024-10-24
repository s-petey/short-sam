<script lang="ts">
	import '../app.postcss';
	import type { Snippet } from 'svelte';

	let {
		children
	}: {
		children?: Snippet;
	} = $props();
</script>

<div class="container h-full flex flex-col justify-self-center">
	<h1 class="h1 w-full text-center">URL Shortener</h1>
	<div class="grow flex flex-col items-center mx-auto">
		{@render children?.()}
	</div>

	<p class="my-4 text-center">
		To use, simply enter a URL, submit, and click copy! <br /> If the URL already exists we will not
		re-create it, but still allow you to copy it.
	</p>
</div>
