<script lang="ts">
	import TeamSection from '$lib/features/account/page/TeamSection.svelte';
	import UserInfo from '$lib/features/account/page/UserInfo.svelte';

	let name = 'Joakim Edvardsen';
	let username = 'jKm';
	let profilePicture = '/assets/images/profile_pictures/profile_2.png';

	let teams = [
		{
			name: 'DOT',
			org: 'DOT Esport',
			role: 'Main AWPer',
			joinedAt: new Date(),
		},
		{
			name: 'NIP',
			org: 'NIP',
			role: 'Entry fragger',
			joinedAt: new Date(),
		},
		{
			name: 'FAZE',
			org: 'FAZE Clan',
			role: 'In-game leader',
			joinedAt: new Date(),
		},
	];
</script>

<div class="w-default grid gap-8 mt-4">
	<UserInfo {name} {username} {profilePicture} />
	<TeamSection {teams} />
</div>
