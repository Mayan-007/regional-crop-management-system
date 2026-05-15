const DISTRICTS = ["Ahmedabad", "Surat", "Rajkot"];

const BLOCKS = ["Sanand", "Daskroi", "Bardoli"];

export const extractGeography = (message: string) => {
	const found: any = {};

	for (const district of DISTRICTS) {
		if (message.toLowerCase().includes(district.toLowerCase())) {
			found.district = district;
		}
	}

	for (const block of BLOCKS) {
		if (message.toLowerCase().includes(block.toLowerCase())) {
			found.block = block;
		}
	}

	return found;
};
