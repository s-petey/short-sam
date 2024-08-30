<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1 class="text-xl text-error-400">Something went wrong</h1>
<a class="btn variant-filled-secondary mt-4" href="/">Go Home</a>

<p class="mt-4 text-error-400">
	{$page.status}: {$page.error?.message}
</p>
