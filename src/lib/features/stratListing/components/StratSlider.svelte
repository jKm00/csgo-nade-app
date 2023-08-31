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
		team: string | undefined;
	}

	export let totalNumberOfStrats: number;
	export let strats: Strat[];
	export let redirect: 'user' | 'team';

	const redirectLink =
		redirect === 'user'
			? `/strats?author=${strats[0]?.authorUsername}`
			: `/strats?teamName=${strats[0]?.team}`;
</script>

<section>
	<h2 class="font-bold text-xl mb-4">Strats ({totalNumberOfStrats})</h2>
	{#if strats.length > 0}
		<div class="grid gap-4">
			<div
				class="carousel gap-4 max-sm:flex max-sm:flex-col max-md:grid max-md:grid-cols-2"
			>
				{#each strats as strat}
					<a
						href={`/strats/${strat.id}`}
						class="carousel-item group bg-neutral-800 rounded shadow snap-start"
					>
						{#if strat.thumbnail}
							<img
								src={`/assets/images${strat.thumbnail}`}
								alt={strat.map}
								class="w-full object-cover aspect-[16/8]"
							/>
						{:else}
							<div class="grid place-items-center aspect-[16/8] bg-neutral-700">
								<p class="text-neutral-400 text-sm">Image not available</p>
							</div>
						{/if}
						<div class="p-4">
							<h3 class="font-bold">{strat.name}</h3>
							<p class="text-neutral-400 text-sm">
								<span>@{strat.authorUsername} - </span>
								{#if strat.team}
									<span
										><a
											href={`/teams/${strat.team}`}
											class="hover:underline focus-within:underline"
											>{strat.team}</a
										> -
									</span>
								{/if}
								{strat.createdAt.toLocaleDateString()}
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
				{#if totalNumberOfStrats > 6}
					<a
						href={redirectLink}
						class="max-md:hidden grid place-items-center bg-neutral-800 rounded"
					>
						<div class="grid place-items-center gap-4 p-4 w-72">
							View more<svg
								xmlns="http://www.w3.org/2000/svg"
								height="1em"
								viewBox="0 0 448 512"
								><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
									d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
								/></svg
							>
						</div>
					</a>
				{/if}
			</div>
			<a
				href={redirectLink}
				class="text-center hover:underline focus-within:underline">View all</a
			>
		</div>
	{:else}
		<p class="text-neutral-400 text-sm">This user currently has no starts...</p>
	{/if}
</section>

<style scoped>
	@media not all and (max-width: 900px) {
		.carousel {
			display: flex;
			overflow-x: auto;
			scroll-snap-type: x proximity;
		}

		.carousel-item {
			flex-shrink: 0;
			flex-basis: 28%;
			scroll-snap-align: start;
		}
	}
</style>
