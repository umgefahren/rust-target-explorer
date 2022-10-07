<script lang="ts">
	import { base } from '$app/paths';
	import targets from '$lib/assets/data/data.json';

	import type { Target, Feature } from '$lib/target';

	enum SortBy {
		Name,
		Cfgs,
		Cpus,
		Features,
		Arch,
		Os,
		Family
	}

	function extract_feature(t: Target, by: SortBy): Feature[] | string | string[] {
		if (by == SortBy.Name) {
			return t.name;
		} else if (by == SortBy.Cfgs) {
			return t.cfgs;
		} else if (by == SortBy.Cpus) {
			return t.cpus;
		} else if (by == SortBy.Features) {
			return t.features;
		} else if (by == SortBy.Arch) {
			return t.arch;
		} else if (by == SortBy.Os) {
			return t.os;
		} else if (by == SortBy.Family) {
			return t.family;
		}
		throw new Error('Fuuuuuckk');
	}

	function sort_by_property(t: Target[], by: SortBy): Target[] {
		return t.sort((a, b) => {
			const a_prop = extract_feature(a, by);
			const b_prop = extract_feature(b, by);
			if (a_prop < b_prop) {
				return -1;
			}
			if (a_prop > b_prop) {
				return 1;
			}
			return 0;
		});
	}

	export let sort_by: SortBy = SortBy.Name;

	$: ts = sort_by_property(targets, sort_by);
</script>

<svelte:head>
	<title>Overview of all targets Rust can currently compile to.</title>
	<meta name="description" content="Overview of all targets Rust can currently compile to. Output of rustc --print target-list">
</svelte:head>

<div class="p-4">
	<div class="bg-blue-300 p-2 rounded-lg breadcrumbs">
		<ul>
            <li><a href="{base}/">Home</a></li>
			<li><a href="{base}/targets">Targets</a></li>
		</ul>
	</div>
</div>

<div class="p-4 w-screen">
	<table class="border-collapse border border-slate-800 w-full">
		<thead>
			<tr class="bg-blue-500 rounded-lg border-black">
				<th class="border border-slate-700 p-4">Target</th>
				<th class="border border-slate-700 p-4">Arch</th>
				<th class="border border-slate-700 p-4">OS</th>
				<th class="border border-slate-700 p-4">Family</th>
				<th class="border border-slate-700 p-4">Cfgs</th>
				<th class="border border-slate-700 p-4">Cpus</th>
				<th class="border border-slate-700 p-4">Features</th>
			</tr>
			<tr class="bg-blue-500">
				<th
					class="border border-slate-700 pt-2 pb-2 pl-4 pr-4"
					on:click={() => (sort_by = SortBy.Name)}
					>Sort By {#if sort_by == SortBy.Name} 🔽 {:else} ⏹ {/if}</th
				>
				<th
					class="border border-slate-700 pt-2 pb-2 pl-4 pr-4"
					on:click={() => (sort_by = SortBy.Arch)}
					>Sort By {#if sort_by == SortBy.Arch} 🔽 {:else} ⏹ {/if}</th
				>
				<th
					class="border border-slate-700 pt-2 pb-2 pl-4 pr-4"
					on:click={() => (sort_by = SortBy.Os)}
					>Sort By {#if sort_by == SortBy.Os} 🔽 {:else} ⏹ {/if}</th
				>
				<th
					class="border border-slate-700 pt-2 pb-2 pl-4 pr-4"
					on:click={() => (sort_by = SortBy.Family)}
					>Sort By {#if sort_by == SortBy.Family} 🔽 {:else} ⏹ {/if}</th
				>
				<th
					class="border border-slate-700 pt-2 pb-2 pl-4 pr-4"
					on:click={() => (sort_by = SortBy.Cfgs)}
					>Sort By {#if sort_by == SortBy.Cfgs} 🔽 {:else} ⏹ {/if}</th
				>
				<th
					class="border border-slate-700 pt-2 pb-2 pl-4 pr-4"
					on:click={() => (sort_by = SortBy.Cpus)}
					>Sort By {#if sort_by == SortBy.Cpus} 🔽 {:else} ⏹ {/if}</th
				>
				<th
					class="border border-slate-700 pt-2 pb-2 pl-4 pr-4"
					on:click={() => (sort_by = SortBy.Features)}
					>Sort By {#if sort_by == SortBy.Features} 🔽 {:else} ⏹ {/if}</th
				>
			</tr>
		</thead>
		<tbody>
			{#each ts as target}
				<tr class="bg-blue-300">
					<td class="border border-slate-700 p-2"><a href="{base}/targets/{target.name}">{target.name}</a></td>
					<td class="border border-slate-700 p-2"><a href="{base}/cpu/{target.arch}">{target.arch}</a></td>
					<td class="border border-slate-700 p-2">{target.os}</td>
					<td class="border border-slate-700 p-2">{target.family}</td>
					<td class="border border-slate-700 p-2">{target.cfgs.length}</td>
					<td class="border border-slate-700 p-2"><a href="{base}/cpu/{target.arch}">{target.cpus.length}</a></td>
					<td class="border border-slate-700 p-2">{target.features.length}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
