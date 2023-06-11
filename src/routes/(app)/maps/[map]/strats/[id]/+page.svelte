<script lang="ts">
	import StratSkeleton from '$lib/components/skeletons/StratSkeleton.svelte';
	import { NadeType } from '$lib/features/stratEditor/util/nade.js';
	import { maps } from '$lib/shared/maps.js';
	import { lazy } from 'zod';

	export let data;

	$: ({ mapName } = data);
	$: radar = maps.find((map) => map.name === mapName)?.radar;
</script>

<main class="grid gap-4 grid-cols-2 w-default mt-10">
	<!-- Map radar -->
	<div class="relative aspect-square">
		<img class="absolute inset-0" src="/assets/images/radars/{radar}" alt="" />
		{#await data.lazy.strat then strat}
			{#if strat !== null}
				{#each strat.nades as nade, index}
					{@const color =
						nade.type === NadeType.SMOKE
							? 'rgb(248 113 113)'
							: nade.type === NadeType.FLASH
							? 'rgb(96 165 250)'
							: nade.type === NadeType.MOLOTOV
							? 'rgb(251 146 60)'
							: nade.type === NadeType.HE
							? 'rgb(74 222 128)'
							: nade.type === NadeType.DECOY
							? 'rgb(45 212 191)'
							: 'rgb(248 113 113)'}
					<!-- Lineup marker -->
					<button
						class="absolute grid place-items-center text-2xl -translate-x-1/2 -translate-y-1/2"
						style="left: {nade.lineupX}%; top: {nade.lineupY}%"
						><svg
							style="fill: {color}"
							xmlns="http://www.w3.org/2000/svg"
							height="1em"
							viewBox="0 0 384 512"
							><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
								d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
							/></svg
						><span class="absolute text-xs">{index + 1}</span></button
					>
					<!-- Impact marker -->
					<button
						class="absolute grid place-items-center text-xs w-5 aspect-square rounded-full -translate-x-1/2 -translate-y-1/2"
						style="background-color: {color}; left: {nade.impactX}%; top: {nade.impactY}%"
						>{index + 1}</button
					>
				{/each}
			{/if}
		{/await}
	</div>
	<!-- Strat info -->
	{#await data.lazy.strat}
		<StratSkeleton />
	{:then strat}
		{#if strat === null}
			<div class="grid gap-4 items-center content-center text-center">
				<p class="text-red-400 text-3xl font-bold">404 not found</p>
				<p class="max-w-sm m-auto">
					This could be because the strat does not exists, or you do not have
					permission to view it
				</p>
				<a class="text-neutral-400 underline" href="/maps/{mapName}"
					>View other strats</a
				>
			</div>
		{:else}
			<div>
				<header>
					<h2 class="text-3xl font-bold">{strat.name}</h2>
					<div class="flex gap-4 justify-between text-neutral-400 text-sm mb-6">
						<p>
							Author: <a class="underline" href="/users/{strat.authorUuid}"
								>{strat.authorName}</a
							>
						</p>
						<p>Created at: {new Date(strat.createAt).toLocaleDateString()}</p>
						{#if strat.teamName !== null}
							<p>
								Team: <a class="underline" href="/teams/{strat.teamName}"
									>{strat.teamName}</a
								>
							</p>
						{/if}
					</div>
				</header>
				<p class="whitespace-pre-wrap">{strat.desc}</p>
			</div>
		{/if}
	{/await}
</main>
