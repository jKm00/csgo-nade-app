<script lang="ts">
	import type { Nade } from '../types/nade';

	export let map: string;
	export let nades: Nade[];
	export let activeNade: Nade | undefined;

	$: console.log(nades);

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

	// TODO: On nade click, emit the id of the nade
</script>

<!-- Radar wrapper -->
<div class="relative">
	<!-- TODO: On button (nade marker) drag, change its coordinates -->
	{#each nades as nade}
		<div class="grid gap-2">
			<button on:click={() => (activeNade = nade)}>yo</button>
		</div>
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
