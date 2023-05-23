<script lang="ts">
	import Nade from '$lib/components/containers/Nade.svelte';

	export let data;

	$: ({ map } = data);

	const TMP_STRATS = [
		{
			id: 0,
			name: 'A smokes',
			author: 'jKm',
			playersRequired: 3,
			smokes: 3,
			flashes: 2,
			molotoves: 2,
			he: 0,
			decoys: 0,
		},
		{
			id: 1,
			name: 'B smokes',
			author: 'Andy',
			playersRequired: 2,
			smokes: 2,
			flashes: 4,
			molotoves: 2,
			he: 0,
			decoys: 0,
		},
		{
			id: 3,
			name: 'B split',
			author: 'Sebba',
			playersRequired: 4,
			smokes: 2,
			flashes: 5,
			molotoves: 0,
			he: 3,
			decoys: 0,
		},
		{
			id: 4,
			name: 'Around the world',
			author: 'jKm',
			playersRequired: 5,
			smokes: 0,
			flashes: 0,
			molotoves: 0,
			he: 0,
			decoys: 5,
		},
		{
			id: 0,
			name: 'Full mid control',
			author: 'Hans Nieman',
			playersRequired: 4,
			smokes: 2,
			flashes: 2,
			molotoves: 1,
			he: 3,
			decoys: 0,
		},
	];
</script>

<header
	class="grid items-center relative w-default overflow-hidden p-4 rounded mb-10"
>
	<img
		class="absolute"
		src="/assets/images/thumbnails/{map.toLocaleLowerCase()}_compressed.webp"
		alt="Nuke"
	/>
	<div class="absolute h-full w-full bg-neutral-950/40 z-10" />
	<h1 class="relative text-3xl font-bold text-center z-10">{map}</h1>
</header>

<div>
	<div class="flex justify-between mb-4">
		<h2 class="font-bold uppercase">Strats</h2>
		<a
			class="bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 rounded py-1 px-2"
			href="/strats?map={map}">Create new strat</a
		>
	</div>
	<div class="grid grid-cols-main-small gap-4">
		{#each TMP_STRATS as strat}
			<a class="bg-neutral-800 rounded shadow p-4" href="/strats/{strat.id}">
				<div class="grid">
					<h3 class="font-bold">{strat.name}</h3>
					<a
						class="text-sm text-neutral-500 underline"
						href="/users/{strat.author}">{strat.author}</a
					>
				</div>
				<div class="flex flex-wrap">
					<Nade type="smoke" amount={strat.smokes} />
				</div>
			</a>
		{/each}
	</div>
</div>
