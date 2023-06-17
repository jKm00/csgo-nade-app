<script lang="ts">
	import DropZone from '$lib/components/inputs/DropZone.svelte';
	import TextAreaInput from '$lib/components/inputs/TextAreaInput.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import type { Nade } from '../types/nade';

	export let activeNade: Nade | undefined;
	export let nades: Nade[];

	const updateLineupImg = (event: CustomEvent<{ value: File | undefined }>) => {
		const nade = nades.find((nade) => nade.id === activeNade?.id);

		if (nade) {
			nade.lineupImg = event.detail.value;
		}
	};

	const updateImpactImg = (event: CustomEvent<{ value: File | undefined }>) => {
		const nade = nades.find((nade) => nade.id === activeNade?.id);

		if (nade) {
			nade.impactImg = event.detail.value;
		}
	};
</script>

{#if !activeNade}
	<p class="grid place-items-center text-neutral-400">
		Create or click on a nade to see detailed info
	</p>
{:else}
	<div class="grid gap-4 content-start">
		<TextInput
			id="name"
			name="name"
			label="Name of nade:"
			placeholder="Top mid"
			bind:value={activeNade.name}
		/>
		<TextAreaInput
			id="notes"
			name="notes"
			label="Nade notes:"
			placeholder="Jump throw"
			rows={3}
			bind:value={activeNade.notes}
		/>
		<div class="grid grid-cols-2 gap-4">
			<DropZone
				label="Lineup image:"
				file={activeNade.lineupImg}
				on:change={updateLineupImg}
			/>
			<DropZone
				label="Impact image:"
				file={activeNade.impactImg}
				on:change={updateImpactImg}
			/>
		</div>
	</div>
{/if}
