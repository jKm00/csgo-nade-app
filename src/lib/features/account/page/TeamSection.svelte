<script lang="ts">
	interface Team {
		name: string;
		org: string;
		role: string;
		joinedAt: Date;
	}

	export let teams: Team[];
</script>

<section>
	<h2 class="font-bold text-xl mb-4">Teams ({teams.length})</h2>
	{#if teams.length > 0}
		<div class="max-md:hidden grid grid-cols-5 p-2 text-neutral-400">
			<p>Name</p>
			<p>Organization</p>
			<p>Role</p>
			<p>Joined at</p>
		</div>
		<div class="grid sm:grid-cols-2 md:grid-cols-1 max-md:gap-4">
			{#each teams as team, index}
				<a
					href={`/teams/${team.name}`}
					class="p-2 rounded shadow max-md:block max-md:bg-neutral-800 max-md:hover:scale-[1.02] max-md:transition-transform md:grid md:grid-cols-5 {index %
						2 ===
					0
						? 'md:bg-neutral-800'
						: ''}"
				>
					<p class="flex justify-between">
						<span class="md:hidden text-neutral-400">Name:</span>{team.name}
					</p>
					<p class="flex justify-between">
						<span class="md:hidden text-neutral-400">Organization:</span
						>{team.org}
					</p>
					<p class="flex justify-between">
						<span class="md:hidden text-neutral-400">Role:</span>{team.role}
					</p>
					<p class="flex justify-between">
						<span class="md:hidden text-neutral-400">Joined at:</span
						>{team.joinedAt.toLocaleDateString()}
					</p>
					<a
						class="max-md:hidden flex items-center gap-2 justify-end"
						href={`/teams/${team.name}`}
						>View team<svg
							xmlns="http://www.w3.org/2000/svg"
							height="1em"
							viewBox="0 0 256 512"
							><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
								d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
							/></svg
						></a
					>
				</a>
			{/each}
		</div>
	{:else}
		<p class="text-neutral-400 text-sm">
			This user is currently not in any teams...
		</p>
	{/if}
</section>
