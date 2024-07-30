import targets from '$lib/assets/data/data.json';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		targets: targets.map(({ name, arch, os, family, cfgs, cpus, features }) => ({
			name,
			arch,
			os,
			family,
			cfgs: cfgs.length,
			cpus: cpus.length,
			features: features.length
		}))
	};
};
