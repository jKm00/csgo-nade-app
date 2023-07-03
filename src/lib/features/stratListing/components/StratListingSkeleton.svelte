<script lang="ts">
</script>

{#each { length: 8 } as _}
	<div
		class="bg-neutral-800 rounded shadow overflow-hidden text-transparent animate-pulse"
	>
		<div class="grid place-items-center aspect-[16/6] bg-neutral-700" />
		<div class="grid p-4">
			<h2 class="text-2xl font-bold bg-neutral-700 rounded">Dummy strat</h2>
			<p class="bg-neutral-700 rounded w-fit">Some dummy text again</p>
			<div class="flex gap-2 mt-6">
				<p class="bg-neutral-700 rounded px-4">CT</p>
				<p class="bg-neutral-700 rounded px-4">B site</p>
			</div>
		</div>
	</div>
{/each}
