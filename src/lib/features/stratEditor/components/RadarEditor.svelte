<script lang="ts">
	import type { Nade } from '../types/nade';
	import NadeMarker from './NadeMarker.svelte';

	export let map: string;
	export let nades: Nade[];
	export let activeNade: Nade | undefined;

	$: radarPath = `/assets/images/radars/de_${map}.webp`;

	let addNewNade = true;

	let mousePosition = { x: 0, y: 0 };
	let radarWidth: number;
	let radarHeight: number;

	const handleMouseMove = (event: MouseEvent) => {
		mousePosition.x = event.offsetX;
		mousePosition.y = event.offsetY;
	};

	const handleMapClick = () => {
		const markerPosX =
			Math.round(((100 * mousePosition.x) / radarWidth) * 100) / 100;
		const markerPosY =
			Math.round(((100 * mousePosition.y) / radarHeight) * 100) / 100;

		if (addNewNade) {
			const newNade = {
				id: nades[nades.length - 1] ? nades[nades.length - 1].id + 1 : 0,
				name: '',
				notes: '',
				type: undefined,
				lineupX: markerPosX,
				lineupY: markerPosY,
				impactPointX: undefined,
				impactPointY: undefined,
				lineupImg: undefined,
				impactImg: undefined,
			};

			nades = [...nades, newNade];

			activeNade = newNade;
			addNewNade = false;
		} else {
			const lastNade = nades.splice(nades.length - 1, 1)[0];

			lastNade.impactPointX = markerPosX;
			lastNade.impactPointY = markerPosY;

			nades = [...nades, lastNade];

			activeNade = lastNade;
			addNewNade = true;
		}
	};
</script>

<!-- Radar wrapper -->
<div class="relative">
	{#each nades as nade, index}
		<NadeMarker {nade} {index} on:click={() => (activeNade = nade)} />
	{/each}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		on:mousemove={handleMouseMove}
		on:click={handleMapClick}
		bind:clientWidth={radarWidth}
		bind:clientHeight={radarHeight}
	>
		<img src={radarPath} alt={`Radar of ${map}`} />
	</div>
</div>
