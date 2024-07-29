import { cpus_on_arch } from '$lib/cpu';
import { error, redirect } from '@sveltejs/kit';
import { features_map } from '$lib/target';
import { base } from '$app/paths';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const arch: string = params.arch;
	const cpu_name = params.cpu;
	if (arch == 'mips' && cpu_name == 'mips5') {
		throw redirect(307, `${base}/cpu/mips64/mips5`);
	}
	const cpus = cpus_on_arch.get(arch);
	if (cpus === undefined) {
		return error(404, {
			message: 'Archtiecture not found'
		});
	}
	const cpu = cpus.find((cpu) => cpu.name === cpu_name);
	if (cpu === undefined) {
		return error(404, {
			message: 'CPU not found'
		});
	}

	const cpu_feats = new Set(cpu.features);

	const feats = features_map.get(arch);

	if (feats === undefined) {
		return error(500, {
			message: "Features map doesn't contain arch"
		});
	}

	const feats_enabled = feats.map((f) => cpu_feats.has(f.name));

	return {
		arch: arch,
		cpu: cpu,
		feats: feats,
		feats_enabled: feats_enabled
	};
}
