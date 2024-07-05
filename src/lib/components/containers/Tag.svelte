<script lang="ts">
	import { MapPin, SeparatorVertical, Gamepad, Swords } from 'lucide-svelte'

	const icons = {
		side: Swords,
		position: MapPin,
		game: Gamepad,
	} as const

	type Type = keyof typeof icons;

	export let type: Type
</script>

<p
	class="flex items-center text-xs"
>
	<svelte:component this={icons[type]} class="mr-1 w-4 h-4" />
	<slot />
</p>
