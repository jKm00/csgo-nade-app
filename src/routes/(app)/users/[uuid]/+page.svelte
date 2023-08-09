<script lang="ts">
	import StratSlider from '$lib/features/stratListing/components/StratSlider.svelte';
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
		<StratSlider {strats} {totalNumberOfStrats} redirect="user" />
	{/if}
</div>
