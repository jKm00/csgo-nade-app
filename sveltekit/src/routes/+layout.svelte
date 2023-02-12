<script lang="ts">
	import './styles.css';
</script>

<svelte:head>
	<title>CSGO Strats</title>
	<link rel="icon" type="image/svg" href="assets/favicons/favicon.ico" />
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-NX89CG2FN7"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-NX89CG2FN7');
	</script>
</svelte:head>

<main class="app">
	<slot />
</main>

<style scoped>
	.app {
		width: clamp(500px, 90vw, 1000px);
		margin: auto;
		padding-inline: 1rem;
		text-align: center;
	}

	main {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}
</style>
