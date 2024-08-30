<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { getToastStore } from '@skeletonlabs/skeleton';

	export let data;

	const { form, errors, constraints, message, enhance } = superForm(data.form);
	const toastStore = getToastStore();

	$: if ($message) {
		toastStore.trigger({
			message: $message,
			autohide: true
		});
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<form method="post" use:enhance>
			<label for="url"> Url to shorten </label>
			<input
				type="url"
				name="url"
				bind:value={$form.url}
				aria-invalid={$errors.url ? 'true' : undefined}
				{...$constraints.url}
			/>

			{#if $errors.url}
				<span class="error invalid">{$errors.url}</span>
			{/if}

			<div>
				<button type="submit">Submit</button>
			</div>
		</form>
	</div>
</div>

<SuperDebug data={$form} />
