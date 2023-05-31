<script lang="ts">
	import FormButton from '$lib/components/buttons/FormButton.svelte';
	import SecondaryButton from '$lib/components/buttons/SecondaryButton.svelte';
	import Drawer from '$lib/components/containers/Drawer.svelte';
	import InvitePlayerForm from '$lib/components/forms/InvitePlayerForm.svelte';
	import TransferLeaderForm from '$lib/components/forms/TransferLeaderForm.svelte';
	import toast from 'svelte-french-toast';

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
		dialog.showModal();
	};

	/**
	 * Closes the dialog
	 */
	const closeDialog = () => {
		dialog.close();
	};

	/**
	 * Takes in either an array of profiles or a single profile and converts it to a single profile
	 * @param profile to convert
	 */
	const getProfile = (
		profile:
			| { uuid: string; username: string; email?: string }
			| { uuid: string; username: string; email?: string }[]
	) => {
		if (profile instanceof Array) {
			return profile[0];
		}
		return profile;
	};

	const disableFeature = false;
</script>

<main class="grid gap-4 w-default my-10">
	{#if team}
		<!-- general team info -->
		<div class="flex justify-between items-center">
			<h1 class="text-xl text-red-400 font-bold">
				{team.name}
			</h1>
			{#if isTeamLeader}
				<!-- show team leader options -->
				<div class="flex items-center gap-2">
					<SecondaryButton on:click={() => (showTransfer = true)}
						><svg
							class="w-4 fill-white"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
							><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
								d="M32 96l320 0V32c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l96 96c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-96 96c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160L32 160c-17.7 0-32-14.3-32-32s14.3-32 32-32zM480 352c17.7 0 32 14.3 32 32s-14.3 32-32 32H160v64c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-96-96c-6-6-9.4-14.1-9.4-22.6s3.4-16.6 9.4-22.6l96-96c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 64H480z"
							/></svg
						>Transfer leader</SecondaryButton
					>
					<SecondaryButton on:click={() => (showInvite = true)}
						><svg
							class="w-4 fill-white"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 640 512"
							><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
								d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
							/></svg
						>Invite player</SecondaryButton
					>
					{#if disableFeature}
						<form action="" method="POST">
							<FormButton
								><svg
									class="w-4 fill-white"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512"
									><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
										d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
									/></svg
								>Delete team</FormButton
							>
						</form>
					{/if}
				</div>
			{:else if membersIds?.includes(userId)}
				<!-- team member options -->
				<form action="?/leaveTeam" method="POST">
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
				<a href="/users/{team.profiles ? getProfile(team.profiles).uuid : ''}">
					{team.profiles ? getProfile(team.profiles).username : 'n/a'}
				</a>
			</div>
		</div>
		<!-- team members -->
		<h2 class="text-lg font-bold mb-2">Members</h2>
		<div class="flex flex-wrap gap-4">
			{#if teamMembers !== null}
				{#each teamMembers as member}
					<a
						href="/users/{member.profiles
							? getProfile(member.profiles).uuid
							: ''}"
					>
						<div class="grid gap-4 bg-neutral-800 h-full rounded shadow p-4">
							<div>
								<h3 class="font-bold">
									{member.profiles ? getProfile(member.profiles).username : ''}
								</h3>
								<p class="text-sm text-neutral-400">
									{member.profiles ? getProfile(member.profiles).email : ''}
								</p>
							</div>
							<div>
								<p class="flex gap-10 justify-between text-sm">
									<span class="font-bold">Role:</span>{member.role ?? 'n/a'}
								</p>
								<p class="flex gap-10 justify-between text-sm">
									<span class="font-bold">Joined At:</span>{new Date(
										member.inserted_at
									).toDateString()}
								</p>
							</div>
							{#if isTeamLeader && (member.profiles ? getProfile(member.profiles).uuid !== userId : true)}
								<button
									on:click|preventDefault={() => handleKick(member)}
									class="text-sm text-red-400 hover:underline focus-within:underline"
									>Kick from team</button
								>
							{/if}
						</div>
					</a>
				{/each}
			{/if}
		</div>
		<!-- Confirm kick dialog -->
		<dialog
			bind:this={dialog}
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
{#if team && isTeamLeader && session !== null}
	<!-- Transfer team leader drawer -->
	<Drawer bind:show={showTransfer}>
		<TransferLeaderForm {teamMembers} teamId={team.id} {session} />
	</Drawer>
	<!-- Invite player drawer -->
	<Drawer bind:show={showInvite}>
		<InvitePlayerForm data={data.form} teamId={team.id} />
	</Drawer>
{/if}
