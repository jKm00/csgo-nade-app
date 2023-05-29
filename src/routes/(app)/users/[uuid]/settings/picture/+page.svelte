<script lang="ts">
	import toast from 'svelte-french-toast';
	import { fade } from 'svelte/transition';

	export let data;
	export let form;

	$: ({ img_links, profile } = data);

	$: if (form?.error) {
		toast.error(form.error, {
			style: 'background: #333; color:#fff',
		});
	}

	let success = false;

	$: if (form?.success) showSuccess();

	const showSuccess = () => {
		success = true;
		setTimeout(() => {
			success = false;
		}, 2000);
	};
</script>

<main>
	{#if img_links}
		<form class="flex flex-wrap gap-4" method="POST">
			{#each img_links as img}
				<button formaction="?/updateProfilePicture&picture={img}">
					<img
						class="rounded-full w-24 border-red-400 {profile?.profile_picture ===
						img
							? 'border-8'
							: ''}"
						src="http://localhost:54321/storage/v1/object/public/profile_pictures/{img}"
						alt={img}
					/>
				</button>
			{/each}
		</form>
		{#if success}
			<p
				class="text-sm text-center text-green-400 mt-10"
				out:fade={{ duration: 200 }}
			>
				Picture updated
			</p>
		{/if}
	{:else}
		<p class="text-sm text-red-400">
			Failed to fetch all images. Please try again later
		</p>
	{/if}
</main>
