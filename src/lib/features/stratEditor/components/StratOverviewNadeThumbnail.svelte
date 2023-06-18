<script lang="ts">
	export let image: File | undefined;

	let output: HTMLImageElement;

	$: if (output && image) {
		output.src = URL.createObjectURL(image);
		output.onload = () => {
			URL.revokeObjectURL(output.src);
		};
	}
</script>

{#if image}
	<img
		class="aspect-video object-cover w-20"
		src="#"
		alt={image?.name}
		bind:this={output}
	/>
{:else}
	<div class="grid items-center aspect-video w-20">No image</div>
{/if}
