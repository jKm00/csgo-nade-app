<script lang="ts">
	export let map: string;
	export let thumbnail: string;
</script>

<div class="relative h-20 overflow-hidden rounded bg-neutral-800">
	<img class="-translate-y-1/2" src={thumbnail} alt={map} />
	<h1
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-2xl"
	>
		{map}
	</h1>
</div>
