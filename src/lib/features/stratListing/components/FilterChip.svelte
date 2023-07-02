<script lang="ts">
	export let label: string;
	export let value: string;
	export let color: string;
</script>

<p
	style="color: {color}; border-color: {color}"
	class="text-sm border rounded px-2 py-1"
>
	{label}: <span class="text-white">{value}</span>
</p>
