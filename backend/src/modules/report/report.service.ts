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
