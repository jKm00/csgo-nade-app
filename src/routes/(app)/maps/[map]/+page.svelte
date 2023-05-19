<script lang="ts">
	export let data;

	$: ({ map } = data);
</script>

<h1>{map}</h1>
