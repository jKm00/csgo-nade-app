<script lang="ts">
  import FilterMenu from '$lib/features/stratListing/components/FilterMenu.svelte';
  import StratCard from '$lib/features/stratListing/components/StratCard.svelte';
  import StratListingHeader from '$lib/features/stratListing/components/StratListingHeader.svelte';
  import StratListingSkeleton from '$lib/features/stratListing/components/StratListingSkeleton.svelte';

  export let data;
</script>

<main class="grid gap-6 mt-10 w-default">
  <StratListingHeader />
  <FilterMenu
    filters={data.filters}
    maps={data.maps.data}
    positions={data.positions.data}
  />
  <div
    class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4"
  >
    {#await data.lazy.strats}
      <StratListingSkeleton />
    {:then strats}
      {#if strats && strats.length > 0}
        {#each strats as strat}
          <StratCard
            thumbnail={strat.thumbnail}
            position={strat.position}
            stratId={strat.stratId}
            stratName={strat.stratName}
            authorId={strat.authorId}
            authorName={strat.author}
            createdAt={strat.createdAt}
            team={strat.team}
            side={strat.side}
            game={strat.game.shortName}
          />
        {/each}
      {:else}
        <p class="text-center col-span-4 text-muted-foreground text-sm">
          No strats available with the selected filters
        </p>
      {/if}
    {/await}
  </div>
</main>
