<script lang="ts">
	import type { Strat } from '@/types/Strat';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		change: { id: number };
		add: { toggle: boolean };
	}>();

	export let strats: Strat[];

	let activeStrat: number;
	let addToggler = false;

	const updateActiveStrat = (id: number) => {
		activeStrat = id;
	};

	$: dispatch('change', {
		id: activeStrat,
	});

	$: dispatch('add', {
		toggle: addToggler,
	});
</script>

<div>
	<div class="header">
		<h2 class="title">Strats</h2>
		<!-- TODO: on hold. Gonna manually add some strats for a beta version. Then come back and continue working on editor -->
		<!-- <button class="btn--create" on:click={() => (addToggler = !addToggler)}
			><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
				><path
					d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
				/></svg
			></button
		> -->
		<p class="desc">Click on a strat to see lineups</p>
	</div>
	{#if strats.length === 0}
		<p class="error-msg">No strats available 😢</p>
	{:else}
		<ul class="list">
			{#each strats as strat (strat.id)}
				<li class="list__item">
					<button
						class={activeStrat === strat.id
							? `card btn--custom card--active`
							: `card btn--custom`}
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

	/* TODO: On hold */
	/* .btn--create {
		justify-self: end;
	} */

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
	}

	.card--active {
		background-color: #fa5252;
		color: #fff;
	}

	.tip {
		text-align: left;
	}
</style>
