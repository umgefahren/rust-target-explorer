import cpus from '$lib/assets/data/cpus.json';
import { cpus_on_arch, type Cpu } from '$lib/cpu';
import { features_map } from '$lib/target';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const arch = params.arch;
	const cpus = cpus_on_arch.get(arch);
	const feats = features_map.get(arch);
	const cpus_feats_enabled = cpus?.map((cpu) => {
		const cpu_feats = new Set(cpu.features);
		return feats?.map((f) => cpu_feats.has(f.name));
	});
	return {
		arch: params.arch,
		cpus: cpus,
		feats: feats,
		cpus_feats_enabled: cpus_feats_enabled
	};
}
