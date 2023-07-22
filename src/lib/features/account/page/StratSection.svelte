<script lang="ts">
	import Tag from '$lib/components/containers/Tag.svelte';

	interface Strat {
		id: number;
		name: string;
		authorUsername: string;
		thumbnail: string | undefined;
		createdAt: Date;
		side: string;
		position: string | undefined;
		map: string;
	}

	export let strats: Strat[];
	export let username: string;
</script>

<section>
	<h2 class="font-bold text-xl mb-4">Strats ({strats.length})</h2>
	{#if strats.length > 0}
		<div class="grid gap-4">
			<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{#each strats as strat}
					<a
						href={`/strats/${strat.id}`}
						class="group bg-neutral-800 rounded overflow-hidden shadow"
					>
						{#if strat.thumbnail}
							<img
								src={`/assets/images${strat.thumbnail}`}
								alt={strat.map}
								class="w-full object-cover h-40"
							/>
						{:else}
							<div class="grid place-items-center h-40">
								<p class="text-neutral-400 text-sm">Image not available</p>
							</div>
						{/if}
						<div class="p-4">
							<h3 class="font-bold">{strat.name}</h3>
							<p class="text-neutral-400 text-sm">
								@{strat.authorUsername} - {strat.createdAt.toLocaleDateString()}
							</p>
							<div class="flex gap-2 mt-6">
								<Tag color={strat.side === 'T' ? 'red' : 'blue'}
									>{strat.side}</Tag
								>
								{#if strat.position}
									<Tag color="purple">{strat.position}</Tag>
								{/if}
							</div>
						</div>
					</a>
				{/each}
			</div>
			<a
				href={`/strats?author=${username}`}
				class="text-center hover:underline focus-within:underline">View all</a
			>
		</div>
	{:else}
		<p class="text-neutral-400 text-sm">This user currently has no starts...</p>
	{/if}
</section>
