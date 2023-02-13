<script lang="ts">
	import { goto } from '$app/navigation';
	import AUTH from '@/services/AuthService';
</script>

<section class="grid">
	<h1 class="span-2">Do you really want to sign out?</h1>
	<button class="btn align-right" on:click={() => goto('/')}>No</button>
	<button class="btn btn--accent align-left" on:click={() => AUTH.logout()}>Yes</button>
</section>

<style scoped>
	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.span-2 {
		grid-column: span 2;
	}

	.align-right {
		justify-self: end;
	}

	.align-left {
		justify-self: start;
	}

	.btn {
		padding: 1rem 2rem;
	}
</style>
