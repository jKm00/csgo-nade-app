<script lang="ts">
	export let map: string;
	export let stratId: string;
	export let stratName: string;
	export let authorId: string;
	export let authorName: string;
	export let createdAt: string;
	export let teamSide: 'CT' | 'T';
	export let team: string | undefined;
	export let positionImage: string | undefined;
	export let positionName: string | undefined;
</script>

<a
	class="bg-neutral-800 rounded shadow overflow-hidden group"
	href="/maps/{map}/strats/{stratId}"
>
	{#if positionImage && positionName}
		<img
			class="aspect-[16/6] w-full object-cover"
			src="/assets/images/maps/{map.toLowerCase()}/{positionImage}"
			alt="Overview over {positionName}"
		/>
	{:else}
		<div
			class="grid text-center items-center content-center aspect-[16/6] bg-neutral-700 text-neutral-300"
		>
			<p class="font-bold">CSGO Strats</p>
			<p>No image to display</p>
		</div>
	{/if}
	<div class="grid p-4">
		<h2 class="text-2xl font-bold">{stratName}</h2>
		<p class="text-neutral-400">
			<a class="underline" href="/users/{authorId}">{authorName}</a>
			- {new Date(createdAt).toLocaleDateString()}
			{#if team !== null}
				- <a href="/teams/{team}">{team}</a>
			{/if}
		</p>
		<div class="flex gap-2 mt-6">
			{#if teamSide === 'CT'}
				<p
					class="bg-blue-400/10 border border-blue-400 text-blue-400 group-hover:bg-blue-400 group-hover:text-white group-focus-within:bg-blue-400 group-focus-within:text-white transition-colors rounded-full px-4"
				>
					{teamSide}
				</p>
			{:else}
				<p
					class="bg-red-400/10 border border-red-400 text-red-400 group-hover:bg-red-400 group-hover:text-white group-focus-within:bg-red-400 group-focus-within:text-white transition-colors rounded-full px-4"
				>
					{teamSide}
				</p>
			{/if}
			{#if positionName}
				<p
					class="bg-yellow-400/10 border border-yellow-400 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-white group-focus-within:bg-yellow-400 group-focus-within:text-white transition-colors rounded-full px-4"
				>
					{positionName}
				</p>
			{/if}
		</div>
	</div>
</a>
