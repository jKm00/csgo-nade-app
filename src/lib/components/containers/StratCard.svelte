<script lang="ts">
	// TODO: Remove as a new is made in correct feature
	import Tag from './Tag.svelte';

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
				- <a class="underline" href="/teams/{team}">{team}</a>
			{/if}
		</p>
		<div class="flex gap-2 mt-6">
			{#if teamSide === 'CT'}
				<Tag color="blue">{teamSide}</Tag>
			{:else}
				<Tag color="red">{teamSide}</Tag>
			{/if}
			{#if positionName}
				<Tag color="purple">{positionName}</Tag>
			{/if}
		</div>
	</div>
</a>
