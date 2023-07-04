<script lang="ts">
	import FormButton from '$lib/components/buttons/FormButton.svelte';
	import MainButton from '$lib/components/buttons/MainButton.svelte';
	import SecondaryButton from '$lib/components/buttons/SecondaryButton.svelte';
	import Dialog from '$lib/components/containers/Dialog.svelte';
	import NadeSummary from '$lib/components/containers/NadeSummary.svelte';
	import Tag from '$lib/components/containers/Tag.svelte';
	import StratSkeleton from '$lib/components/skeletons/StratSkeleton.svelte';
	import MarkerMeaning from '$lib/features/stratSymbols/components/MarkerMeaning.svelte';
	import AuthorNavigation from '$lib/features/stratViewer/components/AuthorNavigation.svelte';
	import BasicNavigation from '$lib/features/stratViewer/components/BasicNavigation.svelte';
	import RadarViewer from '$lib/features/stratViewer/components/RadarViewer.svelte';
	import StartDetails from '$lib/features/stratViewer/components/StartDetails.svelte';
	import RadarSkeleton from '$lib/features/stratViewer/skeletons/RadarSkeleton.svelte';
	import toast from 'svelte-french-toast';

	export let form;
	export let data;
	$: ({ session, supabase } = data);

	$: if (form?.message) {
		toast.error(form.message, {
			style: 'background: #333; color:#fff',
		});
	}
</script>

<div class="w-default">
	{#await data.lazy.strat}
		<BasicNavigation />
	{:then strat}
		{#if strat === null}
			<BasicNavigation />
		{:else}
			<AuthorNavigation
				{session}
				authorUuid={strat.author.uuid}
				stratId={strat.id}
			/>
		{/if}
	{/await}
	<main class="grid gap-4 grid-cols-2 w-default mt-4">
		{#await data.lazy.strat}
			<RadarSkeleton />
			<StratSkeleton />
		{:then strat}
			<!-- Map radar -->
			<div class="col-span-2">
				<MarkerMeaning />
			</div>
			{#if strat === null}
				<div class="grid place-items-center aspect-square rounded">
					<p class="text-neutral-400">Strat not available</p>
				</div>
			{:else}
				<RadarViewer map={strat.map.name} {supabase} />
			{/if}
			{#if strat === null}
				<div class="grid gap-4 items-center content-center text-center">
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
				<StartDetails
					stratName={strat.name}
					description={strat.desc}
					authorUuid={strat.author.uuid}
					authorUsername={strat.author.username}
					createdAt={strat.createdAt}
					teamName={strat.teamName}
					side={strat.teamSide}
					position={strat.position}
				/>
				<div class="col-span-2">
					<NadeSummary nades={strat.nades} />
				</div>
			{/if}
		{/await}
	</main>
</div>
