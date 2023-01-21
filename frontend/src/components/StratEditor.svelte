<script lang="ts">
	import type { CsgoMap } from '@/types/CsgoMap';
	import { createEventDispatcher } from 'svelte';
	import TextInput from '@/components/inputs/TextInput.svelte';

	const dispatch = createEventDispatcher<{
		cancel: {};
	}>();

	export let map: CsgoMap;

	let stratName: string;
	let stratDesc: string;
</script>

<!-- Header -->
<header class="header">
	<button class="back-navigation" on:click={() => dispatch('cancel')}
		>Cancel</button
	>
	<h1 class="title">Create strat</h1>
</header>
<!-- Main section -->
<section class="content">
	<div class="radar--wrapper">
		<img class="radar" src={map.radar} alt={`Map of ${map.name}`} />
	</div>
	<form class="controls">
		<TextInput
			id={'stratName'}
			on:change={(event) => (stratName = event.detail.value)}
			label={'Name'}
			placeholder={'Enter name...'}
		/>
		<TextInput
			id={'stratDesc'}
			on:change={(event) => (stratDesc = event.detail.value)}
			label={'Description'}
			placeholder={'Enter a description...'}
			area={true}
		/>
	</form>
</section>

<style scoped>
	.header {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
	}

	.back-navigation {
		cursor: pointer;
		justify-self: start;
	}

	.content {
		display: grid;
		grid-template-columns: 1fr 15rem;
		gap: 1rem;
	}

	.radar {
		width: 100%;
	}

	.controls {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
