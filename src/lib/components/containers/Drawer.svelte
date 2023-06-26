<script lang="ts">
	import { clickOutside } from 'svelte-use-click-outside';
	import { fade } from 'svelte/transition';

	export let show: boolean;
	export let width = 'w-drawer';
	export let side: 'left' | 'right' = 'right';

	$: drawerWidth = width !== 'w-drawer' ? `width: ${width};` : '';
	$: drawerSide = side === 'left' ? 'left: 0;' : 'right: 0;';
	$: hidden = show
		? 'transform: translateX(0)'
		: side === 'left'
		? 'transform: translateX(-100%)'
		: 'transform: translateX(100%)';

	$: drawerStyles = drawerWidth + drawerSide + hidden;
</script>

{#if show}
	<!-- Backdrop -->
	<div
		transition:fade={{ duration: 200 }}
		class="fixed top-0 bottom-0 left-0 right-0 bg-neutral-950/80 z-20"
	/>
{/if}
<div
	style={drawerStyles}
	class="fixed top-0 bottom-0 right-0 w-drawer bg-neutral-900 z-50 transition-transform"
	use:clickOutside={() => (show = false)}
>
	<div class="flex items-center justify-between p-4">
		<slot name="title" />
		<button
			class="text-sm aspect-square p-2 rounded hover:bg-neutral-600 focus-within:bg-neutral-600 active:bg-neutral-500 group transition-colors"
			on:click={() => (show = false)}
			><svg
				class="fill-neutral-400 group-hover:fill-white group-focus-within:fill-white transition-colors"
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 384 512"
				><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
				/></svg
			></button
		>
	</div>
	<slot name="body" />
</div>
