<script lang="ts">
  export let data;

  $: ({ members } = data);
</script>

<h1>Active players in lobby:</h1>

<ul>
  {#each members as member}
    <li>{member}</li>
  {/each}
</ul>
