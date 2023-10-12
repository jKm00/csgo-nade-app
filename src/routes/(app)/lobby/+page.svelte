<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { ChevronRight, Minus, Plus } from 'lucide-svelte';
  import { flip } from 'svelte/animate';

  export let data;

  $: ({ maps, teams } = data);

  let selectedMap: number | null = null;
  let selectedTeam: number | null = null;

  let teamMembers = [
    { id: 0, name: 'jKm' },
    { id: 1, name: 'Andy' },
    { id: 2, name: 'Haimat' },
    { id: 3, name: 'Jens' },
    { id: 4, name: 'Hans' },
    { id: 5, name: 'Holamne' },
    { id: 6, name: 'Benny' },
  ];
  let selectedPlayers: { id: number; name: string }[] = [];

  const selectMember = (id: number) => {
    const foundMember = teamMembers.find((m) => m.id === id);
    if (!foundMember) return;

    teamMembers = teamMembers.filter((m) => m.id !== id);
    selectedPlayers = [...selectedPlayers, foundMember];
  };

  const unSelectMember = (id: number) => {
    const foundMember = selectedPlayers.find((p) => p.id === id);
    if (!foundMember) return;

    selectedPlayers = selectedPlayers.filter((p) => p.id !== id);
    teamMembers = [...teamMembers, foundMember];
  };
</script>

<div class="w-default grid gap-8">
  <h1 class="text-3xl text-primary font-bold">Create new lobby</h1>
  <div class="flex gap-8">
    <!-- Maps -->
    <div>
      <h2 class="mb-2 font-bold text-xl">Select map:</h2>
      <div class="grid gap-4 max-h-[600px] overflow-x-auto">
        {#each maps as map}
          <button
            on:click={() => (selectedMap = map.id)}
            class="flex items-center text-left rounded-s-md hover:bg-muted focus-visible:bg-muted map-background"
            style={selectedMap === map.id ? '--bg: var(--primary)' : ''}
          >
            <img src={map.thumbnail} alt="mirage" class="w-40 rounded-md" />
            <div class="px-4">
              <h3 class="text-lg">{map.name}</h3>
              <p
                class="text-muted-foreground text-sm map-text"
                style={selectedMap === map.id
                  ? '--txt: var(--primary-foreground)'
                  : ''}
              >
                A funny interesting little description
              </p>
            </div>
          </button>
        {/each}
      </div>
    </div>
    <div class="flex-grow content-start grid gap-8">
      <!-- Team selection -->
      <div>
        <h2 class="mb-2 font-bold text-xl">Select team:</h2>
        <div class="flex gap-4">
          {#each teams as team}
            <Button
              on:click={() => (selectedTeam = team.id)}
              variant="outline"
              class="team-background"
              style={selectedTeam === team.id ? '--bg: var(--primary)' : ''}
              >{team.name}</Button
            >
          {/each}
        </div>
      </div>
      <!-- Invite players -->
      <div class="player-grid">
        <h2 class="mb-2 font-bold text-xl player-span-full">Invite players:</h2>
        <h3 class="flex-grow mb-1 player-start">Team members:</h3>
        <h3 class="flex-grow mb-1 player-end">Invited players:</h3>
        <!-- Team members not selected -->
        <div
          class="col-span-5 grid py-2 content-start border rounded-md player-start"
        >
          {#each teamMembers as member (member.id)}
            <button
              on:click={() => selectMember(member.id)}
              class="flex justify-between items-center px-4 py-1 hover:bg-muted focus-visible:bg-muted group"
              animate:flip={{ duration: 200 }}
              >{member.name}
              <Plus
                size="20"
                class="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
              /></button
            >
          {/each}
        </div>
        <ChevronRight size="20" class="self-center" />
        <!-- Selected team members -->
        <div
          class="col-span-5 grid py-2 content-start border rounded-md player-end"
        >
          {#each selectedPlayers as player (player.id)}
            <button
              on:click={() => unSelectMember(player.id)}
              class="flex justify-between items-center px-4 py-1 hover:bg-muted focus-visible:bg-muted group"
              animate:flip={{ duration: 200 }}
              >{player.name}
              <Minus
                size="20"
                class="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
              /></button
            >
          {/each}
        </div>
      </div>
    </div>
  </div>
  <Button>Create lobby</Button>
</div>

<style scoped>
  .map-background {
    --bg: var(--background);
    background-color: hsl(var(--bg));
  }

  .map-text {
    --txt: var(--muted-foreground);
    color: hsl(var(--txt));
  }

  .team-background {
    --bg: var(--background);
    background-color: hsl(var(--bg));
  }

  .player-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
  }

  .player-span-full {
    grid-column: 1 / -1;
  }

  .player-start {
    grid-column: 1 / span 1;
  }

  .player-end {
    grid-column: 3 / span 1;
  }
</style>
