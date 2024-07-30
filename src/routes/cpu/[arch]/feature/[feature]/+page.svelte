<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let { cpus, extended_feature } = data;
</script>

<svelte:head>
	<title>
		Details on the {data.cpus.length} cpus that support the {data.feature} feature, accroding to the
		Rust compiler.
	</title>
	<meta
		name="description"
		content="Details on the {data.cpus
			.length} cpus that support the {data.feature} feature, accroding to the Rust compiler."
	/>
</svelte:head>

<div class="p-4">
	<div class="bg-blue-300 p-2 rounded-lg breadcrumbs">
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/cpu/">CPU</a></li>
			<li><a href="/cpu/{data.arch}">{data.arch}</a></li>
			<li><a href="/cpu/{data.arch}/feature/{data.feature}">{data.feature}</a></li>
		</ul>
	</div>
</div>

<div class="p-4">
	<div class="bg-blue-300 p-2 rounded-lg">
		<h1 class="text-2xl m-3">{data.feature}</h1>
		<p>{data.extended_feature.explanation}</p>
		<h2 class="text-xl m-3">CPUs:</h2>
		<ul class="list-disc list-inside">
			{#each cpus as cpu}
				<li><a href="/cpu/{cpu.arch}/{cpu.name}">{cpu.name}</a></li>
			{/each}
		</ul>
	</div>
</div>
