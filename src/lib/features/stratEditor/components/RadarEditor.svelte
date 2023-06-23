<script lang="ts">
	import { NadeType, type Nade } from '../types/nade';
	import EditableNadeMarker from './EditableNadeMarker.svelte';

	export let map: string;
	export let nades: Nade[];
	export let activeNade: Nade | undefined = undefined;
	export let showTutorial: boolean;

	$: radarPath = `/assets/images/radars/de_${map.toLocaleLowerCase()}.webp`;

	let addNewNade = true;

	let mousePosition = { x: 0, y: 0 };
	let radarWidth: number;
	let radarHeight: number;

	const handleMouseMove = (event: MouseEvent) => {
		mousePosition.x = event.offsetX;
		mousePosition.y = event.offsetY;
	};

	const handleMapClick = () => {
		if (showTutorial) {
			showTutorial = false;
			return;
		}

		const markerPosX =
			Math.round(((100 * mousePosition.x) / radarWidth) * 100) / 100;
		const markerPosY =
			Math.round(((100 * mousePosition.y) / radarHeight) * 100) / 100;

		if (addNewNade) {
			const newNade = {
				id: nades[nades.length - 1] ? nades[nades.length - 1].id + 1 : 0,
				name: '',
				notes: '',
				type: NadeType.SMOKE,
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

<div>
	<!-- Radar wrapper -->
	<div
		class="relative w-full aspect-square"
		bind:clientWidth={radarWidth}
		bind:clientHeight={radarHeight}
	>
		{#each nades as nade, index}
			<EditableNadeMarker
				bind:nade
				{index}
				{radarWidth}
				{radarHeight}
				mouseX={mousePosition.x}
				mouseY={mousePosition.y}
				on:click={() => (activeNade = nade)}
				active={activeNade?.id === nade.id}
			/>
		{/each}
		<!-- Image wrapper -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="cursor-pointer"
			on:mousemove={handleMouseMove}
			on:click={handleMapClick}
		>
			<img src={radarPath} alt={`Radar of ${map}`} />
		</div>
		{#if showTutorial}
			<!-- Tutorial overlay -->
			<div
				class="grid place-items-center absolute inset-0 px-4 bg-neutral-950/80 text-neutral-400 pointer-events-none z-10"
			>
				<ul>
					<li>1. Click once on the map to add a lineup marker</li>
					<li>2. Click once more to add a marker where the nade should land</li>
					<li>3. Change name and nade type in the side menu</li>
					<li>4. Repeat to add more nades</li>
				</ul>
			</div>
		{/if}
	</div>
	<p class="text-center text-neutral-400 mt-4">
		<span class="underline">Tips:</span> Click and drag a nade to move it
	</p>
</div>
