<script lang="ts">
	import StratSection from '$lib/features/account/page/StratSection.svelte';
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

	let strats = [
		{
			id: 1,
			name: 'B site execute',
			authorUsername: 'jKm',
			thumbnail: '/assets/images/maps/ancient/a_site.webp',
			createdAt: new Date(),
			side: 'T',
			position: 'A site',
			map: 'Ancient',
		},
		{
			id: 1,
			name: 'B site execute',
			authorUsername: 'jKm',
			thumbnail: '/assets/images/maps/ancient/a_site.webp',
			createdAt: new Date(),
			side: 'T',
			position: 'A site',
			map: 'Ancient',
		},
		{
			id: 1,
			name: 'B site execute',
			authorUsername: 'jKm',
			thumbnail: '/assets/images/maps/ancient/a_site.webp',
			createdAt: new Date(),
			side: 'T',
			position: 'A site',
			map: 'Ancient',
		},
		{
			id: 1,
			name: 'B site execute',
			authorUsername: 'jKm',
			thumbnail: '/assets/images/maps/ancient/a_site.webp',
			createdAt: new Date(),
			side: 'T',
			position: 'A site',
			map: 'Ancient',
		},
		{
			id: 1,
			name: 'B site execute',
			authorUsername: 'jKm',
			thumbnail: '/assets/images/maps/ancient/a_site.webp',
			createdAt: new Date(),
			side: 'T',
			position: 'A site',
			map: 'Ancient',
		},
	];
</script>

<div class="w-default grid gap-10 mt-10">
	<UserInfo {name} {username} {profilePicture} />
	<TeamSection {teams} />
	<StratSection {username} {strats} />
</div>
