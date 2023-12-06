<script lang="ts">
  import { page } from '$app/stores';
  import * as Dialog from '$lib/components/ui/dialog';
  import { createEventDispatcher, onMount } from 'svelte';
  import * as Select from '$lib/components/ui/select';
  import { Button } from '$lib/components/ui/button';
  import { Loader2 } from 'lucide-svelte';
  import { goto } from '$app/navigation';

  type Response = {
    data: {
      id: string;
      name: string;
      profiles: {
        uuid: string;
      };
    }[];
    error: {
      code: string | null;
      hint: string | null;
      message: string | null;
    } | null;
  };

  const dispatch = createEventDispatcher<{ close: boolean }>();

  $: ({ supabase, session } = $page.data);

  let teams: { label: string; value: string }[] | null = null;
  let selected: number | null = null;

  let isLoading = false;
  let errorMessage: string | null = null;

  onMount(async () => {
    if (session) {
      const { data } = (await supabase
        .from('teams')
        .select(
          `
        id,
        name,
        profiles!inner (
          uuid
        )
        `
        )
        .eq('profiles.uuid', session.user.id)) as Response;

      if (data) {
        teams = data.map((team) => ({
          label: team.name,
          value: team.id,
        }));
      }
    }
  });

  function handleSelect(e: any) {
    selected = e.value;
  }

  async function handleSubmit() {
    isLoading = true;
    if (!selected) {
      errorMessage = 'Please select a team.';
      isLoading = false;
      return;
    }

    try {
      const res = await fetch('/api/lobbies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamId: selected,
        }),
      });
      const { url, error } = await res.json();

      if (error) {
        handleError(error);
        return;
      }

      dispatch('close', true);
      goto(url);
    } catch (e) {
      console.error(e);
      errorMessage = 'Something went wrong. Please try again later.';
    } finally {
      isLoading = false;
    }
  }

  function handleError(error: { message: string; code: string }) {
    switch (error.code) {
      case 'P0001':
        errorMessage =
          'You are already in an active lobby. Go to notification center to re-join it.';
        break;
      default:
        errorMessage = 'Something went wrong. Please try again later.';
        break;
    }
    isLoading = false;
  }
</script>

<Dialog.Content class="sm:max-w-[425px]">
  <Dialog.Header>
    <Dialog.Title>Create Lobby</Dialog.Title>
    <Dialog.Description>
      Create a new lobby and invite your team members.
    </Dialog.Description>
  </Dialog.Header>
  <div class="flex flex-col gap-4">
    {#if teams && teams.length > 0}
      <Select.Root portal={null} onSelectedChange={handleSelect}>
        <Select.Trigger class="w-full">
          <Select.Value placeholder="Select a team" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Teams</Select.Label>
            {#each teams as team}
              <Select.Item value={team.value} label={team.label}
                >{team.label}</Select.Item
              >
            {/each}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Button on:click={handleSubmit} class="gap-2">
        {#if isLoading}
          <Loader2 size="20" class="animate-spin" />
        {/if}
        Create Lobby
      </Button>
      {#if errorMessage}
        <p class="text-red-400 text-sm">{errorMessage}</p>
      {/if}
    {:else}
      <p>You need to be part of a team before you can create a lobby.</p>
      <a
        href="/teams"
        class="underline"
        on:click={() => dispatch('close', true)}>Create a new team here</a
      >
    {/if}
  </div>
</Dialog.Content>
