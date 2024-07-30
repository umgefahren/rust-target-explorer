import { cpus_on_arch } from '$lib/cpu';
import { features_map } from '$lib/target';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params: { arch } }) => {
	const cpus = cpus_on_arch.get(arch)?.toSorted((a, b) => a.name.localeCompare(b.name));
	const feats = features_map.get(arch)?.toSorted((a, b) => a.name.localeCompare(b.name));
	const cpus_feats_enabled = cpus?.map((cpu) => {
		const cpu_feats = new Set(cpu.features);
		return feats?.map((f) => cpu_feats.has(f.name));
	});
	return {
		arch,
		cpus,
		feats,
		cpus_feats_enabled: cpus_feats_enabled
	};
};
