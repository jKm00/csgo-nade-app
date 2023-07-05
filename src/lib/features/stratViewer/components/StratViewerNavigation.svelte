<script lang="ts">
	import FormButton from '$lib/components/buttons/FormButton.svelte';
	import MainButton from '$lib/components/buttons/MainButton.svelte';
	import SecondaryButton from '$lib/components/buttons/SecondaryButton.svelte';
	import Dialog from '$lib/components/containers/Dialog.svelte';
	import type { Session } from '@supabase/supabase-js';

	export let session: Session | null = null;
	export let authorUuid: string | undefined = undefined;
	export let stratId: number | undefined = undefined;

	export let map: string | undefined = undefined;

	let showDeleteDialog = false;
</script>

<nav class="flex justify-between font-bold">
	<a
		class="flex items-center gap-2 hover:text-red-400 focus-within:text-red-400 group"
		href="/strats{map ? `?map=${map}` : ''}"
		><svg
			class="fill-white group-hover:fill-red-400 group-focus-within:fill-red-400"
			xmlns="http://www.w3.org/2000/svg"
			height="1em"
			viewBox="0 0 320 512"
			><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
				d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
			/></svg
		>Back</a
	>
	{#if authorUuid === session?.user.id}
		<MainButton on:click={() => (showDeleteDialog = true)}
			>Delete strat <svg
				class="fill-white"
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 448 512"
				><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
				/></svg
			></MainButton
		>
		<!-- Delete team dialog -->
		<Dialog
			show={showDeleteDialog}
			title="Delete strat"
			body="Are you sure you want to delete the strat? All nades assosiated with the strat will also be deleted!"
		>
			<div class="flex gap-2 justify-end" slot="form">
				<SecondaryButton on:click={() => (showDeleteDialog = false)}
					>Cancel</SecondaryButton
				>
				<form action="?/delete&id={stratId}" method="POST">
					<FormButton
						>Delete strat <svg
							class="fill-white"
							xmlns="http://www.w3.org/2000/svg"
							height="1em"
							viewBox="0 0 448 512"
							><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
								d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
							/></svg
						></FormButton
					>
				</form>
			</div>
		</Dialog>
	{/if}
</nav>
