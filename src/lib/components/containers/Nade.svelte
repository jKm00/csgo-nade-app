<script lang="ts">
	export let type: 'smoke' | 'flash' | 'molotov' | 'he' | 'decoy';
	export let amount: number;
</script>

<span class="flex">
	{type}: {amount}
</span>
