<script lang="ts">
  import Drawer from '$lib/components/containers/Drawer.svelte';
  import { authUser } from '$lib/stores/authStore';
  import { Bug, Info, LogOut, Settings, User } from 'lucide-svelte';

  let showMenu = false;
</script>

{#if $authUser}
  <button on:click={() => (showMenu = true)} data-cy="profile-picture">
    <img
      class="w-6 rounded-full"
      src="/assets/images/profile_pictures/{$authUser.profile_picture.filename}"
      alt="{$authUser.name}'s profile picture"
    />
  </button>

  <Drawer bind:show={showMenu} width="25rem">
    <!-- Drawer title -->
    <div class="flex gap-2 items-center" slot="title">
      <img
        class="w-16 aspect-square rounded-full"
        src="/assets/images/profile_pictures/{$authUser.profile_picture
          .filename}"
        alt="{$authUser.name}'s profile picture"
      />
      <div class="grid">
        <h1 class="text-lg font-bold">{$authUser.name}</h1>
        <p class="text-sm text-muted-foreground">@{$authUser.username}</p>
      </div>
    </div>
    <!-- Drawer body -->
    <div class="px-6 mt-4" slot="body">
      <ul class="grid gap-2">
        <li>
          <a
            on:click={() => (showMenu = false)}
            class="flex items-center gap-4 hover:underline focus-within:underline"
            href="/users/{$authUser.uuid}"
          >
            <User class="w-5 h-5" />Accout page</a
          >
        </li>
        <li>
          <a
            on:click={() => (showMenu = false)}
            class="flex items-center gap-4 hover:underline focus-within:underline"
            href="/users/{$authUser.uuid}/settings"
          >
            <Settings class="w-5 h-5" />Settings</a
          >
        </li>
      </ul>
      <ul class="grid gap-2 pt-5 mt-5 border-t border-neutral-700">
        <li>
          <a
            on:click={() => (showMenu = false)}
            class="flex items-center gap-4 hover:underline focus-within:underline"
            href="/guide"
            ><Info class="w-5 h-5" />Guide</a
          >
        </li>
        <li>
          <a
            on:click={() => (showMenu = false)}
            class="flex items-center gap-4 hover:underline focus-within:underline"
            href="/report-bugs"
            ><Bug class="w-5 h-5" />Report a bug</a
          >
        </li>
      </ul>
      <ul class="grid gap-2 pt-5 mt-5 border-t border-neutral-700">
        <li>
          <form action="/logout" method="POST">
            <button
              class="flex items-center gap-4 hover:underline focus-within:underline"
              type="submit"
              ><LogOut class="w-5 h-5" />Logout</button
            >
          </form>
        </li>
      </ul>
    </div>
  </Drawer>
{/if}
