<script lang="ts">
	import type { Strat } from '@/types/Strat';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		change: { id: number };
		add: { toggle: boolean };
	}>();

	export let strats: Strat[];

	let activeStrat: number;

	const updateActiveStrat = (id: number) => {
		activeStrat = id;
	};

	$: dispatch('change', {
		id: activeStrat
	});
</script>

<div>
	<div class="header">
		<h2 class="title">Strats</h2>
		<p class="desc">Click on a strat to see lineups</p>
	</div>
	{#if strats.length === 0}
		<p class="error-msg">No strats available 😢</p>
	{:else}
		<ul class="list">
			{#each strats as strat (strat.id)}
				<li class="list__item">
					<button
						class={activeStrat === strat.id ? `card btn--custom card--active` : `card btn--custom`}
						on:click={() => updateActiveStrat(strat.id)}
					>
						{strat.name}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style scoped>
	.header {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		align-items: center;
		margin-bottom: 1rem;
	}

	.title {
		text-align: left;
	}

	.desc {
		grid-column: 1 / -1;
		font-size: 0.8rem;
		opacity: 0.8;
		text-align: left;
	}

	.error-msg {
		text-align: left;
	}

	.list__item:not(:last-child) {
		margin-bottom: 0.5rem;
	}

	.btn--custom {
		display: block;
		width: 100%;
		text-align: left;
		cursor: pointer;
		color: #fff;
	}

	.card--active {
		background-color: #fa5252;
		color: #fff;
	}

	.tip {
		text-align: left;
	}
</style>
