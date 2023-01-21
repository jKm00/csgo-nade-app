<script lang="ts">
	import type { Strat } from '@/types/Strat';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ change: { id: number } }>();

	export let strats: Strat[];

	let activeStrat: number;

	const updateActiveStrat = (id: number) => {
		activeStrat = id;
	};

	$: dispatch('change', {
		id: activeStrat,
	});
</script>

<div>
	<h2 class="title">Strats</h2>
	<ul class="list">
		{#each strats as strat (strat.id)}
			<li class="list__item">
				<button
					class={activeStrat === strat.id ? `card btn btn--active` : `card btn`}
					on:click={() => updateActiveStrat(strat.id)}
				>
					{strat.name}
				</button>
			</li>
		{/each}
	</ul>
</div>

<style scoped>
	.title {
		margin-bottom: 1rem;
	}

	.list__item:not(:last-child) {
		margin-bottom: 0.5rem;
	}

	.btn {
		display: block;
		width: 100%;
		text-align: left;
		cursor: pointer;
	}

	.btn--active {
		background-color: #fa5252;
	}
</style>
