<script lang="ts">
	import type { Cpu } from '$lib/cpu';
	import type { Feature, features_map } from '$lib/target';

	export let data: {
		arch: string;
		cpus: Cpu[];
		feats: Feature[];
		cpus_feats_enabled: boolean[][];
	};
    let with_llvm: boolean = false
    $: feats = data.feats.filter((f) => (f.llvm && with_llvm) || !f.llvm)
    $: cpu_feats_enabled = data.cpus_feats_enabled.map((c) => c.filter((v, idx) => idx < feats.length))
</script>

<svelte:head>
	<title>Overview of all cpus with the architecture { data.arch } of the Rust compiler.</title>
	<meta name="description" content="Overview of all cpus with the architecture { data.arch } of the Rust compile.">
</svelte:head>

<div class="p-4">
	<div class="bg-blue-300 p-2 rounded-lg breadcrumbs">
		<ul>
            <li><a href="/">Home</a></li>
			<li><a href="/cpu/">CPU</a></li>
			<li><a href="/cpu/{data.arch}">{data.arch}</a></li>
		</ul>
	</div>
</div>

<div class="p-4">
	<div class="bg-blue-300 p-2 rounded-lg">
		<h1 class="text-2xl">CPUs:</h1>
		<ul class="list-disc list-inside">
			{#each data.cpus as a}
				<li><a href="/cpu/{data.arch}/{a.name}/">{a.name}</a></li>
			{/each}
		</ul>
        <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">With LLVM only</span> 
              <input type="checkbox" bind:checked={with_llvm}  class="checkbox" />
            </label>
          </div>
		<div class="overflow-scroll">
			<table class="m-2">
				<thead>
					<tr>
						<th class="vertical Text p-2 border-4 border-black bg-black text-white h-fit"
							><span>Name</span></th
						>
						{#each feats as feature}
							<th class="vertical Text p-2 border-4 border-black h-fit w-10"
								><span>{feature.name}</span></th
							>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each data.cpus as cpu, idx}
						<tr>
							<td class="p-2 border-4 border-black bg-black text-white">{cpu.name}</td>
							{#each cpu_feats_enabled[idx] as en, idy}
								{#if en}
									<td class="p-2 border-4 border-black bg-green-400 text-center align-middle">
										✅
									</td>
                                {:else if !en && data.feats[idy].llvm}
									<td class="p-2 border-4 border-black bg-yellow-400 text-center align-middle">
										⚙️
									</td>
								{:else}
									<td class="p-2 border-4 border-black bg-red-400 text-center align-middle">
										⛔️
									</td>
								{/if}
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
