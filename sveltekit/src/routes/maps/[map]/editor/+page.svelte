<script lang="ts">
	import NadeEditor from '@/features/editor/components/NadeEditor.svelte';
	import StartEditor from '@/features/editor/components/StartEditor.svelte';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import userToken from '@/stores/userToken';
	import { goto } from '$app/navigation';
	import Header from '@/layouts/Header.svelte';

	export let data: PageData;

	let showNadeEditor = true;

	let accessToken: string;
	userToken.subscribe((value) => {
		accessToken = value.access_token;
	});

	onMount(() => {
		if (accessToken === '') {
			goto(`/login?path=maps/${data.map.name.toLocaleLowerCase()}/editor`);
		}
	});
</script>

<Header title={data.map.name} backText={'Home'} backUrl={'/'} />
<nav class="nav">
	<button class={`nav__item`} data-active={showNadeEditor} on:click={() => (showNadeEditor = true)}
		>Create lineup</button
	>
	<button class="nav__item" data-active={!showNadeEditor} on:click={() => (showNadeEditor = false)}
		>Create strat</button
	>
</nav>
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
