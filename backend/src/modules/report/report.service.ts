import prisma from "../../config/prisma";

import { buildScopeFilter } from "../../utils/scope-filter";

//
// Dashboard KPIs
//

export const getDashboardKPIs = async (admin: Express.Request["admin"]) => {
	const scopeFilter = buildScopeFilter(admin!);

	//
	// Total Farms
	//

	const totalFarms = await prisma.farm.count({
		where: {
			...scopeFilter,
		},
	});

	//
	// Total Farmers
	//
	// IMPORTANT:
	// Count distinct farmers through farms
	//

	const farmers = await prisma.farm.findMany({
		where: {
			...scopeFilter,
		},

		select: {
			farmerId: true,
		},

		distinct: ["farmerId"],
	});

	//
	// Area Aggregation
	//

	const areaAggregation = await prisma.farm.aggregate({
		where: {
			...scopeFilter,
		},

		_sum: {
			totalAreaAcres: true,
		},
	});

	//
	// Farming Record Aggregation
	//

	const recordsAggregation = await prisma.farmingRecord.aggregate({
		where: {
			farm: {
				...scopeFilter,
			},
		},

		_sum: {
			predictedQuantity: true,
			actualQuantity: true,
			lossQuantity: true,
		},

		_count: {
			id: true,
		},
	});

	//
	// Active Records
	//

	const activeRecords = await prisma.farmingRecord.count({
		where: {
			farm: {
				...scopeFilter,
			},

			status: {
				in: ["PLANNED", "SOWN", "GROWING"],
			},
		},
	});

	return {
		totalFarmers: farmers.length,

		totalFarms,

		totalCultivatedArea: Number(areaAggregation._sum.totalAreaAcres ?? 0),

		totalPredictedProduction: Number(
			recordsAggregation._sum.predictedQuantity ?? 0,
		),

		totalActualProduction: Number(
			recordsAggregation._sum.actualQuantity ?? 0,
		),

		totalLoss: Number(recordsAggregation._sum.lossQuantity ?? 0),

		activeRecords,
	};
};

//
// Geography Summary
//

export const getGeographySummary = async (
	level: "state" | "district" | "block" | "village",

	admin: Express.Request["admin"],
) => {
	const scopeFilter = buildScopeFilter(admin!);

	//
	// Dynamic geography grouping
	//

	const result = await prisma.farm.groupBy({
		by: [level],

		where: {
			...scopeFilter,
		},

		_count: {
			id: true,
		},

		_sum: {
			totalAreaAcres: true,
		},
	});

	//
	// Enrich with production stats
	//

	const enrichedResults = await Promise.all(
		result.map(async (item) => {
			const geographyValue = item[level];

			const records = await prisma.farmingRecord.aggregate({
				where: {
					farm: {
						...scopeFilter,

						[level]: geographyValue,
					},
				},

				_sum: {
					predictedQuantity: true,
					actualQuantity: true,
					lossQuantity: true,
				},

				_count: {
					id: true,
				},
			});

			return {
				[level]: geographyValue,

				totalFarms: item._count.id,

				totalArea: Number(item._sum.totalAreaAcres ?? 0),

				totalPredictedProduction: Number(
					records._sum.predictedQuantity ?? 0,
				),

				totalActualProduction: Number(records._sum.actualQuantity ?? 0),

				totalLoss: Number(records._sum.lossQuantity ?? 0),

				totalRecords: records._count.id,
			};
		}),
	);

	return enrichedResults;
};

export const getCropYieldAnalytics = async (
	filters: any,
	admin: Express.Request["admin"],
) => {
	const scopeFilter = buildScopeFilter(admin!);

	const whereClause: any = {
		farm: {
			...scopeFilter,
		},
	};

	//
	// Optional Geography Filters
	//

	if (filters.state) {
		whereClause.farm.state = filters.state;
	}

	if (filters.district) {
		whereClause.farm.district = filters.district;
	}

	if (filters.block) {
		whereClause.farm.block = filters.block;
	}

	//
	// Optional Season Filter
	//

	if (filters.season) {
		whereClause.harvestSeason = filters.season;
	}

	//
	// Group by crop
	//

	const grouped = await prisma.farmingRecord.groupBy({
		by: ["cropId"],

		where: whereClause,

		_sum: {
			predictedQuantity: true,
			actualQuantity: true,
			lossQuantity: true,
		},

		_count: {
			id: true,
		},
	});

	//
	// Enrich crop details
	//

	return Promise.all(
		grouped.map(async (item) => {
			const crop = await prisma.crop.findUnique({
				where: {
					id: item.cropId,
				},
			});

			return {
				cropId: item.cropId,

				cropName: crop?.name,

				cropVariety: crop?.variety,

				totalPredictedProduction: Number(
					item._sum.predictedQuantity ?? 0,
				),

				totalActualProduction: Number(item._sum.actualQuantity ?? 0),

				totalLoss: Number(item._sum.lossQuantity ?? 0),

				totalRecords: item._count.id,
			};
		}),
	);
};

export const getSeasonalAnalytics = async (admin: Express.Request["admin"]) => {
	const scopeFilter = buildScopeFilter(admin!);

	const grouped = await prisma.farmingRecord.groupBy({
		by: ["harvestSeason"],

		where: {
			farm: {
				...scopeFilter,
			},
		},

		_sum: {
			predictedQuantity: true,
			actualQuantity: true,
			lossQuantity: true,
		},

		_count: {
			id: true,
		},
	});

	return grouped.map((item) => ({
		season: item.harvestSeason,

		totalPredictedProduction: Number(item._sum.predictedQuantity ?? 0),

		totalActualProduction: Number(item._sum.actualQuantity ?? 0),

		totalLoss: Number(item._sum.lossQuantity ?? 0),

		totalRecords: item._count.id,
	}));
};

export const getLossAnalysis = async (admin: Express.Request["admin"]) => {
	const scopeFilter = buildScopeFilter(admin!);

	const records = await prisma.farmingRecord.findMany({
		where: {
			farm: {
				...scopeFilter,
			},

			lossReason: {
				not: null,
			},
		},

		select: {
			lossReason: true,
			lossQuantity: true,
		},
	});

	//
	// Aggregate manually
	//

	const map = new Map();

	for (const record of records) {
		const reason = record.lossReason ?? "Unknown";

		if (!map.has(reason)) {
			map.set(reason, {
				lossReason: reason,
				totalLoss: 0,
				count: 0,
			});
		}

		const existing = map.get(reason);

		existing.totalLoss += Number(record.lossQuantity ?? 0);

		existing.count += 1;
	}

	return Array.from(map.values());
};

export const getFarmerProductivity = async (
	limit = 10,
	admin: Express.Request["admin"],
) => {
	const scopeFilter = buildScopeFilter(admin!);

	const farmers = await prisma.farmer.findMany({
		include: {
			farms: {
				where: {
					...scopeFilter,
				},

				include: {
					farmingRecords: true,
				},
			},
		},
	});

	const analytics = farmers.map((farmer) => {
		let totalProduction = 0;

		let totalLoss = 0;

		let totalRecords = 0;

		farmer.farms.forEach((farm) => {
			farm.farmingRecords.forEach((record) => {
				totalProduction += Number(record.actualQuantity ?? 0);

				totalLoss += Number(record.lossQuantity ?? 0);

				totalRecords += 1;
			});
		});

		return {
			farmerId: farmer.id,

			farmerName: `${farmer.firstName} ${farmer.lastName}`,

			totalProduction,

			totalLoss,

			totalRecords,
		};
	});

	//
	// Sort descending
	//

	analytics.sort((a, b) => b.totalProduction - a.totalProduction);

	return analytics.slice(0, limit);
};
