<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { initializeStores, Toast } from '@skeletonlabs/skeleton';
	initializeStores();

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<div class="container h-full">
	<h1 class="text-xl w-full text-center">URL Shortener</h1>
	<div class=" flex flex-col justify-center items-center mx-auto">
		<slot />
	</div>
</div>

<Toast />
