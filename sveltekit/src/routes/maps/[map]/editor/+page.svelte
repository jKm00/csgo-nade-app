<script lang="ts">
	import NadeEditor from '@/features/editor/components/NadeEditor.svelte';
	import StartEditor from '@/features/editor/components/StartEditor.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let showNadeEditor = true;
</script>

<header>
	<h1>{data.map.name}</h1>
	<nav class="nav">
		<button
			class={`nav__item`}
			data-active={showNadeEditor}
			on:click={() => (showNadeEditor = true)}>Create lineup</button
		>
		<button
			class="nav__item"
			data-active={!showNadeEditor}
			on:click={() => (showNadeEditor = false)}>Create strat</button
		>
	</nav>
</header>
<section>
	{#if showNadeEditor}
		<NadeEditor map={data.map} />
	{:else}
		<StartEditor map={data.map} />
	{/if}
</section>

<style scoped>
	.nav {
		display: flex;
		gap: 1rem;
	}

	.nav__item {
		font-size: 1rem;
		cursor: pointer;
		color: #fff;
	}

	.nav__item[data-active='true'] {
		font-weight: bold;
	}
</style>
