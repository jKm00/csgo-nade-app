<script lang="ts">
  import UserMenu from '$lib/features/navBar/components/UserMenu.svelte';
  import { notifications } from '$lib/stores/notificationStore';
  import { authUser } from '$lib/stores/authStore';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { Route, Users2, Play, Plus, Bell } from 'lucide-svelte';
  import * as Dialog from '$lib/components/ui/dialog';
  import NewLobbyDialogContent from './NewLobbyDialogContent.svelte';

  let openDialog = false;
</script>

<nav class="flex items-center justify-between p-4">
  <div>
    <h1 class="font-bold uppercase"><a href="/">Cs Strats</a></h1>
  </div>
  {#if $authUser}
    <div class="flex items-center gap-2">
      <!-- Create dropdown -->
      <Dialog.Root
        open={openDialog}
        onOpenChange={(e) => (openDialog = e ?? false)}
      >
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild let:builder>
            <Button builders={[builder]} variant="outline" class="p-2">
              <Plus size="20" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content class="w-56">
            <DropdownMenu.Label>Create menu</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Group>
              <a href="/strats/new">
                <DropdownMenu.Item class="gap-2">
                  <Route size="20" />
                  Create Strat
                </DropdownMenu.Item>
              </a>
              <a href="/teams">
                <DropdownMenu.Item class="gap-2">
                  <Users2 size="20" />
                  Create Team
                </DropdownMenu.Item>
              </a>
              <DropdownMenu.Item class="gap-2">
                <!-- Opens the dialog with the content specified outside the dropdown -->
                <Dialog.Trigger class="flex items-center gap-2">
                  <Play size="20" />
                  Create Lobby
                </Dialog.Trigger>
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <!-- Content of dialog. Has to be place outside the dropdown menu so it is not closed when an item in the dropdown is clicked -->
        <NewLobbyDialogContent on:close={() => (openDialog = false)} />
      </Dialog.Root>
      <!-- Notificaitons -->
      <a
        class="relative border p-2 rounded-md mr-2 hover:bg-muted focus-visible:bg-muted"
        href="/users/{$authUser.uuid}/alerts"
      >
        <Bell size="20" />
        {#if $notifications !== 0}
          <span
            class="absolute top-2 right-2 grid place-items-center w-2 aspect-square rounded-full text-xs bg-red-400"
          />
        {/if}
      </a>
      <!-- User info -->
      <UserMenu />
    </div>
  {:else}
    <ul class="flex items-center gap-4">
      <li><a href="/login">Login</a></li>
      <li><a href="/register">Register</a></li>
    </ul>
  {/if}
</nav>
