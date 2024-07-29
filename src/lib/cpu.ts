import type { Feature, Target } from './target';
import cpus from '$lib/assets/data/cpus.json';

export type Cpu = {
	name: string;
	arch: string;
	targets: string[];
	endianess: string;
	features: string[];
};

export const cpus_on_arch: Map<string, Cpu[]> = new Map();

cpus.forEach((cpu) => {
	if (cpus_on_arch.has(cpu.arch)) {
		const cur = cpus_on_arch.get(cpu.arch);
		cur?.push(cpu);
		if (cur != undefined) {
			cpus_on_arch.set(cpu.arch, cur);
		}
	} else {
		cpus_on_arch.set(cpu.arch, [cpu]);
	}
});
