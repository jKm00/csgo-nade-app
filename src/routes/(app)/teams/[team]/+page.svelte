<script lang="ts">
	import FormButton from '$lib/components/buttons/FormButton.svelte';
	import ErrorMessage from '$lib/components/feedback/ErrorMessage.svelte';
	import InvitePlayerForm from '$lib/components/forms/InvitePlayerForm.svelte';
	import Dropdown from '$lib/components/inputs/Dropdown.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import { TEAM_ROLES } from '$lib/shared/teamRoles.js';
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	export let form;

	$: ({ team, teamMembers, session } = data);

	$: if (form?.message) {
		toast.error(form.message, {
			style: 'background: #333; color:#fff',
		});
	}

	$: if (form?.success) {
		toast.success(form.success, {
			style: 'background: #333; color:#fff',
		});
	}

	$: userId = session?.user.id;
	$: membersIds = teamMembers?.map((m) => {
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

	let dialog: HTMLDialogElement;
	let memberToKick: { id: string; name: string } | null = null;

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
		dialog.showModal();
	};

	/**
	 * Closes the dialog
	 */
	const closeDialog = () => {
		dialog.close();
	};
</script>

<main class="grid gap-4 w-default my-10">
	{#if team}
		<div class="flex justify-between items-center">
			<h1 class="text-xl text-red-400 font-bold">
				{team.name}
			</h1>
			<!-- Show leave button is user is in team -->
			{#if membersIds?.includes(userId)}
				<form action="?/leaveTeam" method="POST">
					<input type="hidden" />
					<input type="hidden" name="teamId" value={team.id} />
					<button
						class="flex gap-2 items-center bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 py-1 px-2 rounded"
						>Leave team<svg
							class="w-4 fill-white"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
							><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
								d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
							/></svg
						></button
					>
				</form>
			{/if}
		</div>
		<div class="flex gap-10 bg-neutral-800 rounded shadow p-4 text-sm mb-6">
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
				<a
					href="/users/{team.profiles && team.profiles instanceof Array
						? team.profiles[0].uuid
						: team.profiles?.uuid}"
				>
					{team.profiles && team.profiles instanceof Array
						? team.profiles[0].username
						: team.profiles?.username}
				</a>
			</div>
		</div>
		<!-- Show invite form if user is team leader -->
		{#if isTeamLeader}
			<InvitePlayerForm data={data.form} teamId={team.id} />
		{/if}
		<h2 class="text-lg font-bold mb-2">Members</h2>
		<div class="flex gap-4">
			{#if teamMembers !== null}
				{#each teamMembers as member}
					<a
						href="/users/{member.profiles && member.profiles instanceof Array
							? member.profiles[0].uuid
							: member.profiles?.uuid}"
					>
						<div class="grid bg-neutral-800 rounded shadow p-4">
							<h3 class="font-bold">
								{member.profiles && member.profiles instanceof Array
									? member.profiles[0].username
									: member.profiles?.username}
							</h3>
							<p class="text-sm text-neutral-400 mb-4">
								{member.profiles && member.profiles instanceof Array
									? member.profiles[0].email
									: member.profiles?.email}
							</p>
							<p class="flex gap-10 justify-between text-sm">
								<span class="font-bold">Role:</span>{member.role ?? 'n/a'}
							</p>
							<p class="flex gap-10 justify-between text-sm">
								<span class="font-bold">Joined At:</span>{new Date(
									member.inserted_at
								).toDateString()}
							</p>
							{#if isTeamLeader}
								<button
									on:click|preventDefault={() => handleKick(member)}
									class="text-sm text-red-400 mt-6 hover:underline focus-within:underline"
									>Kick from team</button
								>
							{/if}
						</div>
					</a>
				{/each}
			{/if}
		</div>
		<dialog
			bind:this={dialog}
			class="bg-neutral-800 rounded text-white text-sm backdrop:bg-neutral-950/90"
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
						<button on:click={closeDialog}>Cancel</button>
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
	{:else}
		<p class="text-sm text-neutral-400 text-center">
			Team not available. <a class="underline" href="/">Go back to home page</a>
		</p>
	{/if}
</main>
