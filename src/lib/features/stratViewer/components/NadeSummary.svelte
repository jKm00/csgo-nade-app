<script lang="ts">
	import { NadeType, type Nade } from '$lib/features/stratEditor/types/nade';

	export let nades: Nade[];

	let smokes = 0;
	let flashes = 0;
	let molotoves = 0;
	let he = 0;
	let decoys = 0;

	$: nades.forEach((nade) => {
		switch (nade.type) {
			case NadeType.SMOKE:
				smokes++;
				break;
			case NadeType.FLASH:
				flashes++;
				break;
			case NadeType.MOLOTOV:
				molotoves++;
				break;
			case NadeType.HE:
				he++;
				break;
			case NadeType.DECOY:
				decoys++;
				break;
		}
	});
</script>

<div class="flex gap-4 justify-around bg-neutral-800 rounded shadow py-4">
	<span class="flex items-center">
		<img
			class="w-16 aspect-square"
			src="/assets/icons/nades/smoke_icon.webp"
			alt=""
		/>
		<p>{smokes}</p>
	</span>
	<span class="flex items-center">
		<img
			class="w-16 aspect-square"
			src="/assets/icons/nades/flash_icon.webp"
			alt=""
		/>
		<p>{flashes}</p>
	</span>
	<span class="flex items-center">
		<img
			class="w-16 aspect-square"
			src="/assets/icons/nades/molotov_icon.webp"
			alt=""
		/>
		<p>{molotoves}</p>
	</span>
	<span class="flex items-center">
		<img
			class="w-16 aspect-square"
			src="/assets/icons/nades/he_icon.webp"
			alt=""
		/>
		<p>{he}</p>
	</span>
	<span class="flex items-center">
		<img
			class="w-16 aspect-square"
			src="/assets/icons/nades/decoy_icon.webp"
			alt=""
		/>
		<p class="mr-4">{decoys}</p>
	</span>
</div>
