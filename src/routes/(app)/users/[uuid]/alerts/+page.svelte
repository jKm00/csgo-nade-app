<script lang="ts">
	import Dropdown from '$lib/components/inputs/Dropdown.svelte';
	import type { RealtimeChannel } from '@supabase/supabase-js';
	import { onDestroy, onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	export let form;

	$: if (form?.error) {
		toast.error(form.error, {
			style: 'background: #333; color:#fff',
		});
	}

	$: if (form?.success) {
		toast.success(form.success, {
			style: 'background: #333; color:#fff',
		});
	}

	$: ({ invitations, supabase, authUser } = data);

	$: playerId = authUser === null ? '-1' : authUser.id;

	let showRefreshMsg = false;

	let invitationSubscription: RealtimeChannel;
	onMount(() => {
		invitationSubscription = supabase
			.channel('table_db_changes')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'team_invitations',
					filter: `player_id=eq.${playerId}`,
				},
				() => {
					showRefreshMsg = true;
				}
			)
			.subscribe();
	});

	onDestroy(() => {
		if (invitationSubscription) {
			invitationSubscription.unsubscribe();
		}
	});
</script>

<main class="w-default my-10">
	{#if showRefreshMsg}
		<p class="text-sm text-center text-neutral-400 mb-10">
			Refresh page to see newest changes!
		</p>
	{/if}
	<h1 class="text-xl text-red-400 font-bold mb-6">Notification Center</h1>
	<h2 class="text-lg font-bold mb-2">Invitations ({invitations?.length})</h2>
	{#if invitations && invitations.length > 0}
		<ul class="grid gap-4">
			<li class="grid grid-cols-5 gap-4 text-sm font-bold">
				<span>Team name</span>
				<span>Organization</span>
				<span>Team role</span>
				<span>Accept / Decline</span>
			</li>
			{#each invitations as inv}
				<li class="grid grid-cols-5 gap-4 items-center">
					<a
						href="/teams/{inv.teams && inv.teams instanceof Array
							? inv.teams[0].name.toLowerCase()
							: inv.teams?.name.toLowerCase()}"
						>{inv.teams && inv.teams instanceof Array
							? inv.teams[0].name
							: inv.teams?.name}</a
					>
					<span
						>{inv.teams && inv.teams instanceof Array
							? inv.teams[0].organization
							: inv.teams?.organization}</span
					>
					<span>{inv.team_role ?? 'n/a'}</span>
					<div class="flex gap-2">
						<form method="POST">
							<input type="hidden" name="invitationId" value={inv.id} />
							<button
								formaction="?/accept"
								class="bg-neutral-800 hover:bg-red-400 focus-within:bg-red-400 transition-colors p-2 rounded"
								><svg
									class="w-4 fill-white"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512"
									><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
										d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
									/></svg
								></button
							>
							<button
								formaction="?/decline"
								class="bg-neutral-800 hover:bg-red-400 focus-within:bg-red-400 transition-colors p-2 rounded"
								><svg
									class="w-4 fill-white"
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
</main>