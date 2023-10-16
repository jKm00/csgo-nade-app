<script lang="ts">
  import { flip } from 'svelte/animate';
  import { dndzone } from 'svelte-dnd-action';
  import type { Member } from '../types/member';
  import PlayerDrop from './PlayerDrop.svelte';

  export let members: Member[];

  const flipDurationMs = 300;

  $: options = {
    items: members,
    flipDurationMs,
  };

  function handleDnd(e) {
    members = e.detail.items;
  }
</script>

<div class="flex gap-4">
  <div
    use:dndzone={options}
    on:consider={handleDnd}
    on:finalize={handleDnd}
    class="border rounded-md py-2 w-60"
  >
    {#each members as member (member.id)}
      <p
        class="px-2 py-1 hover:bg-muted focus-visible:bg-muted"
        animate:flip={{ duration: flipDurationMs }}
      >
        {member.username}
      </p>
    {/each}
  </div>
  <div class="grid gap-2">
    <PlayerDrop placeholder="Player 1" />
    <PlayerDrop placeholder="Player 2" />
    <PlayerDrop placeholder="Player 3" />
    <PlayerDrop placeholder="Player 4" />
    <PlayerDrop placeholder="Player 5" />
  </div>
</div>
