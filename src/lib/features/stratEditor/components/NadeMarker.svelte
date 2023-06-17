<script lang="ts">
	import { NadeType, type Nade } from '../types/nade';

	enum MarkerType {
		LINEUP,
		IMPACT,
	}

	export let nade: Nade;
	export let index: number;
	export let radarWidth: number;
	export let radarHeight: number;
	export let mouseX: number;
	export let mouseY: number;

	let dragActive = false;
	let mouseUp = false;
	let markerType: MarkerType | undefined = undefined;

	$: if (dragActive) {
		const markerPosX = Math.round(((100 * mouseX) / radarWidth) * 100) / 100;
		const markerPosY = Math.round(((100 * mouseY) / radarHeight) * 100) / 100;

		if (markerType === MarkerType.LINEUP) {
			nade.lineupX = markerPosX;
			nade.lineupY = markerPosY;
		} else {
			nade.impactPointX = markerPosX;
			nade.impactPointY = markerPosY;
		}
	}

	$: color =
		nade.type === NadeType.SMOKE
			? 'rgb(248 113 113)'
			: nade.type === NadeType.FLASH
			? 'rgb(96 165 250)'
			: nade.type === NadeType.MOLOTOV
			? 'rgb(251 146 60)'
			: nade.type === NadeType.HE
			? 'rgb(74 222 128)'
			: nade.type === NadeType.DECOY
			? 'rgb(45 212 191)'
			: 'rgb(248 113 113)';

	const handleMouseDown = (type: MarkerType) => {
		// Debounce mouse down, stopping move of marker on click
		mouseUp = false;
		setTimeout(() => {
			if (!mouseUp) {
				dragActive = true;
			}
		}, 100);

		if (type === MarkerType.LINEUP) {
			markerType = type;
		} else {
			markerType = type;
		}
	};

	const handleMouseUp = () => {
		mouseUp = true;
		dragActive = false;
	};
</script>

<button
	class="absolute grid place-items-center text-2xl -translate-x-1/2 -translate-y-1/2 z-10"
	style="left: {nade.lineupX}%; top: {nade.lineupY}%"
	on:click
	on:mousedown={() => handleMouseDown(MarkerType.LINEUP)}
	on:mouseup={handleMouseUp}
	><svg
		style="fill: {color}"
		xmlns="http://www.w3.org/2000/svg"
		height="1em"
		viewBox="0 0 384 512"
		><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
			d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
		/></svg
	><span class="absolute text-xs pointer-events-none">{index + 1}</span></button
>

{#if nade.impactPointX && nade.impactPointY}
	<button
		class="absolute grid place-items-center w-5 aspect-square rounded-full -translate-x-1/2 -translate-y-1/2 z-10"
		style="background-color: {color}; left: {nade.impactPointX}%; top: {nade.impactPointY}%"
		on:click
		on:mousedown={() => handleMouseDown(MarkerType.IMPACT)}
		on:mouseup={handleMouseUp}
	>
		<span class="absolute text-xs pointer-events-none">{index + 1}</span>
	</button>
{/if}
