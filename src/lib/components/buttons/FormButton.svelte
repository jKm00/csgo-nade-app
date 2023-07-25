<script lang="ts">
	import { Shadow } from 'svelte-loading-spinners';

	export let loading: boolean = false;
</script>

<button
	class="flex items-center justify-center gap-4 font-bold bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 py-2 px-4 rounded"
	type="submit"
	disabled={loading}
>
	<slot />
	{#if loading}
		<Shadow size="10" color="#fff" unit="px" duration="1s" />
	{/if}
</button>
