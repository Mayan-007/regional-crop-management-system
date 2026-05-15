const SEASONS = ["RABI_2025", "KHARIF_2025", "ZAID_2025"];

export const extractSeason = (message: string) => {
	for (const season of SEASONS) {
		const formatted = season.toLowerCase().replace("_", " ");

		if (message.toLowerCase().includes(formatted)) {
			return season;
		}
	}

	return null;
};
