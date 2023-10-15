<script lang="ts">
  import { page } from '$app/stores';
  import FilterMenu from '$lib/features/stratListing/components/FilterMenu.svelte';
  import StratCard from '$lib/features/stratListing/components/StratCard.svelte';
  import StratListingHeader from '$lib/features/stratListing/components/StratListingHeader.svelte';
  import type { StratResponse } from '$lib/dtos/StratResponse.js';
  import { onMount } from 'svelte';
  import { Loader2 } from 'lucide-svelte';

  export let data;

  const LOAD_BATCH_SIZE = 12;

  let from = 0;
  let to = LOAD_BATCH_SIZE - 1;
  let isMoreStrats: boolean;
  let isLoadingMoreStrats = false;

  onMount(() => {
    const unsubscribe = page.subscribe((page) => {
      // When filter changes, reset lazy loading
      if (page.url.pathname === '/strats') {
        from = 0;
        to = LOAD_BATCH_SIZE - 1;
        isMoreStrats = true;
      }
    });

    // Intersect observer to watch when footer enters viewport.
    // When this happens, load more strats
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.0,
    };

    let target = document.querySelector('#footer')!;

    let callback = (
      entries: IntersectionObserverEntry[],
      _: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        // If target is moving into viewport from bottom
        if (entry.isIntersecting) {
          fetchNextStrats();
        }
      });
    };

    // Initialize observer
    let observer = new IntersectionObserver(callback, options);
    observer.observe(target);

    // Unsubscribe from page store and unobserve target when component is destroyed
    return () => {
      unsubscribe();
      observer.unobserve(target);
    };
  });

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
    if (!isMoreStrats) return;

    isLoadingMoreStrats = true;

    from += LOAD_BATCH_SIZE;
    to += LOAD_BATCH_SIZE;

    try {
      const response = await fetch(
        `/api/strats?${$page.url.searchParams.toString()}&from=${from}&to=${to}`
      );
      const result = (await response.json()) as StratResponse[];
      // If last request resulted in a list less then 12, there are no more strats
      if (result.length < 12) {
        isMoreStrats = false;
      }

      loadedStrats = [...loadedStrats, ...result];
    } catch (err) {
      console.error(err);
    } finally {
      isLoadingMoreStrats = false;
    }
  }
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
      {#if isLoadingMoreStrats}
        <div class="flex justify-center col-span-full py-4">
          <Loader2 class="animate-spin" />
        </div>
      {/if}
    {:else}
      <p class="text-center col-span-4 text-muted-foreground text-sm">
        No strats available with the selected filters
      </p>
    {/if}
  </div>
</main>
