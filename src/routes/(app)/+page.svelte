<script lang="ts">
  import MapThumbnail from "$lib/components/containers/MapThumbnail.svelte";

  const MAPS = [
    {
      name: "Inferno",
      thumbnail: "inferno_compressed.webp",
    },
    {
      name: "Mirage",
      thumbnail: "mirage_compressed.webp",
    },
    {
      name: "Nuke",
      thumbnail: "nuke_compressed.webp",
    },
    {
      name: "Overpass",
      thumbnail: "overpass_compressed.webp",
    },
    {
      name: "Vertigo",
      thumbnail: "vertigo_compressed.webp",
    },
    {
      name: "Ancient",
      thumbnail: "ancient_compressed.webp",
    },
    {
      name: "Anubis",
      thumbnail: "anubis_compressed.webp",
    },
  ];

  export let data;

  $: ({ session } = data);

  const user = null;
</script>

{#if !user}
  <p
    class="absolute top-10 left-1/2 -translate-x-1/2 text-center text-sm text-yellow-400 bg-yellow-400/10 py-2 px-4 rounded border border-yellow-400"
  >
    Your account is not completely setup. <a
      class="underline"
      href="/users/{session?.user.user_metadata.username}/settings"
      >Go to account</a
    > to finish setting up your profile
  </p>
{/if}

<main class="grid gap-4 grid-cols-main mt-20">
  {#each MAPS as map}
    <MapThumbnail
      img={map.thumbnail}
      imgAlt={`${map.name} thumbnail`}
      name={map.name}
    />
  {/each}
</main>
