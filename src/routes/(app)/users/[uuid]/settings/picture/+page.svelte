<script lang="ts">
	import { toast } from '$lib/components/feedback/toast/toastStore.js';
	import { fade } from 'svelte/transition';

	export let data;
	export let form;

	$: ({ images, profile } = data);

	$: if (form?.error) {
		toast.push({
			type: 'error',
			title: 'Error',
			desc: form.error,
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
	{#if images}
		<form class="flex flex-wrap gap-4" method="POST">
			{#each images as image}
				<button formaction="?/updateProfilePicture&picture={image.id}">
					<img
						class="rounded-full w-24 border-red-400 {profile?.profilePicture
							.filename === image.filename
							? 'border-8'
							: ''}"
						src={`/assets/images/profile_pictures/${image.filename}`}
						alt={image.filename}
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
