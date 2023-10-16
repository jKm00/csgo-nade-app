<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import TeamMemberSelector from '$lib/features/lobby/components/TeamMemberSelector.svelte';

  export let data;

  $: ({ maps, teams } = data);

  let selectedMap: number | null = null;
  let selectedTeam: number | null = null;

  let teamMembers = [
    {
      id: 0,
      username: 'jKm',
      profilePicture: 'profile_3.png',
    },
    {
      id: 1,
      username: 'Andy',
      profilePicture: 'profile_6.png',
    },
    {
      id: 2,
      username: 'Haimat',
      profilePicture: 'profile_2.png',
    },
    {
      id: 3,
      username: 'Erlendgh',
      profilePicture: 'profile_8.png',
    },
    {
      id: 4,
      username: 'Balsam',
      profilePicture: 'profile_10.png',
    },
    {
      id: 5,
      username: 'Salty fish',
      profilePicture: 'profile_5.png',
    },
    {
      id: 6,
      username: 'z1',
      profilePicture: 'profile_2.png',
    },
    {
      id: 7,
      username: 'Benny',
      profilePicture: 'profile_1.png',
    },
  ];

  $: disabled = selectedMap === null || selectedTeam === null;
</script>

<div class="w-default grid gap-8">
  <div class="flex justify-between">
    <h1 class="text-3xl text-primary font-bold">Create new lobby</h1>
    <Button {disabled}>Create lobby</Button>
  </div>
  {#if teams.length === 0}
    <p class="text-muted-foreground">
      You need at least one team before you can create a lobby. <a
        class="underline"
        href="/teams">Create your first team here!</a
      >
    </p>
  {:else}
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
                variant={selectedTeam === team.id ? 'default' : 'outline'}
                >{team.name}</Button
              >
            {/each}
          </div>
        </div>
        <!-- Invite players -->
        <div>
          <h2 class="font-bold text-xl mb-2">Select members:</h2>
          {#if !selectedTeam}
            <p>Select team before selecting members</p>
          {:else}
            <TeamMemberSelector members={teamMembers} />
          {/if}
        </div>
      </div>
    </div>
  {/if}
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
</style>
