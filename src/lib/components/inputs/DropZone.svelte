<script lang="ts">
  import { createEventDispatcher, tick } from 'svelte';
  import { fade } from 'svelte/transition';
  import { toast } from '../feedback/toast/toastStore';

  // Label displayed over the drop zone
  export let label: string;
  // If an image is already selected, it can be
  // passed to the component and the component will
  // display the image by default
  export let file: File | undefined;
  export let maxSize: number = 2 * 1024 * 1024;

  const dispatch = createEventDispatcher<{
    change: { value: File | undefined };
    error: { type: string; message: string };
  }>();

  let dragAcitve = false;
  let input: HTMLInputElement;
  let output: HTMLImageElement;
  let allowedFileTypes = ['jpg', 'jpeg', 'png', 'webp'];

  /**
   * Opens the file explorer
   */
  const openFileOption = () => {
    input.click();
  };

  const onFileChange = async (files: FileList | null) => {
    if (files === null) return;
    if (files.length === 0) return;

    const imgSize = files[0].size;
    if (imgSize > maxSize) {
      dispatch('error', {
        type: 'Exceeding max size',
        message: `Image size too big. The maximum size is ${maxSize / 1024}kb`,
      });
      return;
    }

    updateFile(files[0]);
  };

  const updateFile = async (newFile: File | undefined) => {
    // Make sure it is and jpg or png
    const ext = newFile?.name.split('.').pop();
    if (ext && !allowedFileTypes.includes(ext.toLocaleLowerCase())) {
      toast.push({
        type: 'error',
        title: 'Invalid imaged type',
        desc: 'Only jpg, jpeg, png, and webp allowed!',
      });
      return;
    }

    // Reset input value
    if (input) {
      input.value = '';
    }

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

  const handleDrop = (event: DragEvent) => {
    event.stopPropagation();
    dragAcitve = false;
    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      updateFile(event.dataTransfer.files[0]);
    }
  };

  // Update the image when file changes
  $: {
    updateFile(file);
  }

  // Emit the file when it changes
  $: dispatch('change', { value: file });
</script>

<input
  class="hidden"
  accept="image/jpg, image/jpeg, image/png, image/webp"
  type="file"
  multiple={false}
  bind:this={input}
  on:change={(e) => onFileChange(e.currentTarget.files)}
/>
<div class="grid content-start">
  <p class="font-bold">{label}</p>
  <div class="relative grid">
    {#if !file}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <button
        class="grid place-items-center bg-background rounded border border-neutral-700 text-neutral-400 border-dashed aspect-video"
        on:click|preventDefault={openFileOption}
        on:dragenter|preventDefault|stopPropagation={() => (dragAcitve = true)}
        on:dragover|preventDefault|stopPropagation={() => (dragAcitve = true)}
        on:dragleave|preventDefault|stopPropagation={() => (dragAcitve = false)}
        on:drop|preventDefault={handleDrop}
        on:mouseenter={() => (dragAcitve = true)}
        on:mouseleave={() => (dragAcitve = false)}
      >
        <slot>Click or drag file to upload image</slot>
      </button>
    {:else}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <img
        class="rounded aspect-video object-cover cursor-pointer bg-neutral-800"
        src="#"
        alt={file.name}
        bind:this={output}
        on:click={openFileOption}
        on:dragenter|preventDefault|stopPropagation={() => (dragAcitve = true)}
        on:dragover|preventDefault|stopPropagation={() => (dragAcitve = true)}
        on:dragleave|preventDefault|stopPropagation={() => (dragAcitve = false)}
        on:drop|preventDefault={handleDrop}
        on:mouseenter={() => (dragAcitve = true)}
        on:mouseleave={() => (dragAcitve = false)}
      />
      <div class="flex flex-wrap gap-x-4">
        <button class="underline" on:click|preventDefault={openFileOption}
          >Change image</button
        ><button class="underline" on:click|preventDefault={removeFile}
          >Remove image</button
        >
      </div>
    {/if}
    {#if dragAcitve}
      <!-- Overlay when dragging element in drop zone -->
      <div
        transition:fade={{ duration: 100 }}
        class="absolute inset-0 bg-neutral-950/30 border border-neutral-600 rounded pointer-events-none aspect-video"
      />
    {/if}
  </div>
</div>
