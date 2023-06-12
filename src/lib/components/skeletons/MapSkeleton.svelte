{#each { length: 10 } as _}
	<div
		class="bg-neutral-800 rounded shadow overflow-hidden text-transparent animate-pulse"
	>
		<div class="aspect-[16/6] bg-neutral-700" />
		<div class="grid p-4">
			<h2 class="text-2xl bg-neutral-700 rounded">A strat title</h2>
			<p class="text-transparent">dummy</p>
			<div class="flex gap-4 mt-6">
				<p class="bg-neutral-700 border border-neutral-700 rounded-full px-4">
					CT
				</p>

				<p class="bg-neutral-700 border border-neutral-700 rounded-full px-4">
					A site
				</p>
			</div>
		</div>
	</div>
{/each}
