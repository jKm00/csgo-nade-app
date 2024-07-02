<script lang="ts">
  import { ChevronLeft } from 'lucide-svelte';
  	import { type SettingsGroupRoute, useSettingsRoutes } from './routes.js';

	export let data;

	$: ({ session } = data);

	let routes: SettingsGroupRoute[] = [];
	$: if (session) {
		routes = useSettingsRoutes(session?.user.id);
	}
</script>

<div
	class="grid gap-4 w-default px-4 mt-5"
	style="grid-template-columns: 10rem 1fr"
>
	<aside>
		<a
			class="flex items-center gap-2 text-sm mb-10 underline"
			href="/users/{session?.user.id}"
			><ChevronLeft />Back to profile</a
		>
		{#each routes as routeGroup}
			<h2 class="text-muted-foreground font-bold uppercase text-sm mb-2">
				{routeGroup.groupTitle}
			</h2>
			<ul>
				{#each routeGroup.routes as route}
					<li>
						<a class="hover:underline focus-within:underline" href={route.link}>{route.label}</a>
					</li>
				{/each}
			</ul>
		{/each}
	</aside>
	<main>
		<slot><!-- optional fallback --></slot>
	</main>
</div>
