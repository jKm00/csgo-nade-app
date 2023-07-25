<script lang="ts">
	import StratSection from '$lib/features/account/page/StratSection.svelte';
	import TeamSection from '$lib/features/account/page/TeamSection.svelte';
	import UserInfo from '$lib/features/account/page/UserInfo.svelte';

	export let data;

	$: ({ profile, teams, strats, totalNumberOfStrats } = data);
</script>

<div class="w-default grid gap-14 mt-10">
	{#if profile}
		<UserInfo
			name={profile.name}
			username={profile?.username}
			profilePicture={profile.profilePicture.filename}
		/>
		<TeamSection {teams} />
		<StratSection username={profile.username} {strats} {totalNumberOfStrats} />
	{/if}
</div>
