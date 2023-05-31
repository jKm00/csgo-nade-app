<script lang="ts">
	import type { Session } from '@supabase/supabase-js';
	import SecondaryButton from '../buttons/SecondaryButton.svelte';
	import MainButton from '../buttons/MainButton.svelte';

	export let teamMembers: any;
	export let teamId: number;
	export let session: Session;

	$: filteredMembers = teamMembers.filter(
		(m: any) => m.profiles.uuid !== session.user.id
	);

	let dialog: HTMLDialogElement;
	let selectedMember: any;

	const openDialog = (member: any) => {
		selectedMember = member;
		dialog.showModal();
	};

	const closeDialog = () => {
		dialog.close();
	};
</script>

<div class="grid">
	<h1 class="text-xl font-bold mb-4 px-4">Team members</h1>
	{#if filteredMembers && filteredMembers.length > 0}
		{#each filteredMembers as member, index}
			<div
				class="flex items-center justify-between px-4 py-2 {index % 2 === 0
					? 'bg-neutral-800'
					: ''}"
			>
				{member.profiles.username}
				<MainButton on:click={() => openDialog(member)}>Make leader</MainButton>
			</div>
		{/each}
	{:else}
		<p class="text-sm text-neutral-400">No other team members in the team...</p>
	{/if}
</div>

<dialog
	bind:this={dialog}
	class="bg-neutral-900 rounded text-white text-sm backdrop:bg-neutral-950/90"
>
	{#if selectedMember}
		<div>
			<h1 class="text-lg text-red-400 font-bold">Transfer leadership</h1>
			<p class="mb-10">
				Are you sure you want to make <span class="text-red-400"
					>{selectedMember.profiles.username}</span
				> the leader? This action will make you lose all leader privileges for this
				team!
			</p>
			<div class="flex gap-2 justify-end">
				<button on:click={closeDialog}>Cancel</button>
				<form action="?/transferLeader" method="POST">
					<input type="hidden" name="teamId" value={teamId} />
					<input
						type="hidden"
						name="playerId"
						value={selectedMember.profiles.id}
					/>
					<button
						type="submit"
						class="bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 py-1 px-4 rounded"
						>Make leader</button
					>
				</form>
			</div>
		</div>
	{/if}
</dialog>
