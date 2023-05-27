<script lang="ts">
	export let data;

	$: ({ session } = data);
</script>

<div
	class="grid gap-4 w-default px-4 mt-5"
	style="grid-template-columns: 10rem 1fr"
>
	<aside>
		<a
			class="flex items-center gap-2 text-sm mb-10 underline"
			href="/users/{session?.user.id}"
			><svg
				class="w-2 fill-white"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 320 512"
				><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
				/></svg
			>Back to profile</a
		>
		<h2 class="text-neutral-400 font-bold uppercase text-sm mb-2">General</h2>
		<ul>
			<li>
				<a
					class="hover:underline focus-within:underline"
					href="/users/{session?.user.id}/settings">Profile settings</a
				>
			</li>
		</ul>
	</aside>
	<main>
		<slot><!-- optional fallback --></slot>
	</main>
</div>
