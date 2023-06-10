<script lang="ts">
	import MapSkeleton from '$lib/components/skeletons/MapSkeleton.svelte';

	export let data;
</script>

{#if false}
	<MapSkeleton />
{:else}
	<!-- {@const mapDetails = map.details
		? map.details[0]
		: { name: 'Unknow', thumbnail: 'unknown' }} -->
	<header
		class="grid items-center relative w-default overflow-hidden p-4 rounded my-10"
	>
		<img class="absolute" src="test" alt="test" />
		<div class="absolute h-full w-full bg-neutral-950/40 z-10" />
		<h1 class="relative text-3xl font-bold text-center z-10">test</h1>
	</header>

	<div>
		<!-- Header -->
		<div class="flex justify-between mb-4">
			<h2 class="font-bold uppercase">Strats</h2>
			<a
				class="bg-red-400 hover:bg-red-500 focus-within:bg-red-500 active:bg-red-600 rounded py-1 px-2"
				href="/strats">Create new strat</a
			>
		</div>
		<!-- Grid -->
		<div class="grid grid-cols-main-small gap-4 justify-items-start">
			<!-- Dummy card -->
			<div class="bg-neutral-800 rounded p-4">
				<div>
					<h3 class="text-xl font-bold">A smokes</h3>
					<p class="text-neutral-400">Created At: <span>12/02/2023</span></p>
				</div>
			</div>
		</div>
	</div>
{/if}
