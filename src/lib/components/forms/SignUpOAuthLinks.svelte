<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<div class="grid gap-4 my-4">
	<p class="text-sm text-muted-foreground text-center">Or log in using:</p>
	<div class="grid grid-cols-2 gap-2">
		<Button
			variant="outline"
			class="bg-neutral-950 text-white flex gap-2 items-center justify-center group"
			href="/login"
			><img
				class="w-5 invert group-hover:invert-0 dark:group-hover:invert"
				src="/assets/images/logos/github-logo.png"
				alt="GitHub logo"
			/>GitHub</Button
		>
		<Button
			variant="outline"
			class="bg-indigo-500 text-white flex gap-2 items-center justify-center group"
			href="/login"
			><img
				class="w-5 group-hover:invert dark:group-hover:invert-0"
				src="/assets/images/logos/discord-logo.png"
				alt="Discord logo"
			/>Discord</Button
		>
	</div>
</div>
