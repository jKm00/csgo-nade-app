<script lang="ts">
	import { Router, Link, Route } from 'svelte-navigator';
	import HomePage from './pages/HomePage.svelte';
	import MapPage from './pages/MapPage.svelte';
</script>

<Router>
	<Route path="/" component={HomePage} />
	<Route path="/maps/:map" let:params>
		<MapPage map={params.map} />
	</Route>
</Router>
