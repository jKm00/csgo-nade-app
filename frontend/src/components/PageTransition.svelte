<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let visible = false;

	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, 200);
	});
</script>

{#if visible}
	<div
		in:fly={{ y: -50, duration: 1000, delay: 300 }}
		out:fly={{ y: -50, duration: 1000 }}
	>
		<slot />
	</div>
{/if}
