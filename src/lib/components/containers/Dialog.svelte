<script lang="ts">
	export let show: boolean = false;
	export let title: string;
	export let body: string = '';

	let dialog: HTMLDialogElement;

	$: if (dialog !== undefined && show) {
		dialog.showModal();
	} else if (dialog !== undefined) {
		dialog.close();
	}
</script>

<dialog
	class="bg-neutral-900 rounded text-white backdrop:bg-neutral-950/90 max-w-6xl left-4 right-4 p-4"
	bind:this={dialog}
>
	<div class="grid">
		<div class="flex justify-between items-center">
			<h1 class="text-2xl text-red-400 font-bold">{title}</h1>
			<button on:click={() => (show = false)}
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
		<div class="mb-10 font-normal"><slot name="body">{body}</slot></div>
		<slot name="form" />
	</div>
</dialog>
