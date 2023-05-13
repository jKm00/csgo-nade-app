<script lang="ts">
	export let data;
</script>

<div class="grid gap-10">
	{#each data.users as user}
		<div class="grid gap-4 border-b pb-4">
			<div>
				<p>Email: {user.email}</p>
				<p>Username: {user.username}</p>
			</div>
			<div>
				<p>Authorities:</p>
				<ul class="pl-5 list-disc">
					{#each user.roles as role}
						<li>{role.Role.name}</li>
					{/each}
				</ul>
			</div>
		</div>
	{/each}
</div>
