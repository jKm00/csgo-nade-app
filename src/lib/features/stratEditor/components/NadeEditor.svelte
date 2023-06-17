<script lang="ts">
	import type { Nade } from '../types/nade';
	import RadarEditor from './RadarEditor.svelte';

	export let map: string;
	export let nades: Nade[] = [];

	let activeNade: Nade | undefined = undefined;
</script>

<div class="grid md:grid-cols-2 gap-4">
	<!-- TODO: On emit of nade id, update active nade -->
	<RadarEditor {map} bind:nades />
	<!-- Nade overview -->
	<!-- TODO: Create nade info component taking in the active nade -->
	<div>
		<h1>Hello</h1>
	</div>
</div>
