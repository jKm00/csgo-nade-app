<div class="grid grid-cols-main-small gap-4 text-transparent animate-pulse">
	{#each { length: 12 } as _}
		<!-- Dummy card -->
		<div class="grid gap-4 bg-neutral-800 rounded shadow p-4">
			<div class="flex justify-between items-center">
				<h3 class="text-xl font-bold bg-neutral-700 rounded">A smokes</h3>
				<svg
					class="fill-transparent"
					xmlns="http://www.w3.org/2000/svg"
					height="1em"
					viewBox="0 0 320 512"
					><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
						d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
					/></svg
				>
			</div>
			<div class="flex gap-4 justify-between text-sm">
				<p class="bg-neutral-700 rounded">Creator:</p>
				<p class="bg-neutral-700 rounded">Created at:</p>
				<p class="bg-neutral-700 rounded">Team:</p>
			</div>
		</div>
	{/each}
</div>
