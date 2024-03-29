<script lang="ts">
  import { onMount } from 'svelte/internal';
  import { slide } from 'svelte/transition';
  import { clickOutside } from 'svelte-use-click-outside';

  type T = $$Generic;

  interface Option {
    key: string | number;
    label: String;
    value: T;
  }

  export let id: string;
  export let name: string;
  export let values: T[] = [];
  export let options: Option[];
  export let label: string | undefined = undefined;
  export let placeholder: string;
  export let clearable: boolean = false;
  export let clearableLabel: string = 'Clear all';

  let showMenu = false;
  // Keep track of selected options.
  // Used to display the labels of the selected options
  $: selected = findSelected(values);

  let multiSelect: HTMLElement;
  let keyboardNavTracker = 0;
  // If cleareable, last item index is number of options + clear option + display
  // If not, last item index is number of options + display
  $: lastItemIdIndex = clearable ? options.length + 1 : options.length;

  const findSelected = (values: T[]): Option[] => {
    let found: Option[] = [];
    options.forEach((option) => {
      if (values.includes(option.value)) {
        found = [...found, option];
      }
    });
    return found;
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    switch (event.code) {
      case 'Escape':
        closeMenu();
        break;
      case 'ArrowUp':
        handleArrowUp();
        break;
      case 'ArrowDown':
        handleArrowDown();
        break;
      default:
        break;
    }
  };

  const handleArrowUp = () => {
    if (keyboardNavTracker === 0) return;
    const prevElement = multiSelect.querySelector(
      `[data-item="${keyboardNavTracker - 1}"]`
    ) as HTMLElement;
    prevElement?.focus();
    keyboardNavTracker--;
  };

  const handleArrowDown = () => {
    if (keyboardNavTracker === lastItemIdIndex) return;
    const nextElement = multiSelect.querySelector(
      `[data-item="${keyboardNavTracker + 1}"]`
    ) as HTMLElement;
    nextElement?.focus();
    keyboardNavTracker++;
  };

  const closeMenu = () => {
    keyboardNavTracker = 0;
    showMenu = false;
  };

  const toggleMenu = () => {
    if (showMenu) {
      keyboardNavTracker = 0;
    }
    showMenu = !showMenu;
  };

  const handleOptionSelect = (option: Option) => {
    const found = values.find((value) => value === option.value);
    if (found) {
      values = values.filter((value) => value !== option.value);
    } else {
      values = [...values, option.value];
    }
  };

  const clearAll = () => {
    values = [];
  };
</script>

<input type="hidden" {id} {name} bind:value={values} />
{#if label}
  <p class="font-bold">{label}</p>
{/if}
<div
  class="relative text-neutral-400"
  use:clickOutside={closeMenu}
  on:keyup={handleKeyUp}
  bind:this={multiSelect}
>
  <!-- "Input" -->
  <button
    data-item="0"
    class="bg-neutral-800 hover:bg-neutral-700 focus-within:bg-neutral-700 active:bg-neutral-600 p-2 rounded w-full"
    on:click|preventDefault={toggleMenu}
  >
    <span class="flex items-center justify-between gap-4">
      {#if values.length === 0}
        {placeholder}
      {:else}
        <span>
          {selected[0].label}
          {#if selected.length > 1}
            +{selected.length - 1}
          {/if}
        </span>
      {/if}
      <svg
        class={`${
          showMenu ? '' : '-rotate-90'
        } fill-neutral-400 h-3 transition-transform`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        ><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
          d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
        /></svg
      >
    </span>
  </button>
  <!-- Menu -->
  {#if showMenu}
    <div
      transition:slide={{ duration: 100 }}
      class="absolute top-[115%] grid bg-neutral-700 py-2 rounded overflow-hidden w-full min-w-fit max-h-60 overflow-y-auto z-10 shadow-xl shadow-neutral-900"
    >
      {#if clearable}
        <button
          data-item="1"
          class="text-left p-2 hover:bg-neutral-600 focus-within:bg-neutral-600 active:bg-neutral-500 outline-none"
          on:click|preventDefault={clearAll}>{clearableLabel}</button
        >
      {/if}
      {#each options as option, index}
        {@const isSelected = selected.includes(option)}
        <button
          data-item={clearable ? index + 2 : index + 1}
          class="flex items-center gap-2 text-left p-2 hover:bg-neutral-600 focus-within:bg-neutral-600 active:bg-neutral-500 transition-colors outline-none {isSelected
            ? 'selected'
            : ''}"
          on:click|preventDefault={() => handleOptionSelect(option)}
        >
          <!-- Check marker -->
          <div class="p-[0.125rem] rounded border-2">
            <svg
              style={isSelected ? 'fill: white;' : 'fill: transparent;'}
              class="w-2 h-2 transition-colors"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              ><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
                d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
              /></svg
            >
          </div>
          {option.label}
        </button>
      {/each}
    </div>
  {/if}
</div>

<style scoped>
  .selected {
    background-color: rgb(248 113 113);
    color: #fff;
  }
  .selected:hover,
  .selected:focus-within {
    background-color: rgb(239 68 68);
  }
</style>
