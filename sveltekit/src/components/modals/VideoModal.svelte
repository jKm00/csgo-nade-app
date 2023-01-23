<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	export let lineup: any;

	let modal: any;

	const handle_keydown = (e: any) => {
		if (e.key === 'Escape') {
			close();
			return;
		}

		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable: any = Array.from(nodes).filter((n: any) => n.tabIndex >= 0);

			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && e.shiftKey) index = 0;

			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;

			tabbable[index].focus();
			e.preventDefault();
		}
	};

	// const previously_focused =
	// 	typeof document !== 'undefined' && document.activeElement;

	// if (previously_focused) {
	// 	onDestroy(() => {
	// 		previously_focused.focus();
	// 	});
	// }
</script>

<svelte:window on:keydown={handle_keydown} />

<div
	class="modal-background"
	on:click={close}
	on:keydown={handle_keydown}
	on:keyup={handle_keydown}
	on:keypress={handle_keydown}
/>

<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
	<div class="video--wrapper">
		{#if lineup.videoPath !== undefined && lineup.videoPath.length !== 0}
			<iframe
				src={`${lineup.videoPath}?autoplay=1`}
				allow="accelerometer; autoplay;"
				frameborder="0"
				title={`Video of ${lineup.name} lineup`}
				style="width: 100%; height: 100%"
			/>
		{:else}
			<p class="error-msg">Something went wrong. Could not load video😢</p>
		{/if}
	</div>
	<div class="body">
		<div class="body__header">
			<h2 class="title">{lineup.name}</h2>
			<span class={`tag ${lineup.nade.toLowerCase()}`}>{lineup.nade}</span>
		</div>
		<p class="text">{lineup.desc}</p>
		<div class="body__footer">
			<button class="btn--modal" on:click={close}>Close</button>
		</div>
	</div>
</div>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.8);
		z-index: 100;
	}

	.modal {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		position: absolute;
		left: 50%;
		top: 50%;
		z-index: 1000;
		width: calc(100vw - 4em);
		max-width: 50vw;
		overflow: auto;
		transform: translate(-50%, -50%);
		border-radius: 0.2em;
		background: #242424;
		text-align: left;
	}

	.video--wrapper {
		display: grid;
		place-items: center;

		position: relative;
		aspect-ratio: 16 / 9;
		border-bottom: 2px solid var(--clr-accent);
	}

	.body {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
	}

	.body__header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.5rem;
	}

	.body__footer {
		display: flex;
		justify-content: flex-end;
	}

	.smoke {
		--color: var(--smoke);
	}

	.flash {
		--color: var(--flash);
	}

	.molotov {
		--color: var(--molotov);
	}

	.he {
		--color: var(--he);
	}

	.tag {
		color: var(--color);
		border-color: var(--color);
	}
</style>