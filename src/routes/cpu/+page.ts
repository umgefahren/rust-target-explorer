import type { PageLoad } from './$types';
import cpus from '$lib/assets/data/cpus.json';

export const load: PageLoad = () => {
	const arch = Array.from(new Set(cpus.map((cpu) => cpu.arch))).toSorted();
	return {
		arch
	};
};
