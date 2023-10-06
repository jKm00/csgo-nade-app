<script lang="ts">
	import NadeSummary from '$lib/features/stratViewer/components/NadeSummary.svelte';
	import StratDetailsSkeleton from '$lib/features/stratViewer/skeletons/StratDetailsSkeleton.svelte';
	import MarkerMeaning from '$lib/features/stratSymbols/components/MarkerMeaning.svelte';
	import RadarViewer from '$lib/features/stratViewer/components/RadarViewer.svelte';
	import StartDetails from '$lib/features/stratViewer/components/StartDetails.svelte';
	import StratViewerHeader from '$lib/features/stratViewer/components/StratViewerHeader.svelte';
	import RadarSkeleton from '$lib/features/stratViewer/skeletons/RadarSkeleton.svelte';
	import StratViewerHeaderSkeleton from '$lib/features/stratViewer/skeletons/StratViewerHeaderSkeleton.svelte';
	import NadeColorMeaning from '$lib/features/stratSymbols/components/NadeColorMeaning.svelte';
	import NadeSummarySkeleton from '$lib/features/stratViewer/skeletons/NadeSummarySkeleton.svelte';
	import StratViewerNavigation from '$lib/features/stratViewer/components/StratViewerNavigation.svelte';
	import StratViewerNavigationSkeleton from '$lib/features/stratViewer/skeletons/StratViewerNavigationSkeleton.svelte';
	import { toast } from '$lib/components/feedback/toast/toastStore.js';

	export let form;
	export let data;
	$: ({ session, supabase } = data);

	$: if (form?.message) {
		toast.push({
			type: 'error',
			title: 'Error',
			desc: form.message,
		});
	}
</script>

<main class="grid gap-4 w-default mt-4">
	{#await data.lazy.strat}
		<StratViewerHeaderSkeleton />
	{:then strat}
		<StratViewerHeader map={strat?.map.name} thumbnail={strat?.map.thumbnail} />
	{/await}

	<div>
		{#await data.lazy.strat}
			<StratViewerNavigationSkeleton />
		{:then strat}
			<StratViewerNavigation
				{session}
				authorUuid={strat?.author.uuid}
				stratId={strat?.id}
				map={strat?.map.name}
			/>
		{/await}
	</div>
	<div class="wrapper gap-x-4 grid-cols-1 sm:grid-cols-2">
		{#await data.lazy.strat}
			<div class="marker-meaning">
				<MarkerMeaning />
			</div>
			<div class="radar">
				<RadarSkeleton />
			</div>
			<div class="nade-colors">
				<NadeColorMeaning />
			</div>
			<div class="details">
				<StratDetailsSkeleton />
			</div>
		{:then strat}
			{#if strat === null}
				<div
					class="grid gap-4 items-center content-center col-span-full mt-20 text-center"
				>
					<p class="text-red-400 text-3xl font-bold">404 not found</p>
					<p class="max-w-sm m-auto">
						This could be because the strat does not exists, or you do not have
						permission to view it
					</p>
					<a class="text-neutral-400 underline" href="/strats"
						>View other strats</a
					>
				</div>
			{:else}
				<div class="marker-meaning">
					<MarkerMeaning />
				</div>
				<div class="radar">
					<RadarViewer map={strat.map.name} {supabase} />
				</div>
				<div class="nade-colors">
					<NadeColorMeaning />
				</div>
				<div class="details">
					<StartDetails
						stratName={strat.name}
						description={strat.desc}
						authorUuid={strat.author.uuid}
						authorUsername={strat.author.username}
						createdAt={strat.createdAt}
						teamName={strat.teamName}
						side={strat.teamSide}
						position={strat.position}
						game={strat.game}
					/>
				</div>
			{/if}
		{/await}
	</div>
	{#await data.lazy.strat}
		<NadeSummarySkeleton />
	{:then strat}
		{#if strat}
			<NadeSummary nades={strat.nades} />
		{/if}
	{/await}
</main>

<style scoped>
	.wrapper {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-areas: 'marker-meaning' 'radar' 'nade-colors' 'details';
	}

	.marker-meaning {
		grid-area: marker-meaning;
	}

	.radar {
		grid-area: radar;
	}

	.nade-colors {
		grid-area: nade-colors;
	}

	.details {
		grid-area: details;
	}

	/* 600px is from tailwind config */
	@media (min-width: 600px) {
		.wrapper {
			grid-template-columns: repeat(2, 1fr);
			grid-template-areas: 'marker-meaning marker-meaning' 'radar details' 'nade-colors details';
		}
	}
</style>
