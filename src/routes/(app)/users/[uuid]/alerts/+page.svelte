<script lang="ts">
  import { toast } from '$lib/components/feedback/toast/toastStore.js';
  import { notifications } from '$lib/stores/notificationStore.js';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  export let data;
  export let form;

  $: if (form?.error) {
    toast.push({
      type: 'error',
      title: 'Error',
      desc: form.error,
    });
  }

  $: if (form?.success) {
    toast.push({
      type: 'success',
      title: 'Success',
      desc: form.success,
    });
  }

  $: ({ teamInvitations, lobbyInvitations } = data);

  let currentNotifications: number;
  let showRefreshMsg = false;

  onMount(() => {
    const unsubscribe = notifications.subscribe((val) => {
      if (val === null) return;

      if (val > currentNotifications) {
        showRefreshMsg = true;
      }
      currentNotifications = val;
    });

    return unsubscribe;
  });
</script>

<main class="w-default my-10">
  {#if showRefreshMsg}
    <p class="text-center text-red-400 mb-10">
      You have new notifications. Refresh the page to see them!
    </p>
  {/if}
  <h1 class="text-xl text-primary font-bold mb-6">Notification Center</h1>
  <section class="mb-8">
    <h2 class="text-lg font-bold mb-2">
      Team Invitations ({teamInvitations?.length ?? 0})
    </h2>
    {#if teamInvitations && teamInvitations.length > 0}
      <ul class="grid gap-4">
        <li class="grid grid-cols-4 gap-4 text-sm font-bold">
          <span>Team name</span>
          <span>Organization</span>
          <span>Team role</span>
          <span>Accept / Decline</span>
        </li>
        {#each teamInvitations as inv}
          <li class="grid grid-cols-4 gap-4 items-center">
            <a href="/teams/{inv.details.teamName}">{inv.details.teamName}</a>
            <span>{inv.details.organization}</span>
            <span>{inv.details.role ?? 'n/a'}</span>
            <div class="flex gap-2">
              <form method="POST">
                <input type="hidden" name="invitationId" value={inv.id} />
                <button
                  formaction="?/accept"
                  class="bg-neutral-800 hover:bg-primary focus-within:bg-primary transition-colors p-2 rounded"
                  ><svg
                    class="w-4 h-4 fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    ><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
                      d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                    /></svg
                  ></button
                >
                <button
                  formaction="?/decline"
                  class="bg-neutral-800 hover:bg-primary focus-within:bg-primary transition-colors p-2 rounded"
                  ><svg
                    class="w-4 h-4 fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    ><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
                      d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                    /></svg
                  ></button
                >
              </form>
            </div>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-sm text-neutral-400">No invitations</p>
    {/if}
  </section>
  <section class="mb-8">
    <h2 class="text-lg font-bold mb-2">
      Lobby Invitations ({lobbyInvitations?.length ?? 0})
    </h2>
    {#if lobbyInvitations && lobbyInvitations.length > 0}
      <ul class="grid gap-4">
        <li class="grid grid-cols-4 gap-4 text-sm font-bold">
          <span>Team</span>
          <span>Lobby leader</span>
          <span></span>
          <span>Accept / Decline</span>
        </li>
        {#each lobbyInvitations as invitation}
          <li class="grid grid-cols-4 gap-4 items-center">
            <span>{invitation.details.team}</span>
            <span>{invitation.details.leader}</span>
            <span></span>
            <div>
              <form method="POST">
                <input
                  type="hidden"
                  name="invitationId"
                  value={invitation.id}
                />
                <button
                  formaction="?/acceptNotification"
                  class="bg-neutral-800 hover:bg-primary focus-within:bg-primary transition-colors p-2 rounded"
                  ><svg
                    class="w-4 h-4 fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    ><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
                      d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                    /></svg
                  ></button
                >
                <button
                  formaction="?/declineNotification"
                  class="bg-neutral-800 hover:bg-primary focus-within:bg-primary transition-colors p-2 rounded"
                  ><svg
                    class="w-4 h-4 fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    ><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
                      d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                    /></svg
                  ></button
                >
              </form>
            </div>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-sm text-neutral-400">No invitations</p>
    {/if}
  </section>
</main>
