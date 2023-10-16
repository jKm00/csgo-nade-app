<script lang="ts">
  import type { Member } from '../types/member';
  import { dndzone } from 'svelte-dnd-action';

  export let placeholder: string;

  let items: Member[] = [];

  function handleDnd(e: any) {
    items = e.detail.items;

    // TODO: Emit event when player is selected
  }

  $: options = {
    dropFromOthersDisabled: items.length > 0,
    items,
    flipDurationMs: 100,
  };
</script>

<div
  class="grid place-items-center w-32 aspect-video border rounded-md relative"
>
  {#if items.length === 0}
    <p class="absolute text-muted-foreground text-sm pointer-events-none">
      {placeholder}
    </p>
  {/if}
  <div
    use:dndzone={options}
    on:consider={handleDnd}
    on:finalize={handleDnd}
    class="grid place-items-center w-full h-full rounded-md"
  >
    {#each items as member (member.id)}
      <p>{member.username}</p>
    {/each}
  </div>
</div>
