<script lang="ts">
	export let data;

	$: ({ user } = data);
</script>

<div />
<form action="" class="grid gap-4 max-w-sm m-auto mb-16">
	<div class="grid">
		<label class="font-bold" for="name">Name:</label>
		<input
			class="bg-neutral-800 rounded-sm p-2"
			type="text"
			id="name"
			name="name"
			placeholder={user?.name}
		/>
	</div>
	<div class="grid">
		<label class="font-bold" for="username">Username:</label>
		<input
			class="bg-neutral-800 rounded-sm p-2"
			type="text"
			id="username"
			name="username"
			placeholder={user?.username}
		/>
	</div>
	<button
		class="bg-green-400 px-2 py-1 rounded justify-self-end text-neutral-950 text-sm"
		type="submit">Save changes</button
	>
</form>

<form action="" class="grid gap-4 max-w-sm m-auto mb-16">
	<div class="grid">
		<label class="font-bold" for="email">Email:</label>
		<input
			class="bg-neutral-800 rounded-sm p-2"
			type="text"
			id="email"
			name="email"
			placeholder={user?.email}
		/>
	</div>
	<button
		class="bg-green-400 px-2 py-1 rounded justify-self-end text-neutral-950 text-sm"
		type="submit">Change email</button
	>
</form>

<form action="" class="grid gap-4 max-w-sm m-auto mb-16">
	<div class="grid">
		<label class="font-bold" for="currentPassword">Current password:</label>
		<input
			class="bg-neutral-800 rounded-sm p-2"
			type="password"
			id="currentPassword"
			name="currentPassword"
			placeholder="********"
		/>
	</div>
	<div class="grid">
		<label class="font-bold" for="newPassword">New password:</label>
		<input
			class="bg-neutral-800 rounded-sm p-2"
			type="password"
			id="newPassword"
			name="newPassword"
			placeholder="********"
		/>
	</div>
	<div class="grid">
		<label class="font-bold" for="confirmPassword">Confirm password:</label>
		<input
			class="bg-neutral-800 rounded-sm p-2"
			type="password"
			id="confirmPassword"
			name="confirmPassword"
			placeholder="********"
		/>
	</div>
	<button
		class="bg-green-400 px-2 py-1 rounded justify-self-end text-neutral-950 text-sm"
		type="submit">Change password</button
	>
</form>

<form action="" class="grid gap-4 max-w-sm m-auto mb-16">
	<h2 class="font-bold text-red-400">Danger zone</h2>
	<button
		class="bg-red-400/20 border-2 p-2 border-red-400 rounded text-red-400 hover:bg-red-400 hover:text-white focus-within:bg-red-400 focus-within:text-white transition-colors"
		>Delete account</button
	>
</form>
