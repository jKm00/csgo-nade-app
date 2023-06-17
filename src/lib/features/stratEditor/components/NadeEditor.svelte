<script lang="ts">
	import type { Nade } from '../types/nade';
	import NadeForm from './NadeForm.svelte';
	import RadarEditor from './RadarEditor.svelte';

	export let map: string;
	export let nades: Nade[] = [];

	let activeNade: Nade | undefined = undefined;
</script>

<div class="grid md:grid-cols-2 gap-4">
	<RadarEditor {map} bind:nades bind:activeNade />
	<NadeForm {activeNade} bind:nades />
</div>
