<script lang="ts">
	import { Router, Link, Route } from 'svelte-navigator';
	import HomePage from '@/pages/HomePage.svelte';
	import MapPage from '@/pages/MapPage.svelte';
</script>

<Router>
	<Route path="/">
		<HomePage />
	</Route>
	<Route path="/maps/:map" let:params>
		<MapPage mapName={params.map} />
	</Route>
</Router>
