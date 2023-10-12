<script lang="ts">
  export let img: string;
  export let imgAlt: string;
  export let name: string;
</script>

<a href="/strats?map={name}">
  <div
    class="relative group hover:scale-105 transition-all rounded overflow-hidden"
  >
    <div
      class="absolute h-full w-full bg-neutral-950/70 group-hover:bg-neutral-900/0"
    />
    <img src={img} alt={imgAlt} />
    <div
      class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center font-bold"
    >
      <h2 class="text-3xl uppercase">{name}</h2>
    </div>
  </div>
</a>
