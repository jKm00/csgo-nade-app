<script lang="ts">
	import Tag from '$lib/components/containers/Tag.svelte';

	export let thumbnail: string;
	export let stratId: number;
	export let stratName: string;
	export let team: string;
	export let authorId: string;
	export let authorName: string;
	export let createdAt: string;
	export let side: string;
	export let position: string;
</script>

<a
	class="bg-neutral-800 rounded shadow overflow-hidden group"
	href="/strats/{stratId}"
>
	{#if thumbnail}
		<img
			class="aspect-[16/6] w-full object-cover bg-neutral-700"
			src="/assets/images/{thumbnail}"
			alt="Overview over {position}"
		/>
	{:else}
		<div
			class="grid text-center items-center content-center aspect-[16/6] bg-neutral-700 text-neutral-300"
		>
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
			{#if side === 'CT'}
				<Tag color="blue">{side}</Tag>
			{:else}
				<Tag color="red">{side}</Tag>
			{/if}
			{#if position}
				<Tag color="purple">{position}</Tag>
			{/if}
		</div>
	</div>
</a>
