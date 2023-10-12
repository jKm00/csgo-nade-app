<script lang="ts">
  import Dropdown2 from '$lib/components/inputs/Dropdown2.svelte';
  import TextInput from '$lib/components/inputs/TextInput.svelte';
  import { maps } from '$lib/shared/maps';
  import Drawer from '$lib/components/containers/Drawer.svelte';
  import { goto } from '$app/navigation';
  import FilterChip from './FilterChip.svelte';
  import { Button } from '$lib/components/ui/button';

  export let params: {
    map: string;
    position: string;
    side: string;
    strat: string;
    team: string;
    author: string;
  };

  let showDrawer = false;

  let map = params.map;
  $: mapOptions = maps.map((map) => ({
    label: map.name,
    value: map.name,
  }));

  let position = params.position;
  // TODO: Fetch positions from db an display based on selected map
  let positionOptions = [
    { label: 'A site', value: 'A site' },
    { label: 'B site', value: 'B site' },
    { label: 'Mid', value: 'Mid' },
    { label: 'Top mid', value: 'Top mid' },
    { label: 'Short', value: 'Short' },
    { label: 'Banan', value: 'Banan' },
    { label: 'Water', value: 'Water' },
    { label: 'Apps', value: 'Apps' },
    { label: 'Palace', value: 'Palace' },
    { label: 'B apps', value: 'B apps' },
    { label: 'Outside', value: 'Outside' },
    { label: 'Lobby', value: 'Lobby' },
    { label: 'Ramp', value: 'Ramp' },
    { label: 'Long', value: 'Long' },
    { label: 'Fountain', value: 'Fountain' },
    { label: 'Connector', value: 'Connector' },
    { label: 'Monster enterance', value: 'Monster enterance' },
    { label: 'Sewage', value: 'Sewage' },
    { label: 'A ramp', value: 'A ramp' },
    { label: 'B ramp', value: 'B ramp' },
  ];

  let side = params.side;
  let sideOptions = [
    { label: 'CT', value: 'CT' },
    { label: 'T', value: 'T' },
  ];

  let stratName = params.strat;
  let teamName = params.team;
  let author = params.author;

  const handleSubmit = () => {
    const params = new URLSearchParams();

    if (!!map) {
      params.append('map', map);
    }

    if (!!position) {
      params.append('position', position);
    }

    if (!!side) {
      params.append('side', side);
    }

    if (!!stratName) {
      params.append('strat', stratName);
    }

    if (!!teamName) {
      params.append('team', teamName);
    }

    if (!!author) {
      params.append('author', author);
    }

    goto(`/strats?${params.toString()}`);
    showDrawer = false;
  };

  const clearFilters = () => {
    map = '';
    position = '';
    side = '';
    stratName = '';
    teamName = '';
    author = '';
    goto('/strats');
  };
</script>

<!-- Buttons -->
<div class="flex gap-2 items-center">
  <Button
    variant="secondary"
    class="flex items-center gap-2"
    on:click={() => (showDrawer = true)}
    ><svg
      class="fill-white"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 512 512"
      ><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
        d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"
      /></svg
    >Filters</Button
  >
  <Button
    variant="secondary"
    class="flex items-center gap-2"
    on:click={clearFilters}
    ><svg
      class="fill-white"
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 576 512"
      ><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
        d="M290.7 57.4L57.4 290.7c-25 25-25 65.5 0 90.5l80 80c12 12 28.3 18.7 45.3 18.7H288h9.4H512c17.7 0 32-14.3 32-32s-14.3-32-32-32H387.9L518.6 285.3c25-25 25-65.5 0-90.5L381.3 57.4c-25-25-65.5-25-90.5 0zM297.4 416H288l-105.4 0-80-80L227.3 211.3 364.7 348.7 297.4 416z"
      /></svg
    >Clear All</Button
  >
</div>

<!-- Chips -->
<!-- TODO: Store in a list and display with for each -->
<div class="flex gap-2">
  {#if map !== ''}
    <FilterChip label="Map" value={map} color="rgb(248 113 113)" />
  {/if}
  {#if position !== ''}
    <FilterChip label="Position" value={position} color="rgb(192 132 252)" />
  {/if}
  {#if side !== ''}
    <FilterChip label="Side" value={side} color="rgb(251 146 60)" />
  {/if}
  {#if stratName !== ''}
    <FilterChip label="Strat" value={stratName} color="rgb(45 212 191)" />
  {/if}
  {#if teamName !== ''}
    <FilterChip label="Team" value={teamName} color="rgb(56 189 248)" />
  {/if}
  {#if author !== ''}
    <FilterChip label="Author" value={author} color="rgb(250 204 21)" />
  {/if}
</div>

<!-- Drawer -->
<Drawer bind:show={showDrawer} width="25rem" side="left">
  <div slot="title">
    <h1 class="text-2xl font-bold text-primary">Filters</h1>
  </div>
  <div slot="body" class="p-4">
    <form on:submit={handleSubmit} class="grid gap-10">
      <fieldset class="grid gap-2">
        <legend class="font-bold mb-1">Map options:</legend>
        <Dropdown2
          id="map"
          name="map"
          placeholder="Select map"
          bind:value={map}
          options={mapOptions}
        />
        <Dropdown2
          id="position"
          name="position"
          placeholder="Select position"
          bind:value={position}
          options={positionOptions}
        />
        <Dropdown2
          id="side"
          name="side"
          placeholder="Select side"
          bind:value={side}
          options={sideOptions}
        />
      </fieldset>
      <fieldset class="grid gap-2">
        <legend class="font-bold mb-1">Other options:</legend>
        <TextInput
          id="stratName"
          name="stratName"
          placeholder="Strat name"
          bind:value={stratName}
        />
        <TextInput
          id="teamName"
          name="teamName"
          placeholder="Team name"
          bind:value={teamName}
        />
        <TextInput
          id="author"
          name="author"
          placeholder="Author (username)"
          bind:value={author}
        />
      </fieldset>
      <Button>Save</Button>
    </form>
  </div>
</Drawer>
