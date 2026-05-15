export const mapPromptToTool = (message: string) => {
	const normalized = message.toLowerCase();

	//
	// Dashboard KPIs
	//

	if (normalized.includes("kpi") || normalized.includes("dashboard")) {
		return {
			tool: "get_dashboard_kpis",

			params: {},
		};
	}

	//
	// Crop Yield
	//

	if (normalized.includes("yield") || normalized.includes("production")) {
		return {
			tool: "get_crop_yield_analytics",

			params: {},
		};
	}

	//
	// Seasonal
	//

	if (normalized.includes("season")) {
		return {
			tool: "get_seasonal_analytics",

			params: {},
		};
	}

	//
	// Loss
	//

	if (normalized.includes("loss")) {
		return {
			tool: "get_loss_analysis",

			params: {},
		};
	}

	//
	// Farmer Productivity
	//

	if (normalized.includes("farmer") || normalized.includes("productivity")) {
		return {
			tool: "get_farmer_productivity",

			params: {},
		};
	}

	return null;
};
