<script lang="ts">
	import PageTransition from '@/components/PageTransition.svelte';
	import type { CsgoMap } from '@/types/CsgoMap';

	export let maps: CsgoMap[];
</script>

<main class="content">
	<h1 class="title">CSGO Strats</h1>
	<div class="grid">
		{#each maps as map}
			<a href={`/maps/${map.name}`} sapper:prefetch>
				<div class="box">
					<h2 class="title">{map.name}</h2>
					<img
						src={map.thumbnail}
						alt={`image of ${map.name}`}
						class="box__bg"
					/>
				</div>
			</a>
		{/each}
	</div>
</main>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.grid {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		gap: 1rem;
	}

	.box {
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 16 / 9;
		padding: 1rem;
		border-radius: 0.1rem;
		overflow: hidden;

		position: relative;

		transition: transform 150ms ease-in-out;
	}

	.box:hover,
	.box:focus {
		transform: scale(1.05);
	}

	.box::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background-color: rgb(0 0 0 / 0.5);
		/* background-image: linear-gradient(
			0deg,
			rgba(0, 0, 0, 0.8) 40%,
			rgba(0, 0, 0, 0) 100%
		); */

		transition: background-color 150ms ease-in-out;
	}

	.box:hover::after,
	.box:focus::after {
		background-color: rgb(0 0 0 / 0);
	}

	.box__bg {
		display: block;
		height: 100%;
		width: 100%;
		object-fit: cover;
		position: absolute;
		inset: 0;
		z-index: -1;
	}
</style>
