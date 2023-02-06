<script lang="ts">
	import DropdownSearch from '@/components/inputs/DropdownSearch.svelte';
	import MapView from '@/components/MapView.svelte';
	import API from '@/services/Api';
	import type { CsgoMap } from '@/types/CsgoMap';
	import type { Lineup } from '@/types/Lineup';
	import { Nade } from '@/types/Nade';
	import { onMount } from 'svelte';

	export let map: CsgoMap;

	let strat = {
		name: '',
		lineups: [] as Lineup[]
	};

	let lineups: Lineup[] = [];
	onMount(async () => {
		lineups = await API.get(`/lineups/${map.name}`);
	});

	let nadeType = Nade.SMOKE;
	$: filteredLineups = lineups.filter((l) => l.nade === nadeType);

	const handleSelect = (event: CustomEvent<String>) => {
		const lineup = lineups.find((l) => l.name === event.detail);
		if (lineup !== undefined) {
			strat.lineups = [...strat.lineups, lineup];
		}
	};

	const removeLineup = (lineup: Lineup) => {
		strat.lineups = strat.lineups.filter((l) => l.id !== lineup.id);
	};

	const handleSumbit = () => {
		// TODO: implement...
		console.log('Submitting...');
	};
</script>

<div class="grid-2-col">
	<MapView {map} lineups={strat.lineups} enableEditor={true} />
	<section>
		<form class="form" on:submit|preventDefault={handleSumbit}>
			<div class="form__section">
				<label for="stratName" class="form__label">Strat name</label>
				<input class="form__input" type="text" id="stratName" bind:value={strat.name} />
			</div>
			<div class="form__btn-row">
				<button
					type="button"
					class="form__btn"
					data-active={nadeType === Nade.SMOKE ? true : false}
					on:click={() => (nadeType = Nade.SMOKE)}>Smoke</button
				>
				<button
					type="button"
					class="form__btn"
					data-active={nadeType === Nade.FLASH ? true : false}
					on:click={() => (nadeType = Nade.FLASH)}>Flash</button
				>
				<button
					type="button"
					class="form__btn"
					data-active={nadeType === Nade.MOLOTOV ? true : false}
					on:click={() => (nadeType = Nade.MOLOTOV)}>Molotov</button
				>
				<button
					type="button"
					class="form__btn"
					data-active={nadeType === Nade.HE ? true : false}
					on:click={() => (nadeType = Nade.HE)}>He</button
				>
			</div>
			<div class="form__section">
				<label for="" class="form__label">All lineups</label>
				<DropdownSearch
					data={filteredLineups.map((l) => {
						return l.name;
					})}
					on:select={handleSelect}
				/>
			</div>
			<ul class="lineup-list">
				{#each strat.lineups as lineup}
					<li class="lineup-list__item">
						<span class="card card--small">{lineup.name}</span><button
							on:click={() => removeLineup(lineup)}
							class="card card--small"
							type="button">x</button
						>
					</li>
				{/each}
			</ul>
		</form>
	</section>
</div>

<style scoped>
	.lineup-list {
		display: grid;
		gap: 1rem;
	}

	.lineup-list__item {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1rem;
		justify-content: space-between;
	}

	button {
		cursor: pointer;
	}

	button:hover,
	button:focus-visible {
		background-color: #1a1a1a;
	}

	button:active {
		background-color: #000000;
	}
</style>
