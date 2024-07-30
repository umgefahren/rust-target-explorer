import type { PageLoad } from './$types';
import cpus from '$lib/assets/data/cpus.json';
import features from '$lib/assets/data/features.json';
import { features_map } from '$lib/target';

export const load: PageLoad = async ({ params: { arch, feature } }) => {
	const cpus_with_feature = cpus.filter(({ features }) => features.includes(feature));
	const feature_map = new Map(Object.entries(features));
	const extended_feature = features_map.get(arch)?.find(({ name }) => name === feature);
	return {
		arch,
		feature,
		cpus: cpus_with_feature,
		extended_feature
	};
};
