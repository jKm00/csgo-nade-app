<script lang="ts">
	import { page } from '$app/stores';
	import type { Session } from '@supabase/supabase-js';

	$: ({ session, user } = $page.data);
</script>

<nav class="flex justify-between p-4">
	<div>
		<h1 class="font-bold uppercase"><a href="/">Csgo Strats</a></h1>
	</div>
	<ul class="flex gap-2">
		{#if session}
			{#if user}
				<li>
					<a href="/users/{user.uuid}">{user.username}</a>
				</li>
			{:else}
				<li>
					<a href="/users/{session.user.id}">{session.user.email}</a>
				</li>
			{/if}
			<li>
				<form action="/logout" method="POST">
					<button type="submit">Logout</button>
				</form>
			</li>
		{:else}
			<li><a href="/login">Login</a></li>
			<li><a href="/register">Register</a></li>
		{/if}
	</ul>
</nav>
