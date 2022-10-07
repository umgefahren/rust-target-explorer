<script lang="ts">
	import { base } from '$app/paths';
	import { cpus_on_arch } from '$lib/cpu';
import type { Target } from '$lib/target';
	export let data: Target;
</script>

<svelte:head>
	<title>Overview of the { data.name } Rust target.</title>
	<meta name="description" content="Overview of the {data.name} Rust target.">
</svelte:head>

<div class="p-4">
	<div class="bg-blue-300 p-2 rounded-lg breadcrumbs">
		<ul>
            <li><a href="{base}/">Home</a></li>
			<li><a href="{base}/targets/">Target</a></li>
			<li>{data.name}</li>
		</ul>
	</div>
</div>

<div class="p-4 w-screen">
	<div class="bg-slate-100 p-8 rounded-lg">
		<h2 class="card-title">{data.name}</h2>
		<table class="border-4">
			<tbody>
				<tr>
					<td class="border-4 p-2"> Arch </td>
					<td class="border-4 p-2">
						<a href="{base}/cpu/{data.arch}">{data.arch}</a>
					</td>
				</tr>
				<tr>
					<td class="border-4 p-2"> Family </td>
					<td class="border-4 p-2">
						{data.family}
					</td>
				</tr>
				<tr>
					<td class="border-4 p-2">OS</td>
					<td class="border-4 p-2">{data.os}</td>
				</tr>
			</tbody>
		</table>
		<div class="mt-4 bg-blue-300 p-3 rounded-lg">
			<h2>CFGs:</h2>
			<ul class="list-disc list-inside">
				{#each data.cfgs as cfg}
					<li><code>{cfg}</code></li>
				{/each}
			</ul>
		</div>
		<div class="mt-4 bg-blue-300 p-3 rounded-lg">
			<h2>CPUs</h2>
			<ul class="list-disc list-inside">
				{#each data.cpus as cpu}
					<li><a href="{base}/cpu/{data.arch}/{cpu}"><code>{cpu}</code></a></li>
				{/each}
			</ul>
		</div>
        <table class="border-4 mt-4 w-full">
            <thead class="bg-blue-300">
                <tr>
                    <th class="border-4 p-2">Feature Name</th>
                    <th class="border-4 p-2">Feature Explanation</th>
                    <th class="border-4 p-2">LLVM</th>
                </tr>
            </thead>
            <tbody>
                {#each data.features as feature}
                    <tr>
                        <td class="border-4 p-2">{feature.name}</td>
                        <td class="border-4 p-2">{feature.explanation}</td>
                        <td class="border-4 p-2 text-center">
                            {#if feature.llvm}
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
