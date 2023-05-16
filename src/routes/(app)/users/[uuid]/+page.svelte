<script lang="ts">
	import Toast from '$lib/components/toasts/Toast.svelte';

	export let data;

	$: ({ profile, session } = data);

	const TMP_TEAMS = [
		{
			name: 'NIP',
			members: 8,
			role: 'AWPER',
		},
		{
			name: 'FAZE',
			members: 14,
			role: 'IN-GAME LEADER',
		},
	];

	$: console.log(data);
</script>

<div class="w-default px-4 mt-10">
	{#if session && !profile && session.user.id === data.uuid}
		<Toast uuid={session.user.id}>
			Your account page is not ready.
			<a class="underline" href="/users/{session.user.id}/settings">
				Go to account settings
			</a>
			to finish setting up your profile
		</Toast>
	{:else if !profile}
		<p>
			This user is not available. <a class="underline" href="/">Back to home</a>
		</p>
	{:else}
		<div class="grid gap-10">
			<header class="grid gap-2">
				<h1 class="text-3xl font-bold">{profile.name}</h1>
				<p class="text-neutral-400">@{profile.username}</p>
			</header>
			<main>
				<ul class="grid gap-2">
					<li class="grid grid-cols-3 gap-2 font-bold mb-4">
						<p>Team name:</p>
						<p>Number of members:</p>
						<p>Role:</p>
					</li>
					{#each TMP_TEAMS as team}
						<li class="grid grid-cols-3 gap-2">
							<a href="/teams/{team.name}">{team.name}</a>
							<p>{team.members}</p>
							<p>{team.role}</p>
						</li>
					{/each}
				</ul>
			</main>
		</div>
	{/if}
</div>
