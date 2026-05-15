const CROPS = ["Wheat", "Rice", "Cotton", "Maize", "Bajra"];

export const extractCrop = (message: string) => {
	for (const crop of CROPS) {
		if (message.toLowerCase().includes(crop.toLowerCase())) {
			return crop;
		}
	}

	return null;
};
