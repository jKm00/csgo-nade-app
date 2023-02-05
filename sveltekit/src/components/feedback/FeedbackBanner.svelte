<script lang="ts">
	import { FeedbackType } from '@/types/FeedbackType';
	import { fly } from 'svelte/transition';

	export let display = false;
	export let type: FeedbackType = FeedbackType.SUCCESS;
</script>

{#if display}
	<div
		class="banner"
		style={type === FeedbackType.SUCCESS
			? 'background-color: #69db7c'
			: 'background-color: #fa5252'}
		transition:fly={{ y: -20, duration: 250 }}
	>
		<div class="content">
			<slot />
		</div>
		<button on:click={() => (display = false)}
			><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
				><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
					d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
				/></svg
			></button
		>
	</div>
{/if}

<style scoped>
	.banner {
		display: grid;
		grid-template-columns: 2rem 1fr 2rem;
		width: clamp(20rem, 40vw, 50rem);
		padding: 0.5rem 1rem;
		border-radius: 0.1rem;

		position: absolute;
		top: 2rem;
		left: 50%;
		z-index: 99999;
		transform: translateX(-50%);
	}

	.content {
		grid-column: 1 / span 2;
	}

	svg {
		fill: #fff;
		width: 0.8rem;
	}

	button {
		cursor: pointer;
	}
</style>
