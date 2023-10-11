<script lang="ts">
  import { fade } from 'svelte/transition';

  let showMenu = false;
</script>

<button on:click={() => (showMenu = true)}
  ><svg
    class="fill-white text-xl"
    xmlns="http://www.w3.org/2000/svg"
    height="1em"
    viewBox="0 0 448 512"
    ><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
      d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
    /></svg
  ></button
>

{#if showMenu}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    transition:fade={{ duration: 100 }}
    class="absolute inset-0 grid place-items-center bg-neutral-950/90 z-50"
    on:click={() => (showMenu = false)}
  >
    <div class="grid gap-4">
      <button
        class="text-right hover:text-red-400 focus-within:text-red-400 active:text-red-500 transition-colors"
        on:click={() => (showMenu = false)}>Close</button
      >
      <div class="flex gap-10 text-center text-xl">
        <a href="/strats/new">
          <img
            class="w-80 aspect-square bg-red-400 rounded p-14"
            src="/assets/icons/strat-planning-icon.png"
            alt="Strat planning"
          />
          <h1 class="mt-6">Create Strat</h1>
        </a>
        <a href="/teams">
          <img
            class="w-80 aspect-square bg-blue-400 rounded p-6"
            src="/assets/icons/team-icon.png"
            alt="Team icon"
          />
          <h1 class="mt-6">Create Team</h1>
        </a>
      </div>
    </div>
  </div>
{/if}
