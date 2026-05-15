import * as reportService from "../../modules/report/report.service";

import { AITool } from "./tool-registry";

export const analyticsTools: AITool[] = [
	{
		name: "get_dashboard_kpis",

		description: "Returns dashboard KPI statistics.",

		execute: async (params, admin) => {
			return reportService.getDashboardKPIs(admin);
		},
	},

	{
		name: "get_crop_yield_analytics",

		description: "Returns crop-wise production analytics.",

		execute: async (params, admin) => {
			return reportService.getCropYieldAnalytics(params, admin);
		},
	},

	{
		name: "get_seasonal_analytics",

		description: "Returns seasonal production analytics.",

		execute: async (params, admin) => {
			return reportService.getSeasonalAnalytics(admin);
		},
	},

	{
		name: "get_loss_analysis",

		description: "Returns agricultural loss analytics.",

		execute: async (params, admin) => {
			return reportService.getLossAnalysis(admin);
		},
	},

	{
		name: "get_farmer_productivity",

		description: "Returns farmer productivity rankings.",

		execute: async (params, admin) => {
			return reportService.getFarmerProductivity(params.limit, admin);
		},
	},
];
