<script lang="ts">
	import MapView from '@/components/MapView.svelte';
	import type { CsgoMap } from '@/types/CsgoMap';
	import type { Lineup } from '@/types/Lineup';
	import { Nade } from '@/types/Nade';

	enum markerType {
		THROW,
		LAND
	}

	export let map: CsgoMap;

	let strat = {
		id: 0,
		name: '',
		lineups: [
			{
				id: 0,
				name: '',
				desc: '',
				nade: Nade.SMOKE,
				throwCoordinateX: 0,
				throwCoordinateY: 0,
				landCoordinateX: 0,
				landCoordinateY: 0,
				videoPath: ''
			}
		]
	};

	let selectedlineupIndex = 0;

	let marker: markerType | undefined;

	let radarWidth: number;
	let radarHeight: number;

	const setMarker = (event: MouseEvent) => {
		let x = Math.round(((100 * event.offsetX) / radarWidth) * 100) / 100;
		let y = Math.round(((100 * event.offsetY) / radarHeight) * 100) / 100;
		if (marker === markerType.THROW) {
			strat.lineups[selectedlineupIndex].throwCoordinateX = x;
			strat.lineups[selectedlineupIndex].throwCoordinateY = y;
		}
		if (marker === markerType.LAND) {
			strat.lineups[selectedlineupIndex].landCoordinateX = x;
			strat.lineups[selectedlineupIndex].landCoordinateY = y;
		}
		marker = undefined;
	};

	const addLineup = () => {
		// TODO: error handling
		strat.lineups = [
			...strat.lineups,
			{
				id: 0,
				name: '',
				desc: '',
				nade: Nade.SMOKE,
				throwCoordinateX: 0,
				throwCoordinateY: 0,
				landCoordinateX: 0,
				landCoordinateY: 0,
				videoPath: ''
			}
		];
		selectedlineupIndex++;
	};

	const removeLineup = (index: number) => {
		if (strat.lineups.length === 1) return;

		let tmp = strat.lineups;
		tmp.splice(index, 1);
		strat.lineups = tmp;
	};
</script>

<div class="grid-2-col">
	<section bind:clientWidth={radarWidth} bind:clientHeight={radarHeight} on:mousedown={setMarker}>
		<MapView {map} lineups={strat.lineups} enableModal={false} />
	</section>
	<section>
		<form class="form">
			<div class="form__section">
				<label for="stratName" class="form__label">Name of strat</label>
				<input class="form__input" type="text" id="stratName" bind:value={strat.name} />
			</div>
			<div class="form__section">
				<label for="lineupName" class="form__label">Lineup name</label>
				<input
					class="form__input"
					type="text"
					id="lineupName"
					bind:value={strat.lineups[selectedlineupIndex].name}
				/>
			</div>
			<div class="form__section">
				<label for="lineupDesc" class="form__label">Lineup desc</label>
				<textarea
					class="form__input"
					id="lineupDesc"
					rows="5"
					bind:value={strat.lineups[selectedlineupIndex].desc}
				/>
			</div>
			<div class="form__btn-row">
				<button
					type="button"
					class="form__btn"
					data-active={strat.lineups[selectedlineupIndex].nade === Nade.SMOKE ? true : false}
					on:click={() => (strat.lineups[selectedlineupIndex].nade = Nade.SMOKE)}>Smoke</button
				>
				<button
					type="button"
					class="form__btn"
					data-active={strat.lineups[selectedlineupIndex].nade === Nade.FLASH ? true : false}
					on:click={() => (strat.lineups[selectedlineupIndex].nade = Nade.FLASH)}>Flash</button
				>
				<button
					type="button"
					class="form__btn"
					data-active={strat.lineups[selectedlineupIndex].nade === Nade.MOLOTOV ? true : false}
					on:click={() => (strat.lineups[selectedlineupIndex].nade = Nade.MOLOTOV)}>Molotov</button
				>
				<button
					type="button"
					class="form__btn"
					data-active={strat.lineups[selectedlineupIndex].nade === Nade.HE ? true : false}
					on:click={() => (strat.lineups[selectedlineupIndex].nade = Nade.HE)}>He</button
				>
			</div>
			<div class="form__section">
				<p class="form__label">Throw marker</p>
				<div class="grid-3-col">
					<input
						type="number"
						step=".01"
						bind:value={strat.lineups[selectedlineupIndex].throwCoordinateX}
					/>
					<input
						type="number"
						step=".01"
						bind:value={strat.lineups[selectedlineupIndex].throwCoordinateY}
					/>
					<button
						type="button"
						class="btn"
						data-active={marker === markerType.THROW}
						on:click={() => (marker = markerType.THROW)}>Set</button
					>
				</div>
			</div>
			<div class="form__section">
				<p class="form__label">Land marker</p>
				<div class="grid-3-col">
					<input
						type="number"
						step=".01"
						bind:value={strat.lineups[selectedlineupIndex].landCoordinateX}
					/>
					<input
						type="number"
						step=".01"
						bind:value={strat.lineups[selectedlineupIndex].landCoordinateY}
					/>
					<button
						type="button"
						class="btn"
						data-active={marker === markerType.LAND}
						on:click={() => (marker = markerType.LAND)}>Set</button
					>
				</div>
			</div>
			<div class="form__section">
				<label for="videoPath" class="form__label">Lineup video URL</label>
				<input
					class="form__input"
					type="text"
					id="videoPath"
					bind:value={strat.lineups[selectedlineupIndex].videoPath}
				/>
			</div>
			<button type="button" class="btn btn--inverted btn--large" on:click={addLineup}
				>Add lineup</button
			>
			<ul class="lineups-list">
				{#each strat.lineups as lineup, index}
					<li class="lineups-item">
						<button type="button" class="card"
							>{lineup.name.length === 0 ? '...' : lineup.name}</button
						><button type="button" class="card" on:click={() => removeLineup(index)}>x</button>
					</li>
				{/each}
			</ul>
		</form>
	</section>
</div>

<style scoped>
	.grid-3-col {
		display: grid;
		grid-template-columns: 1fr 1fr 3rem;
		gap: 0.5rem;
	}

	.grid-3-col input {
		width: 100%;
	}

	.lineups-list {
		display: grid;
		gap: inherit;
	}

	.lineups-item {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1rem;
	}
</style>
