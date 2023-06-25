<script lang="ts">
	import LoadingIndicator from '../feedback/LoadingIndicator.svelte';

	export let disabled = false;
	export let isLoading = false;
</script>

{#if isLoading}
	<LoadingIndicator {isLoading} />
{:else}
	<button
		on:click
		{disabled}
		class="flex items-center justify-center gap-2 bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 py-2 px-4 rounded"
		><slot /></button
	>
{/if}
