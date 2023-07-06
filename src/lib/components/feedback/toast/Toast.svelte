<script lang="ts">
	import { scale } from 'svelte/transition';
	import { removeToast, toastStore } from './toastStore';
</script>

<div class="grid gap-1 absolute top-5 right-5 z-50">
	{#each $toastStore as toast}
		{@const background =
			toast.type === 'success' ? 'rgb(74 222 128)' : 'rgb(248 113 113)'}
		<div
			transition:scale={{ duration: 200 }}
			class="flex items-stretch text-white bg-neutral-950 rounded w-96"
		>
			<span class="block w-1" style="background-color: {background}" />
			<div class="px-4 py-4 w-full">
				<div class="flex items-center justify-between w-full">
					<h1 class="font-bold">{toast.title}</h1>
					<button on:click={() => removeToast(toast.id)}
						><svg
							class="fill-neutral-400 hover:fill-white focus-within:fill-white transition-colors"
							xmlns="http://www.w3.org/2000/svg"
							height="1em"
							viewBox="0 0 384 512"
							><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
								d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
							/></svg
						></button
					>
				</div>
				<p class="text-sm">{toast.desc}</p>
			</div>
		</div>
	{/each}
</div>
