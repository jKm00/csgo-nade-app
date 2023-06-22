<script lang="ts">
	import NadeColorMeaning from '$lib/components/feedback/NadeColorMeaning.svelte';
	import { NadeType, type Nade } from '../types/nade';
	import StratOverviewNadeThumbnail from './StratOverviewNadeThumbnail.svelte';

	export let name: string;
	export let desc: string;
	export let map: string;
	export let teamSide: string;
	export let position: string;
	export let privacy: string;
	export let team: string;
	export let nades: Nade[];
</script>

<div class="grid gap-4 grid-cols-6 mb-10">
	<h2 class="font-bold text-red-400 text-3xl col-span-6">General info:</h2>
	<div>
		<h3 class="text-sm font-bold">Name</h3>
		<p>{name}</p>
	</div>
	<div>
		<h3 class="text-sm font-bold">Map</h3>
		<p>{map}</p>
	</div>
	<div>
		<h3 class="text-sm font-bold">Team side</h3>
		<p>{teamSide}</p>
	</div>
	<div>
		<h3 class="text-sm font-bold">Strat Position</h3>
		<p>{position}</p>
	</div>
	<div>
		<h3 class="text-sm font-bold">Privacy</h3>
		<p>{privacy}</p>
	</div>
	<div>
		<h3 class="text-sm font-bold">Team</h3>
		<p>{team === '' ? 'N/A' : team}</p>
	</div>
	<div class="col-span-6">
		<h3 class="text-sm font-bold">Description</h3>
		<p class="whitespace-pre-wrap">{desc}</p>
	</div>
</div>
<div>
	<h2 class="font-bold text-red-400 text-3xl mb-4">Nades:</h2>
	<!-- Table headers -->
	<div class="grid grid-cols-strat-overview-table gap-4 font-bold p-2">
		<p>Nr.</p>
		<p>Name of nade</p>
		<p>Lineup image</p>
		<p>Impact image</p>
		<p>Nade type</p>
	</div>
	{#each nades as nade, index}
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
		<div
			class="grid grid-cols-strat-overview-table items-center gap-4 p-2 {index %
				2 ===
			0
				? 'bg-neutral-800'
				: ''}"
		>
			<p>{index + 1}</p>
			<p>{nade.name}</p>
			<StratOverviewNadeThumbnail image={nade.lineupImg} />
			<StratOverviewNadeThumbnail image={nade.impactImg} />
			<p class="flex items-center justify-between gap-4">
				{nade.type}
				<span
					class="block w-4 aspect-square rounded"
					style="background-color: {color}"
				/>
			</p>
		</div>
	{/each}
	<div class="mt-4">
		<NadeColorMeaning />
	</div>
</div>
