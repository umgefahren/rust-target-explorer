import features from '$lib/assets/data/features.json';

export type Feature = {
	name: string;
	explanation: string;
	llvm: boolean;
};

export type Target = {
	name: string;
	cfgs: string[];
	cpus: string[];
	features: Feature[];
	arch: string;
	os: string;
	family: string;
};

export const features_map: Map<string, Feature[]> = new Map(Object.entries(features));
