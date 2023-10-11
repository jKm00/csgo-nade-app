<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import Tag from '$lib/components/containers/Tag.svelte';

  export let thumbnail: string | undefined;
  export let stratId: number;
  export let stratName: string;
  export let team: string | undefined;
  export let authorId: string;
  export let authorName: string;
  export let createdAt: string;
  export let side: string;
  export let position: string | undefined;
  export let game: string;
</script>

<a
  class="bg-card rounded shadow overflow-hidden group"
  href="/strats/{stratId}"
>
  <Card.Root>
    <Card.Header class="p-0">
      {#if thumbnail}
        <img
          class="aspect-[16/8] w-full object-cover bg-neutral-700"
          src="/assets/images/{thumbnail}"
          alt="Overview over {position}"
        />
      {:else}
        <div
          class="grid text-center items-center content-center aspect-[16/8] bg-neutral-700 text-neutral-300"
        >
          <p class="text-neutral-400 text-sm">Image not available</p>
        </div>
      {/if}
    </Card.Header>
    <Card.Content>
      <div class="grid pt-4">
        <h2 class="text-2xl font-bold">{stratName}</h2>
        <p class="text-neutral-400">
          <a class="underline" href="/users/{authorId}">{authorName}</a>
          - {new Date(createdAt).toLocaleDateString()}
          {#if team !== null}
            - <a class="underline" href="/teams/{team}">{team}</a>
          {/if}
        </p>
        <div class="flex flex-wrap gap-2 mt-6">
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
      </div>
    </Card.Content>
  </Card.Root>
</a>
