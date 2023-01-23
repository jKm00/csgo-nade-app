<script lang="ts">
  import './styles.css';
</script>

<svelte:head>
  <title>CSGO Strats</title>
  <link rel="icon" type="image/svg" href="assets/favicons/favicon.ico" />
</svelte:head>

<main class="app">
  <slot />
</main>

<style scoped>
  .app {
    width: clamp(500px, 90vw, 1000px);
    margin: 2rem auto;
    padding-inline: 1rem;
    text-align: center;
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
</style>