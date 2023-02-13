<script lang="ts">
	export let title: string;
	export let backText: string;
	export let backUrl: string;
</script>

<header class="header">
	<a href={backUrl} class="back"
		><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
			><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
				d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
			/></svg
		>{backText}</a
	>
	<h1 class="title">{title}</h1>
</header>

<style scoped>
	.header {
		display: grid;
		grid-template-columns: 20% 1fr 20%;
		align-items: center;
	}

	.back {
		display: flex;
		gap: 0.25rem;
		align-items: center;
	}

	.back svg {
		fill: #fff;
		height: 1rem;
	}

	.back:hover svg,
	.back:focus-visible svg {
		fill: var(--clr-accent);
	}
</style>
