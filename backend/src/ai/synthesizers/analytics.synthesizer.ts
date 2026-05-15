export const synthesizeAnalytics = (tool: string, data: any) => {
	switch (tool) {
		//
		// Dashboard KPIs
		//

		case "get_dashboard_kpis":
			return `
Dashboard overview:

• Total Farmers: ${data.totalFarmers}

• Total Farms: ${data.totalFarms}

• Total Crops: ${data.totalCrops}

• Total Farming Records: ${data.totalFarmingRecords}
`;

		//
		// Crop Yield Analytics
		//

		case "get_crop_yield_analytics":
			return data
				.map(
					(item: any) => `
Crop: ${item.cropName}

Predicted Production:
${item.totalPredictedProduction}

Actual Production:
${item.totalActualProduction}

Total Loss:
${item.totalLoss}
`,
				)
				.join("\n");

		//
		// Seasonal Analytics
		//

		case "get_seasonal_analytics":
			return data
				.map(
					(item: any) => `
Season:
${item.season}

Predicted Production:
${item.totalPredictedProduction}

Actual Production:
${item.totalActualProduction}

Loss:
${item.totalLoss}
`,
				)
				.join("\n");

		//
		// Loss Analysis
		//

		case "get_loss_analysis":
			return data
				.map(
					(item: any) => `
Loss Reason:
${item.lossReason}

Total Loss:
${item.totalLoss}

Affected Records:
${item.count}
`,
				)
				.join("\n");

		//
		// Farmer Productivity
		//

		case "get_farmer_productivity":
			return data
				.map(
					(item: any) => `
Farmer:
${item.farmerName}

Total Production:
${item.totalProduction}

Total Loss:
${item.totalLoss}
`,
				)
				.join("\n");

		default:
			return JSON.stringify(data, null, 2);
	}
};
