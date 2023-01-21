<script lang="ts">
	export let nades: string[];

	$: smokeAmount = nades.filter((nade) => nade === 'SMOKE').length;
	$: flashAmount = nades.filter((nade) => nade === 'FLASH').length;
	$: molotovAmount = nades.filter((nade) => nade === 'MOLOTOV').length;
	$: heAmount = nades.filter((nade) => nade === 'HE').length;
</script>

<section class="content card">
	<span class="item"
		><img
			class="item__icon"
			src="/assets/icons/smoke_icon.webp"
			alt="Smoke grenade"
		/>
		<p class="item__text">{smokeAmount}</p></span
	>
	<span class="item"
		><img
			class="item__icon"
			src="/assets/icons/flash_icon.webp"
			alt="Smoke grenade"
		/>
		<p class="item__text">{flashAmount}</p></span
	>
	<span class="item"
		><img
			class="item__icon"
			src="/assets/icons/molotov_icon.webp"
			alt="Smoke grenade"
		/>
		<p class="item__text">{molotovAmount}</p></span
	>
	<span class="item"
		><img
			class="item__icon"
			src="/assets/icons/he_icon.webp"
			alt="Smoke grenade"
		/>
		<p class="item__text">{heAmount}</p></span
	>
</section>

<style scoped>
	.content {
		display: flex;
		justify-content: space-around;
	}

	.item {
		display: flex;
		align-items: center;
	}

	.item__icon {
		height: 3rem;
	}

	.item__text {
		font-size: 1.5rem;
	}
</style>
