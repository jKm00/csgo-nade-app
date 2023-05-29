<script lang="ts">
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
				src="http://localhost:54321/storage/v1/object/public/profile_pictures/{profile.profile_picture}"
				alt="{profile.name}'s profile picture"
			/>
			<div class="flex items-center justify-between grow">
				<div>
					<h1 class="text-3xl font-bold">{profile.name}</h1>
					<p class="text-sm text-neutral-400">@{profile.username}</p>
				</div>
				<a
					class="flex gap-2 uppercase text-xs self-start"
					href="/users/{session?.user.id}/settings"
					>Settings <svg
						class="w-3 fill-white"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						><path
							d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
						/></svg
					></a
				>
			</div>
		</header>
		<div class="flex items-start gap-4">
			<aside class="grid gap-4 w-40 sticky top-5">
				<div>
					<label class="text-sm text-neutral-400" for="joinedAt"
						>Joined At:</label
					>
					<p class="font-bold" id="joinedAt">
						{new Date(profile.inserted_at).toLocaleDateString()}
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
				<h2 class="text-2xl font-bold mb-4">Teams</h2>
				<div class="flex">
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
