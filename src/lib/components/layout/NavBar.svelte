<script lang="ts">
	import type { User } from '@prisma/client';

	export let user: User | null;
</script>

<nav class="flex justify-between p-4">
	<div>
		<h1 class="font-bold uppercase"><a href="/">Csgo Strats</a></h1>
	</div>
	<ul class="flex gap-2">
		{#if user}
			<li><a href="/users/{user.username}">{user.username}</a></li>
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
