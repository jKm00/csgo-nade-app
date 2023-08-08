<script lang="ts">
	import FormButton from '$lib/components/buttons/FormButton.svelte';
	import MainButton from '$lib/components/buttons/MainButton.svelte';
	import SecondaryButton from '$lib/components/buttons/SecondaryButton.svelte';
	import Drawer from '$lib/components/containers/Drawer.svelte';
	import { toast } from '$lib/components/feedback/toast/toastStore.js';
	import InvitePlayerForm from '$lib/components/forms/InvitePlayerForm.svelte';
	import TransferLeaderForm from '$lib/components/forms/TransferLeaderForm.svelte';
	import StratSlider from '$lib/features/stratListing/components/StratSlider.svelte';

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
			<h1 class="text-2xl text-red-400 font-bold">
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
					<MainButton on:click={() => deleteTeamDialog.showModal()}
						>Delete team</MainButton
					>
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
				<div class="max-md:hidden grid grid-cols-4 p-2 text-neutral-400">
					<p>Username</p>
					<p>Role</p>
					<p>Joined at</p>
				</div>
				<div class="grid sm:grid-cols-2 md:grid-cols-1 max-md:gap-4">
					{#each team.members as member, index}
						<a
							href={`/users/${getProfile(member.profiles)?.uuid}`}
							class="p-2 rounded shadow max-md:block max-md:bg-neutral-800 max-md:hover:scale-[1.02] max-md:transition-transform md:grid md:grid-cols-4 {index %
								2 ===
							0
								? 'md:bg-neutral-800'
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
										class="text-sm text-red-400 hover:underline focus-within:underline w-full"
										>Kick from team</button
									>
								{/if}
								<a
									class="max-md:hidden flex items-center gap-2 justify-end w-full"
									href={`/teams/${team.name}`}
									>View profile<svg
										xmlns="http://www.w3.org/2000/svg"
										height="1em"
										viewBox="0 0 256 512"
										><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
											d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
										/></svg
									></a
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
		<h1 class="font-bold text-red-400" slot="title">Transfer leader</h1>
		<TransferLeaderForm
			slot="body"
			teamMembers={team.members}
			teamId={team.id}
			{session}
		/>
	</Drawer>
	<!-- Invite player drawer -->
	<Drawer bind:show={showInvite}>
		<h1 class="font-bold text-red-400" slot="title">Invite player</h1>
		<InvitePlayerForm slot="body" data={data.form} teamId={team.id} />
	</Drawer>
{/if}
