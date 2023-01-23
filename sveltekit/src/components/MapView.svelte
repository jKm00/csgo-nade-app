<script lang="ts">
	import type { CsgoMap } from '@/types/CsgoMap';
	import type { Lineup } from '@/types/Lineup';
	import type { Strat } from '@/types/Start';
	import VideoModal from './modals/VideoModal.svelte';

	export let map: CsgoMap;
	export let activeStrat: Strat | undefined;

	let showModal = false;
	let modalLineup: Lineup;

	const handleLineupClick = (lineup: Lineup) => {
		modalLineup = lineup;
		showModal = true;
	};
</script>

<div class="map">
	<div class="img--wrapper">
		<img src={map.radar} alt={`Map over ${map.name}`} class="map__img" />
		{#if activeStrat !== undefined}
			{#each activeStrat.lineups as lineup, index}
				<button
					on:click={() => handleLineupClick(lineup)}
					class={lineup.nade === 'SMOKE'
						? 'marker throw fill-smoke'
						: lineup.nade === 'FLASH'
						? 'marker throw fill-flash'
						: lineup.nade === 'MOLOTOV'
						? 'marker throw fill-molotov'
						: 'marker throw fill-he'}
					style={`top: ${lineup.throwCoordinateY}%; left: ${lineup.throwCoordinateX}%`}
					><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
						><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
							d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
						/></svg
					><span class="id">{index + 1}</span></button
				>
				<button
					on:click={() => handleLineupClick(lineup)}
					class={lineup.nade === 'SMOKE'
						? 'marker smoke-marker bg-smoke'
						: lineup.nade === 'FLASH'
						? 'marker flash-marker bg-flash'
						: lineup.nade === 'MOLOTOV'
						? 'marker molotov-marker bg-molotov'
						: 'marker he-marker bg-he'}
					style={`top: ${lineup.landCoordinateY}%; left: ${lineup.landCoordinateX}%`}
					>{index + 1}</button
				>
			{/each}
		{/if}
	</div>
	<div class="info">
		<p class="label"><span class="color-showcase bg-smoke" /> Smoke</p>
		<p class="label"><span class="color-showcase bg-flash" /> Flash</p>
		<p class="label"><span class="color-showcase bg-molotov" /> Molotov</p>
		<p class="label"><span class="color-showcase bg-he" /> HE grenade</p>
	</div>
	{#if showModal}
		<VideoModal on:close={() => (showModal = false)} lineup={modalLineup} />
	{/if}
</div>

<style scoped>
	.map {
		height: 100%;
	}

	.img--wrapper {
		position: relative;
	}

	.map__img {
		width: 100%;
	}

	.info {
		display: flex;
		justify-content: space-between;
	}

	.label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.color-showcase {
		display: block;
		width: 1rem;
		aspect-ratio: 1 / 1;
		border-radius: 0.2rem;
	}

	.marker {
		position: absolute;
		border-radius: 100vw;
		opacity: 0.8;
		cursor: pointer;
		color: #fff;
	}

	.throw {
		width: 1rem;
	}

	.throw .id {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.bg-smoke {
		background-color: var(--smoke);
	}

	.fill-smoke {
		fill: var(--smoke);
	}

	.smoke-marker {
		width: 2rem;
		aspect-ratio: 1 / 1;
	}

	.bg-flash {
		background-color: var(--flash);
	}

	.fill-flash {
		fill: var(--flash);
	}

	.flash-marker {
		width: 1rem;
		aspect-ratio: 1 / 1;
	}

	.bg-molotov {
		background-color: var(--molotov);
	}

	.fill-molotov {
		fill: var(--molotov);
	}

	.molotov-marker {
		width: 1.5rem;
		aspect-ratio: 3 / 4;
	}

	.bg-he {
		background-color: var(--he);
	}

	.fill-he {
		fill: var(--he);
	}

	.he-marker {
		width: 1.5rem;
		aspect-ratio: 1 / 1;
	}
</style>