<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();
	let showLinkCreated = $state(false);
	let copied = $state(false);

	const { form, errors, constraints, message, enhance } = superForm(data.form, {
		onSubmit: () => {
			copied = false;
			showLinkCreated = false;
		},
		clearOnSubmit: 'errors-and-message'
	});

	$effect(() => {
		if ($message) {
			showLinkCreated = true;
		}
	});

	let linkExists = $derived(
		$errors.url && typeof $errors.url[0] === 'string' ? $errors.url[0] : undefined
	);

	// Shared copy method
	async function copyToClipboard(data: string, mimeType = 'text/plain') {
		if (navigator.clipboard.write) {
			await navigator.clipboard.write([
				new ClipboardItem({
					[mimeType]: new Blob([data], {
						type: mimeType
					}),
					['text/plain']: new Blob([data], {
						type: 'text/plain'
					})
				})
			]);
		} else {
			// fallback since .writeText has wider browser support
			await new Promise((resolve) => {
				resolve(navigator.clipboard.writeText(String(data)));
			});
		}
		copied = true;
	}
</script>

<form class="space-y-4 flex flex-col items-center" method="post" use:enhance>
	<label class="label" for="url">
		<span>Url</span>

		<input
			class="input"
			type="url"
			name="url"
			bind:value={$form.url}
			aria-invalid={$errors.url ? 'true' : undefined}
			{...$constraints.url}
		/>
	</label>

	<div>
		<button class="btn preset-filled" type="submit">Submit</button>
	</div>
</form>

{#if $message || linkExists}
	{#if linkExists}
		<span class="text-warning-500 invalid mt-4"> Link already exists </span>
	{/if}
	<button
		class="btn preset-tonal-success mt-4"
		type="button"
		onclick={() => copyToClipboard(linkExists ? linkExists : $message)}
	>
		Copy
	</button>
{/if}

{#if copied}
	<span class="text-success-600">Link copied</span>
{/if}

{#if showLinkCreated}
	Link created! <a target="_blank" href={$message} class="anchor">{$message}</a>
{/if}