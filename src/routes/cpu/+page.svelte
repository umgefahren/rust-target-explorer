<script lang="ts">
	import { base } from '$app/paths';

	export let data;
	const arch = data.arch;
</script>

<div class="p-4">
	<div class="bg-blue-300 p-2 rounded-lg breadcrumbs">
		<ul>
			<li><a href="{base}/">Home</a></li>
			<li><a href="{base}/cpu/">CPU</a></li>
		</ul>
	</div>
</div>

<div class="p-4">
	<div class="bg-blue-300 p-2 rounded-lg">
		<h1>Architectures:</h1>
		<ul class="list-disc list-inside">
			{#each arch as a}
				<li><a href="{base}/cpu/{a}/">{a}</a></li>
			{/each}
		</ul>
	</div>
</div>
