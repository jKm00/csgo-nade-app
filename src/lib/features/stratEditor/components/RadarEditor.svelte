<script lang="ts">
	import type { Nade } from '../types/nade';

	export let map: string;
	export let nades: Nade[];

	$: radarPath = `/assets/images/radars/de_${map}.webp`;

	let mousePosition = { x: 0, y: 0 };

	const handleMouseMove = (event: MouseEvent) => {
		mousePosition.x = event.offsetX;
		mousePosition.y = event.offsetY;
	};

	const handleMapClick = (event: MouseEvent) => {
		// TODO: Add new nade to nades
		console.log(event);
	};

	// TODO: On nade click, emit the id of the nade
</script>

<!-- Radar wrapper -->
<div class="relative">
	<!-- TODO: On button (nade marker) drag, change its coordinates -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<img
		on:mousemove={handleMouseMove}
		on:click={handleMapClick}
		src={radarPath}
		alt={`Radar of ${map}`}
	/>
</div>
