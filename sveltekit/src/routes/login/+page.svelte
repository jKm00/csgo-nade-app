<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
	$: previousPage = data.path;

	let username = '';
	let usernameActive = false;

	let password = '';
	let passwordActive = false;

	const handleSubmit = () => {
		// TODO: Handle login

		if (previousPage !== null) {
			goto(previousPage);
		} else {
			goto('/');
		}
	};
</script>

<section class="auth-section">
	<div class="content">
		<header class="header">
			<a href="/" class="back"
				><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
					><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
						d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
					/></svg
				>Home</a
			>
			<h1 class="title">Login</h1>
		</header>
		<form class="form" on:submit|preventDefault={handleSubmit}>
			<div class="input-wrapper">
				<label for="username" class="label" data-active={usernameActive}>Username</label>
				<input
					bind:value={username}
					on:focusin={() => (usernameActive = true)}
					on:focusout={() => (usernameActive = username.length !== 0)}
					type="text"
					id="username"
					class="input"
				/>
			</div>
			<div class="password-wrapper">
				<div class="input-wrapper">
					<label for="password" class="label" data-active={passwordActive}>Password</label>
					<input
						bind:value={password}
						on:focusin={() => (passwordActive = true)}
						on:focusout={() => (passwordActive = password.length !== 0)}
						type="password"
						id="password"
						class="input"
					/>
				</div>
				<a href="/" class="align-right link link--thin small-text underline">Forgot password?</a>
			</div>
			<button type="submit" class="btn btn--accent btn--large">Login</button>
			<p class="small-text">
				Don't have an account? <a href="/signup" class="link link--thin underline">Sign up here</a>
			</p>
		</form>
	</div>
	<img
		class="img"
		src="/assets/images/decoration/terrorist-smoking-cropped.jpg"
		alt="CSGO terrorist smoking a cigarette"
	/>
</section>

<p class="tip">Copyright &copy Joakim Edvardsen 2023. All rights reserved.</p>

<style scoped>
	.auth-section {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-areas: 'img content';

		background-color: var(--clr-card);
		box-shadow: var(--shadow);
		border-radius: var(--border-radius);
		overflow: hidden;
	}

	.img {
		grid-area: img;
	}

	.content {
		grid-area: content;

		display: grid;
		gap: 3rem;
		align-content: center;
		padding-inline: 4rem;
	}

	.header {
		display: grid;
		grid-template-columns: 20% 1fr 20%;
		align-items: center;
	}

	.back {
		display: flex;
		gap: 0.25rem;
		align-items: center;
	}

	.back svg {
		fill: #fff;
		height: 1rem;
	}

	.back:hover svg,
	.back:focus-visible svg {
		fill: var(--clr-accent);
	}

	.form {
		gap: 2rem;
	}

	.input-wrapper {
		position: relative;
	}

	.label {
		position: absolute;
		top: 50%;
		left: 1rem;
		transform: translateY(-50%);

		transition: transform 250ms ease-in-out;
	}

	.label[data-active='true'] {
		transform: translateY(-2.8rem) translateX(-1.5rem) scale(0.8);
	}

	.input {
		width: 100%;
		padding: 0.75rem 0.75rem;
		border: 1px solid #737373;
		border-radius: var(--border-radius);
		background-color: var(--clr-card);
	}

	.password-wrapper {
		display: grid;
	}

	.align-right {
		text-align: right;
	}

	.small-text {
		font-size: 0.8rem;
	}
</style>
