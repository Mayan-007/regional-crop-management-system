import { extractCrop } from "./crop.extractor";

import { extractGeography } from "./geography.extractor";

import { extractSeason } from "./season.extractor";

export const extractEntities = (message: string) => {
	const geography = extractGeography(message);

	const crop = extractCrop(message);

	const season = extractSeason(message);

	return {
		...geography,

		crop,

		season,
	};
};
