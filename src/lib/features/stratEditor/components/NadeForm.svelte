<script lang="ts">
	import { toast } from '$lib/components/feedback/toast/toastStore';
	import DropZone from '$lib/components/inputs/DropZone.svelte';
	import Dropdown from '$lib/components/inputs/Dropdown.svelte';
	import TextAreaInput from '$lib/components/inputs/TextAreaInput.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import { NadeType, type Nade } from '../types/nade';

	export let activeNade: Nade | undefined;
	export let nades: Nade[];

	const nadeTypes = [
		{ label: 'Smoke', value: NadeType.SMOKE },
		{ label: 'Flash', value: NadeType.FLASH },
		{ label: 'Molotov', value: NadeType.MOLOTOV },
		{ label: 'HE Nade', value: NadeType.HE },
		{ label: 'Decoy', value: NadeType.DECOY },
	];

	$: selectedType = nadeTypes.find((opt) => opt.value === activeNade?.type);

	$: {
		updateActiveNade(activeNade);
	}

	const updateActiveNade = (nade: Nade | undefined) => {
		if (!nade) return;

		const { nadesBefore, nadeToUpdate, nadesAfter } = splitNades();
		if (!nadeToUpdate) return;

		nadeToUpdate.name = activeNade?.name ?? '';
		nadeToUpdate.notes = activeNade?.notes ?? '';
		nadeToUpdate.type = activeNade?.type;

		mergeNades(nadesBefore, nadeToUpdate, nadesAfter);
	};

	const updateLineupImg = (event: CustomEvent<{ value: File | undefined }>) => {
		const { nadesBefore, nadeToUpdate, nadesAfter } = splitNades();
		if (!nadeToUpdate) return;

		nadeToUpdate.lineupImg = event.detail.value;

		mergeNades(nadesBefore, nadeToUpdate, nadesAfter);
	};

	const updateImpactImg = (event: CustomEvent<{ value: File | undefined }>) => {
		const { nadesBefore, nadeToUpdate, nadesAfter } = splitNades();
		if (!nadeToUpdate) return;

		nadeToUpdate.impactImg = event.detail.value;

		mergeNades(nadesBefore, nadeToUpdate, nadesAfter);
	};

	const splitNades = () => {
		const nadeIndex = nades.findIndex((nade) => nade.id === activeNade?.id);

		const nadesBefore = nades.slice(0, nadeIndex);
		const nadeToUpdate = nades[nadeIndex];
		const nadesAfter = nades.slice(nadeIndex + 1);

		return {
			nadesBefore,
			nadeToUpdate,
			nadesAfter,
		};
	};

	const mergeNades = (nadesBefore: Nade[], nade: Nade, nadesAfter: Nade[]) => {
		nades = [...nadesBefore, nade, ...nadesAfter];
	};

	const displayError = (
		event: CustomEvent<{ type: string; message: string }>
	) => {
		toast.push({
			type: 'error',
			title: 'Image to large',
			desc: event.detail.message,
		});
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
				on:error={displayError}
			/>
			<DropZone
				label="Impact image:"
				file={activeNade.impactImg}
				on:change={updateImpactImg}
				on:error={displayError}
			/>
		</div>
		<div class="flex flex-wrap gap-2">
			<Dropdown
				id="type"
				name="type"
				placeholder="Select nade type"
				options={nadeTypes}
				selected={selectedType}
				bind:value={activeNade.type}
			/>
		</div>
	</div>
{/if}
