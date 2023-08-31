<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ dismiss: undefined }>();

	const handleClose = () => {
		dispatch('dismiss');
	};
</script>

<div class="grid gap-2 border-2 border-red-400 p-4 rounded">
	<div class="flex justify-between items-start">
		<h1 class="text-red-400 font-bold text-xl">Welcome to CSGO Strats</h1>
		<button on:click={handleClose}
			><svg
				class="fill-red-400 hover:fill-white focus-within:fill-white transition-colors"
				xmlns="http://www.w3.org/2000/svg"
				height="1em"
				viewBox="0 0 384 512"
				><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
				/></svg
			></button
		>
	</div>
	<p class="">
		For more details of how to use this application that a look at this <a
			href=""
			class="underline hover:text-red-400 focus-within:text-red-400 transition-colors"
			>video guide</a
		>
		or this
		<a
			href="/guide"
			class="underline hover:text-red-400 focus-within:text-red-400 transition-colors"
			>text guide</a
		>.
	</p>
</div>
