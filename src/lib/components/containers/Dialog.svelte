<script lang="ts">
	export let show: boolean = false;
	export let title: string;
	export let body: string;

	let dialog: HTMLDialogElement;

	$: if (dialog !== undefined && show) {
		dialog.showModal();
	} else if (dialog !== undefined) {
		dialog.close();
	}
</script>

<dialog
	class="bg-neutral-900 rounded text-white backdrop:bg-neutral-950/90"
	bind:this={dialog}
>
	<div class="grid">
		<h1 class="text-lg text-red-400 font-bold">{title}</h1>
		<p class="mb-10 font-normal">{body}</p>
		<slot name="form" />
	</div>
</dialog>
