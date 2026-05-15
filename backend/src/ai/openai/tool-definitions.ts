export const AI_TOOLS = [
	{
		type: "function",

		function: {
			name: "get_dashboard_kpis",

			description: "Get dashboard KPI metrics",

			parameters: {
				type: "object",

				properties: {},

				required: [],
			},
		},
	},

	{
		type: "function",

		function: {
			name: "get_crop_yield_analytics",

			description: "Get crop production analytics",

			parameters: {
				type: "object",

				properties: {
					crop: {
						type: "string",
					},

					district: {
						type: "string",
					},

					season: {
						type: "string",
					},
				},
			},
		},
	},

	{
		type: "function",

		function: {
			name: "get_seasonal_analytics",

			description: "Get seasonal farming analytics",

			parameters: {
				type: "object",

				properties: {
					season: {
						type: "string",
					},
				},
			},
		},
	},
];
