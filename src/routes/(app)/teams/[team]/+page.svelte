<script lang="ts">
  import FormButton from '$lib/components/buttons/FormButton.svelte';
  import Drawer from '$lib/components/containers/Drawer.svelte';
  import { toast } from '$lib/components/feedback/toast/toastStore.js';
  import InvitePlayerForm from '$lib/components/forms/InvitePlayerForm.svelte';
  import TransferLeaderForm from '$lib/components/forms/TransferLeaderForm.svelte';
  import StratSlider from '$lib/features/stratListing/components/StratSlider.svelte';
  import { Button } from '$lib/components/ui/button';
  import {
    Trash,
    UserPlus,
    ArrowLeftRight,
    ChevronRight,
    LogOut,
  } from 'lucide-svelte';

  export let data;
  export let form;

  $: ({ team, session } = data);

  $: if (form?.message) {
    toast.push({
      type: 'error',
      title: 'Error',
      desc: form.message,
    });
  }

  $: if (form?.success) {
    toast.push({
      type: 'success',
      title: 'Success',
      desc: form.success,
    });
  }

  $: userId = session?.user.id;
  $: membersIds = team.members?.map((m) => {
    return m.profiles && m.profiles instanceof Array
      ? m.profiles[0].uuid
      : m.profiles?.uuid;
  });
  $: isTeamLeader =
    team && team.profiles
      ? team.profiles instanceof Array
        ? userId === team.profiles[0].uuid
        : userId === team.profiles.uuid
      : false;

  let confirmKickDialog: HTMLDialogElement;
  let memberToKick: { id: string; name: string } | null = null;

  let deleteTeamDialog: HTMLDialogElement;

  let showTransfer = false;
  let showInvite = false;

  /**
   * Handles the event when a user is to be kicked
   *
   * @param member to me kicked
   */
  const handleKick = (member: any) => {
    memberToKick = {
      id: member.profiles.id,
      name: member.profiles.username,
    };
    confirmKickDialog.showModal();
  };

  /**
   * Takes in either an array of profiles or a single profile and converts it to a single profile
   * @param profile to convert
   */
  const getProfile = (
    profile:
      | { uuid: string; username: string; email?: string }
      | { uuid: string; username: string; email?: string }[]
      | null
  ) => {
    if (profile instanceof Array) {
      return profile[0];
    }
    return profile;
  };
</script>

<main class="grid w-default my-10">
  {#if team}
    <!-- General team info -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl text-primary font-bold">
        {team.name}
      </h1>
      {#if isTeamLeader}
        <!-- show team leader options -->
        <div class="flex items-center gap-2">
          <Button
            class="gap-1"
            variant="secondary"
            on:click={() => (showTransfer = true)}
            ><ArrowLeftRight size="20" />Transfer leader</Button
          >
          <Button
            class="gap-1"
            variant="secondary"
            on:click={() => (showInvite = true)}
            ><UserPlus size="20" />Invite player</Button
          >
          <Button class="gap-1" on:click={() => deleteTeamDialog.showModal()}
            ><Trash size="20" />Delete team</Button
          >
        </div>
      {:else if membersIds?.includes(userId)}
        <!-- team member options -->
        <form action="?/leaveTeam" method="POST">
          <input type="hidden" name="teamId" value={team.id} />
          <Button class="gap-1">
            <LogOut size="20" />Leave team
          </Button>
        </form>
      {/if}
    </div>
    <div class="flex gap-10 rounded shadow text-sm mb-10">
      <div>
        <h3 class="font-bold">Name:</h3>
        <p>{team.name}</p>
      </div>
      <div>
        <h3 class="font-bold">Organization:</h3>
        <p>{team.organization}</p>
      </div>
      <div>
        <h3 class="font-bold">Created At:</h3>
        <p>
          {team.created_at ? new Date(team.created_at).toDateString() : 'n/a'}
        </p>
      </div>
      <div>
        <h3 class="font-bold">Team Leader:</h3>
        <a href="/users/{team.profiles ? getProfile(team.profiles)?.uuid : ''}">
          {team.profiles ? getProfile(team.profiles)?.username : 'n/a'}
        </a>
      </div>
    </div>
    <!-- Team members -->
    <section class="mb-10">
      <h2 class="font-bold text-xl mb-4">Members ({team.members?.length})</h2>
      {#if team.members !== null}
        <div class="max-md:hidden grid grid-cols-4 p-2 text-muted-foreground">
          <p>Username</p>
          <p>Role</p>
          <p>Joined at</p>
        </div>
        <div class="grid sm:grid-cols-2 md:grid-cols-1 max-md:gap-4">
          {#each team.members as member, index}
            <a
              href={`/users/${getProfile(member.profiles)?.uuid}`}
              class="p-2 rounded shadow group max-md:block max-md:bg-neutral-800 max-md:hover:scale-[1.02] max-md:transition-transform md:grid md:grid-cols-4 {index %
                2 ===
              0
                ? 'md:bg-muted'
                : ''}"
            >
              <p class="flex justify-between">
                <span class="md:hidden text-neutral-400">Username:</span
                >{getProfile(member.profiles)?.username}
              </p>
              <p class="flex justify-between">
                <span class="md:hidden text-neutral-400">Role:</span
                >{member.role}
              </p>
              <p class="flex justify-between">
                <span class="md:hidden text-neutral-400">Joined at:</span
                >{new Date(member.inserted_at).toLocaleDateString()}
              </p>
              <div class="flex justify-between">
                {#if isTeamLeader && getProfile(member.profiles)?.uuid !== userId}
                  <button
                    on:click|preventDefault={() => handleKick(member)}
                    class="text-sm text-primary hover:underline focus-within:underline w-full"
                    >Kick from team</button
                  >
                {/if}
                <a
                  class="max-md:hidden flex items-center gap-2 justify-end w-full group-hover:text-primary group-focus-within:text-primary"
                  href={`/users/${getProfile(member.profiles)?.uuid}`}
                  >View profile<ChevronRight size="20" /></a
                >
              </div>
            </a>
          {/each}
        </div>
      {/if}
    </section>
    <!-- Team strats -->
    {#await data.lazy.strats}
      <p>Loading...</p>
    {:then data}
      <StratSlider
        strats={data.strats}
        totalNumberOfStrats={data.count ?? 0}
        redirect="team"
      />
    {/await}
    <!-- Confirm kick dialog -->
    <dialog
      bind:this={confirmKickDialog}
      class="bg-neutral-900 rounded text-white text-sm backdrop:bg-neutral-950/90"
    >
      {#if memberToKick !== null}
        <div class="grid">
          <h1 class="text-lg text-red-400 font-bold">Kick from team</h1>
          <p class="mb-10">
            Are you sure you want to kick <span class="text-red-400"
              >{memberToKick.name}</span
            > from the team?
          </p>
          <div class="flex gap-2 justify-end">
            <button on:click={() => confirmKickDialog.close()}>Cancel</button>
            <form action="?/kickPlayer" method="POST">
              <input type="hidden" name="playerId" value={memberToKick.id} />
              <input type="hidden" name="teamId" value={team.id} />
              <button
                type="submit"
                class="bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 py-1 px-4 rounded"
                >Kick</button
              >
            </form>
          </div>
        </div>
      {/if}
    </dialog>
    <!-- Delete team dialog -->
    <dialog
      class="bg-neutral-900 rounded text-white text-sm backdrop:bg-neutral-950/90"
      bind:this={deleteTeamDialog}
    >
      <div class="grid">
        <h1 class="text-lg text-red-400 font-bold">Delete team</h1>
        <p class="mb-10">Are you sure you want to delete the team?</p>
        <div class="flex gap-2 justify-end">
          <button on:click={() => deleteTeamDialog.close()}>Cancel</button>
          <form action="?/deleteTeam" method="POST">
            <input type="hidden" name="teamId" value={team.id} />
            <FormButton>Delete team</FormButton>
          </form>
        </div>
      </div>
    </dialog>
  {:else}
    <p class="text-sm text-neutral-400 text-center">
      Team not available. <a class="underline" href="/">Go back to home page</a>
    </p>
  {/if}
</main>
{#if team && isTeamLeader && session !== null && team.id}
  <!-- Transfer team leader drawer -->
  <Drawer bind:show={showTransfer}>
    <h1 class="font-bold text-primary" slot="title">Transfer leader</h1>
    <TransferLeaderForm
      slot="body"
      teamMembers={team.members}
      teamId={team.id}
      {session}
    />
  </Drawer>
  <!-- Invite player drawer -->
  <Drawer bind:show={showInvite}>
    <h1 class="font-bold text-primary" slot="title">Invite player</h1>
    <InvitePlayerForm slot="body" data={data.form} teamId={team.id} />
  </Drawer>
{/if}
