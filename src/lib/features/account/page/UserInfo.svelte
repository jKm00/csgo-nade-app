<script lang="ts">
	export let name: string;
	export let username: string;
	export let profilePicture: string;
</script>

<header class="flex flex-col gap-4 sm:flex-row items-center">
	<img class="rounded" src={profilePicture} alt={name} />
	<div class="grid text-center sm:text-left">
		<h1 class="font-bold text-2xl">{name}</h1>
		<p class="text-neutral-400">@{username}</p>
	</div>
</header>
