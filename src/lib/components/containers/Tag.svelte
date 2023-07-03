<script lang="ts">
	export let color: 'red' | 'blue' | 'purple';

	// Have to do it like this for the tailwind compiler
	// to include the colors until I figure out how to do it proparly
	$: colorStyles = () => {
		if (color === 'red') {
			return 'bg-red-400/10 border-red-400 text-red-400 group-hover:bg-red-400 group-focus-within:bg-red-400';
		}
		if (color === 'blue') {
			return 'bg-blue-400/10 border-blue-400 text-blue-400 group-hover:bg-blue-400 group-focus-within:bg-blue-400';
		}
		if (color === 'purple') {
			return 'bg-purple-400/10 border-purple-400 text-purple-400 group-hover:bg-purple-400 group-focus-within:bg-purple-400';
		}
	};
</script>

<p
	class="border group-hover:text-white group-focus-within:text-white transition-colors rounded px-4 {colorStyles()}"
	style="background-color: ${color}"
>
	<slot />
</p>
