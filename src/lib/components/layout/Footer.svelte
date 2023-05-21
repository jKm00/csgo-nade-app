<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";
  import { success } from "../feedback/customToast";

	export let version: string;
</script>

<footer class="text-neutral-500 text-sm text-center py-4">
	<p>Joakim Edvardsen &copy; 2023. All rights reserved</p>
	<p>Version {version}</p>
</footer>
