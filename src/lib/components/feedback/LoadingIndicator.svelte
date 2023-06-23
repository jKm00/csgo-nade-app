<script lang="ts">
	import { BarLoader, Chasing } from 'svelte-loading-spinners';

	export let isLoading: boolean;
</script>

{#if isLoading}
	<div class="grid justify-center">
		<BarLoader size="60" color="#F87171" unit="px" duration="1s" />
	</div>
{/if}
