<div class="grid grid-cols-main-small gap-4 text-transparent animate-pulse">
	{#each { length: 10 } as _}
		<!-- Dummy card -->
		<div class="bg-neutral-800 rounded shadow overflow-hidden">
			<div class="aspect-[16/6] object-cover bg-neutral-700" />
			<div class="grid p-4">
				<h2 class="text-2xl font-bold bg-neutral-700 rounded">
					Dummy strat name
				</h2>
				<ul class="flex flex-wrap gap-x-8 text-sm text-transparent mt-1">
					<li>
						<p class="bg-neutral-700 rounded">Username</p>
					</li>
					<li>
						<p class="bg-neutral-700 rounded">Teamname</p>
					</li>
					<li class="bg-neutral-700 rounded">Date</li>
				</ul>
				<p class="mt-4 bg-neutral-700 rounded">
					A short description of the strat
				</p>
				<p class="justify-self-end text-sm bg-neutral-700 rounded mt-1">
					Check it out
				</p>
			</div>
		</div>
	{/each}
</div>
