<script lang="ts">
  import Tag from '$lib/components/containers/Tag.svelte';

  export let stratName: string;
  export let description: string;
  export let authorUuid: string;
  export let authorUsername: string;
  export let createdAt: string;
  export let teamName: string | null;
  export let side: string;
  export let position: string;
  export let game: string;
</script>

<div class="mt-4 sm:mt-0">
  <header>
    <h2 class="text-3xl font-bold">{stratName}</h2>
    <div class="flex gap-4 justify-between text-neutral-400 text-sm mb-4">
      <p>
        Author: <a class="underline" href="/users/{authorUuid}"
          >{authorUsername}</a
        >
      </p>
      <p>
        Created at: {new Date(createdAt).toLocaleDateString()}
      </p>
      {#if teamName !== null}
        <p>
          Team: <a class="underline" href="/teams/{teamName}">{teamName}</a>
        </p>
      {/if}
    </div>
  </header>
  <div class="flex flex-wrap gap-2 mb-6">
    {#if side === 'CT'}
      <Tag color="blue">{side}</Tag>
    {:else}
      <Tag color="red">{side}</Tag>
    {/if}
    {#if position}
      <Tag color="purple">{position}</Tag>
    {/if}
    <Tag color="amber">{game}</Tag>
  </div>
  <p class="whitespace-pre-wrap">{description}</p>
</div>
