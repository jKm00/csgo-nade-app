<script lang="ts">
	import FeedbackBanner from '@/components/feedback/FeedbackBanner.svelte';
	import MapView from '@/components/MapView.svelte';
	import API from '@/services/Api';
	import type { CsgoMap } from '@/types/CsgoMap';
	import { FeedbackType } from '@/types/FeedbackType';
	import { Nade } from '@/types/Nade';

	enum markerType {
		THROW,
		LAND
	}

	export let map: CsgoMap;

	let lineup = {
		id: 0,
		name: '',
		desc: '',
		nade: Nade.SMOKE,
		throwCoordinateX: 0,
		throwCoordinateY: 0,
		landCoordinateX: 0,
		landCoordinateY: 0,
		videoPath: ''
	};
	let marker: markerType | undefined;

	let radarWidth: number;
	let radarHeight: number;

	let displayFeedback = false;
	let feedbackMsg = '';
	let feedbackType = FeedbackType.SUCCESS;

	const setMarker = (event: MouseEvent) => {
		let x = Math.round(((100 * event.offsetX) / radarWidth) * 100) / 100;
		let y = Math.round(((100 * event.offsetY) / radarHeight) * 100) / 100;
		if (marker === markerType.THROW) {
			lineup.throwCoordinateX = x;
			lineup.throwCoordinateY = y;
		}
		if (marker === markerType.LAND) {
			lineup.landCoordinateX = x;
			lineup.landCoordinateY = y;
		}
		marker = undefined;
	};

	const addLineup = async () => {
		// TODO: send call to api
		if (
			lineup.name.length === 0 ||
			lineup.throwCoordinateX === 0 ||
			lineup.throwCoordinateY === 0 ||
			lineup.landCoordinateX === 0 ||
			lineup.landCoordinateY === 0 ||
			lineup.videoPath.length === 0
		) {
			toggleBanner('Fill out all fields before submitting', 2000, FeedbackType.ERROR);
		} else {
			API.post('/lineups', {
				mapId: map.id,
				name: lineup.name,
				desc: lineup.desc,
				nade: lineup.nade,
				throwCoordinateX: lineup.throwCoordinateX,
				throwCoordinateY: lineup.landCoordinateY,
				landCoordinateX: lineup.landCoordinateX,
				landCoordinateY: lineup.landCoordinateY,
				videoPath: lineup.videoPath
			})
				.then((res) => {
					toggleBanner('Lineup added', 2000, FeedbackType.SUCCESS);
				})
				.catch((err) => {
					toggleBanner('Something went wrong. Please try again...', 2000, FeedbackType.ERROR);
				});
		}
	};

	/**
	 * Toggles the feedback banner for a duration
	 *
	 * @param msg the message to be displayed
	 * @param duration how long the message should be displayed for
	 * @param type type of feedback, success or error
	 */
	const toggleBanner = (msg: string, duration: number, type: FeedbackType) => {
		feedbackMsg = msg;
		feedbackType = type;
		displayFeedback = true;
		setTimeout(() => {
			displayFeedback = false;
		}, duration);
	};
</script>

<div class="grid-2-col">
	<FeedbackBanner display={displayFeedback} type={feedbackType}>{feedbackMsg}</FeedbackBanner>
	<section bind:clientWidth={radarWidth} bind:clientHeight={radarHeight} on:mousedown={setMarker}>
		<MapView {map} lineups={[lineup]} enableModal={false} />
	</section>
	<section>
		<form class="form" on:submit|preventDefault={addLineup}>
			<div class="form__section">
				<label for="lineupName" class="form__label">Lineup name</label>
				<input class="form__input" type="text" id="lineupName" bind:value={lineup.name} />
			</div>
			<div class="form__section">
				<label for="lineupDesc" class="form__label">Lineup desc</label>
				<textarea class="form__input" id="lineupDesc" rows="5" bind:value={lineup.desc} />
			</div>
			<div class="form__btn-row">
				<button
					type="button"
					class="form__btn"
					data-active={lineup.nade === Nade.SMOKE ? true : false}
					on:click={() => (lineup.nade = Nade.SMOKE)}>Smoke</button
				>
				<button
					type="button"
					class="form__btn"
					data-active={lineup.nade === Nade.FLASH ? true : false}
					on:click={() => (lineup.nade = Nade.FLASH)}>Flash</button
				>
				<button
					type="button"
					class="form__btn"
					data-active={lineup.nade === Nade.MOLOTOV ? true : false}
					on:click={() => (lineup.nade = Nade.MOLOTOV)}>Molotov</button
				>
				<button
					type="button"
					class="form__btn"
					data-active={lineup.nade === Nade.HE ? true : false}
					on:click={() => (lineup.nade = Nade.HE)}>He</button
				>
			</div>
			<div class="form__section">
				<p class="form__label">Throw marker</p>
				<div class="grid-3-col">
					<input type="number" step=".01" bind:value={lineup.throwCoordinateX} />
					<input type="number" step=".01" bind:value={lineup.throwCoordinateY} />
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
					<input type="number" step=".01" bind:value={lineup.landCoordinateX} />
					<input type="number" step=".01" bind:value={lineup.landCoordinateY} />
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
				<input class="form__input" type="text" id="videoPath" bind:value={lineup.videoPath} />
			</div>
			<button class="btn btn--accent btn--large">Add lineup</button>
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
</style>
