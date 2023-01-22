<script>
	import { createEventDispatcher, onDestroy } from 'svelte';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

	let modal;

	const handle_keydown = (e) => {
		if (e.key === 'Escape') {
			close();
			return;
		}

		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0);

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

<div class="modal-background" on:click={close} />

<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
	<div class="header">
		<slot name="header" />
		<button class="btn" autofocus on:click={close}>close modal</button>
	</div>
	<div class="video--wrapper">
		<slot />
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
		padding: 1.5rem;
		border-radius: 0.2em;
		background: #242424;
		text-align: left;
	}

	.header {
		display: flex;
		justify-content: space-between;
	}

	.video--wrapper {
		position: relative;
		aspect-ratio: 16 / 9;
	}
</style>
