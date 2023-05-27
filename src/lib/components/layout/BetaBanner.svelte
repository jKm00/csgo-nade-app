<script lang="ts">
	import { onMount } from 'svelte';

	let showBanner = false;

	onMount(() => {
		const storedValue = localStorage.getItem('showBetaBanner');
		if (storedValue) {
			showBanner = JSON.parse(storedValue);
		} else {
			showBanner = true;
		}
	});

	const closeBanner = () => {
		showBanner = false;
		localStorage.setItem('showBetaBanner', JSON.stringify(showBanner));
	};
</script>

{#if showBanner}
	<div
		class="relative z-10 bg-yellow-400/10 border border-yellow-400 rounded p-2"
	>
		<p class="text-center text-yellow-400 text-sm">
			Warning: This website is currently in beta. Any data or creations made may
			be subject to loss or instability
		</p>
		<button
			class="absolute right-4 top-1/2 -translate-y-1/2"
			on:click={closeBanner}
			><svg
				class="w-3 fill-yellow-400 hover:fill-white focus-within:fill-white transition-colors"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 384 512"
				><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
				/></svg
			></button
		>
	</div>
{/if}
