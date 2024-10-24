<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { clipboard } from '@skeletonlabs/skeleton';

	let { data } = $props();

	const { form, errors, constraints, message, enhance } = superForm(data.form);
	const toastStore = getToastStore();

	$effect(() => {
		if ($message) {
			toastStore.trigger({
				message: `Link created! ${$message}`,
				autohide: true
			});
		}
	});

	let errorMessage = $derived(
		$errors.url && typeof $errors.url[0] === 'string' ? $errors.url[0] : undefined
	);
</script>

<form class="space-y-4" method="post" use:enhance>
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
		<button class="btn variant-filled" type="submit">Submit</button>
	</div>
</form>

{#if errorMessage}
	<span class="error invalid"> Link already exists </span>
	<button class="btn variant-filled-success" type="button" use:clipboard={errorMessage}>
		Copy
	</button>
{/if}

{#if $message}
	<button class="btn variant-filled-success mt-2" type="button" use:clipboard={$message}
		>Copy</button
	>
{/if}
