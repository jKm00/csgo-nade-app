<script lang="ts">
	import { NadeType, type Nade } from '$lib/features/stratEditor/util/nade';
	import toast from 'svelte-french-toast';
	import MainButton from '../../../components/buttons/MainButton.svelte';
	import FormDropdown from '$lib/components/inputs/FormDropdown.svelte';
	import NadeColorMeaning from '$lib/components/feedback/NadeColorMeaning.svelte';

	enum MarkerType {
		LINEUP,
		IMPACT_POINT,
	}

	export let mapName: string;
	export let mapRadar: string;
	export let nades: Nade[] = [];

	let showTutorial = true;
	let markerType = MarkerType.LINEUP;

	let mapWidth: number;
	let mapHeight: number;

	const handleMapClick = (e: MouseEvent) => {
		if (showTutorial) {
			showTutorial = false;
			return;
		}
		// @ts-ignore
		if (e.target?.ariaLabel === 'marker') return;

		if (nades.length >= 20 && markerType === MarkerType.LINEUP) {
			toast.error('A team can maximum throw 20 nades in one round!', {
				style: 'background: #333; color:#fff',
			});
			return;
		}

		const mouseX = e.offsetX;
		const mouseY = e.offsetY;

		const markerPosX = Math.round(((mouseX * 100) / mapWidth) * 100) / 100;
		const markerPosY = Math.round(((mouseY * 100) / mapHeight) * 100) / 100;

		if (markerType === MarkerType.LINEUP) {
			nades = [
				...nades,
				{
					name: '',
					type: '',
					lineupX: markerPosX,
					lineupY: markerPosY,
					impactPointX: -1,
					impactPointY: -1,
				},
			];

			markerType = MarkerType.IMPACT_POINT;
		} else if (markerType === MarkerType.IMPACT_POINT) {
			const lastNade = nades.splice(nades.length - 1, 1)[0];

			lastNade.impactPointX = markerPosX;
			lastNade.impactPointY = markerPosY;

			nades = [...nades, lastNade];

			markerType = MarkerType.LINEUP;
		}
	};

	const removeNade = (index: number) => {
		nades.splice(index, 1);
		nades = [...nades];
		markerType = MarkerType.LINEUP;
	};
</script>

<!-- Main grid -->
<div class="grid grid-cols-2 gap-4">
	<input type="hidden" name="nades" bind:value={nades} />
	<!-- Left element -->
	<div>
		<!-- Image wrapper -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			bind:clientWidth={mapWidth}
			bind:clientHeight={mapHeight}
			class="relative aspect-square"
			on:click={(e) => handleMapClick(e)}
		>
			{#each nades as nade, index}
				<!-- Color of marker -->
				{@const color =
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
						: 'rgb(248 113 113)'}
				<!-- Lineup marker -->
				<button
					on:click|preventDefault
					class="absolute grid place-items-center text-2xl -translate-x-1/2 -translate-y-1/2"
					style="left: {nade.lineupX}%; top: {nade.lineupY}%"
					aria-label="marker"
					><svg
						style="fill: {color}"
						aria-label="marker"
						xmlns="http://www.w3.org/2000/svg"
						height="1em"
						viewBox="0 0 384 512"
						><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							aria-label="marker"
							d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
						/></svg
					><span class="absolute text-xs" aria-label="marker">{index + 1}</span
					></button
				>
				{#if nade.impactPointX >= 0 && nade.impactPointY >= 0}
					<!-- Impact point marker -->
					<button
						on:click|preventDefault
						class="absolute grid place-items-center text-xs w-5 aspect-square rounded-full -translate-x-1/2 -translate-y-1/2"
						style="background-color: {color}; left: {nade.impactPointX}%; top: {nade.impactPointY}%"
						aria-label="marker">{index + 1}</button
					>
				{/if}
			{/each}
			{#if showTutorial}
				<!-- Tutorial -->
				<div
					class="grid place-items-center absolute inset-0 bg-neutral-950/80 text-neutral-400"
				>
					<ul>
						<li>1. Click once on the map to add a lineup marker</li>
						<li>
							2. Click once more to add a marker where the nade should land
						</li>
						<li>4. Change name and nade type in the side menu</li>
						<li>3. Repeat to add more nades</li>
					</ul>
				</div>
			{/if}
			<img src={mapRadar} alt={mapName} />
		</div>
		<NadeColorMeaning />
	</div>
	<!-- Right element -->
	<ul
		class="grid gap-4 items-start content-start overflow-y-auto max-h-[560px] pt-1"
	>
		{#if nades.length === 0}
			<p class="text-neutral-400 text-center">Click on the map to add a nade</p>
		{:else}
			{#each nades as nade, index}
				<li class="flex items-center gap-4">
					<span class="w-6">{index + 1}.</span>
					<input
						class="text-sm bg-neutral-800 rounded shadow p-2"
						type="text"
						bind:value={nade.name}
						placeholder="Name of nade"
					/>
					<FormDropdown
						id={`${index}`}
						name={`${index}`}
						bind:value={nade.type}
						placeholder="Nade type"
						options={[
							{ label: 'Smoke', value: NadeType.SMOKE },
							{ label: 'Flash', value: NadeType.FLASH },
							{ label: 'Molotov', value: NadeType.MOLOTOV },
							{ label: 'HE', value: NadeType.HE },
							{ label: 'Decoy', value: NadeType.DECOY },
						]}
					/>
					<MainButton on:click={() => removeNade(index)}
						><svg
							class="fill-white"
							xmlns="http://www.w3.org/2000/svg"
							height="1em"
							viewBox="0 0 448 512"
							><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
								d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
							/></svg
						></MainButton
					>
				</li>
			{/each}
		{/if}
	</ul>
</div>
