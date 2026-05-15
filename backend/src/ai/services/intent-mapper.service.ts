import { extractEntities } from "../extractors/entity-extractor.service";

export const mapPromptToTool = (message: string) => {
	const normalized = message.toLowerCase();

	const entities = extractEntities(message);

	//
	// Dashboard KPIs
	//

	if (normalized.includes("kpi") || normalized.includes("dashboard")) {
		return {
			tool: "get_dashboard_kpis",

			params: entities,
		};
	}

	//
	// Crop Yield
	//

	if (normalized.includes("yield") || normalized.includes("production")) {
		return {
			tool: "get_crop_yield_analytics",

			params: entities,
		};
	}

	//
	// Seasonal
	//

	if (normalized.includes("season")) {
		return {
			tool: "get_seasonal_analytics",

			params: entities,
		};
	}

	//
	// Loss
	//

	if (normalized.includes("loss")) {
		return {
			tool: "get_loss_analysis",

			params: entities,
		};
	}

	//
	// Farmer Productivity
	//

	if (normalized.includes("farmer") || normalized.includes("productivity")) {
		return {
			tool: "get_farmer_productivity",

			params: entities,
		};
	}

	return null;
};
