import prisma from "../../config/prisma";

import { buildScopeFilter } from "../../utils/scope-filter";

export const createFarmingRecord = async (
	data: any,
	admin: Express.Request["admin"],
) => {
	//
	// Validate farm scope ownership
	//

	const scopeFilter = buildScopeFilter(admin!);

	const farm = await prisma.farm.findFirst({
		where: {
			id: data.farmId,

			...scopeFilter,
		},

		include: {
			farmer: true,
		},
	});

	if (!farm) {
		throw new Error("Farm not found or unauthorized");
	}

	//
	// Auto-calculate loss quantity
	//

	let lossQuantity = null;

	if (data.actualQuantity !== undefined) {
		lossQuantity = data.predictedQuantity - data.actualQuantity;
	}

	return prisma.farmingRecord.create({
		data: {
			...data,

			lossQuantity,
		},

		include: {
			crop: true,

			farm: {
				include: {
					farmer: true,
				},
			},
		},
	});
};

export const getAllFarmingRecords = async (admin: Express.Request["admin"]) => {
	const scopeFilter = buildScopeFilter(admin!);

	return prisma.farmingRecord.findMany({
		where: {
			farm: {
				...scopeFilter,
			},
		},

		include: {
			crop: true,

			farm: {
				include: {
					farmer: true,
				},
			},
		},

		orderBy: {
			createdAt: "desc",
		},
	});
};

export const getFarmingRecordById = async (
	id: string,
	admin: Express.Request["admin"],
) => {
	const scopeFilter = buildScopeFilter(admin!);

	return prisma.farmingRecord.findFirst({
		where: {
			id,

			farm: {
				...scopeFilter,
			},
		},

		include: {
			crop: true,

			farm: {
				include: {
					farmer: true,
				},
			},
		},
	});
};

export const updateFarmingRecord = async (
	id: string,
	data: any,
	admin: Express.Request["admin"],
) => {
	const scopeFilter = buildScopeFilter(admin!);

	//
	// Verify scope ownership
	//

	const existingRecord = await prisma.farmingRecord.findFirst({
		where: {
			id,

			farm: {
				...scopeFilter,
			},
		},
	});

	if (!existingRecord) {
		throw new Error("Record not found or unauthorized");
	}

	//
	// Recalculate loss quantity
	//

	let lossQuantity = existingRecord.lossQuantity;

	const predicted =
		data.predictedQuantity ?? Number(existingRecord.predictedQuantity);

	const actual = data.actualQuantity ?? Number(existingRecord.actualQuantity);

	if (actual !== undefined && actual !== null) {
		lossQuantity = predicted - actual;
	}

	return prisma.farmingRecord.update({
		where: {
			id,
		},

		data: {
			...data,

			lossQuantity,
		},

		include: {
			crop: true,

			farm: {
				include: {
					farmer: true,
				},
			},
		},
	});
};

export const deleteFarmingRecord = async (
	id: string,
	admin: Express.Request["admin"],
) => {
	const scopeFilter = buildScopeFilter(admin!);

	const existingRecord = await prisma.farmingRecord.findFirst({
		where: {
			id,

			farm: {
				...scopeFilter,
			},
		},
	});

	if (!existingRecord) {
		throw new Error("Record not found or unauthorized");
	}

	return prisma.farmingRecord.delete({
		where: {
			id,
		},
	});
};
