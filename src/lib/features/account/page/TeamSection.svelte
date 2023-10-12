<script lang="ts">
  import { ChevronRight } from 'lucide-svelte';

  interface Team {
    name: string;
    org: string;
    role: string;
    joinedAt: Date;
  }

  export let teams: Team[];
</script>

<section>
  <h2 class="font-bold text-xl mb-4">Teams ({teams.length})</h2>
  {#if teams.length > 0}
    <div class="max-md:hidden grid grid-cols-5 p-2 text-neutral-400">
      <p>Name</p>
      <p>Organization</p>
      <p>Role</p>
      <p>Joined at</p>
    </div>
    <div class="grid sm:grid-cols-2 md:grid-cols-1 max-md:gap-4">
      {#each teams as team, index}
        <a
          href={`/teams/${team.name}`}
          class="p-2 rounded shadow group max-md:block max-md:bg-neutral-800 max-md:hover:scale-[1.02] max-md:transition-transform md:grid md:grid-cols-5 {index %
            2 ===
          0
            ? 'md:bg-muted'
            : ''}"
        >
          <p class="flex justify-between">
            <span class="md:hidden text-neutral-400">Name:</span>{team.name}
          </p>
          <p class="flex justify-between">
            <span class="md:hidden text-neutral-400">Organization:</span
            >{team.org}
          </p>
          <p class="flex justify-between">
            <span class="md:hidden text-neutral-400">Role:</span>{team.role}
          </p>
          <p class="flex justify-between">
            <span class="md:hidden text-neutral-400">Joined at:</span
            >{team.joinedAt.toLocaleDateString()}
          </p>
          <a
            class="max-md:hidden flex items-center gap-1 justify-end group-hover:text-primary group-focus-within:text-primary"
            href={`/teams/${team.name}`}>View team<ChevronRight size="20" /></a
          >
        </a>
      {/each}
    </div>
  {:else}
    <p class="text-neutral-400 text-sm">
      This user is currently not in any teams...
    </p>
  {/if}
</section>
