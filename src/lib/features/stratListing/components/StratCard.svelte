<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import Tag from '$lib/components/containers/Tag.svelte';

  export let thumbnail: string | undefined;
  export let stratId: number;
  export let stratName: string;
  export let team: string | null;
  export let authorId: string;
  export let authorName: string;
  export let createdAt: string;
  export let side: string;
  export let position: string | undefined;
  export let game: string;
  export let redirectLink: string | undefined;

  $: redirect = redirectLink !== undefined ? redirectLink : '';
</script>

<a
  class="group hover:scale-105 focus-visible:scale-105 transition-transform"
  href="/strats/{stratId}{redirect}"
>
  <Card.Root class="h-full overflow-hidden">
    <Card.Header class="p-0 border-b-2 border-transparent group-hover:border-primary group-focus-visible:border-primary transition-colors">
      {#if thumbnail}
        <img
          class="aspect-[16/8] w-full object-cover bg-muted"
          src="/assets/images/{thumbnail}"
          alt="Overview over {position}"
        />
      {:else}
        <div
          class="grid place-items-center aspect-[16/8] bg-muted text-muted-foreground"
        >
          <p class="text-muted-foreground text-sm">Image not available</p>
        </div>
      {/if}
    </Card.Header>
    <Card.Content>
      <div class="grid pt-4">
        <h2 class="font-bold">{stratName}</h2>
        <p class="text-muted-foreground text-sm">
          {#if authorId}
            <a class="underline" href="/users/{authorId}">{authorName}</a>
          {:else}
            <span>{authorName}</span>
          {/if}
          - {new Date(createdAt).toLocaleDateString()}
          {#if team !== null}
            - <a class="underline" href="/teams/{team}">{team}</a>
          {/if}
        </p>
        <div class="flex flex-wrap gap-4 mt-6">
          <Tag type="side">{side}</Tag>
          {#if position}
            <Tag type="position">{position}</Tag>
          {/if}
          <Tag type="game">{game}</Tag>
        </div>
      </div>
    </Card.Content>
  </Card.Root>
</a>
