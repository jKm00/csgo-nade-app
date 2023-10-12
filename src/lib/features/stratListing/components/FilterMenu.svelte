<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import * as Sheet from '$lib/components/ui/sheet';
  import { Eraser, Filter } from 'lucide-svelte';
  import * as Select from '$lib/components/ui/select';
  import { Input } from '$lib/components/ui/input';
  import { Separator } from '$lib/components/ui/separator';

  export let filters: { key: string; value: string }[];
  export let maps: { id: number; name: string }[];
  export let positions: { map_id: number; name: string }[];

  let openSheet = false;
  let filterHasChanged = false;

  $: mapFilter = filters.find((f) => f.key === 'map');
  let selectedMap = { value: mapFilter?.value, label: mapFilter?.value };

  $: activePositions = getPositions(selectedMap.value);
  $: positionFilter = filters.find((f) => f.key === 'position');
  let selectedPosition = {
    value: positionFilter?.value,
    label: positionFilter?.value,
  };

  $: sideFilter = filters.find((f) => f.key === 'side');
  let selectedSide = { value: sideFilter?.value, label: sideFilter?.value };

  let stratName = filters.find((f) => f.key === 'stratName')?.value;

  let teamName = filters.find((f) => f.key === 'teamName')?.value;

  let author = filters.find((f) => f.key === 'author')?.value;

  const getPositions = (selectedMap: string | undefined) => {
    if (selectedMap === undefined || selectedMap === '') {
      return positions.filter(
        (pos, index) => positions.map((p) => p.name).indexOf(pos.name) === index
      );
    }

    const mapId = maps.find((m) => m.name === selectedMap)?.id;

    return positions.filter((p) => p.map_id === mapId);
  };

  const clearFilters = () => {
    selectedMap = { value: '', label: 'Map' };
    selectedPosition = { value: '', label: 'Position' };
    selectedSide = { value: '', label: 'Side' };
    stratName = '';
    teamName = '';
    author = '';

    goto('/strats');
  };

  const handleMapChange = () => {
    filterHasChanged = true;
    // Reset position selection when changing map
    selectedPosition = { value: '', label: 'Position' };
  };

  const applyFilters = () => {
    const urlParams = new URLSearchParams();

    if (selectedMap.value && selectedMap.value !== '') {
      urlParams.append('map', selectedMap.value);
    }

    if (selectedPosition.value && selectedPosition.value !== '') {
      urlParams.append('position', selectedPosition.value);
    }

    if (selectedSide.value && selectedMap.value !== '') {
      urlParams.append('side', selectedSide.value);
    }

    if (stratName && stratName !== '') {
      urlParams.append('stratName', stratName);
    }

    if (teamName && teamName !== '') {
      urlParams.append('teamName', teamName);
    }

    if (author && author !== '') {
      urlParams.append('author', author);
    }

    openSheet = false;
    goto(`/strats?${urlParams.toString()}`);
  };
</script>

<div class="flex gap-2">
  <Sheet.Root
    open={openSheet}
    onOpenChange={(e) => {
      openSheet = e ?? false;
      filterHasChanged = false;
    }}
  >
    <Sheet.Trigger asChild let:builder>
      <Button builders={[builder]} variant="outline" class="gap-1">
        <Filter size="20" />
        Filters
        {#if filters.length > 0}
          <span>({filters.length})</span>
        {/if}
      </Button>
    </Sheet.Trigger>
    <Sheet.Content side="left">
      <Sheet.Header>
        <Sheet.Title>Filters</Sheet.Title>
        <Sheet.Description
          >Apply filters to only see strat of you choice</Sheet.Description
        >
      </Sheet.Header>
      <form on:submit|preventDefault={applyFilters} class="grid gap-8 mt-8">
        <div class="grid gap-2">
          <!-- Map -->
          <Select.Root
            onSelectedChange={handleMapChange}
            bind:selected={selectedMap}
          >
            <Select.Trigger>
              <Select.Value placeholder="Map" />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Item value="" label="Map">Clear</Select.Item>
                {#each maps as map}
                  <Select.Item value={map.name} label={map.name}>
                    {map.name}
                  </Select.Item>
                {/each}
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <!-- Side -->
          <Select.Root
            onSelectedChange={() => (filterHasChanged = true)}
            bind:selected={selectedPosition}
          >
            <Select.Trigger>
              <Select.Value placeholder="Position" />
            </Select.Trigger>
            <Select.Content>
              <Select.Group class="max-h-60 overflow-y-auto">
                <Select.Item value="" label="Map">Clear</Select.Item>
                {#each activePositions as position}
                  <Select.Item value={position.name} label={position.name}
                    >{position.name}</Select.Item
                  >
                {/each}
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <!-- Side -->
          <Select.Root
            onSelectedChange={() => (filterHasChanged = true)}
            bind:selected={selectedSide}
          >
            <Select.Trigger>
              <Select.Value placeholder="Side" />
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.Item value="" label="Map">Clear</Select.Item>
                <Select.Item value="CT" label="CT">CT</Select.Item>
                <Select.Item value="T" label="T">T</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
        <Separator />
        <div class="grid gap-2">
          <Input
            bind:value={stratName}
            placeholder="Strat name"
            on:input={() => (filterHasChanged = true)}
          />
          <Input
            bind:value={teamName}
            placeholder="Team name"
            on:input={() => (filterHasChanged = true)}
          />
          <Input
            bind:value={author}
            placeholder="Start author"
            on:input={() => (filterHasChanged = true)}
          />
        </div>
        <Button disabled={!filterHasChanged}>Save filters</Button>
      </form>
    </Sheet.Content>
  </Sheet.Root>
  <Button on:click={clearFilters} variant="outline" class="gap-1">
    <Eraser size="20" />Clear all
  </Button>
</div>
