<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { clickOutside } from 'svelte-use-click-outside';

	export let data: string[];

	const dispatch = createEventDispatcher<{ select: string }>();

	let search = '';
	let selected = false;
	let focused = false;

	$: filteredData = data.filter((d) => d.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

	$: showDropdown = focused && !selected;

	/**
	 * Handles event when button is clicked
	 *
	 * @param item the item stoed in the button that was clicked
	 */
	const handleClick = (item: string) => {
		search = item;
		selected = true;
		dispatch('select', item);
	};
</script>

<div class="wrapper" use:clickOutside={() => (focused = false)}>
	<input
		type="text"
		class="form__input"
		bind:value={search}
		on:input={() => (selected = false)}
		on:focusin={() => (focused = true)}
	/>
	{#if showDropdown}
		<ul>
			{#each filteredData as item, index}
				<li><button type="button" on:click={() => handleClick(item)}>{item}</button></li>
			{/each}
		</ul>
	{/if}
</div>

<style scoped>
	.wrapper {
		display: grid;

		position: relative;
	}

	ul {
		position: absolute;
		bottom: 0;
		inset-inline: 0;
		transform: translateY(100%);

		background-color: #333333;
		border-radius: 0 0 0.2rem 0.2rem;
		max-height: 20rem;
		overflow: auto;
		box-shadow: 0 5px 10px rgb(0 0 0 / 0.1);
	}

	ul > li {
		display: grid;
	}

	ul > li > button {
		text-align: left;
		padding: 1rem;
	}

	ul > li > button:hover,
	ul > li > button:focus {
		background-color: #242424;
	}
</style>
