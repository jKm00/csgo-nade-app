<script lang="ts">
	interface Item {
		data: string[];
		link: string;
	}

	export let headers: string[];
	export let items: Item[] | null = null;
</script>

<div class="grid">
	<!-- Table headers -->
	<div
		class="grid font-bold bg-neutral-800 rounded p-4 mb-2"
		style={`grid-template-columns: repeat(${headers.length}, 1fr) 1rem`}
	>
		{#each headers as header}
			<p>
				{header}
			</p>
		{/each}
	</div>
	<!-- Rows -->
	{#if !items}
		<p class="grid place-items-center py-4">No data...</p>
	{:else}
		{#each items as row, index}
			<a href="/teams/{row.link}">
				<div
					class="grid items-center px-4 py-2 hover:bg-neutral-700 focus-within:bg-neutral-700 rounded
      {index % 2 !== 0 ? 'bg-neutral-800' : ''}"
					style={`grid-template-columns: repeat(${headers.length}, 1fr) 1rem`}
				>
					{#each row.data as data}
						<p>{data}</p>
					{/each}
					<p class="justify-self-end">
						<svg
							class="aspect-square w-3 fill-white"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 320 512"
							><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
								d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
							/></svg
						>
					</p>
				</div>
			</a>
		{/each}
	{/if}
</div>
