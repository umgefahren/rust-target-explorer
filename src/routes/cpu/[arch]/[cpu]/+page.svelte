<script lang="ts">
	import { base } from '$app/paths';
	import type { Cpu, cpus_on_arch } from '$lib/cpu';
	import type { Feature } from '$lib/target';

	export let data: {
		arch: string;
		cpu: Cpu;
		feats: Feature[];
		feats_enabled: boolean[];
	};

	if (data.cpu === undefined) {
		data.cpu = {
			name: 'undefined',
			arch: data.arch,
			targets: [],
			endianess: 'undefined',
			features: []
		};
	}
</script>

<svelte:head>
	<title
		>Details on the {data.cpu.name} on the {data.arch} architecture and its support in the Rust compiler.</title
	>
	<meta
		name="description"
		content="Details on the {data.cpu
			.name} on the {data.arch} architecture and its support in the Rust compiler."
	/>
</svelte:head>

<div class="p-4">
	<div class="bg-blue-300 p-2 rounded-lg breadcrumbs">
		<ul>
			<li><a href="{base}/">Home</a></li>
			<li><a href="{base}/cpu/">CPU</a></li>
			<li><a href="{base}/cpu/{data.arch}">{data.arch}</a></li>
			<li><a href="{base}/cpu/{data.arch}/{data.cpu.name}">{data.cpu.name}</a></li>
		</ul>
	</div>
</div>

<div class="p-4">
	<div class="bg-blue-300 p-2 rounded-lg">
		<h1 class="text-2xl m-3">{data.cpu.name}</h1>
		<table class="border-4 m-3">
			<tr>
				<td class="border-4 p-2">Name</td>
				<td class="border-4 p-2">{data.cpu.name}</td>
			</tr>
			<tr>
				<td class="border-4 p-2">Architecture</td>
				<td class="border-4 p-2">{data.cpu.arch}</td>
			</tr>
			<tr>
				<td class="border-4 p-2">Endianess</td>
				<td class="border-4 p-2">{data.cpu.endianess}</td>
			</tr>
		</table>

		<h2 class="text-xl m-3">Targets:</h2>
		<ul class="list-disc list-inside">
			{#each data.cpu.targets as target}
				<li><a href="{base}/targets/{target}">{target}</a></li>
			{/each}
		</ul>
		<table class="border-4 m-3">
			<thead>
				<tr
					class="
                bg-blue-500"
				>
					<td class="border-4 p-2">Name</td>
					<td class="border-4 p-2">Explanation</td>
					<td class="border-4 p-2">LLVM only</td>
					<td class="border-4 p-2">Enabled</td>
				</tr>
			</thead>
			<tbody>
				{#each data.feats as feature, idx}
					<tr>
						<td class="border-4 p-2">{feature.name}</td>
						<td class="border-4 p-2">{feature.explanation}</td>
						<td class="border-4 p-2">
							{#if feature.llvm}
								✅
							{:else}
								⛔️
							{/if}
						</td>
						<td class="border-4 p-2">
							{#if data.feats_enabled[idx]}
								✅
							{:else}
								⛔️
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
