<script lang="ts">
	export let message: string | undefined = undefined;
	export let status: number | undefined = undefined;
</script>

{#if message}
	{#if String(status).startsWith('2')}
		<p class="text-sm text-center text-green-400">{message}</p>
	{:else}
		<p class="text-sm text-center text-red-400">{message}</p>
	{/if}
{/if}
