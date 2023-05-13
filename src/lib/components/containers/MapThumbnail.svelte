<script lang="ts">
	export let img: string;
	export let imgAlt: string;
	export let name: string;
	export let isAvailable: boolean = false;
</script>

<a href="/maps/{name}">
	<div
		class="relative group hover:scale-105 transition-all rounded overflow-hidden"
	>
		<div
			class="absolute h-full w-full bg-neutral-900/60 group-hover:bg-neutral-900/0"
		/>
		<img src="assets/images/thumbnails/{img}" alt={imgAlt} />
		<div
			class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center font-bold"
		>
			<h2 class="text-3xl uppercase">{name}</h2>
			{#if !isAvailable}
				<h3 class="text-red-400 text-xl">Coming Soon</h3>
			{/if}
		</div>
	</div>
</a>
