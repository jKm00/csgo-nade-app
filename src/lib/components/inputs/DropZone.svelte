<script lang="ts">
	import { createEventDispatcher, tick } from 'svelte';

	export let label: string;
	export let file: File | undefined;

	const dispatch = createEventDispatcher<{
		change: { value: File | undefined };
	}>();

	let input: HTMLInputElement;
	let output: HTMLImageElement;

	const openFileOption = () => {
		input.click();
	};

	const onFileChange = async (files: FileList | null) => {
		if (files === null) return;

		if (files.length > 0) {
			updateFile(files[0]);
		}
	};

	const updateFile = async (newFile: File | undefined) => {
		// Reset input value
		input.value = '';

		file = newFile;

		if (file) {
			// Wait for img element to be rendered
			await tick();

			output.src = URL.createObjectURL(file);
			output.onload = () => {
				URL.revokeObjectURL(output.src);
			};
		}
	};

	const removeFile = () => {
		file = undefined;
		input.value = '';
	};

	$: {
		updateFile(file);
	}

	$: dispatch('change', { value: file });
</script>

<input
	class="hidden"
	accept="image/*"
	type="file"
	bind:this={input}
	on:change={(e) => onFileChange(e.currentTarget.files)}
/>
<div class="grid content-start">
	<p class="font-bold">{label}</p>
	{#if !file}
		<!-- TODO: Handle drag and drop -->
		<button
			class="grid place-items-center bg-neutral-800 rounded border border-neutral-700 text-neutral-400 border-dashed py-10 px-4 aspect-video"
			on:click={openFileOption}
			on:dragenter|preventDefault={(event) => console.log(event)}
			on:drop={(event) => console.log(event)}
			on:dragover|preventDefault
		>
			<slot>Click or drag file to upload image</slot>
		</button>
	{:else}
		<img
			class="rounded aspect-video object-cover"
			bind:this={output}
			src="#"
			alt={file.name}
		/>
		<div class="flex flex-wrap gap-x-4">
			<button class="underline" on:click={openFileOption}>Change image</button
			><button class="underline" on:click={removeFile}>Remove image</button>
		</div>
	{/if}
</div>
