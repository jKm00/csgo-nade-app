<script lang="ts">
	export let data;

	$: ({ team } = data);
</script>

<h1>{team?.name}</h1>
