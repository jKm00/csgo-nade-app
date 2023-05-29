<script lang="ts">
	import MainLink from '$lib/components/buttons/MainLink.svelte';

	export let data;

	$: ({ profile, session, teams } = data);
</script>

<div class="w-default px-4 mt-4">
	{#if !profile}
		<p class="text-center">
			This user is not available. <a class="underline" href="/">Back to home</a>
		</p>
	{:else}
		<header class="flex gap-6 bg-neutral-800 rounded shadow p-5 mb-10">
			<img
				class="w-24 rounded-full border-4 border-red-400"
				src={`/assets/images/profile_pictures/${profile.profilePicture.filename}`}
				alt="{profile.name}'s profile picture"
			/>
			<div class="flex flex-col justify-center grow">
				<h1 class="text-3xl font-bold">{profile.name}</h1>
				<p class="text-sm text-neutral-400">@{profile.username}</p>
			</div>
		</header>
		<div class="flex items-start gap-4">
			<aside class="grid gap-4 w-40 sticky top-5">
				<div>
					<label class="text-sm text-neutral-400" for="joinedAt"
						>Joined At:</label
					>
					<p class="font-bold" id="joinedAt">
						{new Date(profile.insertedAt).toLocaleDateString()}
					</p>
				</div>
				<div>
					<label class="text-sm text-neutral-400" for="strats"
						>Strats created</label
					>
					<p class="font-bold" id="strats">0</p>
				</div>
				<div>
					<label class="text-sm text-neutral-400" for="teams">Teams</label>
					<p class="font-bold" id="teams">
						{teams?.length}
					</p>
				</div>
			</aside>
			<main class="grow">
				<div class="flex items-center justify-between mb-4">
					<h2 class="text-2xl font-bold">Teams</h2>
					<MainLink link="/teams">New team</MainLink>
				</div>
				<div class="flex flex-wrap gap-4">
					{#if teams}
						{#each teams as team}
							<a href="/teams/{team.team_name}">
								<div class="grid gap-4 bg-neutral-800 p-4 rounded shadow">
									<div class="flex items-start justify-between">
										<div>
											<h3 class="font-bold">{team.team_name}</h3>
											<p class="text-sm text-neutral-400">{team.org}</p>
										</div>
										<svg
											class="w-2 fill-white mt-2"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 320 512"
											><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
												d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
											/></svg
										>
									</div>
									<div class="grid grid-cols-2 text-sm">
										<label class="text-neutral-400" for="role">Role:</label>
										<p class="justify-self-end" id="role">{team.player_role}</p>
										<label class="text-neutral-400" for="numberOfPlayers"
											>Number of players:</label
										>
										<p class="justify-self-end" id="numberOfPlayers">
											{team.total_players}
										</p>
										<label class="text-neutral-400" for="joinedAt"
											>Joined at:</label
										>
										<p class="justify-self-end" id="joinedAt">
											{team.joined_at
												? new Date(team.joined_at).toLocaleDateString()
												: ''}
										</p>
									</div>
								</div>
							</a>
						{/each}
					{:else}
						<p class="text-sm text-neutral-400">
							{profile.username} is not in any team at the moment...
						</p>
					{/if}
				</div>
			</main>
		</div>
	{/if}
</div>
