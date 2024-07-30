import type { PageLoad } from './$types';
import cpus from '$lib/assets/data/cpus.json';
import { features_map } from '$lib/target';

export const load: PageLoad = async ({ params: { arch, feature } }) => {
	const cpus_with_feature = cpus
		.filter(({ features }) => features.includes(feature))
		.map(({ name }) => name);
	const extended_feature = features_map.get(arch)?.find(({ name }) => name === feature);
	return {
		arch,
		feature,
		cpus: [...new Set(cpus_with_feature)].toSorted(),
		extended_feature
	};
};
