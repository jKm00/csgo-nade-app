<script lang="ts">
	import { clickOutside } from 'svelte-use-click-outside';
	import { fade } from 'svelte/transition';

	export let show: boolean;
</script>

{#if show}
	<div
		transition:fade={{ duration: 200 }}
		class="fixed top-0 bottom-0 left-0 right-0 bg-neutral-950/80"
	/>
{/if}
<div
	class="fixed top-0 bottom-0 right-0 w-drawer bg-neutral-900 {show
		? 'translate-x-0'
		: 'translate-x-full'} transition-transform"
	use:clickOutside={() => (show = false)}
>
	<div class="mb-6 p-4">
		<button
			class="flex items-center gap-2 text-sm"
			on:click={() => (show = false)}
			><svg
				class="w-2 fill-white"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 320 512"
				><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
				/></svg
			>Close</button
		>
	</div>
	<slot />
</div>
