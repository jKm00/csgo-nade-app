<script lang="ts">
  import { page } from '$app/stores';
  import FilterMenu from '$lib/features/stratListing/components/FilterMenu.svelte';
  import StratCard from '$lib/features/stratListing/components/StratCard.svelte';
  import StratListingHeader from '$lib/features/stratListing/components/StratListingHeader.svelte';
  import StratListingSkeleton from '$lib/features/stratListing/components/StratListingSkeleton.svelte';
  import type { StratResponse } from '$lib/dtos/StratResponse.js';

  export let data;

  let from = 0;
  let to = 11;

  $: loadedStrats = data.strats as StratResponse[];

  $: redirectLink = getRedirectLink(data.filters);

  function getRedirectLink(filters: { key: string; value: string }[]) {
    if (filters.length === 0) return '';

    const redirect = ['?filters='];

    filters.forEach((f, index) => {
      redirect.push(`${f.key}:${f.value}`);

      // If not last item
      if (index !== filters.length - 1) {
        redirect.push(',');
      }
    });

    return redirect.join('');
  }

  async function fetchNextStrats() {
    from += 12;
    to += 12;

    const response = await fetch(
      `/api/strats?${$page.url.searchParams.toString()}&from=${from}&to=${to}`
    );
    const result = (await response.json()) as StratResponse[];

    loadedStrats = [...loadedStrats, ...result];
  }
</script>

<main class="grid gap-6 mt-10 w-default">
  <button on:click={fetchNextStrats}>Fetch strats</button>
  <StratListingHeader />
  <FilterMenu
    filters={data.filters}
    maps={data.maps.data}
    positions={data.positions.data}
  />
  <div
    class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4"
  >
    {#if loadedStrats && loadedStrats.length > 0}
      {#each loadedStrats as strat}
        <StratCard
          thumbnail={`/maps/${strat.map_name.toLowerCase()}/${
            strat.position_img
          }`}
          position={strat.position_name}
          stratId={strat.strat_id}
          stratName={strat.strat_name}
          authorId={strat.author_id}
          authorName={strat.author}
          createdAt={strat.created_at}
          team={strat.team}
          side={strat.side}
          game={strat.game_short_name}
          {redirectLink}
        />
      {/each}
    {:else}
      <p class="text-center col-span-4 text-muted-foreground text-sm">
        No strats available with the selected filters
      </p>
    {/if}
  </div>
</main>
