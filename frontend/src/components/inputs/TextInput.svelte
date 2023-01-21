<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		change: { value: string };
	}>();

	export let id: string;
	export let label: string;
	export let placeholder: string | undefined;
	export let area = false;

	let input: string;

	$: dispatch('change', { value: input });
</script>

<div>
	<label for={id}>{label}</label>
	{#if area}
		<textarea bind:value={input} {id} {placeholder} />
	{:else}
		<input bind:value={input} {id} type="text" {placeholder} />
	{/if}
</div>

<style scoped>
	div {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.25rem;
	}

	textarea {
		resize: vertical;
	}
</style>
