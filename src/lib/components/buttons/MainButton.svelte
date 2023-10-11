<script lang="ts">
  import LoadingIndicator from '../feedback/LoadingIndicator.svelte';

  export let disabled = false;
  export let isLoading = false;
</script>

{#if isLoading}
  <LoadingIndicator {isLoading} />
{:else}
  <button
    on:click
    {disabled}
    class="flex items-center justify-center gap-2 bg-primary hover:opacity-90 focus-within:opacity-90 active:opacity-80 transition-opacity py-1 px-4 rounded"
    ><slot /></button
  >
{/if}
